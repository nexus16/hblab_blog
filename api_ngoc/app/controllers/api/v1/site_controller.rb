class Api::V1::SiteController < ApplicationController
  skip_before_filter :authenticate, :only => [:login]
  before_filter :save_login_state, :only => [:login]
  def login
    authorized_user = User.authenticate(params[:username],params[:password])
    if authorized_user
      render json: {data: authorized_user.as_json(only: [:username, :email, :role, :access_token]), err: 0}
    else
      render json: {error_message: "Invalid Username or Password", err: 1}
    end
  end

  def profile
    render json: @current_user
  end
end