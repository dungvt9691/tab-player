class Admin::TabsController < ApplicationController
  include I18nHelper
  include Admin::TabsHelper
  include Admin::ErrorsHelper

  before_action :authenticate_admin!
  before_action :check_admin_permissions!
  before_action :set_tab, only: [:edit, :update, :destroy]
  before_action :set_page

  layout 'admin_dashboard'

  def index
    @unpublish_tabs_count = Tab.unpublish.count
    @published_tabs_count = Tab.published.count
    @count = @unpublish_tabs_count + @published_tabs_count
    if params[:format] == 'json'
      page = 1
      page = params[:start].to_i / params[:length].to_i + 1 unless params[:start].to_i.zero?

      tabs = Tab.filter(params).page(page).per(params[:length].to_i)
      tabs_data = []
      tabs.each do |tab|
        data = render_tab_as_html(tab)
        tabs_data << data
      end

      data = {
        'draw' => params[:draw].to_i,
        'recordsTotal' => tabs.count,
        'recordsFiltered' => tabs.total_count,
        'data' => tabs_data
      }

      render json: data
    end
  rescue => e
    ErrorNotification.send(e)
    render_error_or_redirect
  end

  def new
    @prev_tab = begin
                  Tab.find(params[:prev_tab])
                rescue
                  nil
                end
    @tab = Tab.new
    if @prev_tab
      @tab.artists = @prev_tab.artists
      @tab.categories = @prev_tab.categories
      @tab.status = @prev_tab.status
    end
  end

  def create
    ActiveRecord::Base.transaction do
      @tab = Tab.new tab_params

      params[:tab][:artist_ids] = [] if params[:tab][:artist_ids].blank?
      params[:tab][:category_ids] = [] if params[:tab][:category_ids].blank?

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
        @tab.seo = Seo.create seo_params.merge(object_id: @tab.id, object_type: 'Tab')
        @tab.set_download_link

        flash[:success] = t_scope(params, 'success', title: @tab.title)
        if params[:commit] == t('tabs.upload_and_next')
          redirect_to new_admin_tab_path(prev_tab: @tab.id)
        else
          redirect_to edit_admin_tab_path(id: @tab.id)
        end
      else
        render 'new'
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @tab = Tab.new
    @tab.errors.add(:system, :error)
    render 'new'
  end

  def update
    ActiveRecord::Base.transaction do
      if @tab.update update_params
        raise ActiveRecord::Rollback unless @tab.seo.update seo_params

        params[:tab][:artist_ids] = [] if params[:tab][:artist_ids].nil?
        params[:tab][:category_ids] = [] if params[:tab][:category_ids].nil?

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
        
        @tab.save

        flash[:success] = t_scope(params, 'success', title: @tab.title)
        redirect_to edit_admin_tab_path(id: @tab.id)
      else
        render 'edit'
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @tab.errors.add(:system, :error)
    render 'edit'
  end

  def destroy
    @errors = []
    @params = params
    unless @tab.destroy
      @errors << t_scope(params, 'fail', name: @tab.name)
    end
  rescue
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  def multi_destroy
    ActiveRecord::Base.transaction do
      @errors = []
      @params = params
      @destroyed_tabs = []
      params[:tab_ids].split(',').each do |tab_id|
        tab = begin
                Tab.find(tab_id)
              rescue
                nil
              end

        if tab.nil?
          @errors << I18n.t('tabs.not_found')
          raise ActiveRecord::Rollback
        elsif tab.destroy
          @destroyed_tabs << tab
        else
          @errors << t_scope(params, 'fail', name: tab.name)
          raise ActiveRecord::Rollback
        end
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  private

  def set_tab
    @tab = begin
             Tab.find(params[:id])
           rescue
             nil
           end
    return if @tab

    flash[:error] = I18n.t('tabs.not_found')
    redirect_to admin_tabs_path
  end

  def set_page
    @page = 'tabs'
  end

  def tab_params
    params[:tab][:status] = params[:tab][:status] == "true" ? 2 : 1
    params.require(:tab).permit(:title, :status, :sheet)
  end

  def update_params
    params[:tab][:status] = params[:tab][:status] == "true" ? 2 : 1
    params.require(:tab).permit(:title, :status)
  end

  def seo_params
    params.require(:tab).permit(:seo_description, :seo_keywords, :seo_title)
  end
end
