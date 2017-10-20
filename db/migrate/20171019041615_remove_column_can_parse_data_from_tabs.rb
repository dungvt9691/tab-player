class RemoveColumnCanParseDataFromTabs < ActiveRecord::Migration
  def change
    remove_column :tabs, :can_parse_data
  end
end
