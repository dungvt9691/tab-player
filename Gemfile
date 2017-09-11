source 'https://gems.vccloud.vn'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.7'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use mysql2 as the database for Active Record
gem 'mysql2'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Puma as the app server
gem 'puma'
gem 'puma_worker_killer'

# Pagination
gem 'kaminari', '0.17.0'
gem 'bootstrap-kaminari-views'

# File managements
gem 'paperclip', '4.3.2'
gem 'remotipart', '~> 1.2'

# SEO
gem 'friendly_id', '~> 5.1.0'
gem 'babosa'

# Rate gem
gem 'ratyrate'

# Notifications
gem 'tubesock'

# Authentication
gem 'devise'
gem 'omniauth', '1.4.0'
gem 'omniauth-facebook'
gem 'omniauth-google-oauth2'

# HTTP Client
gem 'rest-client', '~> 2.0.0'

# Binding gem
gem 'pry'

# Youtube video info gem
gem 'video_info', '2.5.0'

# Like, Dislike gem
gem 'acts_as_votable', '~> 0.10.0', git: 'https://github.com/dungvt9691/acts_as_votable.git'

# Views count
gem 'impressionist'

# Validates gem
gem 'validate_url'
gem 'email_validator'

# Searchable
gem 'elasticsearch', git: 'git://github.com/elasticsearch/elasticsearch-ruby.git'
gem 'elasticsearch-model', git: 'git://github.com/elasticsearch/elasticsearch-rails.git'
gem 'elasticsearch-rails', git: 'git://github.com/elasticsearch/elasticsearch-rails.git'
gem 'sidekiq'

# Editor
gem 'ckeditor', github: 'galetahub/ckeditor'

# Multi languages
gem 'globalize', '~> 5.0.0'

# Ready guitar pro data
gem 'guitar_pro_parser', git: 'https://github.com/dungvt9691/guitar_pro_parser.git'

# Javascript & Stylesheet plugins
gem 'sass-rails', '~> 5.0'
gem 'jquery-rails'
gem 'material_icons'
gem 'font-awesome-rails'
gem 'jquery-ui-rails'
gem 'jquery_file_download-rails'
gem 'jquery-fileupload-rails'
gem 'jquery-datatables-rails'
gem 'select2-rails'
gem 'speakingurl-rails'
gem 'clipboard-rails'
gem 'dotenv-rails'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  # Check coding style
  gem 'rubocop'
  gem 'rubocop-checkstyle_formatter', require: false
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  gem 'awesome_print'
  gem 'annotate'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  # Deploy
  gem 'capistrano',         require: false
  gem 'capistrano-rbenv',   require: false
  gem 'capistrano-rails',   require: false
  gem 'capistrano-bundler', require: false
  gem 'itamae'
  gem 'itamae-secrets'
end

group :production do
  gem 'lograge'
end