class Crawler
  include Sidekiq::Worker
  sidekiq_options queue: 'crawler', retry: false, backtrace: true

  LOGGER = Sidekiq.logger.level == Logger::DEBUG ? Sidekiq.logger : nil

  ZING_API_ENDPOINT   = 'http://api.mp3.zing.vn/api/mobile/artist/getartistinfo'
  ZING_API_AVATAR_URL = "http://zmp3-photo.d.za.zdn.vn"
  ZING_API_COVER_URL  = "http://image.mp3.zdn.vn"

  def perform(last_mp3_zing_id, zing_mp3_id, count)
    if cancelled?
      REDIS.publish "crawler_artist", { done: true, count: Artist.count - count }.to_json
      return
    end

    if zing_mp3_id > 1000 || zing_mp3_id - last_mp3_zing_id > 300
      REDIS.publish "crawler_artist", { done: true, count: Artist.count - count }.to_json
      return
    end

    url = "#{ZING_API_ENDPOINT}?requestdata={\"id\":\"#{zing_mp3_id}\"}"
    uri = URI.escape(url)

    response = begin
                 JSON.parse(RestClient.get(uri).body)
               rescue
                 nil
               end

    if response && response['response']['is_error'].nil?
      avatar = URI.parse("#{ZING_API_AVATAR_URL}/#{response['avatar']}")
      avatar = nil if response['avatar'].blank?

      cover = URI.parse("#{ZING_API_COVER_URL}/#{response['cover3']}")
      cover = nil if response["cover3"].blank?

      params = {
        name: response['name'],
        name_alias: response['alias'].blank? ? nil : response['alias'],
        birthname: response['birthname'].blank? ? nil : response['birthname'],
        avatar: avatar,
        cover: cover,
        zing_mp3_id: zing_mp3_id
      }

      artist = Artist.new params

      if artist.save
        data = { done: false, artist: artist.as_json(only: [:name]) }
      else
        data = { done: false, artist: response['name'], errors: artist.errors.full_messages }
      end
      REDIS.publish "crawler_artist", data.to_json
    else
      REDIS.publish "crawler_artist", { done: false }.to_json
    end

    Crawler.perform_async(last_mp3_zing_id, zing_mp3_id + 1, count)
  end

  def cancelled?
    Sidekiq.redis {|c| c.exists("cancelled") }
  end

  def self.cancel!
    Sidekiq.redis {|c| c.setex("cancelled", 86400, 1) }
  end
end
