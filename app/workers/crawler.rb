class Crawler
  include Sidekiq::Worker
  sidekiq_options queue: 'crawler', retry: false, backtrace: true

  LOGGER = Sidekiq.logger.level == Logger::DEBUG ? Sidekiq.logger : nil

  def perform(songsterr_id, count)
    if cancelled?
      REDIS.publish "crawler_tab", { done: true, count: Tab.count - count }.to_json
      return
    end

    REDIS.publish "crawler_tab", { done: false, songsterr_id: songsterr_id }.to_json

    last_songsterr_id = Tab.last.nil? ? 1 : Tab.last.songsterr_id

    url = "https://www.songsterr.com/a/wa/song?id=#{songsterr_id}"

    doc = Nokogiri::HTML(open(url))
    text = doc.search('script')[5].children.first.text
    match = /\"revision.*?\"tracks/.match text
    data = JSON.parse"{#{match[0]}\": 1}"

    artist = Artist.find_or_create_by(name: data['artist'])

    tab = Tab.new title: data['title'], sheet: data['source'], songsterr_id: data['song'], status: 2


    if tab.save
      tab.seo = Seo.create object_id: tab.id, object_type: 'Tab'
      tab.artists = [artist]
      tab.save

      data = { done: false, tab: tab.as_json(only: [:title]) }
    else
      data = { done: false, tab: data['title'], errors: tab.errors.full_messages }
    end

    REDIS.publish "crawler_tab", data.to_json

    Crawler.perform_async(songsterr_id + 1, count)
  rescue
    Crawler.perform_async(songsterr_id + 1, count)
  end

  def cancelled?
    Sidekiq.redis {|c| c.exists("cancelled") }
  end

  def self.cancel!
    Sidekiq.redis {|c| c.setex("cancelled", 86400, 1) }
  end
end
