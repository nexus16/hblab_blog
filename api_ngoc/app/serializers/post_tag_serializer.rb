class PostTagSerializer < ActiveModel::Serializer
  attributes :position, :tag

  belongs_to :tag
end
