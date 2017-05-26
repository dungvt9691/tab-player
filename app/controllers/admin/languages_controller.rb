class Admin::LanguagesController < ApplicationController
  before_action :authenticate_admin!

  def update
    if params[:language]
      I18n.locale        = params[:language]
      cookies[:language] = { value: params[:language], expires: 1.month.from_now }
    else
      I18n.locale = cookies[:language] || 'vi'
    end
  rescue
    flash[:error] = I18n.t('alert.system_error')
  end
end
