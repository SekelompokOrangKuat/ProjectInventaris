class UsersController < ApplicationController
#   before_action :authorize_request, except: :create
#   before_action :find_user, except: %i[create index]

  # GET /users
  def index
      @users = User.all
      render json: @users, status: :ok
  end

  # GET /users/{username}
  def show
      @Users = User.where(_id: params[:id]).first
      if @Users.blank?
        render json: {error: "User tidak ditemukan"}, status: :unprocessable_entity
      else
        render json: @Users, status: :ok
      end
  end

  # POST /users
  def create
      @user = User.new(user_params)
      if @user.save
          render json: @user, status: :created
      else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def edit
    @users = User.find(params[:id])
  end

  def update
    @users = User.find(params[:id])
    @users.update(user_role: params[:user_role], nama: params[:nama], nip: params[:nip], telepon: params[:telepon])
    render json: @users, status: :ok
  end
  
  # DELETE /users/{username}
  def destroy
      @Users = User.where(_id: params[:id]).first
      if @Users.blank?
        render json: {error: "User tidak ditemukan"}, status: :unprocessable_entity
      else
        @Users.destroy
        render json: {success: "User berhasil dihapus!"}, status: :ok
      end
  end

  private

  def user_params
      params.permit(:email, :password, :password_confirmation, :user_role, :nama, :nip, :telepon)
  end
end
