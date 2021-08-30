class Notification < ApplicationRecord
    belongs_to :event
    belongs_to :user

    def subject
        event = self.event
        user = self.user
        event_creator = event.creator.username 
        subject =  event_creator.capitalize() +" is invited you to participate in " + event.title.capitalize()
        subject
    end

    def time
        date_format =  '%Y-%m-%d %H:%M:%S'
        time = self.created_at.strftime(date_format)
        time
    end
end
