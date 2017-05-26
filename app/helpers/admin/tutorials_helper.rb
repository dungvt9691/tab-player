module Admin::TutorialsHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::AssetTagHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::NumberHelper
  include ActionView::Context

  def render_tutorial_as_html(tutorial)
    checkbox     = tutorial_checkbox_html(tutorial)
    avatar       = tutorial_avatar_html(tutorial)
    link         = link_to tutorial.link, tutorial.link, target: '_blank'
    tab_title    = link_to tutorial.tab.title, edit_admin_tab_path(id: tutorial.tab.id)
    status       = tutorial.status_locale
    created_at   = I18n.l(tutorial.created_at, format: :datetime)
    actions      = tutorial_actions_html(tutorial)
    [checkbox, avatar, link, tab_title, status, created_at, actions]
  rescue => e
    ErrorNotification.send(e)
    []
  end

  private

  def tutorial_checkbox_html(tutorial)
    content_tag :div, class: 'text-center' do
      check_box_tag 'check-box', tutorial.id, false, class: 'check-one'
    end
  end

  def tutorial_avatar_html(tutorial)
    image_tag tutorial.thumbnail_url, class: 'img-responsive'
  end

  def tutorial_edit_content_html(tutorial)
    if tutorial.edit_content
      content_tag :i, '', class: 'fa fa-fw fa-check'
    else
      content_tag :i, '', class: 'fa fa-fw fa-times'
    end
  end

  def tutorial_actions_html(tutorial)
    content_tag :div, class: 'actions', role: 'group' do
      concat(tutorial_edit_html(tutorial))
      concat(tutorial_publish_html(tutorial))
      concat(tutorial_unpublish_html(tutorial))
      concat(tutorial_destroy_html(tutorial))
    end
  end

  def tutorial_publish_html(tutorial)
    options = {
      data: { tutorial_id: tutorial.id, toggle: 'tooltip' },
      title: I18n.t('tutorials.published'),
      disabled: tutorial.published?,
      class: 'btn-publish btn btn-default btn-sm'
    }
    button_tag '', options do
      content_tag :i, '', class: 'fa fa-fw fa-eye'
    end
  end

  def tutorial_unpublish_html(tutorial)
    options = {
      data: { tutorial_id: tutorial.id, toggle: 'tooltip' },
      title: I18n.t('tutorials.unpublish'),
      disabled: !tutorial.published?,
      class: 'btn-unpublish btn btn-default btn-sm'
    }
    button_tag '', options do
      content_tag :i, '', class: 'fa fa-fw fa-eye-slash'
    end
  end

  def tutorial_edit_html(tutorial)
    options = {
      data: { tutorial_id: tutorial.id, toggle: 'tooltip' },
      title: I18n.t('edit'),
      class: 'btn-update btn btn-default btn-sm'
    }
    button_tag '', options do
      content_tag :i, '', class: 'fa fa-fw fa-edit'
    end
  end

  def tutorial_destroy_html(tutorial)
    options = {
      data: {
        tutorial_title: tutorial.tab.title,
        tutorial_id: tutorial.id,
        href: admin_tutorial_path(id: tutorial.id),
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
