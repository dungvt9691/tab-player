class StaticPagesController < ApplicationController
  before_action :set_page_object, except: [:home]
  before_action :set_tab

  def locale
    redirect_to "/#{I18n.locale}"
  end

  def home
    @page_object = Page.find_by(slug: '/')
  rescue => e
    ErrorNotification.send(e)
    render 'errors/server_error', status: 500
  end

  private

  def set_tab
    @tab = current_tab.nil? ? Tab.viewest.limit(1).first : current_tab
  end

  def set_page_object
    @page_object = Page.find_by(slug: "/#{params[:action]}")
    redirect_to "/#{I18n.locale}" if @page_object.nil?
  end
end
