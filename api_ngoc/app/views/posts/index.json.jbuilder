json.array!(@posts) do |post|
  json.extract! post, :id, :title, :content, :status, :created_by, :created_at, :updated_by, :updated_at
  json.url post_url(post, format: :json)
end
