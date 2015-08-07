module V1
  class PostsController < ApplicationController
    before_action :authenticate_user_from_token!

    def index
      # @users
      # @posts = Post.includes(:user, :comments).page( params['page'] ).per(4)
    end
  end
end
