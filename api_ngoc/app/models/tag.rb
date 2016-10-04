class Tag < ActiveRecord::Base
  validates_uniqueness_of :name

  has_many :post_tags
  has_many :posts, through: :post_tags

  def num_posts
    self.posts.count
  end
end
