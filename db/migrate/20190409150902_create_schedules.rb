class CreateSchedules < ActiveRecord::Migration[5.2]
  def change
    create_table :schedules do |t|
      t.string :title, null: false
      t.text :description
      t.datetime :started_at, null: false
      t.datetime :ended_at, null: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
