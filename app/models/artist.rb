# == Schema Information
#
# Table name: artists
#
#  id                  :integer          not null, primary key
#  name                :string(255)
#  name_alias          :string(255)
#  birthname           :string(255)
#  avatar_updated_at   :datetime
#  avatar_file_size    :integer
#  avatar_content_type :string(255)
#  avatar_file_name    :string(255)
#  cover_updated_at    :datetime
#  cover_file_size     :integer
#  cover_content_type  :string(255)
#  cover_file_name     :string(255)
#  zing_mp3_id         :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class Artist < ActiveRecord::Base
  attr_accessor :system

  include Concerns::Artists::Searchable

  # Attachments
  has_attached_file :avatar, styles: { s500: '500x500#', s300: '300x300#', s200: '200x200#' },
                             default_url: '/missing/artists/avatar/:style/missing.png',
                             use_timestamp: false,
                             url: '/artists/avatar/:style/:artist_id:artist_avatar_ext',
                             path: ':rails_root/public:url'

  has_attached_file :cover, styles: { s1200: '1200x360#', s800: '800x240#', s400: '400x120#' },
                            default_url: '/missing/artists/cover/:style/missing.jpg',
                            use_timestamp: false,
                            url: '/artists/cover/:style/:artist_id:artist_cover_ext',
                            path: ':rails_root/public:url'

  Paperclip.interpolates :artist_id do |artist, _style|
    "#{format('IMG%010d', artist.instance.id)}"
  end

  Paperclip.interpolates :artist_cover_ext do |artist, _style|
    begin
      ".#{artist.instance.cover_content_type.split('/').last}"
    rescue
      '.jpg'
    end
  end

  Paperclip.interpolates :artist_avatar_ext do |artist, _style|
    begin
      ".#{artist.instance.avatar_content_type.split('/').last}"
    rescue
      '.jpg'
    end
  end

  # Validates
  do_not_validate_attachment_file_type :avatar
  do_not_validate_attachment_file_type :cover
  validates_attachment_file_name :avatar, matches: [/jpeg\Z/, /jpg\Z/, /JPEG\Z/, /JPG\Z/]
  validates_attachment_file_name :cover, matches: [/jpeg\Z/, /jpg\Z/, /JPEG\Z/, /JPG\Z/]

  validates :name, presence: true

  # Callbacks
  after_save :set_avatar_file_name
  after_save :set_cover_file_name

  # Associations
  has_many :tab_artists, dependent: :destroy
  has_many :tabs, through: :tab_artists, source: :tab

  def avatar_url(style = :s300)
    "#{avatar.url(style)}?#{DateTime.now.to_i}"
  end

  def cover_url(style = :s800)
    "#{cover.url(style)}?#{DateTime.now.to_i}"
  end

  def as_json(options = {})
    options[:methods] = [:avatar_url]
    super
  end

  class << self
    include Filter

    def filter(params)
      searchable_columns = %w(id name name_alias birthname)

      search_scope = search_string(searchable_columns, params)

      if params[:order]
        sortable_columns = {
          '2' => 'name',
          '3' => 'name_alias',
          '4' => 'birthname',
          '5' => 'created_at'
        }

        order_scope = sort_string(sortable_columns, params)
      else
        order_scope = 'created_at desc'
      end

      where(search_scope).order(order_scope)
    rescue => e
      ErrorNotification.send(e)
      Kaminari.paginate_array([])
    end
  end

  private

  def set_avatar_file_name
    file_name = "#{format('IMG%010d', id)}.#{avatar_content_type.split('/').last}"
    return if avatar_file_name == file_name
    self.avatar_file_name = file_name
  rescue => e
    ErrorNotification.send(e)
  end

  def set_cover_file_name
    file_name = "#{format('IMG%010d', id)}.#{cover_content_type.split('/').last}"
    return if cover_file_name == file_name
    self.cover_file_name = file_name
  rescue => e
    ErrorNotification.send(e)
  end
end
