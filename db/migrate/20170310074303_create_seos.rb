class CreateSeos < ActiveRecord::Migration
  def change
    create_table :seos do |t|
      t.integer :object_id, null: false
      t.string :object_type, null: false
      t.string :featured_image

      t.timestamps null: false
    end

    reversible do |dir|
      dir.up do
        Seo.create_translation_table! title: :string, keywords: :text, description: :text
      end

      dir.down do
        Seo.drop_translation_table!
      end
    end
  end
end
