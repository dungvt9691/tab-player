Rails.application.routes.draw do
  devise_for :admins, path: 'admin', controllers: { sessions: "admin/sessions", passwords: 'admin/passwords' }

  devise_for :users, skip: [:sessions],
                     path: '',
                     controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  as :user do
    delete 'signout' => 'devise/sessions#destroy', as: :destroy_user_session, path: 'auth'
    get '/auth/:provider/setup' => 'users/omniauth_callbacks#setup', as: :setup_omniauth
  end

  #
  # Sidekiq
  #
  require 'sidekiq/web'
  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    Admin.authenticate(username, password)
  end
  mount Sidekiq::Web => '/sidekiq'

  #
  # Websocket
  # 
  get '/socket/:account_id' => 'socket#show'

  #
  # Admin Page
  #
  scope '/admin', as: 'admin' do
    get '/' => 'admin/dashboard#index'

    put '/:language/update' => 'admin/languages#update', as: 'language'

    get '/setting/profile' => 'admin/profile#edit'
    put '/setting/profile' => 'admin/profile#update'

    resources :administrators, controller: 'admin/administrators' do
      resources :permissions, only: [:create, :destroy, :update], controller: 'admin/permissions'
      collection do
        delete 'multi_destroy'
      end
    end

    resources :users, controller: 'admin/users', only: [:edit, :update, :destroy, :index] do
      collection do
        delete 'multi_destroy'
        put    'multi_add_coin'
      end
    end

    resources :pages, controller: 'admin/pages', except: [:show, :new, :create]

    resources :posts, controller: 'admin/posts', except: [:show] do
      collection do
        delete 'multi_destroy'
      end
    end

    resources :categories, controller: 'admin/categories', except: [:show] do
      collection do
        delete 'multi_destroy'
      end
    end

    resources :artists, controller: 'admin/artists', except: [:show] do
      collection do
        delete 'multi_destroy'
      end
    end

    resources :images, controller: 'admin/images', only: [:index, :create, :destroy] do
      collection do
        delete 'multi_destroy'
      end
    end

    resources :tutorials, controller: 'admin/tutorials', except: [:show, :new, :create] do
      collection do
        delete 'multi_destroy'
      end
    end

    resource :crawler, controller: 'admin/crawler', only: [:create, :destroy]

    resources :tabs, controller: 'admin/tabs', except: [:show] do
      collection do
        delete 'multi_destroy'
        get 'multi_upload' => 'admin/multi_upload_tabs#new'
        post 'multi_upload' => 'admin/multi_upload_tabs#create'
      end
    end

    resource :setting, controller: 'admin/setting', only: [:new, :create, :update]

    resource :test_smtp, controller: 'admin/test_smtp', only: [:new, :create]

    scope '/setting', as: 'setting' do
      %w(
        page_info
        social_networks
        seo
        adfly
        smtp
        recaptcha
      ).each do |path|
        get path, to: "admin/setting##{path}"
      end
    end
  end

  # Download url
  get '/download/:hash' => 'download#show', as: 'download'

  # Contact
  post '/contacts' => 'contact#create', as: 'contacts'

  #
  # User Page
  #
  root 'static_pages#locale'

  scope ':language' do
    get '/' => 'static_pages#home'
    resources :tabs, except: [:show], param: 't' do
      member do
        resources :tutorials, only: [:create]
        resource :favorites, only: [:create, :destroy]
      end
    end

    resources :tutorials, except: [:index, :new, :create, :edit, :update, :show, :destroy] do
      member do
        resource :likes, only: [:create, :destroy]
        resource :dislikes, only: [:create, :destroy]
      end
    end

    resources :posts

    get 'profile' => 'users/profile#show'
    get 'profile/tabs' => 'users/tabs#index', as: 'uploaded_tabs'
    delete 'profile/tabs/:t' => 'users/tabs#destroy', as: 'destroy_tab'

    get '/player' => 'tabs#show', as: 'tab_show'

    get '/embed/:sid' => 'embed#show', as: 'embed'

    %w(
      term
      introduce
      privacy
    ).each do |path|
      get path, to: "static_pages##{path}"
    end

    get 'search' => 'search#index'

    get '/contact' => 'contact#index', as: 'contact'

    get '/favorites' => 'favorites#index'
  end

  post '/rate' => 'rater#create', :as => 'rate'

  # devise_for :users, skip: [:sessions],
  #                       path: '',
  #                       controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # as :user do
  #   match 'signout' => 'devise/sessions#destroy', as: :destroy_user_session, path: 'auth', via: Devise.mappings[:user].sign_out_via
  #   get '/auth/:provider/setup' => 'users/omniauth_callbacks#setup', as: :setup_omniauth
  # end
end
