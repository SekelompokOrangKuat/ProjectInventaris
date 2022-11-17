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
  end

  namespace :v1 do
    namespace :ruangan do 
      resource :ruangans do
        get "/findAll" => "ruangans#getAll" 
        post "/create" => "ruangans#create"
        post "/delete" => "ruangans#destroy"
        post "/edit" => "ruangans#editById"
      end
    end
  end

end
