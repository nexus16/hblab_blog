class ApplicationController < ActionController::API
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # before_filter :authenticate_user
  before_action :authenticate

  # include Knock::Authenticable
  protected
    def current_user
      @current_user ||= begin
        token = params[:access_token] || request.headers['X-AUTH-TOKEN'].split.last
        Knock::AuthToken.new(token: token).current_user
      rescue
        nil
      end
    end

    def authenticate
      head :unauthorized unless current_user
    end
  
    def save_login_state
      if request.headers['X-AUTH-TOKEN']
        @current_user = User.find_by_access_token request.headers['X-AUTH-TOKEN']
        if @current_user
          return true
        end
        return false
      end
        return true
    end
    def check_admin
      head :method_not_allowed unless current_user.role == 1 || current_user.role == 2
    end
end
