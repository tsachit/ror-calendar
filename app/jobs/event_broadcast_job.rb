class EventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(*args)
    @invitation = args[0]
    if @invitation.status != 0

      statusType = "rejected"
      if @invitation.status == 1
        statusType = "accepted"
      end
    
      message = "#{@invitation.email} has #{statusType} to your invitation for #{@invitation.schedule.title}"
      ActionCable.server.broadcast "activity_channel-#{@invitation.schedule.user_id}", message: message
    end
  end
  
end
