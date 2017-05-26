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

require 'test_helper'

class TabFavoriteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
