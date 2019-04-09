class Schedule < ApplicationRecord
  belongs_to :user
  has_many :invitations, dependent: :destroy
  validates :title, presence: true
  validates_datetime :starts_at
  validates :starts_at, presence: true
  validates_datetime :ends_at
  validates :ends_at, presence: true
end
