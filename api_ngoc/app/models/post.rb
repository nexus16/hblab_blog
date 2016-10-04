class Post < ActiveRecord::Base
  # has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  # validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  before_save :set_title_id

  validates :title, :content, :created_by, presence: true
  validates :title , :length => { :within => 10..255 }
  validates_uniqueness_of :title_id

  has_many :post_tags,-> { order(:position) }
  has_many :tags, through: :post_tags
  has_many :post_stocks
  has_many :comments
  belongs_to :subject
  belongs_to :created_user, class_name: "User", foreign_key: :created_by, inverse_of: :created_post
  belongs_to :updated_user, class_name: "User", foreign_key: :updated_by ,inverse_of: :updated_post
  attr_accessor :role
  
  include Utils

  protected
    def set_title_id
      title_tmp_id = self.convert_short_name self.title
      post = Post.find_by_title_id title_tmp_id
      if !post.nil? and post.id != self.id
        if self.random_uuid.nil?
          self.random_uuid = SecureRandom.uuid
        end
        self.title_id = title_tmp_id + "-" + self.random_uuid.to_s

        post = Post.find_by_title_id self.title_id
        if !post.nil? and post.id != self.id
          self.random_uuid = SecureRandom.uuid
          self.title_id = title_tmp_id + "-" + self.random_uuid.to_s
        end
      else
        self.title_id = title_tmp_id
      end
    end
end
