class AddAttachmentToArtists < ActiveRecord::Migration
  def change
    add_attachment :artists, :avatar, after: :birthname
    add_attachment :artists, :cover, after: :avatar_file_name
  end
end
