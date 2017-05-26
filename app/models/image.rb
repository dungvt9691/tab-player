# == Schema Information
#
# Table name: images
#
#  id                      :integer          not null, primary key
#  admin_id                :integer          not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  attachment_file_name    :string(255)
#  attachment_content_type :string(255)
#  attachment_file_size    :integer
#  attachment_updated_at   :datetime
#

class Image < ActiveRecord::Base
  has_attached_file :attachment, styles: { original: '1024x', s500: '500x500#', s420: '420x300#', s200: '200x200#' },
                                 use_timestamp: false,
                                 url: '/images/:style/:image_id:image_ext',
                                 path: ':rails_root/public:url'

  validates_attachment_presence :attachment

  validates_attachment_file_name :attachment, matches: [/jpeg\Z/, /jpg\Z/, /png\Z/, /JPEG\Z/, /JPG\Z/, /PNG\Z/]

  do_not_validate_attachment_file_type :attachment

  after_validation :clean_paperclip_errors

  belongs_to :admin

  # Callbacks
  after_validation :clean_paperclip_errors

  # interpolate in paperclip
  Paperclip.interpolates :image_id do |image, _style|
    "#{format('IMG%010d', image.instance.id)}"
  end

  Paperclip.interpolates :image_ext do |image, _style|
    ".#{image.instance.attachment_content_type.split('/').last}"
  end

  def attachment_url(style = :s200)
    "#{Setting.app_url}#{attachment.url(style)}?#{Time.zone.now.to_i}"
  end

  def attachment_file_size_text
    format_mb(attachment_file_size)
  end

  class << self
    include Filter

    def filter(params)
      searchable_columns = %w(attachment_file_name)

      search_scope = search_string(searchable_columns, params)

      if params[:order]
        sortable_columns = {
          '2' => 'attachment_file_name',
          '3' => 'attachment_file_size',
          '4' => 'attachment_content_type',
          '5' => 'created_at'
        }

        order_scope = sort_string(sortable_columns, params)
      else
        order_scope = 'created_at desc'
      end

      where(search_scope).order(order_scope)
    rescue => e
      ErrorNotification.send(e)
      Kaminari.paginate_array([])
    end
  end

  private

  def clean_paperclip_errors
    errors.delete(:attachment)
  end

  def format_mb(size)
    conv = %w(bytes KB MB GB TB PB EB)
    scale = 1024
    ndx = 1
    return "#{size} #{conv[ndx - 1]}" if size < 2 * (scale**ndx)
    size = size.to_f
    [2, 3, 4, 5, 6, 7].each do |i|
      if size < 2 * (scale**i)
        return "#{format('%.1f', (size / (scale**(i - 1))))} #{conv[i - 1]}"
      end
    end
    ndx = 7
    "#{format('%.1f', (size / (scale**(ndx - 1))))} #{conv[ndx - 1]}"
  end
end
