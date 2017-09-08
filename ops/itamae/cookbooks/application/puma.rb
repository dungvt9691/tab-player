template '/etc/init.d/puma' do
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

template '/etc/logrotate.d/puma' do
  owner 'root'
  group 'root'
  mode '0644'
  variables(
    log_file: File.join(node[:web][:deploy_to], 'shared/log/puma.log'),
    app_user: node[:web][:deploy_as]
  )
end
