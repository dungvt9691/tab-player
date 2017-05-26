class CreateTabs < ActiveRecord::Migration
  def change
    create_table :tabs do |t|
      t.string :sid
      t.string :title
      t.string :download_hash
      t.string :download_link
      t.string :pdf_download_link
      t.integer :user_id
      t.integer :status, default: 1
      t.timestamps null: false
    end
  end
end
