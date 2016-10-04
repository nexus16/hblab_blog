class CreateProjectMembers < ActiveRecord::Migration
  def change
    create_table :project_members do |t|
      t.integer :user_id, null: false
      t.integer :project_id, null: false
      t.boolean :status, default: 1
      t.boolean :leader, default: 0

      t.timestamps null: false
    end
  end
end
