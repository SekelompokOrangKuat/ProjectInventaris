require 'swagger_helper'

RSpec.describe 'users', type: :request do

  path '/users' do
    post('Create User') do
      tags 'User'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            email: {type: :string, example: "tatang@polban.ac.id"},
            password: {type: :string, example: "tatang123"},
            password_confirmation: {type: :string, example: "tatang123"},
            user_role: {type: :string, example: "Pengurus"},
            nama: {type: :string, example: "Tatang"},
            nip: {type: :string, example: "195808181984041001"},
            telepon: {type: :string, example: "08253442516"},
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

    get('Show User') do
      tags 'User'
      consumes 'application/json'
      produces 'application/json'
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "User tidak ditemukan"},
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
  
  path '/users/{id}' do
    get('Get User By Id') do
      tags 'User'
      consumes 'application/json'
      produces 'application/json'
      operationId 'getUserById'
      parameter name: :id, in: :path, required: :true, schema: {
        type: :string
      }
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "User tidak ditemukan"},
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
    delete('Delete User By Id') do
      tags 'User'
      consumes 'application/json'
      produces 'application/json'
      operationId 'deleteUserById'
      parameter name: :id, in: :path, required: :true, schema: {
        type: :string
      }
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '422', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "User tidak ditemukan"},
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
    put('Edit/Update Users') do
      tags 'User'
      consumes 'application/json'
      produces 'application/json'
      operationId 'updateUserById'
      parameter name: :id, in: :path, required: :true, schema: {
        type: :string
      }
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            email: {type: :string, example: "tatang@polban.ac.id"},
            user_role: {type: :string, example: "Pengurus"},
            nama: {type: :string, example: "Tatang"},
            nip: {type: :string, example: "195808181984041001"},
            telepon: {type: :string, example: "08253442516"},
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
                  message: {type: :string, example: "User tidak ditemukan"},
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
  path '/login' do
    post('Login') do
      tags 'Login'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            email: {type: :string, example: "tatangs@gmail.com"},
            password: {type: :string, example: "tatang123"}
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
end

