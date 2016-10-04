class Api::V1::PosttagController < ApplicationController

  before_action :set_posttag, only: [:show, :update, :destroy]

  # GET /api/posttags
  def index
    @posttags = PostTag.all
    render json: @posttags
  end

  # GET /api/posttags/1
  def show
    render json: @posttag
  end

  # POST /api/posttags
  def create
    @posttag = PostTag.new(posttag_params)

    if @posttag.save
      render json: @posttag, status: :created
    else
      render json: @posttag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/posttags/1
  def update
    @posttag = PostTag.find(params[:id])

    if @posttag.update(posttag_params)
      head :no_content
    else
      render json: @posttag.errors, status: :unprocessable_entity
    end
  end

  
  def destroy
    @posttag.destroy

    head :no_content
  end

  private

    def set_posttag
      @posttag = PostTag.find(params[:id])
      if(@posttag == nil) 
        head :not_found
      end
    end

    def posttag_params
      params.require(:posttag).permit(:post_id,:tag_id)
    end



end
