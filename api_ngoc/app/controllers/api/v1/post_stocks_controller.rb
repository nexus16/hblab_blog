class Api::V1::PostStocksController < ApplicationController
  before_action :set_post_stock, only: [:show, :update, :destroy]

  # GET /api/post_stocks
  # GET /api/post_stocks.json
  def index
    @post_stocks = PostStock.all

    render json: @post_stocks
  end

  # GET /api/post_stocks/1
  # GET /api/post_stocks/1.json
  def show
    render json: @post_stock
  end

  # POST /api/post_stocks
  # POST /api/post_stocks.json
  def create
    @post_stock = PostStock.new(post_stock_params)

    if @post_stock.save
      render json: @post_stock, status: :created, location: @post_stock
    else
      render json: @post_stock.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/post_stocks/1
  # PATCH/PUT /api/post_stocks/1.json
  def update
    @post_stock = PostStock.find(params[:id])

    if @post_stock.update(post_stock_params)
      head :no_content
    else
      render json: @post_stock.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/post_stocks/1
  # DELETE /api/post_stocks/1.json
  def destroy
    @post_stock.destroy

    head :no_content
  end

  private

    def set_post_stock
      @post_stock = PostStock.find(params[:id])
    end

    def post_stock_params
      params.require(:post_stock).permit(:post_id, :user_id, :status)
    end
end
