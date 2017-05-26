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

class Seo < ActiveRecord::Base
  translates :title, :keywords, :description

  belongs_to :object, polymorphic: true

  alias_attribute :seo_title, :title
  alias_attribute :seo_keywords, :keywords
  alias_attribute :seo_description, :description
end
