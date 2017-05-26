class Contact
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations

  attr_accessor :fullname, :email, :content, :system

  validates :fullname, presence: true
  validates :email, email: true
  validates :content, presence: true

  def persisted?
    false
  end

  def initialize(attributes = {})
    attributes.each do |key, value|
      send("#{key.to_s}=", value) rescue false
    end
  end

  def save
    if self.valid?
      Admin.all.each do |admin|
        Thread.new do
          ContactMailer.contact(self.fullname, admin.email, self.content).deliver_now
        end
      end
      return true
    end
    false
  rescue => e
    self.errors.add(:system, :error)
    false
  end
end