class AddAdflyConfigToSettings < ActiveRecord::Migration
  def change
    add_column :settings, :adfly_secret_key, :string, after: :adfly_key
    add_column :settings, :adfly_group_id, :string, after: :adfly_secret_key
    add_column :settings, :adfly_endpoint, :string, after: :adfly_group_id
  end
end
