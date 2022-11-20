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
        post "/edit" => "registrasi#edit"
        post "/create" => "registrasi#create"
        post "/delete" => "registrasi#delete"
        post "/search" => "registrasi#search"
      end
      resource :pengadaan do
        get "/findAll" => "pengadaan#index"
        post "/create" => "pengadaan#create"
        post "/approval" => "pengadaan#approval"
        post "/edit" => "pengadaan#edit"
        post "/delete" => "pengadaan#delete"
        post "/search" => "pengadaan#search"
      end
      resource :jadwal do
        get "/findAll" => "jadwal#index"
        post "/edit" => "jadwal#edit"
        post "/create" => "jadwal#create"
        post "/delete" => "jadwal#delete"
        post "/search" => "jadwal#search"
      end
    end
    namespace :kib do
      resource :kiba do
        get "/findAll" => "kiba#index"
        post "/edit" => "kiba#edit"
        post "/create" => "kiba#create"
        post "/delete" => "kiba#delete"
        post "/search" => "kiba#search"
      end
      resource :kibb do
        get "/findAll" => "kibb#index"
        post "/edit" => "kibb#edit"
        post "/create" => "kibb#create"
        post "/delete" => "kibb#delete"
        post "/search" => "kibb#search"
      end
      resource :kibc do
        get "/findAll" => "kibc#index"
        post "/edit" => "kibc#edit"
        post "/create" => "kibc#create"
        post "/delete" => "kibc#delete"
        post "/search" => "kibc#search"
      end
      resource :kibd do
        get "/findAll" => "kibd#index"
        post "/edit" => "kibd#edit"
        post "/create" => "kibd#create"
        post "/delete" => "kibd#delete"
        post "/search" => "kibd#search"
      end
      resource :kibe do
        get "/findAll" => "kibe#index"
        post "/edit" => "kibe#edit"
        post "/create" => "kibe#create"
        post "/delete" => "kibe#delete"
        post "/search" => "kibe#search"
      end
      resource :kibf do
        get "/findAll" => "kibf#index"
        post "/edit" => "kibf#edit"
        post "/create" => "kibf#create"
        post "/delete" => "kibf#delete"
        post "/search" => "kibe#search"
      end
    end
  end
end
