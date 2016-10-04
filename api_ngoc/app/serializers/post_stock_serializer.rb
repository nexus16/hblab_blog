class PostStockSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :user_id, :status
end
