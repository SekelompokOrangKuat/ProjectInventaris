Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  resources :users, param: :_email
  post '/login', to: 'authentication#login'

  namespace :v1 do
    resource :pelaporan do
      get "/barang_kiba/:id" => "pelaporan#barang_kiba"
    end
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
        post "/search_riwayat" => "pengadaan#search_riwayat"
      end
      resource :jadwal do
        get "/findAll" => "jadwal#index"
        post "/edit" => "jadwal#edit"
        post "/create" => "jadwal#create"
        post "/delete" => "jadwal#delete"
        post "/search" => "jadwal#search"
      end
      resource :pengusulan do
        get "/find_penghapusan" => "pengusulan#index_penghapusan"
        get "/find_pemeliharaan" => "pengusulan#index_pemeliharaan"
        post "/create" => "pengusulan#create"
        post "/approval" => "pengusulan#approval"
        post "/edit" => "pengusulan#edit"
        post "/delete" => "pengusulan#delete"
        post "/search_penghapusan" => "pengusulan#search_penghapusan"
        post "/search_pemeliharaan" => "pengusulan#search_pemeliharaan"
        post "/search_riwayat_penghapusan" => "pengusulan#search_riwayat_penghapusan"
        post "/search_riwayat_pemeliharaan" => "pengusulan#search_riwayat_pemeliharaan"
        post "/getBarang" => "pengusulan#getBarang"
      end
    end
    namespace :kib do
      resource :kiba do
        get "/findAll" => "kiba#index"
        post "/edit" => "kiba#edit"
        post "/create" => "kiba#create"
        post "/delete" => "kiba#delete"
        post "/search" => "kiba#search"
        post "/search_riwayat" => "kiba#search_riwayat"
      end
      resource :kibb do
        get "/findAll" => "kibb#index"
        post "/edit" => "kibb#edit"
        post "/create" => "kibb#create"
        post "/delete" => "kibb#delete"
        post "/search" => "kibb#search"
        post "/search_riwayat" => "kibb#search_riwayat"
      end
      resource :kibc do
        get "/findAll" => "kibc#index"
        post "/edit" => "kibc#edit"
        post "/create" => "kibc#create"
        post "/delete" => "kibc#delete"
        post "/search" => "kibc#search"
        post "/search_riwayat" => "kibc#search_riwayat"
      end
      resource :kibd do
        get "/findAll" => "kibd#index"
        post "/edit" => "kibd#edit"
        post "/create" => "kibd#create"
        post "/delete" => "kibd#delete"
        post "/search" => "kibd#search"
        post "/search_riwayat" => "kibd#search_riwayat"
      end
      resource :kibe do
        get "/findAll" => "kibe#index"
        post "/edit" => "kibe#edit"
        post "/create" => "kibe#create"
        post "/delete" => "kibe#delete"
        post "/search" => "kibe#search"
        post "/search_riwayat" => "kibe#search_riwayat"
      end
      resource :kibf do
        get "/findAll" => "kibf#index"
        post "/edit" => "kibf#edit"
        post "/create" => "kibf#create"
        post "/delete" => "kibf#delete"
        post "/search" => "kibe#search"
        post "/search_riwayat" => "kibf#search_riwayat"
      end
    end
    namespace :ruangan do 
      resource :ruangans do
        get "/findAll" => "ruangans#getAll" 
        post "/create" => "ruangans#create"
        post "/delete" => "ruangans#destroy"
        post "/edit" => "ruangans#editById"
        post "/search" => "ruangans#search"
      end
      resource :kir do
        post "/findbyruangan" => "kir#getByRuangan"
        post "/search_kir" => "kir#search_kir"
      end
    end
    namespace :peminjaman do 
      resource :peminjamans do
        get "/findAll" => "peminjamans#getPeminjaman" 
        post "/create" => "peminjamans#create"
        post "/delete" => "peminjamans#destroy"
        post "/edit" => "peminjamans#editById"
        post "/search_peminjaman" => "peminjamans#search_peminjaman"
      end
    end
    namespace :pengelola do
      resource :mutasi do
        get "/findAll" => "mutasi#index"
        get "/findAllkodebarang" => "mutasi#get_all_kode_barang"
        post "/get_noreg" => "mutasi#get_nomor_register"
        post "/get_barang" => "mutasi#get_barang"
        post "/create" => "mutasi#create"
        post "/edit" => "mutasi#edit"
        post "/delete" => "mutasi#delete"
        post "/search" => "mutasi#search"
      end
    end
    namespace :admin do
      resource :kb do
        get "/findAll" => "kb#index"
        post "/create" => "kb#create"
        post "/edit" => "kb#edit"
        post "/delete" => "kb#delete"
        post "/search" => "kb#search"
      end
      resource :skpd do
        get "/findAll" => "skpd#index"
        post "/create" => "skpd#create"
        post "/edit" => "skpd#edit"
        post "/delete" => "skpd#edit"
        post "/findBy" => "skpd#search"
      end
    end
  end
end
