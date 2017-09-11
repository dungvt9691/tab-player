namespace :adfly do
  current_index = 0
  desc 'Clone Tab From Songsterr'
  task clear: :environment do
    begin
      [*1..117].each do |page|
        adfly_api = AdflyApi.new
        response = adfly_api.get(q: 'https://tab-player.com', page: page)
        if response['errors'].blank?
          response['data'].each do |data|
            response = adfly_api.delete(data['id'])
            if response['errors'].blank?
              puts "Destroy adfly url link #{data['short_url']}"
            end
          end
        end
      end
    rescue Exception => e
      puts "Errors: #{e.message}"
    end
  end
end