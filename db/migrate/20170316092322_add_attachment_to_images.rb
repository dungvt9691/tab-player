class AddAttachmentToImages < ActiveRecord::Migration
  def change
    add_attachment :images, :attachment
  end
end