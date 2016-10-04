class AddColumnSubjects < ActiveRecord::Migration
  def change
    add_column :subjects, :title_id, :string, :null => false, after: :title
    add_column :subjects, :random_uuid, :string, :null => true, after: :title_id
  end
end
