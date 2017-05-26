# == Schema Information
#
# Table name: admin_permissions
#
#  id            :integer          not null, primary key
#  admin_id      :integer          not null
#  permission_id :integer          not null
#  can_read      :boolean          default("0")
#  can_create    :boolean          default("0")
#  can_update    :boolean          default("0")
#  can_destroy   :boolean          default("0")
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class AdminPermission < ActiveRecord::Base
  # Validations
  validates :permission_id, uniqueness: { scope: :admin_id }

  # Associations
  belongs_to :permission
  belongs_to :admin
end
