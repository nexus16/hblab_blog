class AddColumnForPosts < ActiveRecord::Migration
  def change
    add_column :posts, :short_content , :string, limit: 255, after: :content
    add_column :posts, :position, :integer, default: 10, after: :status
  end
end
