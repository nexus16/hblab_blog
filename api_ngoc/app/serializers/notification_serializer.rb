class NotificationSerializer < ActiveModel::Serializer
  attributes :to_user, :from_user, :post_id, :content, :is_read
end
