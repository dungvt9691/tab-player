module Filter
  extend ActiveSupport::Concern

  included do
    def sort_string(sortable_columns, params)
      sort_by = begin
                  sortable_columns[params[:order]['0']['column']]
                rescue
                  'created_at'
                end

      sort_type = begin
                    params[:order]['0']['dir']
                  rescue
                    'desc'
                  end

      "#{sort_by} #{sort_type}"
    end

    def search_string(searchable_columns, params)
      search = begin
                 params[:search][:value]
               rescue
                 ''
               end
      condition_str = searchable_columns.join(' like ? or ') + ' like ?'
      condition_params = []
      searchable_columns.count.times { condition_params << "%#{search}%" }
      condition_params.insert(0, condition_str)
    end
  end
end
