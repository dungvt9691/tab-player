namespace :puma do
  %w(start stop restart upgrade).each do |action|
    desc "Puma #{action}"
    task action do
      on roles(:web) do
        if test("[ -d #{current_path} ]")
          sudo :service, :puma, action
        end
      end
    end
  end
end
