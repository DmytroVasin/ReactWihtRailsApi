module V1
  class RegistrationsController < ApplicationController
    before_action :check_if_user_login
    skip_before_action :authenticate_user_from_token!

    # POST /v1/signup
    def create
      sleep 1 # Emulate big query.

      @user = User.where(email: params[:user][:email])
      if @user.any?
        render json: { error: 'This email already in use'}, status: 401
        return
      end

      @user = User.new(
        email: params[:user][:email],
        username: params[:user][:user_name],
        password: params[:user][:password]
      )

      if @user.save
        sign_in :user, @user # это делаеться для получения Authorized?
        render json: @user, serializer: SessionSerializer, root: nil
      else
        render json: { error: @user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end


    private
    def check_if_user_login
      auth_token = request.headers['Authorization']

      if auth_token
        render json: { error: 'You already signed in'}, status: 401  # Already signed in.
      end
    end
  end
end
