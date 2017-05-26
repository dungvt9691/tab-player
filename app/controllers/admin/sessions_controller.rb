class Admin::SessionsController < Devise::SessionsController
  layout 'admin_auth'

  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    yield resource if block_given?
    redirect_to admin_path
  rescue => e
    ErrorNotification.send(e)
    flash[:error] = "#{I18n.t('alert.system_error')}."
    redirect_to new_admin_session_path
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    yield if block_given?
    redirect_to new_admin_session_path
  rescue => e
    ErrorNotification.send(e)
    flash[:error] = "#{I18n.t('alert.system_error')}."
    redirect_to admin_path
  end
end
