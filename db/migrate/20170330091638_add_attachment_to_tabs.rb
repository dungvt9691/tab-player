class AddAttachmentToTabs < ActiveRecord::Migration
  def change
    add_attachment :tabs, :sheet, after: :title
  end
end
