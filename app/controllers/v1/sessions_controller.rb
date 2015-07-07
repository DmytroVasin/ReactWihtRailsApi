module V1
  class SessionsController < ApplicationController
    skip_before_action :authenticate_user_from_token!

    # POST /v1/login
    def create
      sleep 1 # Emulate big query.

      @user = User.find_for_database_authentication(email: params[:user][:email])

      return invalid_login_attempt unless @user

      if @user.valid_password?(params[:user][:password])
        sign_in :user, @user
      else
        invalid_login_attempt
      end
    end

    private

    def invalid_login_attempt
      warden.custom_failure! # WTF - what is that ???
      render json: { error: t('sessions_controller.invalid_login_attempt') }, status: :unprocessable_entity
    end

  end
end
