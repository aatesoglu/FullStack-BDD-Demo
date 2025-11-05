class CreateCreditTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :credit_transactions do |t|
      t.integer :transaction_type
      t.integer :amount
      t.integer :balance_after
      t.string :description
      t.references :user, null: false, foreign_key: true
      t.references :project, null: true, foreign_key: true

      t.timestamps
    end
  end
end
