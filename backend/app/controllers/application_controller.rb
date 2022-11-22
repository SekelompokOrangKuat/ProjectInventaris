class ApplicationController < ActionController::API
  def not_found
      render json: { error: 'routes tidak dapat ditemukan, silahkan periksa kembali!' }
    end
  
    def authorize_request
      header = request.headers['Authorization']
      header = header.split(' ').last if header
      begin
        @decoded = JsonWebToken.decode(header)
        @current_user = User.find(@decoded[:user_id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e.message + '. User yang anda cari tidak dapat ditemukan!' }, status: :unauthorized
      rescue JWT::DecodeError => e
        render json: { errors: e.message + ', Silahkan login terlebih dahulu untuk mendapatkan tokennya!' }, status: :unauthorized
      end
  end
end
