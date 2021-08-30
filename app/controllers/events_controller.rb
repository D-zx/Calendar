class EventsController < ApplicationController
  before_action :set_event, only: %i[ show edit update destroy ]
  before_action :authenticate_user!
  
  # GET /events or /events.json
  def index
    @events = Event.includes(:event_users).where(:event_users=> {user_id: current_user}).or(Event.where(creator: current_user))
  end

  # GET /events/1 or /events/1.json
  def show
  end

  # GET /events/new
  def new
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events or /events.json
  def create
    @event = Event.new(event_params)
    @event.creator = current_user
    
    respond_to do |format|
      if @event.save
        participants = @event.participants
        participants.each do |user|
          user.notifications.create(event: @event)
        end
        format.js { flash.now[:notice] = "Event was successfully updated." }
      else
        format.js { flash.now[:notice] = "Event was successfully updated." }
      end
    end
    # if @event.save
    #   redirect_to root_path, notice: "Event was successfully created." 
    # else
    #   redirect_to root_path, notice: "Cannot create event, Please recreate again." 
    # end
  end

  # PATCH/PUT /events/1 or /events/1.json
  def update
    respond_to do |format|
      if @event.creator != current_user
          format.js { flash.now[:error] = "You don't have permission to change that event" }
      else
          old_participant_ids = @event.participant_ids
         
          if @event.update(event_params)
            new_participant_ids = @event.participant_ids
            added_participant_ids = new_participant_ids - old_participant_ids
            removed_participatn_ids = old_participant_ids - new_participant_ids
            added_participant_ids.each do |p|
              @event.notifications.create(user_id: p)
            end
            removed_participatn_ids.each do |p|
              binding.pry
              Notification.where(user_id: p, event_id: @event.id).destroy_all
            end           
            format.html { redirect_to root_path, notice: "Event was successfully updated." } 
            format.js { flash.now[:notice] = "Event was successfully updated." }
          else
            format.html render :edit, status: :unprocessable_entity 
            format.js { flash.now[:error] = "Event update unsuccessful." }
          end
      end
    end
  end

  # DELETE /events/1 or /events/1.json
  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: "Event was successfully destroyed." }
      format.js { flash.now[:notice] = "Event was successfully destroyed." }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:title, :start, :end, :user_ids, :color, :description, participant_ids: [])
    end
end
