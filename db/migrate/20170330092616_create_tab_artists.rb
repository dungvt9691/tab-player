class CreateTabArtists < ActiveRecord::Migration
  def change
    create_table :tab_artists do |t|
      t.integer :tab_id
      t.integer :artist_id
      t.timestamps null: false
    end
  end
end
