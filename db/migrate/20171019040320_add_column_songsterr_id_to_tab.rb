class AddColumnSongsterrIdToTab < ActiveRecord::Migration
  def change
    add_column :tabs, :songsterr_id, :integer, after: :user_id
  end
end
