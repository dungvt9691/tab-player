class SearchController < ApplicationController
  before_action :set_tab

  def index
    @page  = params[:page].to_i.zero? ? 1 : params[:page].to_i
    if params[:q].blank?
      @tabs = Tab.viewest.page(1).per(50)
    else
      @tabs = Tab.search(params[:q]).per(50).page(@page).results
    end

    @count = @tabs.total_count
    respond_to do |format|
      format.html
      format.js
    end
  rescue => e
    @tabs = []
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end
end
