Rails.application.routes.draw do
  resources :posts, only: [:index]

  devise_for :user, only: []

  namespace :v1, defaults: { format: :json } do
    resource :login, only: [:create], controller: :sessions
  end
end
# curl http://127.0.0.1:3000/v1/login --data "user[email]=user@example.com&user[username]=user&user[password]=password&user[password_confirmation]=password"
