# Default to production
rails_env = ENV['RAILS_ENV'] || 'production'
environment rails_env

if rails_env == 'production'
  require 'puma_worker_killer'
  # Change to match your CPU core count
  workers Integer(ENV['PUMA_PROCESSES'] || 4)

  # Min and Max threads per worker
  threads 1, 4

  app_dir = File.expand_path("../..", __FILE__)
  shared_dir = "#{app_dir}/tmp"

  # Set up socket location
  bind "unix://#{shared_dir}/sockets/puma.sock"

  # Set master PID and state locations
  pidfile "#{shared_dir}/pids/puma.pid"
  state_path "#{shared_dir}/pids/puma.state"
  activate_control_app

  before_fork do
    PumaWorkerKiller.config do |config|
      config.ram           = 2048 # mb
      config.frequency     = 5    # seconds
      config.percent_usage = 0.80
      config.rolling_restart_frequency = 6 * 3600 # 12 hours in seconds
    end
    PumaWorkerKiller.start
  end
end