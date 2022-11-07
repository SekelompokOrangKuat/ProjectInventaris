module Users
    class UsersModel < ApplicationRecord
        # self.table_name = "Users"
        include Mongoid::Document
        include Mongoid::Timestamps
        
        field :email, type: String
        field :password, type: String
        field :user_role, type: String
        field :name, type: String
        field :nip, type: String
        field :telepon, type: String
    
        # has_secure_password
        # mount_uploader :avatar, AvatarUploader
        # validates :email, presence: true, uniqueness: true
        # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP}
        # # validates :name, presence: true, uniqueness: true
        # validates :password, length: {minimum: 6 }, if: -> { new_record? || password.nil? }
    end
end
