# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Category < ActiveRecord::Base
  attr_accessor :system

  translates :name

  # Validates
  validates :name, presence: true

  # Association
  has_many :tab_categories, dependent: :destroy
  has_many :tabs, through: :tab_categories

  class << self
    include Filter

    def filter(params)
      searchable_columns = %w(categories.id category_translations.name)

      search_scope = search_string(searchable_columns, params)

      if params[:order]
        sortable_columns = {
          '2' => 'category_translations.name',
          '4' => 'categories.created_at'
        }

        order_scope = sort_string(sortable_columns, params)
      else
        order_scope = 'categories.created_at desc'
      end

      with_translations(I18n.locale).where(search_scope).order(order_scope)
    rescue => e
      ErrorNotification.send(e)
      Kaminari.paginate_array([])
    end
  end
end
