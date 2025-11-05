class User < ApplicationRecord
  has_secure_password

  # Enums - Rails 7+ syntax
  enum :role, { researcher: 0, clinician: 1, student: 2, admin: 3 }

  # Associations
  has_many :projects, dependent: :destroy
  has_many :credit_transactions, dependent: :destroy
  has_many :scales, dependent: :destroy

  # Validations
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :role, presence: true
  validates :credits_balance, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  # Callbacks
  before_validation :set_default_credits, on: :create
  before_validation :set_default_role, on: :create

  # Methods
  def add_credits(amount, description = nil)
    transaction do
      increment!(:credits_balance, amount)
      credit_transactions.create!(
        transaction_type: :purchase,
        amount: amount,
        balance_after: credits_balance,
        description: description || "Credit purchase"
      )
    end
  end

  def can_afford?(amount)
    (credits_balance || 0) >= amount
  end

  private

  def set_default_credits
    self.credits_balance ||= 0
  end

  def set_default_role
    self.role ||= :researcher
  end
end