class ApplicationMailer < ActionMailer::Base
  default from: Setting.smtp_sender
  layout 'mailer'
  before_action :set_default_url_options
  after_action :set_delivery_options

  private

  def set_default_url_options
    ActionMailer::Base.default_url_options = { host: Setting.app_url }
  end

  def set_delivery_options
    smtp_settings = {
      sender: Setting.smtp_sender,
      address: Setting.smtp_address,
      port: Setting.smtp_port,
      user_name: Setting.smtp_username,
      password: Setting.smtp_password,
      authentication: Setting.smtp_authentication,
      enable_starttls_auto: Setting.smtp_enable_starttls_auto
    }
    mail.delivery_method.settings.merge!(smtp_settings)
  end
end
