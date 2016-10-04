class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title_id, limit: 255, null: false
      t.string :title, limit: 255, null: false
      t.text :content, null: false
      t.boolean :status, default: 1
      t.integer :created_by, null: false
      t.integer :updated_by

      t.timestamps null: false
    end
  end
end
