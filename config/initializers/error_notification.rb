class ErrorNotification
  def self.send(error)
    puts error.message
    # Thread.new { Admin::ErrorsMailer.catch_exception(error).deliver_now }
  end
end
