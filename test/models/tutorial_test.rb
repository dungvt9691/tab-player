# == Schema Information
#
# Table name: tutorials
#
#  id                      :integer          not null, primary key
#  link                    :string(255)
#  tab_id                  :integer
#  video_id                :string(255)
#  status                  :integer          default(1)
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  cached_votes_total      :integer          default(0)
#  cached_votes_score      :integer          default(0)
#  cached_votes_up         :integer          default(0)
#  cached_votes_down       :integer          default(0)
#  cached_weighted_score   :integer          default(0)
#  cached_weighted_total   :integer          default(0)
#  cached_weighted_average :float(24)        default(0.0)
#
# Indexes
#
#  index_tutorials_on_cached_votes_down        (cached_votes_down)
#  index_tutorials_on_cached_votes_score       (cached_votes_score)
#  index_tutorials_on_cached_votes_total       (cached_votes_total)
#  index_tutorials_on_cached_votes_up          (cached_votes_up)
#  index_tutorials_on_cached_weighted_average  (cached_weighted_average)
#  index_tutorials_on_cached_weighted_score    (cached_weighted_score)
#  index_tutorials_on_cached_weighted_total    (cached_weighted_total)
#

require 'test_helper'

class TutorialTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
