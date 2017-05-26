class Users::OmniauthCallbacksController < ApplicationController
  def setup
    if params[:provider] == 'facebook'
      request.env['omniauth.strategy'].options[:client_id] = Setting.facebook_app_id
      request.env['omniauth.strategy'].options[:client_secret] = Setting.facebook_app_secret
    else
      request.env['omniauth.strategy'].options[:client_id] = Setting.google_app_id
      request.env['omniauth.strategy'].options[:client_secret] = Setting.google_app_secret
      request.env['omniauth.strategy'].options = { access_type: 'offline', approval_prompt: '' }
    end
    render text: 'Setup complete.', status: 404
  rescue
    render 'errors/server_error', status: 500
  end

  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.find_for_facebook_oauth(request.env['omniauth.auth'])
    if @user
      @user.remember_me = true
      @user.remember_me!
      sign_in @user
      redirect_path = session[:previous_url] || root_path
      redirect_to redirect_path
    else
      session['devise.facebook_data'] = request.env['omniauth.auth']
      redirect_to new_user_registration_url
    end
  rescue => e
    ErrorNotification.send(e)
    render 'errors/server_error', status: 500
  end

  def google_oauth2
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.find_for_google_oauth2(request.env['omniauth.auth'])
    if @user
      @user.remember_me = true
      @user.remember_me!
      sign_in @user
      redirect_path = session[:previous_url] || root_path
      redirect_to redirect_path
    else
      session['devise.google_data'] = request.env['omniauth.auth']
      redirect_to new_user_registration_url
    end
  rescue => e
    ErrorNotification.send(e)
    render 'errors/server_error', status: 500
  end

  protected

  def after_omniauth_failure_path_for(scope)
    render 'errors/server_error', status: 500
  end
end
