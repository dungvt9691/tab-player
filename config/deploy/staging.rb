set :rails_env, :production
server 'vrtours.space', roles: [:web, :db], primary: true
set :branch, '20180301'

#
# Dotenv
#
set :dotenv, <<EOS
SIDEKIQ_CONCURRENCY=4
PUMA_PROCESSES=4
DATABASE_URL=#{secrets[:database_url]}
SECRET_KEY_BASE=#{secrets[:secret_key_base]}
EOS

set :itamae_attributes, lambda {
  {
    web: {
      environment: fetch(:rails_env),
      deploy_to: fetch(:deploy_to),
      deploy_as: fetch(:user),
      deploy_private_key: secrets[:deploy_private_key],
      mysql_root_password: secrets[:mysql_root_password],
      allow_ssl: true
    }
  }
}