class AddAvatarToUsers < ActiveRecord::Migration
  def change
    add_attachment :users, :avatar, after: :fullname
  end
end
