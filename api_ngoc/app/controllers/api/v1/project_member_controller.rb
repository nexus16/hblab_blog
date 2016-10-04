class Api::V1::ProjectMemberController < ApplicationController
  before_action :check_admin
  before_action :set_project_member,only: [:show, :update, :destroy]

  def index
    @project_members = ProjectMember.all
    render json: @project_members
  end

  def show
    render json: @project_member
  end

  def create
    @project = Project.find_by_title_id(project_member_params[:project_id])
    @member = User.find_by_id(project_member_params[:user_id])

    if(@project.nil?||@member.nil?)
      render json: {errors: "project or member not found "},status: :unprocessable_entity
    else

      @project_member = ProjectMember.new({"project_id"=>@project.id,"user_id"=>@member.id})
      if @project_member.save
        render json: @project_member, status: :created
      else
        render json: @project_member.errors, status: :unprocessable_entity
      end
    end
  end
  def update
    if(params[:project_member][:leader]==true)
      @leader = ProjectMember.where(:project_id => @project_member[:project_id],:leader => true)
      if @leader.length >= 1
        render json: {status: false,message: "too leader"}
        return true
      
        
      end
    end
    if @project_member.update(project_member_params)
      render json: {status: true}
    else
      render json: @project_member.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @project_member.destroy

    head :no_content
  end
  
  private
  def set_project_member
    @project_member = ProjectMember.find(params[:id])
    if(@project_member==nil)
      head :not_found
    end
  end
  def project_member_params
      params.require(:project_member).permit(:id,:project_id,:leader,:user_id)
  end
end
