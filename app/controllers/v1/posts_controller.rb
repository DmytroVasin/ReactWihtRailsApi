module V1
  class PostsController < ApplicationController
    skip_before_action :authenticate_user_from_token!

    def index
      posts = Post.all

      sleep 1

      # binding.pry

      render json: posts, each_serializer: PostSerializer
    end
  end
end
