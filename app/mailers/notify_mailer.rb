class NotifyMailer < ApplicationMailer
  default from: "no-reply@calendar.com"

  def invitation_email
    @guest = params[:guest]
    @url  = "#{ENV['SITE_URL']}/invitation/#{@guest['invite_token']}" 
    mail(to: @guest.email, subject: 'Calendar Invitation Email')
  end

end
