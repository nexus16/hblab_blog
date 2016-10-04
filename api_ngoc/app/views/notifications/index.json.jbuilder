json.array!(@notifications) do |notification|
  json.extract! notification, :id, :to_user, :from_user, :post_id, :content, :is_read, :status
  json.url notification_url(notification, format: :json)
end
