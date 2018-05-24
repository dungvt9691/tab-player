require 'itamae/secrets'

def secrets
  @secrets ||= Itamae::Secrets('./ops/secrets')
end