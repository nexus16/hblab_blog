class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :check_admin, only: [:destroy]
  # GET /api/users
  def index
    @users = User.all

    render json: @users,:each_serializer => CustomUserSerializer
  end

  # GET /api/users/1
  def show
    render json: @user
  end

  # POST /api/users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :ok
    else
      render json: {error_message: @user.errors, err: 1}, status: :ok
    end
  end

  # PATCH/PUT /api/users/1
  def update
    @user = User.find(params[:id])

    if @user.update(user_params_update)
      render json: {id: @user.id}, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/users/1
  def destroy
    @user.destroy

    head :no_content
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:username, :email, :password, :first_name, :last_name, :avatar,:role)
    end

    def user_params_update
      params.require(:user).permit(:email,:password,:first_name,:last_name,:avatar,:role)
    end


end
