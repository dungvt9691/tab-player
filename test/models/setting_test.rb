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

require 'test_helper'

class SettingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
