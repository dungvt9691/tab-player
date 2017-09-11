class AdflyApi
  def initialize
  end

  def shorten(params = {})
    params.stringify_keys!
    query_parts = set_query_parts(default_params(params))
    url = "#{Setting.adfly_endpoint}/shorten?#{query_parts.join('&')}"
    response = RestClient.post(url, params)
    JSON.parse response.body
  end

  def get(params = {})
    params.stringify_keys!
    query_parts = set_query_parts(default_params(params))
    url = "#{Setting.adfly_endpoint}/urls?#{query_parts.join('&')}&_hash=#{hmac(query_parts)}"
    response = RestClient.get(url)
    JSON.parse response.body
  end

  def delete(id)
    query_parts = set_query_parts(default_params)
    url = "#{Setting.adfly_endpoint}/urls/#{id}?#{query_parts.join('&')}&_hash=#{hmac(query_parts)}"
    response = RestClient.delete(url)
    JSON.parse response.body
  end

  private

  def default_params(params = {})
    params['_user_id'] = Setting.adfly_uid
    params['_api_key'] = Setting.adfly_key
    params['_timestamp'] = Time.now.to_i
    params
  end

  def set_query_parts(params)
    keys = params.keys()
    keys.sort!
    query_parts = []
    keys.each do |key|
      quoted_key = CGI::escape(key.to_s)
      if params[key].blank?
        params[key] = ''
      end

      quoted_value = CGI::escape(params[key].to_s)
      query_parts << "#{quoted_key}=#{quoted_value}"
    end

    query_parts
  end

  def hmac(query_parts)
    secret_key = Setting.adfly_secret_key
    data = query_parts.join('&')
    digest = OpenSSL::Digest.new('sha256')

    return OpenSSL::HMAC.hexdigest(digest, secret_key, data)
  end
end