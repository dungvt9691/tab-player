module Admin::AdministratorsHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::AssetTagHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::TextHelper
  include ActionView::Context

  def render_admin_as_html(admin)
    checkbox    = admin_checkbox_html(admin)
    avatar      = admin_avatar_html(admin)
    email       = admin.email
    username    = admin.username
    fullname    = admin.fullname
    permissions = admin_permissions_html(admin)
    actions     = admin_actions_html(admin)
    [checkbox, avatar, email, username, fullname, permissions, actions]
  rescue => e
    ErrorNotification.send(e)
    []
  end

  private

  def admin_checkbox_html(admin)
    if Setting.app_email.eql? admin.email
      content_tag :div, class: 'text-center' do
        content_tag :i, '', class: 'fa fa-ban fa-fw'
      end
    else
      content_tag :div, class: 'text-center' do
        check_box_tag 'check-box', admin.id, false, class: 'check-one'
      end
    end
  end

  def admin_avatar_html(admin)
    image_tag admin.avatar, class: 'img-responsive'
  end

  def admin_actions_html(admin)
    content_tag :div, class: 'actions' do
      concat(admin_edit_html(admin))
      concat(admin_delete_html(admin))
    end
  end

  def admin_permissions_html(admin)
    return I18n.t('permissions.no_data') if admin.permissions.empty?
    link_to I18n.t('permissions.view_detail'), admin_administrator_path(admin.id)
  end

  def admin_edit_html(admin)
    return I18n.t('cannot_edit') if Setting.app_email.eql? admin.email

    options = {
      data: { toggle: 'tooltip' },
      title: I18n.t('edit'),
      class: 'btn-edit btn btn-default btn-sm'
    }
    link_to edit_admin_administrator_path(admin.id), options do
      content_tag :i, '', class: 'fa fa-edit'
    end
  end

  def admin_delete_html(admin)
    return '' if Setting.app_email.eql? admin.email

    options = {
      data: {
        admin_username: admin.username,
        admin_id: admin.id,
        href: admin_administrator_path(id: admin.id),
        toggle: 'tooltip'
      },
      title: I18n.t('destroy'),
      class: 'btn-destroy-admin btn btn-danger btn-sm'
    }
    link_to 'javascript:;', options do
      content_tag :i, '', class: 'fa fa-trash-o'
    end
  end
end
