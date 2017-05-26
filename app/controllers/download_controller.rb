class DownloadController < ApplicationController
  def show
    @tab = Tab.find_by(download_hash: params[:hash])
    if @tab.nil?
      flash[:error] = I18n.t('tabs.not_found')
      redirect_to root_path
    end
    remote_url = @tab.sheet.path
    filename = @tab.title.to_slug.normalize! transliterations: [:vietnamese]
    extension = File.extname(@tab.sheet_file_name)
    send_file remote_url, filename: "#{filename}.#{extension}", x_sendfile: false
  rescue => e
    ErrorNotification.send(e)
    flash[:error] = [I18n.t('alert.system_error')]
    render 'errors/server_error', status: 500
  end
end
