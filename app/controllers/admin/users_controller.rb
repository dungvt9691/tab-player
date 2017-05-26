class Admin::UsersController < ApplicationController
  include I18nHelper
  include Admin::UsersHelper
  include Admin::ErrorsHelper

  before_action :authenticate_admin!
  before_action :check_admin_permissions!
  before_action :set_user, only: [:edit, :update, :destroy]
  before_action :set_page
  before_action :set_update_type, only: [:edit, :update]

  layout 'admin_dashboard'

  def index
    @count = User.count
    if params[:format] == 'json'
      page = 1
      page = params[:start].to_i / params[:length].to_i + 1 unless params[:start].to_i.zero?

      users = User.filter(params).page(page).per(params[:length].to_i)

      users_data = []
      users.each do |user|
        data = render_user_as_html(user)
        users_data << data
      end

      data = {
        'draw' => params[:draw].to_i,
        'recordsTotal' => users.count,
        'recordsFiltered' => users.total_count,
        'data' => users_data
      }

      render json: data
    end
  rescue => e
    ErrorNotification.send(e)
    render_error_or_redirect
  end

  def update
    @errors = []
    @errors = @user.errors.full_messages unless @user.update update_params
  rescue => e
    @errors = I18n.t('alert.system_error')
    ErrorNotification.send(e)
  end

  def destroy
    @errors = []
    @params = params
    unless @user.destroy
      @errors << t_scope(params, 'fail', name: @user.fullname)
    end
  rescue => e
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  def multi_destroy
    ActiveRecord::Base.transaction do
      @errors = []
      @params = params
      @destroyed_users = []
      params[:user_ids].split(',').each do |user_id|
        user = begin
                 User.find(user_id)
               rescue
                 nil
               end

        if user.nil?
          @errors << I18n.t('users.not_found')
          raise ActiveRecord::Rollback
        elsif user.destroy
          @destroyed_users << user
        else
          @errors << t_scope(params, 'fail', name: user.fullname)
          raise ActiveRecord::Rollback
        end
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  private

  def set_user
    @user = begin
      User.find(params[:id])
    rescue
      nil
    end

    return if @user

    if request.xhr?
      @errors = []
      @errors << I18n.t('users.not_found')
    else
      flash[:error] = I18n.t('users.not_found')
      redirect_to admin_users_path
    end
  end

  def set_page
    @page = 'users'
  end

  def set_update_type
    @modal = "modal-#{params[:type]}"
    @type = params[:type]
    @success_message = t_scope(params, "#{params[:type]}_success", name: @user.fullname)
  end

  def update_params
    params.require(:user).permit(:locked_at)
  end
end
