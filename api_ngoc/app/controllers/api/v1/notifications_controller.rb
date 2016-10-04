class Api::V1::NotificationsController < ApplicationController
  before_action :set_notification, only: [:show, :update, :destroy]

  # GET /api/notifications
  # GET /api/notifications.json
  def index
    @notifications = Notification.all

    render json: @notifications
  end

  # GET /api/notifications/1
  # GET /api/notifications/1.json
  def show
    render json: @notification
  end

  # POST /api/notifications
  # POST /api/notifications.json
  def create
    @notification = Notification.new(notification_params)

    if @notification.save
      render json: @notification, status: :created, location: @notification
    else
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/notifications/1
  # PATCH/PUT /api/notifications/1.json
  def update
    @notification = Notification.find(params[:id])

    if @notification.update(notification_params)
      head :no_content
    else
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/notifications/1
  # DELETE /api/notifications/1.json
  def destroy
    @notification.destroy

    head :no_content
  end

  private

    def set_notification
      @notification = Notification.find(params[:id])
    end

    def notification_params
      params.require(:notification).permit(:to_user, :from_user, :post_id, :content, :is_read, :status)
    end
end
