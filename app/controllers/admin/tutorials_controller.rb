class Admin::TutorialsController < ApplicationController
  include I18nHelper
  include Admin::TutorialsHelper
  include Admin::ErrorsHelper

  before_action :authenticate_admin!
  before_action :check_admin_permissions!
  before_action :set_tutorial, only: [:edit, :update, :destroy]
  before_action :set_page
  before_action :set_update_type, only: [:edit, :update]

  layout 'admin_dashboard'

  def index
    @count = Tutorial.count
    if params[:format] == 'json'
      page = 1
      page = params[:start].to_i / params[:length].to_i + 1 unless params[:start].to_i.zero?

      tutorials = Tutorial.filter(params).page(page).per(params[:length].to_i)

      tutorials_data = []
      tutorials.each do |tutorial|
        data = render_tutorial_as_html(tutorial)
        tutorials_data << data
      end

      data = {
        'draw' => params[:draw].to_i,
        'recordsTotal' => tutorials.count,
        'recordsFiltered' => tutorials.total_count,
        'data' => tutorials_data
      }

      render json: data
    end
  rescue => e
    ErrorNotification.send(e)
    render_error_or_redirect
  end

  def update
    @errors = []
    unless @tutorial.update tutorial_params
      @errors = @type == 'update' ? @tutorial.errors.messages : @tutorial.errors.full_messages
    end
  rescue => e
    @errors = I18n.t('alert.system_error')
    ErrorNotification.send(e)
  end

  def destroy
    @errors = []
    @params = params
    unless @tutorial.destroy
      @errors << t_scope(params, 'fail', title: @tutorial.tab.title)
    end
  rescue
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  def multi_destroy
    ActiveRecord::Base.transaction do
      @errors = []
      @params = params
      @destroyed_tutorials = []
      params[:tutorial_ids].split(',').each do |tutorial_id|
        tutorial = begin
                   Tutorial.find(tutorial_id)
                 rescue
                   nil
                 end

        if tutorial.nil?
          @errors << I18n.t('tutorials.not_found')
          raise ActiveRecord::Rollback
        elsif tutorial.destroy
          @destroyed_tutorials << tutorial
        else
          @errors << t_scope(params, 'fail', title: tutorial.tab.title)
          raise ActiveRecord::Rollback
        end
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  private

  def set_tutorial
    @tutorial = begin
                Tutorial.find(params[:id])
              rescue
                nil
              end
    return if @tutorial

    flash[:error] = I18n.t('tutorials.not_found')
    redirect_to admin_tutorial_index_path
  end

  def set_page
    @page = 'tutorials'
  end

  def set_update_type
    @modal = "modal-#{params[:type]}"
    @type = params[:type]
    @success_message = t_scope(params, "#{params[:type]}_success", title: @tutorial.tab.title)
  end

  def tutorial_params
    params[:tutorial][:status] = params[:tutorial][:status].to_i unless params[:tutorial][:status].nil?
    params.require(:tutorial).permit(:link, :status)
  end
end
