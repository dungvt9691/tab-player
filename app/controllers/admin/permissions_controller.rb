class Admin::PermissionsController < ApplicationController
  include I18nHelper

  before_action :authenticate_admin!
  before_action :check_admin_permissions!
  before_action :set_administrator
  before_action :set_permission, except: [:create]

  def create
    @errors = []

    ActiveRecord::Base.transaction do
      params[:permissions].each do |permission_id, actions|
        permission = Permission.find(permission_id)
        @administrator.permissions.delete(permission) if @administrator.permissions.include? permission
        @administrator.permissions << permission
        raise ActiveRecord::Rollback unless @administrator.save
        actions.each do |key, value|
          permission.send("allow_#{key}!", @administrator.id) if value == 'true'
        end
      end

      flash[:success] = t_scope(params, 'success', name: @administrator.username)
    end

    respond_to do |format|
      format.js
    end
  rescue => e
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end

  def update
    @errors = []
    @action_name = params[:action_name]
    @can_action  = params[:can_action] == 'true'
    @params = params

    @errors = t_scope(params, 'fail') unless @permission.update update_params

    respond_to do |format|
      format.js
    end
  rescue => e
    binding.pry
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end

  def destroy
    @errors = []
    if @permission.destroy
      flash[:success] = t_scope(params, 'success', name: @administrator.username)
    else
      @errors << t_scope(params, 'fail')
    end
  rescue => e
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end

  private

  def update_params
    params[:permission] = {}
    params[:permission]["can_#{params[:action_name]}".to_sym] = params[:can_action]
    params.require(:permission).permit(:can_read, :can_create, :can_update, :can_destroy)
  end

  def check_admin_permissions!
    admin_id      = current_admin.id
    access_denied = access_denied = !current_admin.permissions.find_by(name: 'administrators').update?(admin_id)

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

  def set_administrator
    @administrator = begin
                       Admin.find(params[:administrator_id])
                     rescue
                       nil
                     end

    @administrator = nil if Setting.app_email.eql? @administrator.email

    return if @administrator

    if request.xhr?
      @errors = []
      @errors << I18n.t('administrators.not_found')
    else
      flash[:error] = I18n.t('administrators.not_found')
      redirect_to admin_administrators_path
    end
  end

  def set_permission
    @permission = begin
                    @administrator.admin_permissions.find_by(permission_id: params[:id])
                  rescue
                    nil
                  end

    return if @permission

    if request.xhr?
      @errors = []
      @errors << I18n.t('permissions.not_found')
    else
      flash[:error] = I18n.t('permissions.not_found')
      redirect_to admin_permissions_path
    end
  end
end
