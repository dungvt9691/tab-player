# == Schema Information
#
# Table name: tutorials
#
#  id                      :integer          not null, primary key
#  link                    :string(255)
#  tab_id                  :integer
#  video_id                :string(255)
#  status                  :integer          default("1")
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  cached_votes_total      :integer          default("0")
#  cached_votes_score      :integer          default("0")
#  cached_votes_up         :integer          default("0")
#  cached_votes_down       :integer          default("0")
#  cached_weighted_score   :integer          default("0")
#  cached_weighted_total   :integer          default("0")
#  cached_weighted_average :float(24)        default("0")
#
# Indexes
#
#  index_tutorials_on_cached_votes_down        (cached_votes_down)
#  index_tutorials_on_cached_votes_score       (cached_votes_score)
#  index_tutorials_on_cached_votes_total       (cached_votes_total)
#  index_tutorials_on_cached_votes_up          (cached_votes_up)
#  index_tutorials_on_cached_weighted_average  (cached_weighted_average)
#  index_tutorials_on_cached_weighted_score    (cached_weighted_score)
#  index_tutorials_on_cached_weighted_total    (cached_weighted_total)
#

class Tutorial < ActiveRecord::Base
  # Voteable
  acts_as_votable

  # Validate
  validates :tab_id, presence: true
  validates :link, length: { maximum: 500 },
                   format: { with: %r{\A(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{10,})\z}i }
  validate :video_existence, on: [:create, :update]

  validates :link, uniqueness: { scope: :tab_id }

  # Associations
  belongs_to :tab

  # Scopes
  scope :most_liked, -> { order(cached_votes_up: :desc) }
  scope :published, -> { where(status: 2) }
  scope :unpublish, -> { where(status: 1) }

  # Enum
  enum status: { unpublish: 1, published: 2 }

  def status_locale
    I18n.t("tutorials.#{status}")
  end

  def status_enum
    { 'unpublish' => 1, 'published' => 2 }
  end

  def published?
    status == 'published'
  end

  def unpublish?
    !published?
  end

  def publish!
    update status: 2
  end

  def unpublish!
    update status: 1
  end

  def thumbnail_url
    Setting.youtube_thumbnail + video_id + '/0.jpg'
  end

  class << self
    include Filter

    def filter(params)
      searchable_columns = %w(tutorials.id tutorials.link tabs.title)

      search_scope = search_string(searchable_columns, params)

      if params[:order]
        sortable_columns = {
          '2' => 'tutorials.link',
          '3' => 'tabs.title',
          '4' => 'tabs.status',
          '5' => 'tutorials.created_at'
        }

        order_scope = sort_string(sortable_columns, params)
      else
        order_scope = 'created_at desc'
      end

      joins(:tab).where('tabs.status = ?', 2).where(search_scope).order(order_scope)
    rescue => e
      ErrorNotification.send(e)
      Kaminari.paginate_array([])
    end
  end

  private

  def video_existence
    video = VideoInfo.new(link)
    info = get_info(video.video_id)
    info = JSON.parse(info)
    if info['items'].empty?
      errors.add(:link, :invalid)
    else
      self.video_id = video.video_id
    end
  rescue VideoInfo::UrlError => e
    ErrorNotification.send(e)
    errors.add(:link, :invalid)
    return
  end

  def get_info(youtube_video_id)
    url = URI.parse("#{Setting.youtube_endpoint}&id=#{youtube_video_id}&key=#{Setting.youtube_api_key}")
    req = Net::HTTP::Get.new(url)
    res = Net::HTTP.start(url.host, url.port, use_ssl: url.scheme == 'https') do |http|
      http.request(req)
    end
    res.body
  rescue => e
    ErrorNotification.send(e)
    { items: [] }.to_json
  end
end
