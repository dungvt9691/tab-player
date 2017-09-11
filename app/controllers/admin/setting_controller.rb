class Admin::SettingController < ApplicationController
  include I18nHelper

  layout :set_layout

  skip_before_action :setup_setting!, only: [:new, :create]
  before_action :authenticate_admin!, except: [:new, :create]
  before_action :check_admin_permissions!, except: [:new, :create]
  before_action :set_page, except: [:new, :create]
  before_action :set_setting, except: [:new, :create]

  def new
    redirect_to admin_path if Setting.first
    @setting = Setting.new
  end

  def create
    redirect_to admin_path if Setting.first
    @setting = Setting.new setting_params
    ActiveRecord::Base.transaction do
      if @setting.save
        I18n.locale = :en
        @setting.seo = Seo.create object_id: @setting.id, object_type: 'Setting'
        I18n.locale = :vi
        @setting.seo = Seo.create object_id: @setting.id, object_type: 'Setting'
        @admin = Admin.new admin_params
        if @admin.save
          Permission.all.each do |permission|
            @admin.permissions << permission
            @admin.save
            permission.allow_read!(@admin.id)
            permission.allow_create!(@admin.id)
            permission.allow_update!(@admin.id)
            permission.allow_destroy!(@admin.id)
          end
        end
        flash[:success] = t_scope(params, 'success')
        sign_in @admin
        redirect_to admin_path
      else
        render 'new'
      end
    end
  rescue => e
    ErrorNotification.send(e)
    flash[:error] = "#{I18n.t('alert.system_error')}."
    redirect_to new_admin_setting_path
  end

  def update
    @current_tab = params[:update_type]
    if @current_tab == 'seo'
      if @setting.seo.update seo_params
        flash[:success] = t_scope(params, 'success')
        redirect_to params[:redirect_path]
      else
        render params[:update_type]
      end
    elsif @setting.update update_params
      flash[:success] = t_scope(params, 'success')
      redirect_to params[:redirect_path]
    else
      render params[:update_type]
    end
  rescue => e
    ErrorNotification.send(e)
    flash[:error] = @errors = I18n.t('alert.system_error')
    redirect_to admin_path
  end

  private

  def setting_params
    params.require(:setting).permit(:app_name, :app_url, :app_email, :admin_username, :admin_password)
  end

  def admin_params
    params[:admin] = {
      email: params[:setting][:app_email],
      username: params[:setting][:admin_username],
      password: params[:setting][:admin_password]
    }
    params.require(:admin).permit(:username, :email, :password)
  end

  def update_params
    params[:setting].each do |key, value|
      params[:setting][key] = nil if value.blank?
    end

    params.require(:setting).permit(
      :app_name,
      :app_url,
      :app_email,
      :app_address,
      :app_phone,
      :app_fax,
      :app_hotline,
      :facebook_fanpage,
      :facebook_app_id,
      :facebook_app_secret,
      :google_api_key,
      :google_app_id,
      :google_app_secret,
      :google_analytics_id,
      :youtube_endpoint,
      :youtube_thumbnail,
      :youtube_api_key,
      :adfly_uid,
      :adfly_key,
      :adfly_secret_key,
      :adfly_group_id,
      :adfly_endpoint,
      :smtp_sender,
      :smtp_address,
      :smtp_port,
      :smtp_username,
      :smtp_password,
      :smtp_authentication,
      :smtp_enable_starttls_auto,
      :recaptcha_publickey,
      :recaptcha_privatekey
    )
  end

  def seo_params
    params[:setting].each do |key, value|
      params[:setting][key] = nil if value.blank?
    end

    params.require(:setting).permit(:keywords, :description, :featured_image)
  end

  def set_setting
    @setting = Setting.first
  end

  def set_page
    @page = 'setting'
    @current_tab = params[:action]
  end

  def check_admin_permissions!
    admin_id      = current_admin.id
    access_denied = begin
      case params[:action]
      when 'update'
        !current_admin.permissions.find_by(name: 'setting').update?(admin_id)
      else
        !current_admin.permissions.find_by(name: 'setting').read?(admin_id)
      end
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

  def set_layout
    return 'admin_auth' if %w(new create).include? params[:action]
    return 'admin_dashboard'
  end
end
