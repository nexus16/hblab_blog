class Api::V1::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update, :destroy]
  before_action :check_admin, only: [:create]
  # GET /api/projects
  def index
    if(@current_user.role!=1)
      @projects = @current_user.projects 
    else
      @projects = Project.all
    end
    render json: @projects,:each_serializer => CustomProjectSerializer
  end

  # GET /api/projects/1
  def show
    if grant_show
     render json: @project
    else
      head :not_found
    end
  end

  # POST /api/projects
  def create
    if grant_create
      @project = Project.new(project_params)
      @project.created_by = current_user.id
      @project.updated_by = current_user.id
      if @project.save
        render json: @project, status: :ok
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    else
      head :method_not_allowed
    end
  end

  # PATCH/PUT /api/projects/1
  def update
    if grant_change
      if @project.update(project_params)
        render json: {id: @project.title_id}, status: :ok
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    else
      head :method_not_allowed
    end
  end

  # DELETE /api/projects/1
  def destroy
    if grant_change
      @project.subjects.each do |subject|
        subject.destroy
      end
      @project.project_members.each do |project_member|
        project_member.destroy
      end
      @project.destroy
      head :no_content
    else
      head :method_not_allowed
    end
  end

  private

    def set_project
      @project = Project.find_by_title_id(params[:id])
      if(@project == nil) 
        head :not_found
      end
    end

    def project_params
      params.require(:project).permit(:name, :description, :status, :logo, :start_at, :end_at, :created_by)
    end
    def grant_show
      if(current_user.role == 1)
        return true
      end
      test = ProjectMember.where(project: @project,user: current_user)
      if(test.length == 1)
        return true
      end
      return false
    end
    def grant_change
      if(current_user.role == 1)
        return true
      end
      test = ProjectMember.where(project: @project,user: current_user,leader: 1)
      if(test.length == 1)
        return true
      end
      return false
    end
    def grant_create
      if(current_user.role == 1)
        return true
      end
      return false
    end
end
