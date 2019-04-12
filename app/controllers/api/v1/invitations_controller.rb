class Api::V1::InvitationsController < ApplicationController
  before_action :authorize_request
  before_action :check_user_schedule_access
  before_action :get_invitation, only: [:uninvite]
  

  # '0 => Pending, 1 => Accepted, 2 => Rejected'
  # '0 => Not Notified, 1 => Notified'

  # GET /schedules/:id/guests
  def guests
    @invitations = Invitation.select('id', 'email', 'status', 'is_notified').where({schedule_id: params[:id]}).order('created_at DESC').all
    render json: @invitations, status: :ok
  end

  # GET /schedules/:id/edit
  def edit
    render json: @user_schedule, status: :ok
  end

  # GET /schedules/:id/invitation/:access_token
  # basically see invitation by guests
  # def invitation
  #   render json: @schedule, status: :ok
  # end

  # POST /schedules/:id/invite
  def invite
    final_params = invitation_params
    final_params['schedule_id'] = params[:id]
    final_params['invite_token'] = SecureRandom.hex(20)
    @invitation = Invitation.new(final_params)
    if @invitation.save
      render json: @invitation, status: :created
    else
      validation_error(@invitation)
    end
  end

  # DELETE /schedules/:id/uninvite/:invitation_id
  def uninvite
    if(@invitation.destroy)
      render json: {success: true}, status: :ok
    else 
      validation_error(@invitation)
    end
  end

  # PUT /schedules/:id/invitation/:id
  # accept or reject
  # def invitation
  #   if(@invitation.update(invitation_params))
  #     render json: @invitation, status: :ok
  #   else 
  #     validation_error(@invitation)
  #   end
  # end

  private

  def invitation_params
    # whitelist params
    params.permit(:email)
  end

  def check_user_schedule_access
    begin
      @user_schedule = Schedule.where({user_id: @current_user['id']}).find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { not_found: 'Invalid request, Schedule does not exist' }, status: :not_found
    end
  end

  def get_invitation
    begin
      @invitation = Invitation.joins(:schedule).select("invitations.*").where(schedules: { user_id: @current_user['id'] }).find(params[:invitation_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { not_found: 'Invalid request, Guest not found' }, status: :not_found
    end
  end
end
