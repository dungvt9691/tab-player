class SocketController < ApplicationController
  include Tubesock::Hijack

  skip_before_action :authenticate_account!

  def show
    id = params[:account_id]
    type = params[:type]
    hijack do |tubesock|
      # Listen on its own thread
      redis_thread = Thread.new do
        # Needs its own redis connection to pub
        # and sub at the same time
        Redis.new.subscribe "crawler_artist" do |on|
          on.message do |_channel, message|
              # message = JSON.parse(message)
              tubesock.send_data message
            end
          end
        end

        tubesock.onmessage do |m|
        # pub the message when we get one
        # note: this echoes through the sub above
        type == 'notification' ? Redis.new.publish("notify_check_#{id}", m) : Redis.new.publish("crawler_artist", m)
      end

      tubesock.onclose do
        # stop listening when client leaves
        redis_thread.kill
      end
    end
  rescue => e
    ErrorNotification.send(e)
  end
end
