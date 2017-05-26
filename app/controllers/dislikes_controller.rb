class DislikesController < ApplicationController
  include I18nHelper

  before_action :authenticate_user!
  before_action :set_tutorial

  def create
    if @errors.empty?
      unless @tutorial.disliked_by current_user
        @errors << t_scope(params, 'fail')
      end
    end
  rescue => e
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end

  def destroy
    if @errors.empty?
      unless @tutorial.undisliked_by current_user
        @errors << t_scope(params, 'fail')
      end
    end
  rescue => e
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end

  private

  def set_tutorial
    @tutorial = Tutorial.find(params[:id])
    @errors = []
    @errors << I18n.t('tutorials.not_found') if @tutorial.nil?
  end
end
