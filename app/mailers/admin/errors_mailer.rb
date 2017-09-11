class Admin::ErrorsMailer < ApplicationMailer
  def catch_exception(errors)
    @errors = errors
    mail(to: Setting.app_email, subject: I18n.t('admin.errors_mailer.catch_exception.subject'))
  end
end
