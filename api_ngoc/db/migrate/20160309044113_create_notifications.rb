class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :to_user
      t.string :from_user
      t.integer :post_id
      t.text :content
      t.boolean :is_read, default: 0
      t.boolean :status, default: 1

      t.timestamps null: false
    end
  end
end
