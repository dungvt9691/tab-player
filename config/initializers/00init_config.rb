if Rails.env.production?
  SECRET_FILE   = File.join(Rails.root, '..', '..', 'shared', 'config', 'secretkey')
else
  SECRET_FILE   = File.join(Rails.root, 'config', 'secretkey')
end
Hashie.logger = Logger.new(nil)