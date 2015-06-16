Rails.application.routes.draw do
  # resources :posts, only: [:index]

  devise_for :user, only: []

  namespace :v1, defaults: { format: :json } do
    # concat this resources into one namespace?
    resource :login, only: [:create], controller: :sessions
    resource :signup, only: [:create], controller: :registrations


    resource :about, only: [:show]
    resources :posts, only: [:index]
  end
end
# curl http://127.0.0.1:3000/v1/login --data "user[email]=user@example.com&user[password]=password"
# user@example.com
