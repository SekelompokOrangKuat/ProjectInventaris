class ModelMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.model_mailer.lupapassword_notification.subject
  #
  def lupapassword_notification(email)
    @email = email
    mail to: @email.email, subject: "SIMBADA: Password Baru"
  end
end
