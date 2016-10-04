require 'test_helper'

class ProjectsControllerTest < ActionController::TestCase
  setup do
    @project = projects(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:projects)
  end

  test "should create project" do
    assert_difference('Project.count') do
      post :create, project: { created_by: @project.created_by, description: @project.description, end_at: @project.end_at, logo: @project.logo, name: @project.name, start_at: @project.start_at, status: @project.status, updated_by: @project.updated_by }
    end

    assert_response 201
  end

  test "should show project" do
    get :show, id: @project
    assert_response :success
  end

  test "should update project" do
    put :update, id: @project, project: { created_by: @project.created_by, description: @project.description, end_at: @project.end_at, logo: @project.logo, name: @project.name, start_at: @project.start_at, status: @project.status, updated_by: @project.updated_by }
    assert_response 204
  end

  test "should destroy project" do
    assert_difference('Project.count', -1) do
      delete :destroy, id: @project
    end

    assert_response 204
  end
end
