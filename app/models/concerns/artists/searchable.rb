module Concerns::Artists::Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model

    # Customize the index name
    #
    index_name [Rails.application.engine_name, Rails.env].join('_')

    settings index:
    {
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
        indexes :name, type: :string, analyzer: 'english_with_folding'
        indexes :name_alias, type: :string, analyzer: 'english_with_folding'
        indexes :birthname, type: :string, analyzer: 'english_with_folding'
      end
    end

    # Set up callbacks for updating the index on model changes
    #
    after_commit -> { Indexer.perform_async(:index,  self.class.to_s, id) }, on: :create
    after_commit -> { Indexer.perform_async(:update, self.class.to_s, id) }, on: :update
    after_commit -> { Indexer.perform_async(:delete, self.class.to_s, id) }, on: :destroy
    after_touch  -> { Indexer.perform_async(:update, self.class.to_s, id) }

    # Customize the JSON serialization for Elasticsearch
    #
    def as_indexed_json(options = {})
      as_json(options)
    end

    def self.search(query)
      @search_definition = {
        query: {
          multi_match: {
            query: query,
            fields: %w(name name_alias birthname)
          }
        }
      }
      __elasticsearch__.search(@search_definition)
    end
  end
end
