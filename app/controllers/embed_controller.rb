class EmbedController < ApplicationController
  layout 'embed'

  def show
    @tab = Tab.find_by(sid: params[:sid])
    render 'errors/not_found', status: 404 if @tab.nil?
  end
end
