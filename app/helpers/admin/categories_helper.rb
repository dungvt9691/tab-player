module Admin::CategoriesHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::AssetTagHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::NumberHelper
  include ActionView::Context

  def render_category_as_html(category)
    checkbox   = category_checkbox_html(category)
    name       = link_to category.name, edit_admin_category_path(id: category.id), class: 'table-name'
    created_at = I18n.l(category.created_at, format: :datetime)
    actions    = category_actions_html(category)
    [checkbox, name, created_at, actions]
  rescue => e
    ErrorNotification.send(e)
    []
  end

  private

  def category_avatar_html(category)
    if category.avatar.blank?
      image_tag Setting.featured_image, class: 'img-responsive'
    else
      image_tag category.avatar, class: 'img-responsive'
    end
  end

  def category_checkbox_html(category)
    content_tag :div, class: 'text-center' do
      check_box_tag 'check-box', category.id, false, class: 'check-one'
    end
  end

  def category_edit_content_html(category)
    if category.edit_content
      content_tag :i, '', class: 'fa fa-fw fa-check'
    else
      content_tag :i, '', class: 'fa fa-fw fa-times'
    end
  end

  def category_actions_html(category)
    content_tag :div, class: 'actions', role: 'group' do
      concat(category_edit_html(category))
      concat(category_destroy_html(category))
    end
  end

  def category_edit_html(category)
    options = {
      data: { toggle: 'tooltip' },
      title: I18n.t('edit'),
      class: 'btn btn-default btn-sm'
    }
    link_to edit_admin_category_path(id: category.id), options do
      content_tag :i, '', class: 'fa fa-fw fa-edit'
    end
  end

  def category_destroy_html(category)
    options = {
      data: {
        name: category.name,
        category_id: category.id,
        href: admin_category_path(id: category.id),
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
