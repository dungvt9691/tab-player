# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string(255)      default(""), not null
#  encrypted_password  :string(255)      default(""), not null
#  remember_created_at :datetime
#  sign_in_count       :integer          default("0"), not null
#  current_sign_in_at  :datetime
#  last_sign_in_at     :datetime
#  current_sign_in_ip  :string(255)
#  last_sign_in_ip     :string(255)
#  locked_at           :datetime
#  fullname            :string(255)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string(255)
#  avatar_content_type :string(255)
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#

class User < ActiveRecord::Base
  # Voteable
  acts_as_voter

  # Rate
  ratyrate_rater
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :rememberable,
  :trackable, :omniauthable, :validatable

  # Attachments
  has_attached_file :avatar, styles: { s500: '500x500#', s300: '300x300#', s200: '200x200#' },
  default_url: '/missing/avatars/:style/missing.png',
  use_timestamp: false,
  url: '/avatars/:style/:user_id:user_avatar_ext',
  path: ':rails_root/public:url'

  Paperclip.interpolates :user_id do |user, _style|
    "#{format('IMG%010d', user.instance.id)}"
  end

  Paperclip.interpolates :user_avatar_ext do |user, _style|
    ".#{user.instance.avatar_content_type.split('/').last}"
  end

  # Validates
  do_not_validate_attachment_file_type :avatar
  validates :fullname, presence: true
  validates_attachment_presence :avatar

  # Callbacks
  after_save :set_avatar_file_name

  # Associations
  has_many :tabs, dependent: :destroy
  has_many :tab_favorites, dependent: :destroy
  has_many :favorite_tabs, through: :tab_favorites

  # Check user is locked
  def locked?
    !locked_at.nil?
  end

  class << self
    include Filter

    def filter(params)
      searchable_columns = %w(id email fullname)

      search_scope = search_string(searchable_columns, params)

      if params[:order]
        sortable_columns = {
          '2' => 'email',
          '3' => 'fullname',
          '4' => 'created_at'
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

    # Oauth
    def find_for_facebook_oauth(auth)
      user = User.find_by(email: auth.info.email)

      user_params = {
        avatar: "#{auth.info.image}?type=large".gsub('http://', 'https://'),
        fullname: auth.extra.raw_info.name
      }

      if user
        user.update user_params
      else
        user_params[:email] = auth.info.email
        user_params[:password] = Devise.friendly_token[0, 8]
        user = User.create user_params
      end

      user
    rescue => e
      ErrorNotification.send(e)
    end

    def find_for_google_oauth2(auth)
      user = User.find_by(email: auth.info.email)

      user_params = {
        avatar: "#{auth.info.image.split('?sz')[0]}?sz=500".gsub('http://', 'https://'),
        fullname: auth.info.name
      }

      if user
        user.update user_params
      else
        user_params[:email] = auth.info.email
        user_params[:password] = Devise.friendly_token[0, 8]
        user = User.create user_params
      end

      user
    rescue => e
      ErrorNotification.send(e)
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
end
