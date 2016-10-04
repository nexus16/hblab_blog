class CustomProjectSerializer < ActiveModel::Serializer
  attribute :title_id, key: :id
  attribute :id, key: :id_number
  attributes :name, :description, :status, :logo, :start_at, :end_at, :created_by, :updated_by
  has_many :project_members
  has_many :posts
  has_many :subjects
end
