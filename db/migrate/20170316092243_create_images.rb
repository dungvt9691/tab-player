class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :admin_id, null: false
      t.timestamps null: false
    end
  end
end
