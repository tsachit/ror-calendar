Rails.application.routes.draw do
  # api routes
  namespace :api do
    # api v1 routes
    namespace :v1 do
      resources :users, param: :email, :except => [:create]
      post '/auth/login', to: 'users#login'
      post '/auth/register', to: 'users#register'
      resources :schedules, path: :schedules do
        collection do
          get ':token/see-invitation', controller: :schedules, action: :seeInvitation 
          get ':id/edit', controller: :invitations, action: :edit 
          get ':id/guests', controller: :invitations, action: :guests 
          post ':id/invite', controller: :invitations, action: :invite 
          delete ':id/uninvite/:invitation_id', controller: :invitations, action: :uninvite 
          put ':token/invitation/:response', controller: :invitations, action: :respond 
        end
      end
    end
  end
  get '/*a', to: 'application#not_found'
end
