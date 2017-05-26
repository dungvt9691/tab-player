# == Schema Information
#
# Table name: artists
#
#  id                  :integer          not null, primary key
#  name                :string(255)
#  name_alias          :string(255)
#  birthname           :string(255)
#  avatar_updated_at   :datetime
#  avatar_file_size    :integer
#  avatar_content_type :string(255)
#  avatar_file_name    :string(255)
#  cover_updated_at    :datetime
#  cover_file_size     :integer
#  cover_content_type  :string(255)
#  cover_file_name     :string(255)
#  zing_mp3_id         :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'test_helper'

class ArtistTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
