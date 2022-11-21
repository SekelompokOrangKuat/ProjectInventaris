require 'swagger_helper'

describe 'Pengusulan API' do
  path '/v1/user/pengusulan/create' do
    post 'Create Pengusulan' do
      tags 'Pengusulan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            nomor_register: {type: :string, example: "0001"}, 
            nama_pengusul: {type: :string, example: "Admin Sinbada"},
            jenis_usulan: {type: :string, example: "Pemeliharaan"},
            kondisi_barang: {type: :string, example: "R"},
            foto_barang: {type: :string, example: "img.jpg"}
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

  path '/v1/user/pengusulan/search_penghapusan' do
    post 'Search Pengusulan Penghapusan' do
      tags 'Pengusulan'
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

  path '/v1/user/pengusulan/search_pemeliharaan' do
    post 'Search Pengusulan Pemeliharaan' do
      tags 'Pengusulan'
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

  path '/v1/user/pengusulan/edit' do
    post 'Edit Pengusulan' do
      tags 'Pengusulan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "637923e0e21fac2eb88fd183"},
            nama_pengusul: {type: :string, example: "Pengelola Sinbada"},
            kondisi_barang: {type: :string, example: "RB"},
            foto_barang: {type: :string, example: "Sinbada.svg"},
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

  path '/v1/user/pengusulan/delete' do
    post 'Delete Pengusulan' do
      tags 'Pengusulan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "637923e0e21fac2eb88fd183"}
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

  path '/v1/user/pengusulan/approval' do
    post 'Approval Pengusulan' do
      tags 'Pengusulan'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter in: :formData, name: :id, type: :string, required: true, example: "637923e0e21fac2eb88fd183"
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

  path '/v1/user/pengusulan/find_penghapusan' do
    get 'Find All Pengusulan Penghapusan' do
      tags 'Pengusulan'
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

  path '/v1/user/pengusulan/find_pemeliharaan' do
    get 'Find All Pengusulan Pemeliharaan' do
      tags 'Pengusulan'
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
