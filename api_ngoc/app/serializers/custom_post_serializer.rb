class CustomPostSerializer < ActiveModel::Serializer
  attribute :title_id, key: :id
  attributes :title, :short_content,:created_at, :updated_at

  belongs_to :created_user
  belongs_to :updated_user
  has_many :tags
  has_many :comments
end
