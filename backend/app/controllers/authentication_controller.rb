class AuthenticationController < ApplicationController
    before_action :authorize_request, except: :login

    # POST /auth/login
    def login
        user = User.where(email: params[:email]).first
        if user.password == params[:password]
            token = JsonWebToken.encode(user_id: @user.id)
            time = Time.now + 24.hours.to_i
            render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"), nama: @user.nama }, status: :ok
        else
            render json: { error: 'email atau password salah!, silahkan periksa kembali:)'}, status: :unauthorized
        end
    end

    private

    def login_params
        params.permit(:email, :password)
    end
end
