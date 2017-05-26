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
#  pdf_download_link  :string(255)
#  user_id            :integer
#  status             :integer          default("1")
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  cached_views       :integer          default("0")
#

require 'test_helper'

class TabTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
