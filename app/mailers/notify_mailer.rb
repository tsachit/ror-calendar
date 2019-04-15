class NotifyMailer < ApplicationMailer
  default from: "no-reply@calendar.com"

  def confirm_registration_email
    @user = params[:user]
    @url  = "#{ENV['SITE_URL']}/confirmation/#{@user['registration_token']}" 
    mail(to: @user.email, subject: 'Registration Confirmation Email')
  end

  def invitation_email
    @guest = params[:guest]
    @url  = "#{ENV['SITE_URL']}/invitation/#{@guest['invite_token']}" 
    mail(to: @guest.email, subject: 'Calendar Invitation Email')
  end

  def respond_to_invitation_email
    @invitation = params[:invitation]
    @url  = "#{ENV['SITE_URL']}/event/#{@invitation['schedule_id']}" 
    @responder = @invitation.email
    @inviter = @invitation.schedule.user.email

    @custom_message = "Unfortunately the #{@responder} has rejected your invitation to the following event"
    if(@invitation['status'] == 1)
      @custom_message = "Hooray! the #{@responder} has accepted your invitation to the following event"
    end
    
    mail(to:@inviter, subject: 'Response to Calendar Invitation Email')
  end

end
