json.id              @post.id
json.title           @post.title
json.body            @post.body
json.url             @post.url
json.strf_created_at @post.created_at.strftime('at %I:%M%p')
json.author_name     @post.user.username
