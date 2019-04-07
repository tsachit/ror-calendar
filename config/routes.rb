Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, param: :email, :except => [:create]
  post '/auth/login', to: 'users#login'
  post '/auth/register', to: 'users#register'
  get '/*a', to: 'application#not_found'
end
