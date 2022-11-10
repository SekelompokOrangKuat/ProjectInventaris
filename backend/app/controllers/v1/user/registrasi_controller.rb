class V1::User::RegistrasiController < ApplicationController
    before_action :authorize_request, except: :create
  
    # GET /users
    def index
        @users = User.all
        render json: @users, status: :ok
    end
  
    def find
        users = User.where(email: params[:email]).first
        if users.blank?
          render json: {error: "User tidak ditemukan"}, status: :unprocessable_entity
        else
          render json: users, status: :ok
        end
    end
  
    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end
  
    def edit
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
                            if not params[:user_role].length == 5 and not params[:user_role].length == 10
                                render json: {error: "User Role harus Pengurus/Admin/SuperAdmin"}, status: :unprocessable_entity
                            else
                                @users.assign_attributes({user_role: user_role, nama: nama, nip: nip, telepon: telepon})
                                @users.save(:validate => false)
                                render json: {succes: @users}, status: :ok
                            end
                        elsif params[:user_role].match(/Pengurus/).present?
                            if not params[:user_role].length == 8
                                render json: {error: "User Role harus Pengurus/Admin/SuperAdmin"}, status: :unprocessable_entity
                            else
                                @users.assign_attributes({user_role: user_role, nama: nama, nip: nip, telepon: telepon})
                                @users.save(:validate => false)
                                render json: {succes: @users}, status: :ok
                            end
                        else 
                            render json: {error: "User Role harus Pengurus/Admin/SuperAdmin"}, status: :unprocessable_entity
                        end
                    else
                        @users.assign_attributes({user_role: user_role, nama: nama, nip: nip, telepon: telepon})
                        @users.save(:validate => false)
                        render json: {succes: @users}, status: :ok
                    end

                    puts params[:user_role]
                rescue Exception => e
                    render json: {error: "edit gagal!"}, status: :unprocessable_entity
                end
            end
        end
    end
    
    # DELETE /users/{username}
    def delete
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
  
    private
  
    def user_params
        params.permit(:email, :password, :password_confirmation, :user_role, :nama, :nip, :telepon)
    end
  end
  