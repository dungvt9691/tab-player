ppa 'webupd8team/java'

execute 'debconf-set-selections' do
  command 'echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections'
  not_if 'debconf-get-selections | grep "oracle-java8-installer\s*shared/accepted-oracle-license-v1-1\s*select\s*true"'
end

package 'oracle-java8-installer'
