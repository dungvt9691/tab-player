include_cookbook 'java'

execute "wget elasticsearch rpm" do
  command "wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -"
end

file '/etc/apt/sources.list.d/elasticsearch.1.7.list' do
  owner 'root'
  group 'root'
  mode '0644'
  content 'deb http://packages.elastic.co/elasticsearch/1.7/debian stable main'
  notifies :run, 'execute[apt-get update]', :immediately
end

execute 'apt-get update' do
  command 'apt-get update -y'
end

package 'elasticsearch' do
  action :install
end

template '/etc/init.d/elasticsearch' do
  owner 'root'
  group 'root'
  mode '0755'
  notifies :restart, 'service[elasticsearch]'
end

execute 'update-rc.d' do
  command 'update-rc.d elasticsearch defaults 95 10'
  not_if 'ls /etc/rc2.d | grep elasticsearch'
end

service 'elasticsearch' do
  action [:enable, :start]
end
