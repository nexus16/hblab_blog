require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:users)
  end

  test "should create user" do
    assert_difference('User.count') do
      post :create, user: { access_token: @user.access_token, auth_key: @user.auth_key, email: @user.email, password_hash: @user.password_hash, password_reset_token: @user.password_reset_token, role: @user.role, status: @user.status, username: @user.username }
    end

    assert_response 201
  end

  test "should show user" do
    get :show, id: @user
    assert_response :success
  end

  test "should update user" do
    put :update, id: @user, user: { access_token: @user.access_token, auth_key: @user.auth_key, email: @user.email, password_hash: @user.password_hash, password_reset_token: @user.password_reset_token, role: @user.role, status: @user.status, username: @user.username }
    assert_response 204
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete :destroy, id: @user
    end

    assert_response 204
  end
end
