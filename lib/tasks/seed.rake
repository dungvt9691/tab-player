namespace :db do
  desc 'Run all'
  task :seed_all => :environment do
    Rake::Task['db:seed_permissions'].invoke
    Rake::Task['db:seed_pages'].invoke
  end

  desc '1th | Seed permissions'
  task :seed_permissions => :environment do
    Permission.destroy_all

    permissions_data = [
      'administrators',
      'users',
      'pages',
      'tabs',
      'artists',
      'tutorials',
      'setting'
    ]

    permissions_data.each do |data|
      permission = Permission.create name: data
      if permission.save
        puts "Created permission [#{permission.name}]"
      else
        puts permission.errors.full_messages.to_sentence
      end
    end
  end

  desc '2th | Seed page'
  task :seed_pages => :environment do
    Page.destroy_all
    pages_data = [
      {
        vi: {
          title: 'Trang chủ',
          slug: '/'
        },
        en: {
          title: 'Homepage',
          slug: '/'
        }
      },
      {
        vi: {
          title: 'Danh mục',
          slug: '/categories'
        },
        en: {
          title: 'Category',
          slug: '/categories'
        }
      },
      {
        vi: {
          title: 'Liên hệ',
          slug: '/contact'
        },
        en: {
          title: 'Contact',
          slug: '/contact'
        }
      },
      {
        vi: {
          title: "Điều khoản quy định",
          edit_content: true,
          slug: '/term'
        },
        en: {
          title: "Terms of Service",
          edit_content: true,
          slug: '/term'
        }
      },
      {
        vi: {
          title: "Chính sách bảo mật",
          edit_content: true,
          slug: '/privacy'
        },
        en: {
          title: "Privacy",
          edit_content: true,
          slug: '/privacy'
        }
      },
      {
        vi: {
          title: "Giới thiệu",
          edit_content: true,
          slug: '/introduce'
        },
        en: {
          title: "Introduce",
          edit_content: true,
          slug: '/introduce'
        }
      }
    ]

    pages_data.each do |data|
      I18n.locale = :vi
      page = Page.new data[:vi]
      if page.save
        I18n.locale = :en
        page.assign_attributes data[:en]
        page.save
        puts "created pages [#{page.title}]"
      else
        puts page.errors.full_messages.to_sentence
      end
    end
  end

  desc 'Clear All'
  task :clear => :environment do
    Admin.destroy_all
    User.destroy_all
    Tab.destroy_all
    Artist.destroy_all
    Seo.destroy_all
    Setting.destroy_all
    Image.destroy_all
  end
end
