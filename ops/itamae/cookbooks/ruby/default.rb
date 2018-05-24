ppa 'brightbox/ruby-ng'

%w(
  autoconf
  bison
  build-essential
  libffi-dev
  libgdbm-dev
  libgdbm3
  libncurses5-dev
  libreadline6-dev
  libssl-dev
  libyaml-dev
  zlib1g-dev
  ruby2.3
  ruby2.3-dev
).each do |pkg|
  package pkg
end

gem_package 'bundler'
