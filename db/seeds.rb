user = User.create!(
  email: 'user@example.com',
  username: 'Dima Vasin',
  password: 'password',
  password_confirmation: 'password'
)

user2 = User.create!(
  email: 'ololosha@gmail.com',
  username: 'Ololosho Ololoev',
  password: 'password',
  password_confirmation: 'password'
)

posts = Post.create!([
  {title: 'Google',                     body: 'this is a blab',                            url: 'http://www.google.com',              user: user},
  {title: 'Ezyrentapp',                 body: 'this is a blab 2',                          url: 'http://ezyrentapp.com/',             user: user},
  {title: 'Vero earum commodi soluta.', body: 'illum animi et neque accusantium',          url: 'http://ezyrentapp.com/',             user: user},
  {title: 'Stack!',                     body: 'Stack Overflow',                            url: 'http://stackoverflow.com/',          user: user2},
  {title: 'Dolores quis quia',          body: 'perspiciatis explicabo possimus doloribus', url: 'http://thiel.com/chauncey_simonis/', user: user2},
  {title: 'Neque aut e',                body: 'Ratione nulla eaque quia molestiae',        url: 'http://example.com/clotilde.swift/', user: user2},
  {title: 'Illo qui voluptas.',         body: 'Depulso animi cunctatio amicitia adficio',  url: 'http://pigment.github.com/',         user: user2},
  {title: 'Google',                     body: 'this is a blab',                            url: 'http://www.google.com',              user: user},
  {title: 'Ezyrentapp',                 body: 'this is a blab 2',                          url: 'http://ezyrentapp.com/',             user: user},
  {title: 'Vero earum commodi soluta.', body: 'illum animi et neque accusantium',          url: 'http://ezyrentapp.com/',             user: user},
  {title: 'Stack!',                     body: 'Stack Overflow',                            url: 'http://stackoverflow.com/',          user: user2},
  {title: 'Dolores quis quia',          body: 'perspiciatis explicabo possimus doloribus', url: 'http://thiel.com/chauncey_simonis/', user: user2},
  {title: 'Neque aut e',                body: 'Ratione nulla eaque quia molestiae',        url: 'http://example.com/clotilde.swift/', user: user2},
  {title: 'Illo qui voluptas.',         body: 'Depulso animi cunctatio amicitia adficio',  url: 'http://pigment.github.com/',         user: user2},
])

Comment.create!([
  {body: 'This is First comment.',        user: user, post: posts.first},
  {body: 'You are reading this comment.', user: user, post: posts.first},
  {body: 'I am first!',                   user: user, post: posts.last},
])

puts 'Load seeds complite!'
