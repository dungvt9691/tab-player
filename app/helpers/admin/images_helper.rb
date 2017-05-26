module Admin::ImagesHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::FormTagHelper
  include ActionView::Helpers::AssetTagHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::NumberHelper
  include ActionView::Context

  def render_image_as_html(image)
    checkbox    = image_checkbox_html(image)
    attachment  = image_attachment_html(image)

    attachment_file_name = image.attachment_file_name
    attachment_file_size = image.attachment_file_size_text
    attachment_content_type = File.extname(image.attachment_file_name)[1..-1].upcase

    created_at  = I18n.l(image.created_at, format: :datetime)
    actions     = image_actions_html(image)
    [checkbox, attachment, attachment_file_name, attachment_file_size, attachment_content_type, created_at, actions]
  rescue => e
    ErrorNotification.send(e)
    []
  end

  private

  def image_checkbox_html(image)
    content_tag :div, class: 'text-center' do
      check_box_tag 'check-box', image.id, false, class: 'check-one'
    end
  end

  def image_attachment_html(image)
    image_tag image.attachment.url(:s200), class: 'img-responsive'
  end

  def image_actions_html(image)
    content_tag :div, class: 'actions', role: 'group' do
      concat(image_destroy_html(image))
    end
  end

  def image_destroy_html(image)
    options = {
      data: {
        filename: image.attachment_file_name,
        image_id: image.id,
        href: admin_image_path(id: image.id),
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
