require 'swagger_helper'

describe 'Authentication API' do
  path '/login' do
    post 'Login' do
      tags 'Authentication'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            email: {type: :string, example: "simbada@gmail.com"},
            password: {type: :string, example: "12345678"},
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
end