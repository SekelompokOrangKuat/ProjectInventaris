require 'swagger_helper'

describe 'Registrasi API' do
  path '/v1/user/registrasi/create' do
    post 'Create User' do
      tags 'Registrasi'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            email: {type: :string, example: "simbada@gmail.com"},
            password: {type: :string, example: "12345678"},
            password_confirmation: {type: :string, example: "12345678"},
            user_role: {type: :string, example: "SuperAdmin"},
            nama: {type: :string, example: "Admin Simbada"},
            nip: {type: :string, example: "019231234329102"},
            telepon: {type: :string, example: "081232132318"},
        },
        required: []
      }
      response '201', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "Email is Already Taken"},
                  code: {type: :string, example: "422"}
              }
        run_test!
      end
      response '500', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "Invalid Header"},
                  code: {type: :string, example: "X-401"}
              }
        run_test!
      end
    end
  end

  path '/v1/user/registrasi/find' do
    post 'Find User' do
      tags 'Registrasi'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            email: {type: :string, example: "tatang@polban.ac.id"},
        },
        required: []
      }
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "User tidak ditemukan!"},
                  code: {type: :string, example: "422"}
              }
        run_test!
      end
      response '500', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "Invalid Header"},
                  code: {type: :string, example: "X-401"}
              }
        run_test!
      end
    end
  end

  path '/v1/user/registrasi/edit' do
    post 'Edit User' do
      tags 'Registrasi'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "636cfd59e21fac2ab08223c3"},
            email: {type: :string, example: "simbada@gmail.com"},
            user_role: {type: :string, example: "SuperAdmin"},
            nama: {type: :string, example: "Admin Simbada"},
            nip: {type: :string, example: "019231234329102"},
            telepon: {type: :string, example: "081232132318"},
        },
        required: []
      }
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "User tidak ditemukan!"},
                  code: {type: :string, example: "422"}
              }
        run_test!
      end
      response '500', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "Invalid Header"},
                  code: {type: :string, example: "X-401"}
              }
        run_test!
      end
    end
  end

  path '/v1/user/registrasi/delete' do
    post 'Delete User' do
      tags 'Registrasi'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            email: {type: :string, example: "simbada@gmail.com"}
        },
        required: []
      }
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "User tidak ditemukan!"},
                  code: {type: :string, example: "422"}
              }
        run_test!
      end
      response '500', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "Invalid Header"},
                  code: {type: :string, example: "X-401"}
              }
        run_test!
      end
    end
  end

  path '/v1/user/registrasi/findAll' do
    get 'Find All User' do
      tags 'Registrasi'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "User tidak ditemukan!"},
                  code: {type: :string, example: "422"}
              }
        run_test!
      end
      response '500', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "Invalid Header"},
                  code: {type: :string, example: "X-401"}
              }
        run_test!
      end
    end
  end
end
