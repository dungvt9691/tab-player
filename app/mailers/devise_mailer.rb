class DeviseMailer < ApplicationMailer
  include Devise::Mailers::Helpers

  def reset_password_instructions(admin, token, opts = {})
    @token = token
    @admin = admin
    @email = admin.email

    subject = I18n.t('devise.mailer.reset_password_instructions.subject')

    using_locale(I18n.locale){ mail(to: @email, subject: subject) }
  end

  protected

  def using_locale(locale, &block)
    original_locale = I18n.locale
    I18n.locale = locale
    return_value = yield
    I18n.locale = original_locale
    return_value
  end
end
