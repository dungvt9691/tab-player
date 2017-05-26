namespace :db do
  current_index = 0
  desc 'Clone Tab From Songsterr'
  task clone_tabs: :environment do
    begin
      [*10230000..50000000].each do |id|
        begin
         clone_tabs(id)
        rescue Exception => e
         current_index = id
        end
      end
    rescue Exception => e
      puts "Errors: #{e.message}"
      [*current_index..50000000].each do |id|
        clone_tabs(id)
      end
    end
  end

  def clone_tabs(id)
    require 'open-uri'

    puts "Cloning Tab #{id}..."

    url = "https://d12drcwhcokzqv.cloudfront.net/#{id}.gp5"

    res = Net::HTTP.get_response URI(url)

    if res.code == "200"

      open("tabs/#{id}.gp5", 'wb') do |file|
        file << open(url).read
      end

      puts "Cloned Tab #{id}."

    else
      puts "Tab #{id} not found."
    end
  end
end