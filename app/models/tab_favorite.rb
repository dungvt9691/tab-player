# == Schema Information
#
# Table name: tab_favorites
#
#  id         :integer          not null, primary key
#  tab_id     :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TabFavorite < ActiveRecord::Base
  # Validate
  validates :tab_id, uniqueness: { scope: :user_id }

  # Associations
  belongs_to :favorite_tab, foreign_key: 'tab_id', class_name: "Tab"
  belongs_to :user
end
