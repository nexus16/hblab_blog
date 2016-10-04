json.array!(@projects) do |project|
  json.extract! project, :id, :name, :description, :status, :logo, :start_at, :end_at, :created_by, :updated_by
  json.url project_url(project, format: :json)
end
