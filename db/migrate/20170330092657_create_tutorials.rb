class CreateTutorials < ActiveRecord::Migration
  def change
    create_table :tutorials do |t|
      t.string :link
      t.integer :tab_id
      t.string :video_id
      t.integer :status, default: 1
      t.timestamps null: false
    end
  end
end
