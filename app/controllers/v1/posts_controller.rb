class PostsController < ApplicationController
  def index
    posts = Post.all

    # render json: PostSerializer.new(posts).as_json
    render json: posts, each_serializer: PostSerializer
  end
end
