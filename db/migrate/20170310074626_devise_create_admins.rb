class DeviseCreateAdmins < ActiveRecord::Migration
  def change
    create_table :admins do |t|
      ## Database authenticatable
      t.string :email,              null: false
      t.string :username,           null: false
      t.string :encrypted_password, null: false

      # More information
      t.string :fullname
      t.string :phone
      t.string :address
      t.string :avatar
      t.boolean :updated_password, default: false
      t.datetime :last_update_password_at

      # Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip

      t.timestamps null: false
    end

    add_index :admins, :email, unique: true
    add_index :admins, :reset_password_token, unique: true
  end
end
