class Admin::MultiUploadTabsController < ApplicationController
  before_action :authenticate_admin!
  before_action :check_admin_permissions!
  before_action :set_page

  layout 'admin_dashboard'

  def create
    ActiveRecord::Base.transaction do
      @tab = Tab.new tab_params

      @tab.categories = params[:tab][:category_ids].map do |id|
        begin
          Category.find(id)
        rescue
          nil
        end
      end.compact

      if @tab.save
        @tab.seo = Seo.create object_id: @tab.id, object_type: 'Tab'
        data = {
          id: @tab.id,
          title: @tab.title,
        }
      else
        data = {
          title: params[:tab][:sheet].original_filename,
          errors: @tab.errors.full_messages
        }
      end

      render json: data
    end
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    ErrorNotification.send(e)
  end

  private

  def tab_params
    params[:tab][:status] = 2
    params.require(:tab).permit(:sheet, :status)
  end

  def set_page
    @page = 'tabs'
  end

  def check_admin_permissions!
    admin_id      = current_admin.id
    access_denied = !current_admin.permissions.find_by(name: 'tabs').create?(admin_id)

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
end
