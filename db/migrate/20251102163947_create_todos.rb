class CreateTodos < ActiveRecord::Migration[8.1]
  def change
    create_table :todos do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :completed, default: false
      t.string :category
      t.date :due_date

      t.timestamps
    end
  end
end

