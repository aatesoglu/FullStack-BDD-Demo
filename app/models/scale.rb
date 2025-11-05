class Scale < ApplicationRecord
  # Enums - Rails 7+ syntax
  enum :status, { draft: 0, published: 1, archived: 2 }

  # Associations
  belongs_to :user, optional: true
  has_many :scale_items, dependent: :destroy
  has_many :surveys, dependent: :destroy

  # Validations
  validates :title, presence: true
  validates :language, presence: true
  validates :status, presence: true
  validates :item_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true

  # Callbacks
  before_save :update_item_count

  # Methods
  def published?
    status == "published"
  end

  def can_be_used?
    published? && scale_items.any?
  end

  private

  def update_item_count
    self.item_count = scale_items.count
  end
end