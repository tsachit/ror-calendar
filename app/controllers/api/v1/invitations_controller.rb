class Api::V1::InvitationsController < ApplicationController
  before_action :authorize_request, except: [:respond]
  before_action :check_user_schedule_access, except: [:respond]
  before_action :get_invitation, only: [:uninvite]
  before_action :modify_guests_response, only: [:respond]
  

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

  # POST /schedules/:id/invite
  def invite
    final_params = invitation_params
    final_params['schedule_id'] = params[:id]
    final_params['invite_token'] = SecureRandom.hex(20)
    @invitation = Invitation.new(final_params)
    if @invitation.save
      if(NotifyMailer.with(guest: @invitation).invitation_email.deliver_now)
        @invitation['is_notified'] = 1
        @invitation.save
      end
      render json: @invitation.slice('id', 'email', 'status', 'is_notified'), status: :created
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

  # PUT /schedules/:id/invitation/:action
  # accept or reject
  def respond
    if(@invitation.update(invitation_params))
      NotifyMailer.with(invitation: @invitation).respond_to_invitation_email.deliver_now
      render json: @invitation, status: :ok
    else 
      validation_error(@invitation)
    end
  end

  private

  def invitation_params
    # whitelist params
    params.permit(:email, :status)
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


  def modify_guests_response
    options = ['accept', 'reject']
    # check if url is valid
    if(options.include? params[:response])
      @invitation = Invitation.where({ invite_token: params[:token] }).first
      # check if invitation row exists
      if(@invitation) 
        # check if already responded
        if (@invitation['status'] != 0)
          render json: { invalid: 'Already responded to this event.' }, status: :bad_request
          return
        end

        # check if accepted or rejected
        if(params[:response] == "accept")
          # accept
          @invitation['status'] = 1;
        else
          # reject
          @invitation['status'] = 2;
        end
      else 
        render json: { not_found: 'Invitation not found' }, status: :not_found
      end
    else 
      render json: { invalid: 'Invalid request, page not found.' }, status: :bad_request
    end
  end

end
