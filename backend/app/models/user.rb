class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  include ActiveModel::SecurePassword
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP}
  has_secure_password
  validates :password, length: {minimum: 8 }, if: -> { new_record? || password.nil? }
  validates :user_role, presence: true
  validates :telepon, presence: true
  validates :nip, presence: true
  validates :nama, presence: true
  validates_inclusion_of :user_role, in: %w(Admin Pengelola Pengguna), message: "harus Admin/Pengelola/Pengguna!"

  field :email, type: String
  field :password_digest, :type => String
  field :user_role, type: String
  field :nama, type: String
  field :nip, type: String
  field :telepon, type: String

end
