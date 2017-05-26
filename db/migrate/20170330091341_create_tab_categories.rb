class CreateTabCategories < ActiveRecord::Migration
  def change
    create_table :tab_categories do |t|
      t.integer :tab_id
      t.integer :category_id
      t.timestamps null: false
    end
  end
end
