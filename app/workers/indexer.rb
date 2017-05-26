# Indexer class for <http://sidekiq.org>
#
# Run me with:
#
#     $ bundle exec sidekiq --queue elasticsearch --verbose
#
class Indexer
  include Sidekiq::Worker
  sidekiq_options queue: 'elasticsearch', retry: false, backtrace: true

  LOGGER = Sidekiq.logger.level == Logger::DEBUG ? Sidekiq.logger : nil
  CLIENT = Elasticsearch::Client.new host: (ENV['ELASTICSEARCH_URL'] || 'http://localhost:9200'), logger: LOGGER

  def perform(operation, klass, record_id, options = {})
    logger.debug [operation, "#{klass}##{record_id} #{options.inspect}"]

    case operation.to_s
    when /index|update/
      record = klass.constantize.find(record_id)
      record.__elasticsearch__.client = CLIENT
      record.__elasticsearch__.__send__ "#{operation}_document"
    when /delete/
      CLIENT.delete index: klass.constantize.index_name, type: klass.constantize.document_type, id: record_id
    else raise ArgumentError, "Unknown operation '#{operation}'"
    end
  end
end
