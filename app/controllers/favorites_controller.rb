class FavoritesController < ApplicationController
  include I18nHelper

  before_action :authenticate_user!
  before_action :set_tab_favorite, only: [:create, :destroy]
  before_action :set_tab, only: [:index]

  def index
    @tabs = current_user.favorite_tabs.page(params[:page]).per(50)
    @count = @tabs.total_count
  end

  def create
    if @errors.empty?
      tab_favorite = current_user.tab_favorites.new tab_id: @tab.id
      unless tab_favorite.save
        @errors = tab_favorite.errors.full_messages
      end
    end
  rescue => e
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end

  def destroy
    if @errors.empty?
      tab_favorite = current_user.tab_favorites.find_by(tab_id: @tab.id)
      unless tab_favorite.destroy
        @errors = tab_favorite.errors.full_messages
      end
    end
  rescue => e
    @errors = [I18n.t('alert.system_error')]
    ErrorNotification.send(e)
  end

  private

  def set_tab_favorite
    @params = params
    @tab = Tab.find_by(sid: params[:t])
    @errors = []
    @errors << I18n.t('tabs.not_found') if @tab.nil?
  end
end
