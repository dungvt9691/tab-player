class AddColumnAdflyUrlIdTabs < ActiveRecord::Migration
  def change
    remove_column :tabs, :pdf_download_link
    add_column :tabs, :adfly_url_id, :string, after: :download_link
  end
end
