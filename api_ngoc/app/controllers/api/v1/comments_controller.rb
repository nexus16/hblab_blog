class Api::V1::CommentsController < ApplicationController

	before_action :set_comment,  only: [:show, :update, :destroy]


	def index
		@comments = Comment.all
		render json: @comments
	end


	def show
		render json: @comment
	end

	def create
		@comment = Comment.new(comment_params)
		@comment.user_id = current_user.id

		if @comment.save
	      render json: @comment, status: :created
	    else
	      render json: @comment.errors, status: :unprocessable_entity
	    end
	end


	def update
	    @comment = Comment.find(params[:id])

	    if @comment.update(comment_params)
	      head :no_content
	    else
	      render json: @comment.errors, status: :unprocessable_entity
	    end
	  end

	private

		def set_comment
			@comment = Comment.find(params[:id])
		end

		def comment_params  
  			params.require(:comment).permit(:content, :user_id, :post_id)
		end

		
end