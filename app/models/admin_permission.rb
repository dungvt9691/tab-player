# == Schema Information
#
# Table name: admin_permissions
#
#  id            :integer          not null, primary key
#  admin_id      :integer          not null
#  permission_id :integer          not null
#  can_read      :boolean          default(FALSE)
#  can_create    :boolean          default(FALSE)
#  can_update    :boolean          default(FALSE)
#  can_destroy   :boolean          default(FALSE)
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
