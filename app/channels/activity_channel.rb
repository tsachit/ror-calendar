class ActivityChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ActivityChannel_#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
