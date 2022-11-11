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
      response '200', 'Successfull' do
        schema type: :object
        run_test!
      end
      response '401', 'Error' do
        schema type: :object,
              properties: {
                  message: {type: :string, example: "Email salah"},
                  code: {type: :string, example: "422"}
              }
        run_test!
      end
    end
  end
end