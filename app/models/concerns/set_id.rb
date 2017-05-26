module SetID
  extend ActiveSupport::Concern

  included do
    # Set primary key
    self.primary_key = :id

    before_create :set_id
  end

  protected

  def set_id
    return if id
    self.id = loop do
      random_id = [*('a'..'z'), *('A'..'Z')].sample(11).join
      break random_id unless self.class.exists?(id: random_id)
    end
  end
end
