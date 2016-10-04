class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy, :preview]
  # GET /api/posts
  def index
    #lay so bai post thuoc project tham gia va cac post public subject_id = 0
    #neu la admin thi hien tat ca
    if(@current_user.role != 1)
      @projects = @current_user.projects
      @subjects  = Subject.select("id").where(project: @projects)
      @posts   = Post.where("subject_id IN (?) OR `subject_id` IS NULL", @subjects)
    else
      @posts = Post.all
    end
    if !params[:sort].nil?
      if !params[:order].nil?
        @posts = @posts.order(params[:sort] + " " + params[:order])
      else
        @posts = @posts.order(params[:sort])
      end
    end
    paginate json: @posts,:each_serializer => CustomPostSerializer
  end

  # GET /api/posts/1
  def show
    #@post = Post.find_by_title_id(params[:id])
    if(grant_show)
      @post.role = grant_change 
      render json: @post
    else
      head  :not_found
    end
  end

  # POST /api/posts
  def create
    @post = Post.new(post_params)
    @post.created_by = @current_user.id
    @post.updated_by = @current_user.id
    if !@post.valid?
      render json: @post.errors.full_messages, status: :unprocessable_entity
    else
      if @post.save
        render json: @post, status: :ok
      else
        render json: @post.errors.full_messages, status: :unprocessable_entity
      end
    end
  end
  # PATCH/PUT /api/posts/1
  def update
    if grant_change
      if @post.update(post_params)
        #change private to public
        if !post_params['subject_id'] 
          @post.update({subject_id: nil})
        end
        render json: {id: @post.title_id}, status: :ok
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    else
      head :method_not_allowed
    end
  end
  # DELETE /api/posts/1
  def destroy
    if grant_change
      @post.destroy
      head :no_content
    else
      head :method_not_allowed
    end
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find_by_title_id(params[:id])
      if(@post == nil) 
        head :not_found
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title,:short_content, :title_id, :content, :created_by,:avatar,:subject_id)
    end
    def grant_show
      #public
      if(@post.subject == nil)
        return true
      end
      #La admin or created_user
      if(@current_user == @post.created_user||@current_user.role == 1)
        return true
      end
      #La member cua project ma post thuoc ve
      project = @post.subject.project
      test = ProjectMember.select("id").where(project: project,user: @current_user)
      if(test.length==1)
        return true
      end
      return false;
    end
    def grant_change
      #La admin or created_user
      if(@current_user == @post.created_user||@current_user.role == 1)
        return true
      end
      #La leader cua project ma post thuoc ve
      if(@post.subject!=nil)
        project = @post.subject.project
        test = ProjectMember.select("id").where(project: project,user: @current_user,leader: 1)
        p test
        if(test.length==1)
          return true
        end
      end
      return false;
    end
end
