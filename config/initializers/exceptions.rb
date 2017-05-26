unless Rails.configuration.consider_all_requests_local
  Rails.configuration.exceptions_app = -> (env) { ErrorsController.action(:show).call(env) }
end
