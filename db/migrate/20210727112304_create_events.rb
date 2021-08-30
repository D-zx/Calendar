class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.datetime :start, null: false 
      t.datetime :end
      t.string :color
      t.text :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
