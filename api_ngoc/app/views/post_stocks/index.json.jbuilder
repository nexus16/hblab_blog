json.array!(@post_stocks) do |post_stock|
  json.extract! post_stock, :id, :post_id, :user_id, :status
  json.url post_stock_url(post_stock, format: :json)
end
