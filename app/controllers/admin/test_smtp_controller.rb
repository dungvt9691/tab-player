class Admin::TestSmtpController < ApplicationController
  include I18nHelper

  before_action :authenticate_admin!
  before_action :check_admin_permissions!
  layout 'admin_dashboard'

  def new
    @email = params[:email]
    @error = nil
    @error = t_scope(params, 'email_invalid') unless EmailValidator.valid?(@email)
    respond_to do |format|
      format.js
    end
  end

  def create
    @email  = params[:email]
    @errors = []

    Admin::TestSmtpMailer.test(@email).deliver_now

    respond_to do |format|
      format.js
    end
  rescue => e
    @errors << e.message.delete('"').delete("\n")
    respond_to do |format|
      format.js
    end
  end

  private

  def check_admin_permissions!
    admin_id      = current_admin.id
    access_denied = begin
      can_update = current_admin.permissions.find_by(name: 'setting').update?(admin_id)
      can_read = current_admin.permissions.find_by(name: 'setting').read?(admin_id)
      !can_read || !can_update
    rescue
      true
    end

    return unless access_denied
    if request.xhr?
      @errors = [I18n.t('permissions.access_denied')]
      respond_to do |format|
        format.js
      end
    else
      flash[:error] = I18n.t('permissions.access_denied')
      redirect_to admin_path
    end
  end
end
