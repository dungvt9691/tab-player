# == Schema Information
#
# Table name: tabs
#
#  id                 :integer          not null, primary key
#  sid                :string(255)
#  title              :string(255)
#  sheet_updated_at   :datetime
#  sheet_file_size    :integer
#  sheet_content_type :string(255)
#  sheet_file_name    :string(255)
#  download_hash      :string(255)
#  download_link      :string(255)
#  adfly_url_id       :string(255)
#  user_id            :integer
#  songsterr_id       :integer
#  status             :integer          default(1)
#  cached_views       :integer          default(0)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

require 'test_helper'

class TabTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
