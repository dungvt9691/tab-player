# == Schema Information
#
# Table name: tabs
#
#  id                 :integer          not null, primary key
#  sid                :string(255)
#  title              :string(255)
#  sheet_updated_at   :datetime
#  sheet_file_size    :integer
#  sheet_content_type :string(255)
#  sheet_file_name    :string(255)
#  download_hash      :string(255)
#  download_link      :string(255)
#  pdf_download_link  :string(255)
#  user_id            :integer
#  status             :integer          default(1)
#  cached_views       :integer          default(0)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Tab < ActiveRecord::Base
  include Rails.application.routes.url_helpers
  include Concerns::Tabs::Searchable

  # Attribute accessors
  attr_accessor :seo_title, :seo_keywords, :seo_description, :system

  # Views count
  is_impressionable counter_cache: true, column_name: :cached_views, unique: :all

  # Scope
  scope :published, -> { where(status: 2) }
  scope :viewest, -> { published.order(cached_views: :desc) }
  scope :recently, -> { published.order(created_at: :desc) }
  scope :beginner, -> { published.includes(:rate_average).order('rating_caches.avg asc').where('rating_caches.avg <= 2') }
  scope :unpublish, -> { where(status: 1) }

  # Rate
  ratyrate_rateable 'difficulty'

  # Attachment
  has_attached_file :sheet, url: '/sheets/:sheet_file_name', path: ':rails_root/public:url'

  Paperclip.interpolates :sheet_file_name do |tab, _style|
    tab.instance.sheet_file_name
  end

  # Validate
  validates :title, presence: true, on: :update
  validates_attachment_file_name :sheet, matches: [/gp3\Z/, /gp4\Z/, /gp5\Z/, /gp6\Z/, /gpx\Z/, /ptb\Z/]
  do_not_validate_attachment_file_type :sheet
  validates_attachment_presence :sheet

  # Callback
  after_validation :clean_paperclip_errors
  before_create :set_sid
  before_create :set_download_hash
  before_create :set_title_by_file_name
  before_create :set_sheet_file_name
  after_create :set_download_link
  after_create :set_song_informations

  # Associations
  has_many :tutorials, dependent: :destroy
  has_one :rate_average, as: :cacheable, class_name: 'RatingCache', dependent: :destroy
  has_many :tab_artists, dependent: :destroy
  has_many :artists, through: :tab_artists, source: :artist,
                     after_add: [->(a, _c) { Indexer.perform_async(:update, a.class.to_s, a.id) }],
                     after_remove: [->(a, _c) { Indexer.perform_async(:update, a.class.to_s, a.id) }]

  has_many :tab_categories, dependent: :destroy
  has_many :categories, through: :tab_categories,
                        after_add: [->(a, _c) { Indexer.perform_async(:update, a.class.to_s, a.id) }],
                        after_remove: [->(a, _c) { Indexer.perform_async(:update, a.class.to_s, a.id) }]
  has_one :seo, as: :object, dependent: :destroy
  belongs_to :uploader, class_name: 'User', foreign_key: :user_id

  #Delegate
  delegate :title, :keywords, :description, to: :seo, prefix: true, allow_nil: true
  delegate :title, to: :seo, prefix: 'seo_title'
  delegate :keywords, to: :seo, prefix: 'seo_keywords'
  delegate :description, to: :seo, prefix: 'seo_description'

  # Enum
  enum status: { unpublish: 1, published: 2 }

  def seo_title=(*args)
    @seo_title = args[0]
  end

  def seo_title
    seo.title
  rescue
    @seo_title
  end

  def seo_keywords=(*args)
    @seo_keywords = args[0]
  end

  def seo_keywords
    seo.keywords
  rescue
    @seo_keywords
  end

  def seo_description=(*args)
    @seo_description = args[0]
  end

  def seo_description
    seo.description
  rescue
    @seo_description
  end

  def status_locale
    I18n.t("tabs.#{status}")
  end

  def status_enum
    { 'unpublish' => 1, 'published' => 2 }
  end

  def tutorials
    return super.published.most_liked if published?
    return super.unpublish.most_liked if unpublish?
  end

  def published?
    status == 'published'
  end

  def unpublish?
    !published?
  end

  def publish!
    ActiveRecord::Base.transaction do
      update status: 2
      Accounts::NotificationsHelper.send('published_tab', self)
    end
  end

  def fill_full_informations?
    return false if artists.empty?
    return false if categories.empty?
    true
  end

  def set_download_link
    link = "#{Setting.app_url}#{download_path(hash: download_hash)}"
    if Rails.env.production?
      adfly_api = Adfly::API.new Setting.adfly_uid, Setting.adfly_key
      link = adfly_api.create_link url: gp_link, advert_type: :int, domain: 'adf.ly'
    end
    update download_link: link
  rescue => e
    ErrorNotification.send(e)
  end

  def artists_text
    if artists.empty?
      I18n.t('unknown')
    else
      artists.map(&:name).join(', ')
    end
  rescue
    I18n.t('unknown')
  end

  def categories_text
    if categories.empty?
      I18n.t('unknown')
    else
      categories.map(&:name).join(', ')
    end
  rescue
    I18n.t('unknown')
  end

  def average_score
    Rate.where(rateable_id: id).pluck(:stars).reduce(:+) / Rate.where(rateable_id: id).pluck(:stars).count
  rescue
    0
  end

  def meta_image
    if artists.empty?
      Setting.featured_image
    elsif artists.first.avatar?
      "#{Setting.app_url}#{artists.first.avatar.url(:s300)}"
    else
      Setting.featured_image
    end
  end

  def avatar_url
    if artists.empty?
      "#{Setting.app_url}/missing/artists/avatar/s300/missing.png"
    else
      "#{Setting.app_url}#{artists.first.avatar.url(:s300)}"
    end
  end

  def cover_url
    if artists.empty?
      "#{Setting.app_url}/missing/artists/cover/s800/missing.jpg"
    else
      "#{Setting.app_url}#{artists.first.cover.url(:s800)}"
    end
  end

  def notification_image
    "#{Setting.app_url}#{artists.first.avatar.url(:original)}"
  rescue
    nil
  end

  def as_json(options = {})
    options[:methods] = [:avatar_url, :artists_text, :categories_text]
    super
  end

  class << self
    include Filter

    def filter(params)
      searchable_columns = %w(tabs.id tabs.title)

      search_scope = search_string(searchable_columns, params)

      if params[:order]
        sortable_columns = {
          '2' => 'tabs.title',
          '4' => 'tabs.cached_views',
          '6' => 'tabs.created_at'
        }

        order_scope = sort_string(sortable_columns, params)
      else
        order_scope = 'tabs.created_at desc'
      end

      status = params[:published] == 'true' ? 2 : 1
      where('tabs.status = ?', status).where(search_scope).order(order_scope)
    rescue => e
      ErrorNotification.send(e)
      Kaminari.paginate_array([])
    end
  end

  private

  def set_song_informations
    if %w(.gp3 .gp4 .gp5).include? File.extname(sheet_file_name)
      song = GuitarProParser.read_headers(sheet.path)
      self.title = song.title.blank? ? 'Untitled' : song.title
      song.artist = song.artist.blank? ? 'Unknown' : song.artist
      self.artists << Artist.find_or_create_by(name: song.artist)
      self.save
    end
  rescue => e
    self.title = 'Untitled'
    self.artists << Artist.find_or_create_by(name: 'Unknown')
    self.save
  end

  def set_title_by_file_name
    return unless self.title.blank?
    self.title = File.basename(sheet_file_name, '.*')
  end

  def set_sheet_file_name
    self.sheet_file_name = loop do
      file_name = SecureRandom.hex + File.extname(sheet_file_name)
      break file_name unless Tab.exists?(sheet_file_name: file_name)
    end
  end

  def set_download_hash
    return if download_hash
    self.download_hash = loop do
      random_download_hash = SecureRandom.hex
      break random_download_hash unless Tab.exists?(download_hash: random_download_hash)
    end
  end

  def set_sid
    return if sid
    self.sid = loop do
      random_sid = [*('a'..'z'), *('A'..'Z')].sample(11).join
      break random_sid unless self.class.exists?(id: random_sid)
    end
  end

  def clean_paperclip_errors
    errors.delete(:sheet_file_name)
  end
end
