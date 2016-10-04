class CommentSerializer < ActiveModel::Serializer
  attributes :content,:created_user
  
end
