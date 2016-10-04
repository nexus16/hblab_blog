class CreatePostTags < ActiveRecord::Migration
  def change
    create_table :post_tags do |t|
      t.integer :post_id, null: false
      t.integer :tag_id, null: false
      t.integer :position, default: 1

      t.timestamps null: false
    end
  end
end
