class LoginService
    def login(params)
      if params[:email].blank? or params[:password].blank?
        raise "Email dan password harus diisi"
      end
      data_member = UsersModel.where(id: params[:id]).first
      if data_member.password != params[:password] 
        raise "Password tidak sesuai"
      else
        return Enums::Login::BERHASIL
      end
    end
end