class Admin::PagesController < ApplicationController
  include I18nHelper
  include Admin::PagesHelper
  include Admin::ErrorsHelper

  before_action :authenticate_admin!
  before_action :check_admin_permissions!
  before_action :set_page_object, only: [:edit, :update, :destroy]
  before_action :set_page

  layout 'admin_dashboard'

  def index
    @count = Page.with_translations(I18n.locale).count
    if params[:format] == 'json'
      page = 1
      page = params[:start].to_i / params[:length].to_i + 1 unless params[:start].to_i.zero?

      pages = Page.filter(params).page(page).per(params[:length].to_i)

      pages_data = []
      pages.each do |page_object|
        data = render_page_as_html(page_object)
        pages_data << data
      end

      data = {
        'draw' => params[:draw].to_i,
        'recordsTotal' => pages.count,
        'recordsFiltered' => pages.total_count,
        'data' => pages_data
      }

      render json: data
    end
  rescue => e
    ErrorNotification.send(e)
    render_error_or_redirect
  end

  def update
    ActiveRecord::Base.transaction do
      if @page_object.update page_params
        raise ActiveRecord::Rollback unless @page_object.seo.update seo_params
        flash[:success] = t_scope(params, 'success', title: @page_object.title)
        redirect_to edit_admin_page_path(@page_object)
      else
        render 'edit'
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @page.errors.add(:system, :error)
    render 'edit'
  end

  private

  def set_page_object
    @page_object = begin
              Page.find(params[:id])
            rescue
              nil
            end
    return if @page_object

    flash[:error] = I18n.t('pages.not_found')
    redirect_to admin_pages_path
  end

  def set_page
    @page = 'pages'
  end

  def page_params
    params.require(:page).permit(:content)
  end

  def seo_params
    params.require(:page).permit(:seo_description, :seo_keywords, :seo_title, :featured_image)
  end
end
