class CreateTabFavorites < ActiveRecord::Migration
  def change
    create_table :tab_favorites do |t|
      t.integer :tab_id
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
