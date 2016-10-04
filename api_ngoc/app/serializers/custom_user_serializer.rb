class CustomUserSerializer < ActiveModel::Serializer
  attributes :id,:username, :first_name, :last_name, :email, :avatar,:role
end
