class AddColumnProjects < ActiveRecord::Migration
  def change
    add_column :projects, :title_id, :string, :null => false, after: :name
    add_column :projects, :random_uuid, :string, :null => true, after: :title_id
  end
end
