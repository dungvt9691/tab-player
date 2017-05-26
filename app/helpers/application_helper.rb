module ApplicationHelper
  def time_ago(time)
    if time.to_date == DateTime.current.to_date
      time_ago_in_words(time)
    else
      I18n.l(time, format: :datetime)
    end
  end

  def render_date(date)
    case date.to_date
    when DateTime.current.to_date
      I18n.t('date.today')
    when DateTime.current.to_date - 1.day
      I18n.t('date.yesterday')
    else
      I18n.l date.to_date, format: :short
    end
  end

  def mobile_device?
    request.user_agent =~ /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/
  end

  def render_language_text(language)
    case language.to_s
    when 'vi'
      'vi_VN'
    when 'en'
      'en_US'
    else
      'vi_VN'
    end
  end

  def render_key(key)
    return 'success' if ['notice'.to_sym, 'notice', 'success'].include? key
    'danger'
  end

  def render_value(errors)
    if errors.class.to_s == 'Array'
      content_tag :ul do
        errors.collect { |err| concat(content_tag(:li, safe_join([raw("#{err}.")]))) }
      end
    else
      content_tag :ul do
        content_tag(:li, safe_join([raw("#{errors}.")]))
      end
    end
  end
end
