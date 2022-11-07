require 'swagger_helper'

RSpec.describe 'api/my', type: :request do
    path '/v1/user/login' do
        post 'Login Member' do
          tags 'Authentication'
          consumes 'application/json'
          produces 'application/json'
          parameter name: :body, in: :body, schema: {
              type: :object,
              properties: {
                  email: {type: :string, example: "tatang123"},
                  password: {type: :string, example: "tatang123"}
              },
              required: []
          }
          response '200', 'Successfull' do
            schema type: :object,
                   properties: {
                       access_token: {type: :string, example: "Access token ini digunakan untuk akses API lain"},
                       data: {type: :object, example: []}
                   }
            run_test!
          end
          response '500', 'Error' do
            schema type: :object,
                   properties: {
                       message: {type: :string, example: "Validation Error"},
                       code: {type: :string, example: "X-400"}
                   }
            run_test!
          end
        end
    end
end
