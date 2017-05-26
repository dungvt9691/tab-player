class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :slug
      t.boolean :edit_content, default: false
      t.timestamps null: false
    end

    reversible do |dir|
      dir.up do
        Page.create_translation_table! title: :string, content: :text
      end

      dir.down do
        Page.drop_translation_table!
      end
    end
  end
end
