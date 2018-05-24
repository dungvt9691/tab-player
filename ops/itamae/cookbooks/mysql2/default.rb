require 'shellwords'
node.validate! do
  {
    web: {
      mysql_root_password: string,
    }
  }
end

package 'mysql-server'

service 'mysql' do
  action [:start, :enable]
end

execute 'assign root password' do
  cmd = '/usr/bin/mysqladmin'
  cmd << ' -u root password '
  cmd << Shellwords.escape(node[:web][:mysql_root_password])
  command cmd
  only_if "/usr/bin/mysql -u root -e 'show databases;'"
end