# == Schema Information
#
# Table name: rating_caches
#
#  id             :integer          not null, primary key
#  cacheable_id   :integer
#  cacheable_type :string(255)
#  avg            :float(24)        not null
#  qty            :integer          not null
#  dimension      :string(255)
#  created_at     :datetime
#  updated_at     :datetime
#
# Indexes
#
#  index_rating_caches_on_cacheable_id_and_cacheable_type  (cacheable_id,cacheable_type)
#

class RatingCache < ActiveRecord::Base
  belongs_to :cacheable, :polymorphic => true
end
