class AuthenticationController < ApplicationController
    before_action :authorize_request, except: :login

    def login
        user = User.where(email: params[:email]).first
        if user.blank?
          render json: { 
            response_code: 401, 
            response_message: 'email salah!, silahkan periksa kembali' 
            }, status: :unauthorized
        else
          if user
            if user.authenticate(params[:password])
                token = JsonWebToken.encode(user_id: user._id)
                time = Time.now + 24.hours.to_i
                render json: { 
                  response_code: 200, 
                  response_message:'Success!', 
                  data: {user: user, token_access: token, exp: time.strftime("%m-%d-%Y %H:%M")} 
                  }, status: :ok
            else
                render json: { 
                  response_code: 401, 
                  response_message: 'Password salah!, silahkan periksa kembali'
                  }, status: :unauthorized
            end
          end
        end
    end

    private

    def login_params
        params.permit(:email, :password)
    end
end
