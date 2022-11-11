Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  resources :users, param: :_email
  post '/login', to: 'authentication#login'

  namespace :v1 do
    namespace :user do
      resource :registrasi do
        get "/findAll" => "registrasi#index" 
        post "/find" => "registrasi#find"
        post "/edit" => "registrasi#edit"
        post "/create" => "registrasi#create"
        post "/delete" => "registrasi#delete"
      end
    end
    namespace :kib do
      resource :kiba do
        get "/findAll" => "kiba#index"
        post "/find" => "kiba#find"
        post "/edit" => "kiba#edit"
        post "/create" => "kiba#create"
        post "/delete" => "kiba#delete"
      end
      resource :kibb do
        get "/findAll" => "kibb#index"
        post "/find" => "kibb#find"
        post "/edit" => "kibb#edit"
        post "/create" => "kibb#create"
        post "/delete" => "kibb#delete"
      end
      resource :kibc do
        get "/findAll" => "kibc#index"
        post "/find" => "kibc#find"
        post "/edit" => "kibc#edit"
        post "/create" => "kibc#create"
        post "/delete" => "kibc#delete"
      end
      resource :kibd do
        get "/findAll" => "kibd#index"
        post "/find" => "kibd#find"
        post "/edit" => "kibd#edit"
        post "/create" => "kibd#create"
        post "/delete" => "kibd#delete"
      end
      resource :kibe do
        get "/findAll" => "kibe#index"
        post "/find" => "kibe#find"
        post "/edit" => "kibe#edit"
        post "/create" => "kibe#create"
        post "/delete" => "kibe#delete"
      end
      resource :kibf do
        get "/findAll" => "kibf#index"
        post "/find" => "kibf#find"
        post "/edit" => "kibf#edit"
        post "/create" => "kibf#create"
        post "/delete" => "kibf#delete"
      end
    end
  end

end
