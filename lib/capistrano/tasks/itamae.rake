namespace :itamae do
  desc 'Itamae plan(dry-run)'
  task :plan do
    run_itamae(dry_run: true)
  end

  desc 'Itamae apply'
  task :apply do
    run_itamae(dry_run: false)
  end

  def run_itamae(dry_run: true)
    on roles(:web) do |server|
      puts server
      node_json = node_json(server)
      run_locally do
        options = ssh_options(server)
        options << "--color"
        options << "--dry-run" if dry_run
        options << "--node-json #{node_json.path}"
        output = capture :itamae, :ssh, fetch(:itamae_bootstrap_file), *options
        info server
        puts output
      end
    end
  end

  def node_json(server)
    attributes = fetch(:itamae_attributes)
    attributes[:roles] = server.roles.to_a.join(',')

    Tempfile.open('capistrano-itamae-node') do |fp|
      fp.puts attributes.to_json
      fp
    end
  end

  def ssh_options(server)
    ssh_options = fetch(:ssh_options) || {}
    ssh_options.merge!(server.ssh_options || {})
    ssh_options[:user] ||= server.user
    ssh_options[:port] ||= server.port
    ssh_options[:keys] ||= server.keys
    ssh_options[:key] = ssh_options[:keys] && ssh_options[:keys].first

    options = []
    options << "--host #{server.hostname}"
    options << "--user #{ssh_options[:user]}" if ssh_options[:user]
    options << "--port #{ssh_options[:port]}" if ssh_options[:port]
    options << "--key #{ssh_options[:key]}" if ssh_options[:key]
  end
end
