include_cookbook 'nginx'

link '/etc/nginx/sites-enabled/app' do
  to '/etc/nginx/sites-available/app'
end

template '/etc/nginx/sites-available/app' do
  owner 'root'
  group 'root'
  mode '0644'
  variables(
    root: File.join(node[:web][:deploy_to], 'current'),
    puma_socket: File.join(node[:web][:deploy_to], 'shared/tmp/sockets/puma.sock')
  )
  notifies :restart, 'service[nginx]'
end
