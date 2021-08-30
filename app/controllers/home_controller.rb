class HomeController < ApplicationController

  def index
    @notification = Notification.where(user: current_user, readed: false)
  end

  def update_noti
    @notification = Notification.find(params[:id])
    @notification.readed = true
    @notification.save
  end
  
end
