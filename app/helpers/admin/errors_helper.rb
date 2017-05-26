module Admin::ErrorsHelper
  def render_error_or_redirect
    if params[:format] == 'json'
      data = {
        'draw' => 0,
        'recordsTotal' => 0,
        'recordsFiltered' => 0,
        'data' => []
      }

      render json: data
    else
      flash[:error] = I18n.t('alert.system_error')
      redirect_to root_path
    end
  end
end
