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
set :ssh_options,     { user: fetch(:user), keys: %w(~/.ssh/id_rsa.pub) }

# Rbenv
set :rbenv_type, :user # or :system, depends on your rbenv setup
set :rbenv_ruby, '2.3.0'
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails}
set :rbenv_roles, :all

## Linked Files & Directories (Default None):
# set :linked_files, %w{config/database.yml}
set :linked_dirs,  %w{log tmp/pids tmp/cache tmp/sockets public/avatars public/artists public/sheets}

set :format, :pretty
set :log_level, :info

# Dotenv
after 'deploy:updating',  'dotenv:upload'

# Migrate
after 'deploy:updated',  'deploy:migrate'
after 'deploy:reverted', 'deploy:migrate'

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