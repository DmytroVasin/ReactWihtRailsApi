user = User.create!(
  email: 'user@example.com',
  username: 'Dima Vasin',
  password: 'password',
  password_confirmation: 'password'
)

Post.create!([
  {title: 'Google', body: 'this is a blab', url: 'http://www.google.com', user: user},
  {title: 'Ezyrentapp', body: 'this is a blab 2', url: 'http://ezyrentapp.com/', user: user},
])

puts 'Load seeds complite!'
