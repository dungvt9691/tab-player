class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :set_app_language
  before_action :setup_setting!
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_action  :store_current_location

  before_action :check_locked_user!

  helper_method :current_tab

  before_filter :allow_iframe_requests

  before_action :basic_auth!

  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
  end

  def current_tab
    Tab.find_by(sid: cookies[:current_upload_tab]) if cookies[:current_upload_tab]
  rescue
    nil
  end

  private

  def set_tab
    @tab = current_tab
  end

  def set_app_language
    if params[:language]
      I18n.locale        = params[:language]
      cookies[:language] = { value: params[:language], expires: 1.month.from_now }
    else
      I18n.locale = cookies[:language] || 'vi'
    end
  rescue => e
    render 'errors/server_error', status: 500
  end

  def store_current_location
    return unless request.get?
    if request.path != '/auth/facebook' &&
       request.path != '/auth/facebook/setup' &&
       request.path != '/auth/facebook/callback' &&
       !request.path.include?('/download/') &&
       request.path != '/auth/google_oauth2' &&
       request.path != '/auth/google_oauth2/setup' &&
       request.path != '/auth/google_oauth2/callback' &&
       request.path != '/auth' &&
       !request.xhr? # don't store ajax calls
      session[:previous_url] = request.fullpath
    end
  end

  def after_sign_in_path_for(_resource)
    session[:previous_url] || root_path
  end

  def setup_setting!
    redirect_to new_admin_setting_path if Setting.first.nil?
  end

  def check_locked_user!
    return unless user_signed_in?
    return unless current_user.locked?
    flash[:error] = I18n.t('users.locked', locked_at: I18n.l(current_user.locked_at, format: :only_date), app_name: Setting.app_name)
    sign_out current_user
    redirect_to root_path
  end

  def check_admin_permissions!
    admin_id      = current_admin.id
    permission    = params[:controller].split('/').last
    access_denied = begin
                      case params[:action]
                      when 'index'
                        !current_admin.permissions.find_by(name: permission).read?(admin_id)
                      when /new|create/
                        !current_admin.permissions.find_by(name: permission).create?(admin_id)
                      when /update|edit/
                        !current_admin.permissions.find_by(name: permission).update?(admin_id)
                      when /destroy|multi_destroy/
                        !current_admin.permissions.find_by(name: permission).destroy?(admin_id)
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
      render 'errors/forbidden', status: 403
    end
  end

  def basic_auth!
    if ENV['BASIC_AUTH_ENABLE']
      authenticate_or_request_with_http_basic do |username, password|
        username == ENV['BASIC_AUTH_USERNAME'] && password == ENV['BASIC_AUTH_PASSWORD']
      end
    end
  end

  protected

  def configure_permitted_parameters
    added_attrs = [:username, :email, :password, :remember_me]
    devise_parameter_sanitizer.permit :user_update, keys: added_attrs
  end
end
