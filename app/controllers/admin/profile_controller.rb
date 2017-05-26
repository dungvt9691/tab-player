class Admin::ProfileController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_admin
  layout 'admin_dashboard'

  def update
    @update_type = params[:update_type]
    @params = params
    @errors = []
    unless @admin.update profile_params
      @errors = @admin.errors.full_messages
    end
    if @update_type =='password'
      bypass_sign_in @admin
    end
  rescue => e
    ErrorNotification.send(e)
    @errors = ["#{I18n.t('alert.system_error')}."]
  end

  private

  def set_admin
    @admin = current_admin
  end

  def profile_params
    if params[:update_type] == 'password'
      params[:admin][:updated_password] = true
      params[:admin][:last_update_password_at] = Time.zone.now
    end
    params.require(:admin).permit(:fullname, :phone, :password, :password_confirmation, :avatar, :last_update_password_at, :updated_password)
  end
end
