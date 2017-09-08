template '/etc/init.d/sidekiq' do
  owner 'root'
  group 'root'
  mode '0755'
  variables(
    app_root: File.join(node[:web][:deploy_to], 'current'),
    app_user: node[:web][:deploy_as],
    app_environment: node[:web][:environment],
    rbenv: node[:web][:rbenv]
  )
end

execute 'update-rc.d' do
  command 'update-rc.d sidekiq defaults'
  not_if 'ls /etc/rc2.d | grep sidekiq'
end

template '/etc/logrotate.d/sidekiq' do
  owner 'root'
  group 'root'
  mode '0644'
  variables(
    log_file: File.join(node[:web][:deploy_to], 'shared/log/sidekiq.log'),
    app_user: node[:web][:deploy_as],
  )
end
