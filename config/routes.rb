Rails.application.routes.draw do
  # api routes
  namespace :api do
    # api v1 routes
    namespace :v1 do
      resources :users, param: :email, :except => [:create]
      post '/auth/login', to: 'users#login'
      post '/auth/register', to: 'users#register'
      resources :schedules
    end
  end
  get '/*a', to: 'application#not_found'
end
