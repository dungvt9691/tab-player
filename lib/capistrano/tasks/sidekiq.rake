namespace :sidekiq do
  %w(start stop quiet restart).each do |action|
    desc "Sidekiq #{action}"
    task action do
      on roles(:web) do
        if test("[ -d #{current_path} ]")
          sudo :service, :sidekiq, action
        end
      end
    end
  end
end
