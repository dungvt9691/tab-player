class Admin::CrawlerController < ApplicationController
  before_action :authenticate_admin!
  before_action :check_admin_permissions!

  def create
    last_mp3_zing_id = begin
                         Artist.order(zing_mp3_id: :desc).limit(1)[0].zing_mp3_id
                       rescue
                         0
                       end

    zing_mp3_id = last_mp3_zing_id + 1

    Sidekiq.redis {|c| c.del("cancelled") }

    Crawler.perform_async(last_mp3_zing_id, zing_mp3_id, Artist.count)
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
