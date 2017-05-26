module Admin::PagesHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::AssetTagHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::NumberHelper
  include ActionView::Context

  def render_page_as_html(page)
    title        = link_to page.title, edit_admin_page_path(page), class: 'table-title'
    edit_content = page_edit_content_html(page)
    created_at   = I18n.l(page.created_at, format: :datetime)
    actions      = page_actions_html(page)
    [title, edit_content, created_at, actions]
  rescue => e
    ErrorNotification.send(e)
    []
  end

  private

  def page_edit_content_html(page)
    if page.edit_content
      content_tag :span, I18n.t('pages.can_edit_content')
    else
      content_tag :span, I18n.t('pages.not_edit_content'), class: 'text-danger'
    end
  end

  def page_actions_html(page)
    content_tag :div, class: 'actions', role: 'group' do
      concat(page_edit_html(page))
      button_tag '', disabled: true, class: 'btn btn-default btn-sm' do
        content_tag :i, '', class: 'fa fa-fw fa-edit'
      end
    end
  end

  def page_edit_html(page)
    options = {
      data: { toggle: 'tooltip' },
      title: I18n.t('edit'),
      class: 'btn btn-default btn-sm'
    }
    link_to edit_admin_page_path(page), options do
      content_tag :i, '', class: 'fa fa-fw fa-edit'
    end
  end
end
