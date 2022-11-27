# Preview all emails at http://localhost:3000/rails/mailers/model_mailer
class ModelMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/model_mailer/lupapassword_notification
  def lupapassword_notification
    ModelMailer.lupapassword_notification
  end

end
