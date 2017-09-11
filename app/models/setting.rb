# == Schema Information
#
# Table name: settings
#
#  id                        :integer          not null, primary key
#  app_name                  :string(255)
#  app_url                   :string(255)
#  app_email                 :string(255)
#  app_phone                 :string(255)
#  app_hotline               :string(255)
#  app_fax                   :string(255)
#  app_address               :string(255)
#  facebook_fanpage          :string(255)
#  facebook_app_id           :string(255)
#  facebook_app_secret       :string(255)
#  google_api_key            :string(255)
#  google_app_id             :string(255)
#  google_app_secret         :string(255)
#  google_analytics_id       :string(255)
#  youtube_endpoint          :string(255)
#  youtube_thumbnail         :string(255)
#  youtube_api_key           :string(255)
#  adfly_uid                 :string(255)
#  adfly_key                 :string(255)
#  adfly_secret_key          :string(255)
#  adfly_group_id            :string(255)
#  adfly_endpoint            :string(255)
#  smtp_sender               :string(255)
#  smtp_address              :string(255)
#  smtp_port                 :integer
#  smtp_username             :string(255)
#  smtp_password             :string(255)
#  smtp_authentication       :string(255)
#  smtp_enable_starttls_auto :boolean
#  recaptcha_publickey       :string(255)
#  recaptcha_privatekey      :string(255)
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#

class Setting < ActiveRecord::Base
  # Attribute accessors
  attr_accessor :admin_username, :admin_password, :keywords, :description, :featured_image, :system

  # Association
  has_one :seo, as: :object, dependent: :destroy

  # Validations
  validates :app_name, presence: true
  validates :app_url, url: true
  validates :app_email, email: true
  validates :admin_username, presence: true, on: :create
  validates_format_of :admin_username, with: /^[a-zA-Z0-9_\.]*$/, multiline: true, on: :create
  validates :admin_password, length: { within: 6..30 }, on: :create
  validates :facebook_fanpage, on: :update, url: true, allow_nil: true
  validates :youtube_endpoint, on: :update, url: true, allow_nil: true
  validates :youtube_thumbnail, on: :update, url: true, allow_nil: true
  validates :smtp_username, on: :update, email: true, allow_nil: true

  delegate :keywords, to: :seo
  delegate :description, to: :seo
  delegate :featured_image, to: :seo

  class << self
    def app_name
      Setting.first.app_name
    rescue
      nil
    end

    def app_url
      Setting.first.app_url
    rescue
      nil
    end

    def app_email
      Setting.first.app_email
    rescue
      nil
    end

    def app_phone
      Setting.first.app_phone
    rescue
      nil
    end

    def app_hotline
      Setting.first.app_hotline
    rescue
      nil
    end

    def app_fax
      Setting.first.app_fax
    rescue
      nil
    end

    def app_address
      Setting.first.app_address
    rescue
      nil
    end

    def seo_keywords
      Setting.first.keywords
    rescue
      nil
    end

    def seo_description
      Setting.first.description
    rescue
      nil
    end

    def featured_image
      Setting.first.featured_image || "#{Setting.app_url}#{ActionController::Base.helpers.asset_path('setting/missing.png')}"
    rescue
      "#{Setting.app_url}#{ActionController::Base.helpers.asset_path('setting/missing.png')}"
    end

    def facebook_fanpage
      Setting.first.facebook_fanpage
    rescue
      nil
    end

    def facebook_app_id
      Setting.first.facebook_app_id
    rescue
      nil
    end

    def facebook_app_secret
      Setting.first.facebook_app_secret
    rescue
      nil
    end

    def google_api_key
      Setting.first.google_api_key
    rescue
      nil
    end

    def google_app_id
      Setting.first.google_app_id
    rescue
      nil
    end

    def google_app_secret
      Setting.first.google_app_secret
    rescue
      nil
    end

    def google_analytics_id
      Setting.first.google_analytics_id
    rescue
      nil
    end

    def youtube_endpoint
      Setting.first.youtube_endpoint
    rescue
      nil
    end

    def youtube_thumbnail
      Setting.first.youtube_thumbnail
    rescue
      nil
    end

    def youtube_api_key
      Setting.first.youtube_api_key
    rescue
      nil
    end

    def adfly_uid
      Setting.first.adfly_uid
    rescue
      nil
    end

    def adfly_key
      Setting.first.adfly_key
    rescue
      nil
    end

    def adfly_secret_key
      Setting.first.adfly_secret_key
    rescue
      nil
    end

    def adfly_group_id
      Setting.first.adfly_group_id
    rescue
      nil
    end

    def adfly_endpoint
      Setting.first.adfly_endpoint
    rescue
      nil
    end

    def smtp_sender
      Setting.first.smtp_sender
    rescue
      nil
    end

    def smtp_address
      Setting.first.smtp_address
    rescue
      nil
    end

    def smtp_port
      Setting.first.smtp_port
    rescue
      nil
    end

    def smtp_username
      Setting.first.smtp_username
    rescue
      nil
    end

    def smtp_password
      Setting.first.smtp_password
    rescue
      nil
    end

    def smtp_authentication
      Setting.first.smtp_authentication
    rescue
      nil
    end

    def smtp_enable_starttls_auto
      Setting.first.smtp_enable_starttls_auto
    rescue
      nil
    end

    def recaptcha_publickey
      Setting.first.recaptcha_publickey
    rescue
      nil
    end

    def recaptcha_private_key
      Setting.first.recaptcha_private_key
    rescue
      nil
    end
  end
end
