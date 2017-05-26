class AddCachedViewsToTabs < ActiveRecord::Migration
  def change
    add_column :tabs, :cached_views, :integer, default: 0, after: :status
  end
end
