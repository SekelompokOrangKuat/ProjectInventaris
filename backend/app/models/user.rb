class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  include ActiveModel::SecurePassword
  # mount_uploader :avatar, AvatarUploader
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP}
  validates :password, length: {minimum: 8 }, if: -> { new_record? || password.nil? }
  # validates :username, presence: true, uniqueness: true

  field :email, type: String
  field :password_digest, :type => String
  field :user_role, type: String
  field :nama, type: String
  field :nip, type: String
  field :telepon, type: String

end
