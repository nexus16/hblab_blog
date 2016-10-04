json.array!(@users) do |user|
  json.extract! user, :id, :username, :auth_key, :access_token, :password_hash, :password_reset_token, :email, :role, :status
  json.url user_url(user, format: :json)
end
