class AddColumnForUser < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string, limit: 255, after: :username
    add_column :users, :last_name, :string, limit: 255, after: :first_name
    add_column :users, :avatar, :string, limit: 255, after: :last_name
  end
end
