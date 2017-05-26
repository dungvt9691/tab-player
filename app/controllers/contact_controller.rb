class ContactController < ApplicationController
  before_action :set_tab, only: [:index]

  def create
    @contact = Contact.new contact_params
    @params  = params
    @errors  = []

    unless @contact.save
      @errors = @contact.errors.messages
    end

    respond_to do |format|
      format.js
    end
  rescue => e
    ErrorNotification.send(e)
    render 'errors/server_error', status: 500
  end

  private

  def contact_params
    params[:contact].each do |key, value|
      params[:contact][key] = value.blank? ? nil : value
    end
    params.require(:contact).permit(:fullname, :email, :content)
  end
end
