class CreateAdminPermissions < ActiveRecord::Migration
  def change
    create_table :admin_permissions do |t|
      t.integer :admin_id, null: false
      t.integer :permission_id, null: false
      t.boolean :can_read, default: false
      t.boolean :can_create, default: false
      t.boolean :can_update, default: false
      t.boolean :can_destroy, default: false

      t.timestamps null: false
    end
  end
end
