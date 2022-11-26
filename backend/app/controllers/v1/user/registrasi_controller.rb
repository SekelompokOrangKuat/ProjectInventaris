class V1::User::RegistrasiController < ApplicationController
    before_action :authorize_request
    def index
        #Cek Role
        if not role.match(/Admin/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            @users = User.all
            if not @users.present?
                render json: {
                    response_code: 422, 
                    response_message: "Tidak ada data!"
                    }, status: :unprocessable_entity
            else
                render json: {
                    response_code: 200, 
                    response_message: "Success", 
                    data: @users
                    }, status: :ok
            end
        end
    end
  
    def create
        #Cek Role
        if not role.match(/Admin/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            @user = User.new(user_params)
            if @user.save
                render json: {
                    response_code: 201, 
                    response_message: "Success", 
                    data: @user
                    }, status: :created
            else
                render json: {
                    response_code: 422,
                    response_message: @user.errors.full_messages
                    }, status: :unprocessable_entity
            end
        end
    end
  
    def edit
        #Cek Role
        if not role.match(/Admin/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            if params[:email].blank?
                render json: {
                    response_code: 422, 
                    response_message: "Email tidak boleh kosong!"
                    }, status: :unprocessable_entity
            else            
                user_email = User.where(email: params[:email]).first
                if not user_email.present?
                    render json: {
                        response_code: 422, 
                        response_message: "Email tidak terdaftar!"
                        }, status: :unprocessable_entity
                else
                    begin
                        user_role = params[:user_role]
                        nama = params[:nama]
                        nip = params[:nip]
                        telepon = params[:telepon]
                        users = User.where(email: params[:email]).first
                        if params[:user_role].blank? 
                            user_role = users.user_role
                        else
                            is_trigger = false
                            if params[:user_role].match(/Admin/).present?
                                if params[:user_role].length == 5
                                    is_trigger = true
                                else
                                    render json: {
                                        response_code: 422, 
                                        response_message: "User Role harus Admin/Pengelola/Pengguna"
                                        }, status: :unprocessable_entity
                                end
                            elsif params[:user_role].match(/Pengelola/).present?                            
                                if params[:user_role].length == 9
                                    is_trigger = true
                                else
                                    render json: {
                                        response_code: 422, 
                                        response_message: "User Role harus Admin/Pengelola/Pengguna"
                                        }, status: :unprocessable_entity
                                end
                            elsif params[:user_role].match(/Pengguna/).present?
                                if params[:user_role].length == 8
                                    is_trigger = true
                                else
                                    render json: {
                                        response_code: 422, 
                                        response_message: "User Role harus Admin/Pengelola/Pengguna"
                                        }, status: :unprocessable_entity
                                end
                            end
                        end
                        if params[:nama].blank?
                            nama = users.nama
                        end
                        if params[:nip].blank?
                            nip = users.nip
                        end
                        if params[:telepon].blank?
                            telepon = users.telepon
                        end
                        
                        if is_trigger == true
                            users.assign_attributes({user_role: user_role, nama: nama, nip: nip, telepon: telepon})
                            if users.save(:validate => false)
                                render json: {
                                    response_code: 200, 
                                    response_message: "Success", 
                                    data: users
                                    }, status: :ok
                            else
                                render json: {
                                    response_code: 422, 
                                    response_message: "Edit gagal!, silahkan di coba kembali"
                                    }, status: :unprocessable_entity
                            end
                        end
                            
                    rescue Exception => e
                        render json: {
                            response_code: 422, 
                            response_message: "edit gagal, silahkan dicoba kembali!"
                            }, status: :unprocessable_entity
                    end
                end
            end
        end   
    end

    def delete
        #Cek Role
        if not role.match(/Admin/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            if params[:email].blank?
                render json: {
                    response_code: 422, 
                    response_message: "Email tidak boleh kosong!"
                    }, status: :unprocessable_entity
            else
                @users = User.where(email: params[:email]).first
                if not @users.present?
                    render json: {
                        response_code: 422, 
                        response_message: "Email tidak terdaftar!"
                        }, status: :unprocessable_entity
                else
                    @users.destroy
                    render json: {
                        response_code: 200, 
                        response_message: "Success"
                        }, status: :ok
                end
            end
        end
    end

    def search
        #Cek Role
        if not role.match(/Admin/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            @search = User.all.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
            if not @search.present?
                render json: {
                    response_code: 422, 
                    response_message: "Keyword tidak dapat ditemukan!"
                    }, status: :unprocessable_entity
            else
                render json: {response_code: 200, 
                    response_message: "Success", 
                    data: @search
                    }, status: :ok
            end
        end
    end
  
    private
  
    def user_params
        params.permit(:email, :password, :password_confirmation, :user_role, :nama, :nip, :telepon)
    end
  end
  