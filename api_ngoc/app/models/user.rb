class User < ActiveRecord::Base
  before_save :encrypt_password
  after_save :clear_password

  attr_accessor :password
  has_many :project_members
  has_many :projects, through: :project_members
  has_many :posts,-> { where(subject: nil) }, class_name: "Post", foreign_key: :created_by
  has_many :send_notification, class_name: "Notification", foreign_key: :from_user
  has_many :revice_notification, class_name: "Notification", foreign_key: :to_user
  has_many :post_stocks
  has_many :created_post, class_name: "Post", foreign_key: :created_by
  has_many :updated_post, class_name: "Post", foreign_key: :updated_by
  has_many :comments

  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :access_token, length: { :in => 3..100}
  validates :username, presence:  true, uniqueness: true, length: { :in => 3..50 }
  validates :email, :presence => true, :uniqueness => true, :format => EMAIL_REGEX
  validates :password, :confirmation => true #password_confirmation attr
  validates_length_of :password, :in => 6..20, :on => :create
  before_validation(on: :create) do
    generate_access_token
  end
  def encrypt_password
    if password.present?
      self.salt = BCrypt::Engine.generate_salt
      self.password_hash= BCrypt::Engine.hash_secret(password, salt)
    end
    self.auth_key = BCrypt::Engine.generate_salt
  end

  def generate_access_token
    self.access_token = BCrypt::Engine.generate_salt
  end

  def clear_password
    self.password = nil
  end


  def authenticate(login_password="")
    password_hash == BCrypt::Engine.hash_secret(login_password, salt)
    # if  EMAIL_REGEX.match(username_or_email)
    #   user = User.find_by_email(username_or_email)
    # else
    #   user = User.find_by_username(username_or_email)
    # end
    # if user && user.match_password(login_password)
    #   user.generate_access_token
    #   if user.save!
    #     return user
    #   end
    #   return false
    # else
    #   return false
    # end
  end
  def match_password(login_password="")
    password_hash == BCrypt::Engine.hash_secret(login_password, salt)
  end
end
