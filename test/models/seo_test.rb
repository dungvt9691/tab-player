# == Schema Information
#
# Table name: seos
#
#  id             :integer          not null, primary key
#  object_id      :integer          not null
#  object_type    :string(255)      not null
#  featured_image :string(255)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class SeoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
