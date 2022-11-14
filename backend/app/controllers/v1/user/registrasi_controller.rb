class V1::User::RegistrasiController < ApplicationController
    before_action :authorize_request
    def index
        #Cek Role
        if role.match(/Admin/).present?
            if not role.length == 5
                render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
            else
                @users = User.all
                if not @users.present?
                    render json: {error: "Tidak ada data!"}, status: :unprocessable_entity
                else
                    render json: @users, status: :ok
                end
            end
        end
    end
  
    def find
        #Cek Role
        if role.match(/Admin/).present?
            if not role.length == 5
                render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
            else
                if params[:email].blank?
                    render json: {error: "Email harus diisi!"}, status: :unprocessable_entity
                else
                    users = User.where(email: params[:email]).first
                    if not users.present?
                      render json: {error: "User tidak ditemukan"}, status: :unprocessable_entity
                    else
                      render json: {success: users}, status: :ok
                    end
                end
            end
        end
    end
  
    def create
        #Cek Role
        if role.match(/Admin/).present?
            if not role.length == 5
                render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
            else
                @user = User.new(user_params)
                if @user.save
                    render json: @user, status: :created
                else
                    render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
                end
            end
        end
    end
  
    def edit
        #Cek Role
        if role.match(/Admin/).present?
            if not role.length == 5
                render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
            else
                if params[:email].blank?
                    render json: {errors: "Email tidak boleh kosong!"}, status: :unprocessable_entity
                else            
                    user_email = User.where(email: params[:email]).first
                    if not user_email.present?
                        render json: {errors: "Email tidak terdaftar!"}, status: :unprocessable_entity
                    else
                        begin
                            user_role = params[:user_role]
                            nama = params[:nama]
                            nip = params[:nip]
                            telepon = params[:telepon]
                            @users = User.find(params[:id])
                            users_db = User.where(email: params[:email]).first
                            if params[:user_role].blank? 
                                user_role = users_db.user_role
                            end
                            if params[:nama].blank?
                                nama = users_db.nama
                            end
                            if params[:nip].blank?
                                nip = users_db.nip
                            end
                            if params[:telepon].blank?
                                telepon = users_db.telepon
                            end
                            
                            if params[:user_role].present?
                                if params[:user_role].match(/Admin/).present?
                                    if not params[:user_role].length == 5
                                        render json: {error: "User Role harus Admin/Pengelola/Pengguna"}, status: :unprocessable_entity
                                    else
                                        @users.assign_attributes({user_role: user_role, nama: nama, nip: nip, telepon: telepon})
                                        @users.save(:validate => false)
                                        render json: {succes: @users}, status: :ok
                                    end
                                elsif params[:user_role].match(/Pengelola/).present? or  params[:user_role].match(/Pengguna/).present?                            
                                    render json: {error: "User Role harus Admin/Pengelola/Pengguna"}, status: :unprocessable_entity
                                else 
                                    render json: {error: "User Role harus Admin/Pengelola/Pengguna"}, status: :unprocessable_entity
                                end
                            else
                                @users.assign_attributes({user_role: user_role, nama: nama, nip: nip, telepon: telepon})
                                @users.save(:validate => false)
                                render json: {succes: @users}, status: :ok
                            end
                        rescue Exception => e
                            render json: {error: "edit gagal, silahkan dicoba kembali!"}, status: :unprocessable_entity
                        end
                    end
                end
            end
        end   
    end

    def delete
        #Cek Role
        if role.match(/Admin/).present?
            if not role.length == 5
                render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
            else
                if params[:email].blank?
                    render json: {error: "Email harus di isi!"}, status: :unprocessable_entity
                else
                    @users = User.where(email: params[:email]).first
                    if not @users.present?
                        render json: {error: "Email tidak terdaftar!"}, status: :unprocessable_entity
                    else
                      @users.destroy
                      render json: {success: "User berhasil dihapus!"}, status: :ok
                    end
                end
            end
        end
    end
  
    private
  
    def user_params
        params.permit(:email, :password, :password_confirmation, :user_role, :nama, :nip, :telepon)
    end
  end
  