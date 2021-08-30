class Event < ApplicationRecord
  belongs_to :creator, class_name: "User" , foreign_key: :user_id
  
  has_many :event_users, dependent: :destroy
  has_many :participants, through: :event_users, source: :user

  has_many :notifications, dependent: :destroy
end
