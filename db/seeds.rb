Post.create!([ {title: 'title', body: 'this is a blab'}, {title: 'title 2', body: 'this is a blab 2'} ])

User.create!(
  email: 'user@example.com',
  username: 'user',
  password: 'password',
  password_confirmation: 'password'
)

puts 'Load seeds complite!'
