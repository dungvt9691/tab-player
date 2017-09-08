ppa 'nginx/stable'

package 'nginx'

file '/etc/nginx/sites-enabled/default' do
  action :delete
end

service 'nginx' do
  action [:enable, :start]
end
