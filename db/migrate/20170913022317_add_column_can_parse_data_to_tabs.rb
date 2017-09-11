class AddColumnCanParseDataToTabs < ActiveRecord::Migration
  def change
    add_column :tabs, :can_parse_data, :boolean, default: false, after: :status
  end
end
