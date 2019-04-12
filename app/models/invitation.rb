class Invitation < ApplicationRecord
  belongs_to :schedule

  validates :email, presence: true
  validates :email, uniqueness: { scope: :schedule,
    message: "has already been invited." }
end
