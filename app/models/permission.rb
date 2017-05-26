# == Schema Information
#
# Table name: permissions
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Permission < ActiveRecord::Base
  # Validations
  validates :name, presence: true

  # Associations
  has_many :admin_permissions, dependent: :destroy
  has_many :admins, through: :admin_permissions, source: :admin

  def self.filter(admin)
    if admin.permissions.empty?
      self.all
    else
      self.where("id not in (#{admin.permissions.map{ |x| x.id }.join(', ')})")
    end
  end

  def read?(admin_id)
    admin_permissions.find_by(admin_id: admin_id).can_read
  rescue
    false
  end

  def allow_read!(admin_id)
    admin_permissions.find_by(admin_id: admin_id).update can_read: true
  end

  def disable_read!(admin_id)
    admin_permissions.find_by(admin_id: admin_id).update can_read: false
  end

  def create?(admin_id)
    admin_permissions.find_by(admin_id: admin_id).can_create
  rescue
    false
  end

  def disable_create!(admin_id)
    admin_permissions.find_by(admin_id: admin_id).update can_create: false
  end

  def allow_create!(admin_id)
    admin_permissions.find_by(admin_id: admin_id).update can_create: true
  end

  def update?(admin_id)
    admin_permissions.find_by(admin_id: admin_id).can_update
  rescue
    false
  end

  def disable_update!(admin_id)
    admin_permissions.find_by(admin_id: admin_id).update can_update: false
  end

  def allow_update!(admin_id)
    admin_permissions.find_by(admin_id: admin_id).update can_update: true
  end

  def destroy?(admin_id)
    admin_permissions.find_by(admin_id: admin_id).can_destroy
  rescue
    false
  end

  def allow_destroy!(admin_id)
    admin_permissions.find_by(admin_id: admin_id).update can_destroy: true
  end

  def disable_destroy!(admin_id)
    admin_permissions.find_by(admin_id: admin_id).update can_destroy: false
  end
end
