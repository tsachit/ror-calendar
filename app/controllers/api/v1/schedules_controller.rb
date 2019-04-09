class Api::V1::SchedulesController < ApplicationController
  before_action :authorize_request

  # POST /schedules
  def create
    final_params = schedule_params
    final_params['user_id'] = @current_user['id']
    @schedule = Schedule.new(final_params)
    if @schedule.save
      render json: @schedule, status: :created
    else
      validation_error(@schedule)
    end
  end

  private

  def schedule_params
    # whitelist params
    params.permit(:title, :description, :starts_at, :ends_at)
  end
end
