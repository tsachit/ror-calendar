class Api::V1::SchedulesController < ApplicationController
  before_action :authorize_request, except: [:seeInvitation]
  before_action :check_user_schedule_access, only: [:update, :destroy]
  before_action :get_schedule, only: [:show]

  # GET /schedules
  def index
    @schedules = Schedule.select('id', 'title', 'description', 'starts_at', 'ends_at').where({user_id: @current_user['id']}).all
    render json: @schedules, status: :ok
  end

  # GET /schedules/:id
  def show
    render json: @schedule, status: :ok
  end

  # POST /schedules
  def create
    final_params = schedule_params
    final_params['user_id'] = @current_user['id']
    @schedule = Schedule.new(final_params)
    if @schedule.save
      render json: @schedule.slice('id', 'title', 'description', 'starts_at', 'ends_at'), status: :created
    else
      validation_error(@schedule)
    end
  end

  # PUT /schedules/:id
  def update
    if(@schedule.update(schedule_params))
      render json: @schedule, status: :ok
    else 
      validation_error(@schedule)
    end
  end

  # DELETE /schedules/:id
  def destroy
    if(@schedule.destroy)
      render json: {success: true}, status: :ok
    else 
      validation_error(@schedule)
    end
  end

  # GET /schedules/:token/seeInvitation
  def seeInvitation
    begin
      @schedule = Schedule.joins(:invitations).select("schedules.*").where(invitations: { invite_token: params[:token] }).first
      if(@schedule) 
        render json: @schedule, status: :ok
      else 
        render json: { not_found: 'Schedule not found' }, status: :not_found
      end
    rescue ActiveRecord::RecordNotFound => e
      render json: { not_found: 'Schedule not found' }, status: :not_found
    end
  end

  private

  def schedule_params
    # whitelist params
    params.permit(:title, :description, :starts_at, :ends_at)
  end

  def check_user_schedule_access
    begin
      @user_schedule = Schedule.where({user_id: @current_user['id']}).find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { not_found: 'Invalid request, Schedule does not exist' }, status: :not_found
    end
  end

  def get_schedule
    begin
      @schedule = Schedule.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { not_found: 'Schedule not found' }, status: :not_found
    end
  end
end
