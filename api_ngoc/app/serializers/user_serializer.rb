class UserSerializer < ActiveModel::Serializer
  attributes :id,:username, :first_name, :last_name, :email, :avatar
  
  has_many :posts
  has_many :projects
end
