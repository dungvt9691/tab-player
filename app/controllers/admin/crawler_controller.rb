class Admin::CrawlerController < ApplicationController
  before_action :authenticate_admin!
  before_action :check_admin_permissions!

  def create
    songsterr_id = Tab.last.nil? ? 1 : Tab.last.songsterr_id + 1

    Sidekiq.redis {|c| c.del("cancelled") }

    Crawler.perform_async(songsterr_id, Tab.count)
  end

  def destroy
    Crawler.cancel!
  end

  private

  def check_admin_permissions!
    admin_id      = current_admin.id
    access_denied = begin
                      !current_admin.permissions.find_by(name: 'artists').create?(admin_id)
                    rescue
                      true
                    end

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
