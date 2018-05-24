execute 'make swap' do
  command <<-EOS
    dd if=/dev/zero of=/swapfile bs=1M count=2048;
    chmod 600 /swapfile;
    mkswap /swapfile;
    swapon /swapfile;
  EOS
  not_if 'ls / | grep swapfile'
end

execute 'write fatab' do
  command <<-EOS
    echo "/swapfile  swap   swap    defaults   0 0" >> /etc/fstab
  EOS
  not_if 'cat /etc/fstab | grep swapfile'
end
