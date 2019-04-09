class CreateInvitations < ActiveRecord::Migration[5.2]
  def change
    create_table :invitations do |t|
      t.string :email, null: false
      t.integer :status, null: false, comment: '0 => Pending, 1 => Accepted, 2 => Rejected', :default => 0, :limit => 1
      t.integer :is_notified, null: false, comment: '0 => Not Notified, 1 => Notified', :default => 0, :limit => 1
      t.string :invite_token
      t.references :schedule, foreign_key: true

      t.timestamps
    end
  end
end
