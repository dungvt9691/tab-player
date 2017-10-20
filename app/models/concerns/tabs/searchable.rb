module Concerns::Tabs::Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model

    # Customize the index name
    #
    index_name [Rails.application.engine_name, Rails.env].join('_')

    # Set up index configuration and mapping
    #
    settings index:
    {
      number_of_shards: 1,
      number_of_replicas: 0,
      # Replicates the english analyzer but simply adds asciifolding
      analysis: {
        filter: {
          english_stop: {
            type:       'stop',
            stopwords:  '_english_'
          },
          english_stemmer: {
            type:       'stemmer',
            language:   'english'
          },
          english_possessive_stemmer: {
            type:       'stemmer',
            language:   'possessive_english'
          }
        },
        analyzer: {
          english_with_folding: {
            tokenizer:  'standard',
            filter: %w(
              asciifolding
              english_possessive_stemmer
              lowercase
              english_stop
              english_stemmer
            )
          },
          folding: {
            tokenizer: 'standard',
            filter:  ['asciifolding']
          }
        }
      }
    } do
      mapping do
        indexes :title, type: 'multi_field' do
          indexes :title,     analyzer: 'english_with_folding'
          indexes :tokenized, analyzer: 'simple'
          indexes :raw, type: :string, index: 'not_analyzed'
        end

        indexes :artists, type: 'nested' do
          indexes :name, type: :string, analyzer: 'english_with_folding'
          indexes :name_alias, type: :string, analyzer: 'english_with_folding'
          indexes :birthname, type: :string, analyzer: 'english_with_folding'
        end

        indexes :categories, type: 'nested' do
          indexes :name_en, type: :string, analyzer: 'english_with_folding'
          indexes :name_vi, type: :string, analyzer: 'english_with_folding'
        end
      end
    end

    # Set up callbacks for updating the index on model changes
    #
    after_commit -> { Indexer.perform_async(:index,  self.class.to_s, self.id) }, on: :create
    after_commit -> { Indexer.perform_async(:update, self.class.to_s, self.id) }, on: :update
    after_commit -> { Indexer.perform_async(:delete, self.class.to_s, self.id) }, on: :destroy
    after_touch  -> { Indexer.perform_async(:update, self.class.to_s, self.id) }

    # Customize the JSON serialization for Elasticsearch
    #
    def as_indexed_json(_options = {})
      hash = as_json(
        include: { artists: { methods: [:name, :name_alias, :birthname], only: [:name, :name_alias, :birthname] },
                   categories: { methods: [:name_vi, :name_en], only: [:name_vi, :name_en] } }
      )
      hash
    end

    # Search in title and content fields for `query`, include highlights in response
    #
    # @param query [String] The user query
    # @return [Elasticsearch::Model::Response::Response]
    #
    def self.search(query)
      # Prefill and set the filters (top-level `post_filter` and aggregation `filter` elements)
      #

      @search_definition = {
        query: {},
        filter: {
          bool: {
            must: [{ term: { status: 'published' } }]
          }
        },
        highlight: {
          fields: {
            "*" => {}
          }
        }
      }

      if query.blank?
        @search_definition[:query] = { match_all: {} }
        @search_definition[:sort]  = { cached_views: 'desc' }
      else
        @search_definition[:query] = {
          bool: {
            should: [
              {
                multi_match: {
                  query: query,
                  fields: %w(title),
                  operator: 'or'
                }
              },
              {
                nested: {
                  path: 'artists',
                  query: {
                    multi_match: {
                      query: query,
                      fields: %w(artists.name artists.name_alias artists.birthname),
                      operator: 'or'
                    }
                  }
                }
              },
              {
                nested: {
                  path: 'categories',
                  query: {
                    multi_match: {
                      query: query,
                      fields: %w(categories.name_en categories.name_vi),
                      operator: 'or'
                    }
                  }
                }
              }
            ]
          }
        }
      end

      __elasticsearch__.search(@search_definition)
    end
  end
end
