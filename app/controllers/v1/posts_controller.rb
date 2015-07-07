module V1
  class PostsController < ApplicationController
    before_action :authenticate_user_from_token!

    def index
      @posts = Post.includes(:user, :comments).page( params['page'] ).per(4)
    end

    def show
      sleep 1
      @post = Post.find(params[:id])

      if @post
        # render json: @post, serializer: PostSerializer, root: nil
        # We use there jBuilder.
      else
        # TODO: CHECK MORE DEEPLY
        render json: { error: 'Not Found'}, status: 401
      end
    end

    def create
      @post = Post.new( post_params.merge({ user: current_user }) )

      if @post.save
        # We use there jBuilder.
      else
        # TODO: CHECK MORE DEEPLY
        render json: { error: @post.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end

    end

    private
    def post_params
      params.require(:post).permit(:title, :url)
    end
  end
end
