module Admin::UsersHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::AssetTagHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::NumberHelper
  include ActionView::Context

  def render_user_as_html(user)
    checkbox    = user_checkbox_html(user)
    avatar      = user_avatar_html(user)
    email       = user.email
    fullname    = user.fullname
    created_at  = I18n.l(user.created_at, format: :datetime)
    actions     = user_actions_html(user)
    [checkbox, avatar, email, fullname, created_at, actions]
  rescue => e
    ErrorNotification.send(e)
    []
  end

  private

  def user_checkbox_html(user)
    content_tag :div, class: 'text-center' do
      check_box_tag 'check-box', user.id, false, class: 'check-one'
    end
  end

  def user_avatar_html(user)
    image_tag user.avatar(:s200), class: 'img-responsive'
  end

  def user_actions_html(user)
    content_tag :div, class: 'actions', role: 'group' do
      concat(user_lock_html(user))
      concat(user_unlock_html(user))
      concat(user_destroy_html(user))
    end
  end

  def user_lock_html(user)
    options = {
      data: { user_id: user.id, toggle: 'tooltip' },
      title: I18n.t('users.lock'),
      disabled: user.locked?,
      class: 'btn-lock btn btn-default btn-sm'
    }
    button_tag '', options do
      content_tag :i, '', class: 'fa fa-fw fa-lock'
    end
  end

  def user_unlock_html(user)
    options = {
      data: { user_id: user.id, toggle: 'tooltip' },
      title: I18n.t('users.unlock'),
      disabled: !user.locked?,
      class: 'btn-unlock btn btn-default btn-sm'
    }
    button_tag '', options do
      content_tag :i, '', class: 'fa fa-fw fa-unlock'
    end
  end

  def user_destroy_html(user)
    options = {
      data: {
        user_fullname: user.fullname,
        user_id: user.id,
        href: admin_user_path(id: user.id),
        toggle: 'tooltip'
      },
      title: I18n.t('destroy'),
      class: 'btn-destroy btn btn-danger btn-sm'
    }
    button_tag '', options do
      content_tag :i, '', class: 'fa fa-fw fa-trash-o'
    end
  end
end
