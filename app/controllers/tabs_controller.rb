class TabsController < ApplicationController
  include I18nHelper

  before_action :set_tab, except: [:create, :index]

  before_action :authenticate_user!, only: [:create, :update]

  def index
    @type = params[:type]
    @tabs = Tab.send(params[:type].to_sym).limit(10) if params[:type]
    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    ActiveRecord::Base.transaction do
      @tab = current_user.tabs.new tab_params
      if @tab.save
        @tab.seo = Seo.create object_id: @tab.id, object_type: 'Tab'
        flash[:success] = t_scope(params, 'success')
        cookies[:current_upload_tab] = { value: @tab.sid, expires: 1.month.from_now }
        redirect_to tab_show_path(t: @tab.sid)
      else
        flash[:error] = @tab.errors.full_messages
        redirect_to session[:previous_url]
      end
    end
  rescue => e
    ErrorNotification.send(e)
    flash[:error] = I18n.t('alert.system_error')
    render 'errors/server_error', status: 500
  end

  def show
    if current_user.nil?
      impressionist(@tab, nil, unique: [:session_hash])
    else
      impressionist(@tab, nil, unique: [:user_id])
    end
    @tutorials = @tab.tutorials.most_liked
  rescue => e
    ErrorNotification.send(e)
    flash[:error] = I18n.t('alert.system_error')
    render 'errors/server_error', status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      @errors = []
      params[:tab][:artist_ids] = [] if params[:tab][:artist_ids].nil?
      params[:tab][:category_ids] = [] if params[:tab][:category_ids].nil?

      @errros << t_scope(params, 'permission_denied') unless @tab.uploader == current_user

      if @errors.empty?
        @tab.assign_attributes update_params

        @tab.uploader = current_user

        @tab.artists = params[:tab][:artist_ids].map do |id|
          begin
            Artist.find(id)
          rescue
            Artist.create(name: id) unless id.blank?
          end
        end.compact

        @tab.categories = params[:tab][:category_ids].map do |id|
          begin
            Category.find(id)
          rescue
            nil
          end
        end.compact


        if @tab.save
          flash[:success] = t_scope(params, 'success')
        else
          @errors = @tab.errors.messages
        end

      end
    end
  rescue => e
    @errors = [ I18n.t('alert.system_error') ]
    ErrorNotification.send(e)
  end

  private

  def set_tab
    @tab = Tab.find_by(sid: params[:t]) if params[:t]
    render 'errors/not_found', status: 404 if @tab.nil?
  end

  def tab_params
    params.require(:tab).permit(:sheet)
  end

  def update_params
    params.require(:tab).permit(:title)
  end
end
