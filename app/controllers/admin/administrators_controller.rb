class Admin::AdministratorsController < ApplicationController
  include I18nHelper
  include Admin::AdministratorsHelper
  include Admin::ErrorsHelper

  before_action :authenticate_admin!
  before_action :check_admin_permissions!
  before_action :set_administrator, except: [:index, :new, :create, :multi_destroy]
  before_action :set_page

  layout 'admin_dashboard'

  def index
    @count = Admin.count
    if params[:format] == 'json'
      page = 1
      page = params[:start].to_i / params[:length].to_i + 1 unless params[:start].to_i.zero?

      admins = Admin.filter(params).page(page).per(params[:length].to_i)

      admins_data = []
      admins.each do |admin|
        data = render_admin_as_html(admin)
        admins_data << data
      end

      data = {
        'draw' => params[:draw].to_i,
        'recordsTotal' => admins.count,
        'recordsFiltered' => admins.total_count,
        'data' => admins_data
      }

      render json: data
    end
  rescue => e
    ErrorNotification.send(e)
    render_error_or_redirect
  end

  def new
    @administrator = Admin.new
  end

  def show; end

  def edit; end

  def create
    ActiveRecord::Base.transaction do
      @administrator = Admin.new administrator_params

      if @administrator.save
        flash[:success] = t_scope(params, 'success', name: @administrator.username)
        redirect_to edit_admin_administrator_path(id: @administrator.id)
      else
        render 'new'
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @administrator = Admin.new
    @administrator.errors.add(:system, :error)
    render 'new'
  end

  def destroy
    @errors = []
    @params = params
    unless @administrator.destroy
      @errors << t_scope(params, 'fail', name: @administrator.username)
    end
  rescue => e
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end

  def multi_destroy
    ActiveRecord::Base.transaction do
      @errors = []
      @params = params
      @destroyed_administrators = []
      params[:admin_ids].split(',').each do |admin_id|
        administrator = Admin.find_by('email != ? and id = ?', Setting.app_email, admin_id)
        if administrator.nil?
          @errors << I18n.t('administrators.not_found')
          raise ActiveRecord::Rollback
        else
          if administrator.destroy
            @destroyed_administrators << administrator
          else
            @errors << t_scope(params, 'fail', name: administrator.username)
            raise ActiveRecord::Rollback
          end
        end
      end
    end
  rescue => e
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end

  private

  def set_page
    @page = 'administrators'
  end

  def set_administrator
    @administrator = begin
                       Admin.find(params[:id])
                     rescue
                       nil
                     end

    @administrator = nil if Setting.app_email.eql?(@administrator.email) && params[:action] != 'show'

    return if @administrator

    if request.xhr?
      @errors = []
      @errors << I18n.t('administrators.not_found')
    else
      flash[:error] = I18n.t('administrators.not_found')
      redirect_to admin_administrators_path
    end
  end

  def administrator_params
    params.require(:admin).permit(
      :email,
      :username,
      :password,
      :password_confirmation,
      :fullname,
      :phone
    )
  end
end
