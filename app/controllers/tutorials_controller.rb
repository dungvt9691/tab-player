class TutorialsController < ApplicationController
  include I18nHelper

  def create
    @errors = []

    @tab =  begin
      Tab.find(params[:t])
    rescue
      nil
    end

    @errors << I18n.t('tabs.not_found') if @tab.nil?

    if @errors.empty?
      @tutorial = @tab.tutorials.new tutorial_params
      @tutorial.status = 1

      if @tutorial.save
        flash[:success] = t_scope(params, 'success')
      else
        @errors = @tutorial.errors.messages
      end
    end
  rescue => e
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end

  private

  def tutorial_params
    params.require(:tutorial).permit(:link, :status)
  end
end
