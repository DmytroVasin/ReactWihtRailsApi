class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :body, :created_at, :updated_at, :url, :strf_created_at

  def ids
    id.to_s + '-inch'
  end

  def strf_created_at
    created_at.strftime("at %I:%M%p")
  end
end
