class AuthenticationController < ApplicationController
    before_action :authorize_request, except: :login

    def login
        user = User.find_by(:email => params[:email])
        if user.blank?
          render json: { error: 'email salah!, silahkan periksa kembali' }, status: :unauthorized
        else
          if user
            if user.authenticate(params[:password])
                token = JsonWebToken.encode(user_id: user._id)
                time = Time.now + 24.hours.to_i
                render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"), nama: user.nama }, status: :ok
            else
                render json: { error: 'password salah!, silahkan periksa kembali'}, status: :unauthorized
            end
          end
        end
    end

    private

    def login_params
        params.permit(:email, :password)
    end
end
