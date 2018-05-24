include_cookbook 'ruby'
node.validate! do
  {
    web: {
      environment: string,
      deploy_to: string,
      deploy_as: string,
      deploy_private_key: string
    }
  }
end

user node[:web][:deploy_as] do
  create_home true
end

directory node[:web][:deploy_to] do
  owner node[:web][:deploy_as]
  group node[:web][:deploy_as]
end

file ".ssh/id_rsa" do
  owner node[:web][:deploy_as]
  group node[:web][:deploy_as]
  mode '0600'
  content node[:web][:deploy_private_key]
end

%w(
  mysql-client
  libmysqlclient-dev
  imagemagick
  libmagickwand-dev
  vim
  wget
  byobu
  curl
  git
  cron
  redis-server
  logrotate
  nodejs
).each do |pkg|
  package pkg
end
