class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :created_at, :updated_at, :url

  def url
    id.to_s + '-inch'
  end
end
