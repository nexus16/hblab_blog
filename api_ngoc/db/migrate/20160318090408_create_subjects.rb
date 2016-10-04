class CreateSubjects < ActiveRecord::Migration
  def change
    create_table :subjects do |t|
      t.string :title, limit: 255, null: false
      t.integer :position
      t.integer :subject_id, null: true
      t.integer :project_id, null: true
      t.integer :created_by
      t.integer :updated_by

      t.timestamps null: false
    end
  end
end
