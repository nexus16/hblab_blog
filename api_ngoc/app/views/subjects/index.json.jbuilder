json.array!(@subjects) do |subject|
  json.extract! subject, :id, :title, :position, :subject_id, :created_by, :updated_by
  json.url subject_url(subject, format: :json)
end
