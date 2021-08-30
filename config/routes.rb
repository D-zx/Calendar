Rails.application.routes.draw do
  resources :events
  devise_for :users

  root 'home#index'
  post '/noti/:id', to: 'home#update_noti'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
