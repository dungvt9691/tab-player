# == Schema Information
#
# Table name: tab_artists
#
#  id         :integer          not null, primary key
#  tab_id     :integer
#  artist_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TabArtist < ActiveRecord::Base
  default_scope { order(created_at: :asc) }

  # Validates
  validates :artist_id, uniqueness: { scope: :tab_id }

  # Associations
  belongs_to :artist
  belongs_to :tab
end
