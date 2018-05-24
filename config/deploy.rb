require 'tempfile'
require 'json'

# Change these
set :repo_url,        'git@bitbucket.org:dungvt9691/tab-player.git'
set :application,     'tab-player'
set :user,            'deploy'

# Don't change these unless you know what you're doing
set :pty,             true
set :use_sudo,        true
set :stage,           :production
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :ssh_options, lambda {
  ssh_key_file = Tempfile.open('capistrano-ssh') do |fp|
    fp.puts secrets[:deploy_private_key]
    fp
  end
  {
    user: fetch(:user),
    keys: [ssh_key_file.path]
  }
}

### Linked Files & Directories (Default None):
# set :linked_files, %w{config/database.yml}
set :linked_dirs,  %w{log tmp/pids tmp/cache tmp/sockets public/avatars public/artists public/sheets public/images}

set :format, :pretty
set :log_level, :info

# Dotenv
after 'deploy:updating',  'dotenv:upload'

# Sidekiq
after 'deploy:starting',  'sidekiq:quiet'
after 'deploy:updated',   'sidekiq:stop'
after 'deploy:reverted',  'sidekiq:stop'
after 'deploy:published', 'sidekiq:start'

# Puma
after 'deploy:updated',   'puma:stop'
after 'deploy:reverted',  'puma:stop'
after 'deploy:published', 'puma:start'

#
# Itamae
#
set :itamae_bootstrap_file, './ops/itamae/bootstrap.rb'