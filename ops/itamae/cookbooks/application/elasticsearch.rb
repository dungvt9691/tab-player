include_cookbook 'elasticsearch'

directory '/etc/elasticsearch/configs' do
  owner 'root'
  group 'root'
  mode '0777'
end
