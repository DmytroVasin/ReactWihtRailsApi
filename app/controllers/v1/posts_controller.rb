module V1
  class PostsController < ApplicationController
    skip_before_action :authenticate_user_from_token!

    def index
      posts = Post.all

      sleep 1

      render json: posts, each_serializer: PostSerializer
    end

    def show
      sleep 1
      @post = Post.find(params[:id])

      if @post
        render json: @post, serializer: PostSerializer, root: nil
      else
        # TODO: CHECK MORE DEEPLY
        render json: { error: 'Not Found'}, status: 401
      end
    end

    def create
      # TODO: CURRENT USER! Should be used!
      @post = Post.new(post_params)

      if @post.save
        render json: @post, serializer: PostSerializer, root: nil
      else
        render json: { error: @post.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end

    end

    private
    def post_params
      params.require(:post).permit(:title, :url)
    end
  end
end
