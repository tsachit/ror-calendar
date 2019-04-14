class AddRegistrationTokenToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :registration_token, :string, :after => :password_digest
  end
end
