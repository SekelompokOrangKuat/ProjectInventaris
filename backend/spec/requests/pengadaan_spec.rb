require 'swagger_helper'

describe 'Pengadaan API' do
  path '/v1/user/pengadaan/create' do
    post 'Create Pengadaan' do
      tags 'Pengadaan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          nama_pengusul: {type: :string, example: "Pengelola Sinbada"},
          foto_barang: {type: :string, example: "img.jpg"},
          kode_lokasi: {type: :string, example: "02.06.01.04.02"},
          nama_barang: {type: :string, example: "Kipas Angin"},
          nomor_register: {type: :string, example: "0001"},
          tipe_barang: {type: :string, example: "Harian"},
          bahan_barang: {type: :string, example: "Plastik"},
          tahun_pembelian: {type: :string, example: "2018"},
          nomor_pabrik: {type: :string, example: "SKDJ1231"},
          nomor_rangka: {type: :string, example: "MHFAB3EM1G0004620"},
          nomor_mesin: {type: :string, example: "2GDC109312"},
          nomor_polisi: {type: :string, example: "D 2019 PTP"},
          asal_usul: {type: :string, example: "APBD"},
          harga_barang: {type: :string, example: "Rp. 150000"},
          keterangan: {type: :string, example: "Barang Baik"},
        },
        required: []
      }
      response '201', 'Created' do
        schema type: :object
        run_test!
      end
      response '422', 'Unprocessable Entity' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Nama pengusul tidak boleh kosong!"},
                response_code: {type: :integer, example: 422}
              }
        run_test!
      end
      response '401', 'Unauthorized' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Tidak memiliki akses!"},
                response_code: {type: :integer, example: 401}
              }
        run_test!
      end
    end
  end

  path '/v1/user/pengadaan/search' do
    post 'Search Pengadaan' do
      tags 'Pengadaan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            keywords: {type: :string, example: "sinbada"},
        },
        required: []
      }
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Unprocessable Entity' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Pengadaan tidak dapat ditemukan!"},
                response_code: {type: :integer, example: 422}
              }
        run_test!
      end
      response '401', 'Unauthorized' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Tidak memiliki akses!"},
                response_code: {type: :integer, example: 401}
              }
        run_test!
      end
    end
  end

  path '/v1/user/pengadaan/edit' do
    post 'Edit Pengadaan' do
      tags 'Pengadaan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "6375eae5e21fac17c48f1612"},
            nama_pengusul: {type: :string, example: "Pengelola Sinbada"},
            foto_barang: {type: :string, example: "Sinbada.svg"},
            kode_lokasi: {type: :string, example: "02.06.01.04.02"},
            nama_barang: {type: :string, example: "Motor"},
            nomor_register: {type: :string, example: "0002"},
            tipe_barang: {type: :string, example: "Harian"},
            bahan_barang: {type: :string, example: "Plastik"},
            tahun_pembelian: {type: :string, example: "2017"},
            nomor_pabrik: {type: :string, example: "SKDJ123SA1"},
            nomor_rangka: {type: :string, example: "MHAS412M1G0004620"},
            nomor_mesin: {type: :string, example: "2GDC109312ASD"},
            nomor_polisi: {type: :string, example: "D 2019 PTP"},
            asal_usul: {type: :string, example: "APBD"},
            harga_barang: {type: :string, example: "Rp. 1700000"},
            keterangan: {type: :string, example: "Barang Baik"},
        },
        required: []
      }
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Unprocessable Entity' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Pengadaan tidak dapat ditemukan!"},
                response_code: {type: :integer, example: 422}
              }
        run_test!
      end
      response '401', 'Unauthorized' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Tidak memiliki akses!"},
                response_code: {type: :integer, example: 401}
              }
        run_test!
      end
    end
  end

  path '/v1/user/pengadaan/delete' do
    post 'Delete Pengadaan' do
      tags 'Pengadaan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "6375eae5e21fac17c48f1612"}
        },
        required: []
      }
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Unprocessable Entity' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Pengadaan tidak dapat ditemukan!"},
                  response_code: {type: :integer, example: 422}
              }
        run_test!
      end
      response '401', 'Unauthorized' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Tidak memiliki akses!"},
                response_code: {type: :integer, example: 401}
              }
        run_test!
      end
    end
  end

  path '/v1/user/pengadaan/approval' do
    post 'Approval Pengadaan' do
      tags 'Pengadaan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter in: :formData, name: :id, type: :string, required: true, example: "63786512e21fac2eb88fd153"
      parameter in: :formData, name: :is_approve, type: :boolean, required: true, example: :true
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Unprocessable Entity' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Pengadaan tidak dapat ditemukan!"},
                response_code: {type: :integer, example: 422}
              }
        run_test!
      end
      response '401', 'Unauthorized' do
        schema type: :object,
        properties: {
          response_message: {type: :string, example: "Tidak memiliki akses!"},
          response_code: {type: :integer, example: 401}
        }
        run_test!
      end
    end
  end

  path '/v1/user/pengadaan/findAll' do
    get 'Find All Pengadaan' do
      tags 'Pengadaan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Unprocessable Entity' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Pengadaan tidak dapat ditemukan!"},
                  response_code: {type: :integer, example: 422}
              }
        run_test!
      end
      response '401', 'Unauthorized' do
        schema type: :object,
              properties: {
                response_message: {type: :string, example: "Tidak memiliki akses!"},
                response_code: {type: :integer, example: 401}
              }
        run_test!
      end
    end
  end
end
