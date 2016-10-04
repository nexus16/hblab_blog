class CreatePostStocks < ActiveRecord::Migration
  def change
    create_table :post_stocks do |t|
      t.integer :post_id
      t.integer :user_id
      t.boolean :status, default: 1

      t.timestamps null: false
    end
  end
end
