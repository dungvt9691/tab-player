class Admin::TestSmtpMailer < ApplicationMailer
  def test(email)
    @email = email
    mail(to: @email, subject: I18n.t('admin.test_smtp_mailer.test.subject'))
  end
end
