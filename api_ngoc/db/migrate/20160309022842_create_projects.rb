class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name, limit: 255, null: false
      t.text :description
      t.boolean :status, default: 1
      t.string :logo, limit: 255
      t.datetime :start_at
      t.datetime :end_at
      t.integer :created_by, null: false
      t.integer :updated_by

      t.timestamps null: false
    end
  end
end
