class PostSerializer < ActiveModel::Serializer
  attribute :title_id, key: :id
  attribute :id, key: :number_id
  attributes :title, :short_content, :content, :created_at, :updated_at,:role
  attribute :subject


  belongs_to :created_user
  belongs_to :updated_user
  has_many :tags
  has_many :comments
end
