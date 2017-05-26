# == Schema Information
#
# Table name: tab_categories
#
#  id          :integer          not null, primary key
#  tab_id      :integer
#  category_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class TabCategory < ActiveRecord::Base
  # Validate
  validates :category_id, uniqueness: { scope: :tab_id }

  # Associations
  belongs_to :tab
  belongs_to :category
end
