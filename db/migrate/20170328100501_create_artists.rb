class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name
      t.string :name_alias
      t.string :birthname
      t.integer :zing_mp3_id
      t.timestamps null: false
    end
  end
end
