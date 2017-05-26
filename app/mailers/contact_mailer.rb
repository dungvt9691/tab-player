class ContactMailer < ApplicationMailer
  def contact(fullname, email, content)
    @fullname = fullname
    @email = email
    @content = content
    mail(to: @email, subject: I18n.t('contact.mailer.subject'))
  end
end
