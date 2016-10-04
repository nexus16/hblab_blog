class Api::V1::TagsController < ApplicationController
  before_action :set_tag, only: [:show, :update, :destroy]

  # GET /api/tags
  def index
    @tags = Tag.all
    if params[:q]
      @tags = @tags.where("name like ?", "%#{params[:q]}%")
    end
    render json: @tags
  end

  # GET /api/tags/1
  def show
    render json: @tag
  end

  # POST /api/tags
  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render json: @tag, status: :created
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/tags/1
  def update
    @tag = Tag.find(params[:id])

    if @tag.update(tag_params)
      head :no_content
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/tags/1
  def destroy
    @tag.destroy

    head :no_content
  end

  private

    def set_tag
      @tag = Tag.find_by_name(params[:id])
      if(@tag == nil) 
        head :not_found
      end
    end

    def tag_params
      params.require(:tag).permit(:name)
    end
end
