require 'test_helper'

class PostStocksControllerTest < ActionController::TestCase
  setup do
    @post_stock = post_stocks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:post_stocks)
  end

  test "should create post_stock" do
    assert_difference('PostStock.count') do
      post :create, post_stock: { post_id: @post_stock.post_id, status: @post_stock.status, user_id: @post_stock.user_id }
    end

    assert_response 201
  end

  test "should show post_stock" do
    get :show, id: @post_stock
    assert_response :success
  end

  test "should update post_stock" do
    put :update, id: @post_stock, post_stock: { post_id: @post_stock.post_id, status: @post_stock.status, user_id: @post_stock.user_id }
    assert_response 204
  end

  test "should destroy post_stock" do
    assert_difference('PostStock.count', -1) do
      delete :destroy, id: @post_stock
    end

    assert_response 204
  end
end
