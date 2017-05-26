module Admin::TabsHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::AssetTagHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::NumberHelper
  include ActionView::Context

  def render_tab_as_html(tab)
    checkbox     = tab_checkbox_html(tab)
    avatar       = tab_avatar_html(tab)
    title        = link_to tab.title, edit_admin_tab_path(id: tab.id), class: 'table-title'
    user         = begin
                     tab.uploader.email
                   rescue
                     t('unknown')
                   end
    views        = number_with_delimiter(tab.cached_views)
    link_web     = link_to t('tabs.view_on_web'), tab_show_path(language: I18n.locale, t: tab.sid), target: '_blank'
    created_at   = I18n.l(tab.created_at, format: :datetime)
    actions      = tab_actions_html(tab)
    [checkbox, avatar, title, user, views, link_web, created_at, actions]
  rescue => e
    ErrorNotification.send(e)
    []
  end

  private

  def tab_checkbox_html(tab)
    content_tag :div, class: 'text-center' do
      check_box_tag 'check-box', tab.id, false, class: 'check-one'
    end
  end

  def tab_avatar_html(tab)
    image_tag tab.avatar_url, class: 'img-responsive'
  end

  def tab_edit_content_html(tab)
    if tab.edit_content
      content_tag :i, '', class: 'fa fa-fw fa-check'
    else
      content_tag :i, '', class: 'fa fa-fw fa-times'
    end
  end

  def tab_actions_html(tab)
    content_tag :div, class: 'actions', role: 'group' do
      concat(tab_edit_html(tab))
      concat(tab_destroy_html(tab))
    end
  end

  def tab_edit_html(tab)
    options = {
      data: { toggle: 'tooltip' },
      title: I18n.t('edit'),
      class: 'btn btn-default btn-sm'
    }
    link_to edit_admin_tab_path(id: tab.id), options do
      content_tag :i, '', class: 'fa fa-fw fa-edit'
    end
  end

  def tab_destroy_html(tab)
    options = {
      data: {
        tab_title: tab.title,
        tab_id: tab.id,
        href: admin_tab_path(id: tab.id),
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
