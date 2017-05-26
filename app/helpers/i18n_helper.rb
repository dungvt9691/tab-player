module I18nHelper
  def t_scope(params, key, options = {})
    I18n.t("controllers.#{params[:controller].split('/').join('.')}.#{params[:action]}.#{key}", options)
  end
end