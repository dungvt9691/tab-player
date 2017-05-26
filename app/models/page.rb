# == Schema Information
#
# Table name: pages
#
#  id           :integer          not null, primary key
#  slug         :string(255)
#  edit_content :boolean          default("0")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Page < ActiveRecord::Base
  translates :title, :content

  # Attribute accessors
  attr_accessor :seo_title, :seo_keywords, :seo_description, :featured_image, :system

  # Association
  has_one :seo, as: :object, dependent: :destroy

  # Validations
  validates :title, presence: true

  # Callbacks
  after_create :create_seo

  delegate :title, :keywords, :description, to: :seo, prefix: true, allow_nil: true
  delegate :title, to: :seo, prefix: 'seo_title'
  delegate :keywords, to: :seo, prefix: 'seo_keywords'
  delegate :description, to: :seo, prefix: 'seo_description'
  delegate :featured_image, to: :seo, allow_nil: true

  class << self
    include Filter

    def filter(params)
      searchable_columns = %w(pages.id page_translations.title)

      search_scope = search_string(searchable_columns, params)

      if params[:order]
        sortable_columns = {
          '0' => 'page_translations.title',
          '1' => 'pages.edit_content',
          '2' => 'pages.created_at'
        }

        order_scope = sort_string(sortable_columns, params)
      else
        order_scope = 'pages.created_at desc'
      end

      with_translations(I18n.locale).where(search_scope).order(order_scope)
    rescue => e
      ErrorNotification.send(e)
      Kaminari.paginate_array([])
    end
  end

  private

  def create_seo
    self.seo = Seo.create object_id: id, object_type: 'Page'
  end
end
