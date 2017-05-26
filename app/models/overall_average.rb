# == Schema Information
#
# Table name: overall_averages
#
#  id            :integer          not null, primary key
#  rateable_id   :integer
#  rateable_type :string(255)
#  overall_avg   :float(24)        not null
#  created_at    :datetime
#  updated_at    :datetime
#

class OverallAverage < ActiveRecord::Base
  belongs_to :rateable, :polymorphic => true
end

