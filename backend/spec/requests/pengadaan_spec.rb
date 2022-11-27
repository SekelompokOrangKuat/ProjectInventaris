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
          spesifikasi_barang: {type: :string, example: "-"},
          foto_barang: {type: :string, example: "img.jpg"},
          nama_ruangan: {type: :string, example: "02.001 KEPALA BIDANG GTK"},
          kode_barang: {type: :string, example: "1.3.2.10.02.03.003"},
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          nama_barang: {type: :string, example: "Printer"},
          nomor_register: {type: :string, example: "0001"},
          tipe_barang: {type: :string, example: "Epson L1455"},
          ukuran_barang: {type: :string, example: "220 W"},
          bahan_barang: {type: :string, example: "Ebonit"},
          tahun_pembelian: {type: :string, example: "2020"},
          nomor_pabrik: {type: :string, example: "Epson"},
          nomor_rangka: {type: :string, example: "Z87464539Y"},
          nomor_mesin: {type: :string, example: "-"},
          nomor_polisi: {type: :string, example: "-"},
          nomor_bpkb: {type: :string, example: "-"},
          asal_usul: {type: :string, example: "APBD"},
          harga_barang: {type: :string, example: "22.330.000"},
          keterangan: {type: :string, example: "-"},
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
            keywords: {type: :string, example: "Jeep"},
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

  path '/v1/user/pengadaan/search_riwayat' do
    post 'Search Riwayat Pengadaan' do
      tags 'Pengadaan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            keywords: {type: :string, example: "Jeep"},
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
            id: {type: :string, example: "638235b0e21fac0354b16976"},
            nama_pengusul: {type: :string, example: "Admin Sinbada"},
            spesifikasi_barang: {type: :string, example: "-"},
            foto_barang: {type: :string, example: "img.jpg"},
            nama_ruangan: {type: :string, example: "02.001 KEPALA BIDANG GTK"},
            kode_barang: {type: :string, example: "1.3.2.01.03.05.010"},
            kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
            nama_barang: {type: :string, example: "Portable Generating Set"},
            nomor_register: {type: :string, example: "0001"},
            tipe_barang: {type: :string, example: "Genset"},
            ukuran_barang: {type: :string, example: "150 KVA"},
            bahan_barang: {type: :string, example: "Besi"},
            tahun_pembelian: {type: :string, example: "2021"},
            nomor_pabrik: {type: :string, example: "Canghong"},
            nomor_rangka: {type: :string, example: "A15438GH7"},
            nomor_mesin: {type: :string, example: "-"},
            nomor_polisi: {type: :string, example: "-"},
            nomor_bpkb: {type: :string, example: "-"},
            asal_usul: {type: :string, example: "APBD"},
            harga_barang: {type: :string, example: "193.600.000"},
            keterangan: {type: :string, example: "-"},
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
            id: {type: :string, example: "638235b0e21fac0354b16976"}
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
      parameter in: :formData, name: :id, type: :string, required: true, example: "638235b0e21fac0354b16976"
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
                response_message: {type: :string, example: "Tidak ada data!"},
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
