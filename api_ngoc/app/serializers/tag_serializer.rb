class TagSerializer < ActiveModel::Serializer
  attributes :id,:name, :num_posts, :posts
end
