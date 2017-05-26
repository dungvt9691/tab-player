class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.string  :app_name
      t.string  :app_url
      t.string  :app_email
      t.string  :app_phone
      t.string  :app_hotline
      t.string  :app_fax
      t.string  :app_address
      t.string  :facebook_fanpage
      t.string  :facebook_app_id
      t.string  :facebook_app_secret
      t.string  :google_api_key
      t.string  :google_app_id
      t.string  :google_app_secret
      t.string  :google_analytics_id
      t.string  :youtube_endpoint
      t.string  :youtube_thumbnail
      t.string  :youtube_api_key
      t.string  :adfly_uid
      t.string  :adfly_key
      t.string  :smtp_sender
      t.string  :smtp_address
      t.integer :smtp_port
      t.string  :smtp_username
      t.string  :smtp_password
      t.string  :smtp_authentication
      t.boolean :smtp_enable_starttls_auto
      t.string  :recaptcha_publickey
      t.string  :recaptcha_privatekey
      
      t.timestamps null: false
    end
  end
end
