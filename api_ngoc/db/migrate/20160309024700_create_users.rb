class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, limit: 255
      t.string :auth_key, limit: 32
      t.string :salt, limit: 32
      t.string :access_token, limit: 100
      t.string :password_hash, limit: 255
      t.string :password_reset_token, limit: 255
      t.string :email, limit: 255
      t.integer :role, limit: 2, default: 1
      t.integer :status, limit: 2, default: 1

      t.timestamps null: false
    end
  end
end
