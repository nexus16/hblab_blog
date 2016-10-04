class AddColumnPosts < ActiveRecord::Migration
  def change
    add_column :posts, :subject_id, :integer, :null => true, after: :content
    add_column :posts, :random_uuid, :string, :null => true, after: :title_id
  end
end
