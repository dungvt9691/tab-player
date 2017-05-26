module Admin::ArtistsHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::AssetTagHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::NumberHelper
  include ActionView::Context

  def render_artist_as_html(artist)
    checkbox     = artist_checkbox_html(artist)
    avatar       = artist_avatar_html(artist)
    name         = link_to artist.name, edit_admin_artist_path(id: artist.id), class: 'table-title'
    name_alias   = artist.name_alias
    birthname    = artist.birthname
    created_at   = I18n.l(artist.created_at, format: :datetime)
    actions      = artist_actions_html(artist)
    [checkbox, avatar, name, name_alias, birthname, created_at, actions]
  rescue => e
    ErrorNotification.send(e)
    []
  end

  private

  def artist_checkbox_html(artist)
    content_tag :div, class: 'text-center' do
      check_box_tag 'check-box', artist.id, false, class: 'check-one'
    end
  end

  def artist_avatar_html(artist)
    image_tag artist.avatar.url(:s200), class: 'img-responsive'
  end

  def artist_edit_content_html(artist)
    if artist.edit_content
      content_tag :i, '', class: 'fa fa-fw fa-check'
    else
      content_tag :i, '', class: 'fa fa-fw fa-times'
    end
  end

  def artist_actions_html(artist)
    content_tag :div, class: 'actions', role: 'group' do
      concat(artist_edit_html(artist))
      concat(artist_destroy_html(artist))
    end
  end

  def artist_edit_html(artist)
    options = {
      data: { toggle: 'tooltip' },
      title: I18n.t('edit'),
      class: 'btn btn-default btn-sm'
    }
    link_to edit_admin_artist_path(id: artist.id), options do
      content_tag :i, '', class: 'fa fa-fw fa-edit'
    end
  end

  def artist_destroy_html(artist)
    options = {
      data: {
        name: artist.name,
        artist_id: artist.id,
        href: admin_artist_path(id: artist.id),
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
