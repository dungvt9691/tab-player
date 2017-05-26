class Admin::PasswordsController < Devise::PasswordsController
  layout 'admin_auth'
  def create
    super
  rescue => e
    ErrorNotification.send(e)
    flash[:error] = "#{I18n.t('alert.system_error')}."
    redirect_to new_admin_password_path
  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      resource.updated_password = true
      resource.last_update_password_at = Time.zone.now
      resource.save
      if Devise.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message!(:notice, flash_message)
        sign_in(resource_name, resource)
      else
        set_flash_message!(:notice, :updated_not_active)
      end
      respond_with resource, location: admin_path
    else
      set_minimum_password_length
      respond_with resource
    end
  rescue => e
    ErrorNotification.send(e)
    flash[:error] = "#{I18n.t('alert.system_error')}."
    redirect_to new_admin_password_path
  end
end
