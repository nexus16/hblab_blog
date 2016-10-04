class SubjectSerializer < ActiveModel::Serializer
  attributes :id,:title, :position, :has_child,:title_id

  has_many :subjects
end
