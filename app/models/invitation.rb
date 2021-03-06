class Invitation < ApplicationRecord
  belongs_to :schedule
  after_update_commit { EventBroadcastJob.perform_later self }

  validates :email, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :email, uniqueness: { scope: :schedule,
    message: "has already been invited." }
end
