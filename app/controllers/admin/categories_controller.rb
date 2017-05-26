class Admin::CategoriesController < ApplicationController
  include I18nHelper
  include Admin::CategoriesHelper
  include Admin::ErrorsHelper

  before_action :authenticate_admin!
  before_action :check_admin_permissions!
  before_action :set_category, only: [:edit, :update, :destroy]
  before_action :set_page

  layout 'admin_dashboard'

  def index
    @count = Category.count
    if params[:format] == 'json'
      page = 1
      page = params[:start].to_i / params[:length].to_i + 1 unless params[:start].to_i.zero?

      categories = Category.filter(params).page(page).per(params[:length].to_i)

      categories_data = []
      categories.each do |category|
        data = render_category_as_html(category)
        categories_data << data
      end

      data = {
        'draw' => params[:draw].to_i,
        'recordsTotal' => categories.count,
        'recordsFiltered' => categories.total_count,
        'data' => categories_data
      }

      render json: data
    end
  rescue => e
    ErrorNotification.send(e)
    render_error_or_redirect
  end

  def new
    @category = Category.new
  end

  def create
    ActiveRecord::Base.transaction do
      @category = Category.new categories_params
      if @category.save
        flash[:success] = t_scope(params, 'success', name: @category.name)
        redirect_to edit_admin_category_path(id: @category.id)
      else
        render 'new'
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @category = Admin.new
    @category.errors.add(:system, :error)
    render 'new'
  end

  def update
    ActiveRecord::Base.transaction do
      if @category.update categories_params
        flash[:success] = t_scope(params, 'success', name: @category.name)
        redirect_to edit_admin_category_path(id: @category.id)
      else
        render 'edit'
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @category.errors.add(:system, :error)
    render 'edit'
  end

  def destroy
    @errors = []
    @params = params
    unless @category.destroy
      @errors << t_scope(params, 'fail', name: @category.name)
    end
  rescue => e
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  def multi_destroy
    ActiveRecord::Base.transaction do
      @errors = []
      @params = params
      @destroyed_categories = []
      params[:category_ids].split(',').each do |categories_id|
        categories = begin
                      Category.find(categories_id)
                    rescue
                      nil
                    end

        if categories.nil?
          @errors << I18n.t('categories.not_found')
          raise ActiveRecord::Rollback
        elsif categories.destroy
          @destroyed_categories << categories
        else
          @errors << t_scope(params, 'fail', name: categories.name)
          raise ActiveRecord::Rollback
        end
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  private

  def check_admin_permissions!
    admin_id      = current_admin.id
    permission    = 'tabs'
    access_denied = begin
                      create_post = current_admin.permissions.find_by(name: permission).create?(admin_id)
                      update_post = current_admin.permissions.find_by(name: permission).update?(admin_id)
                      !create_post || !update_post
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

  def set_category
    @category = begin
              Category.find(params[:id])
            rescue
              nil
            end
    return if @category

    flash[:error] = I18n.t('categories.not_found')
    redirect_to admin_categories_path
  end

  def set_page
    @page = 'categories'
  end

  def categories_params
    params.require(:category).permit(:name)
  end
end
