# == Schema Information
#
# Table name: admins
#
#  id                      :integer          not null, primary key
#  email                   :string(255)      not null
#  username                :string(255)      not null
#  encrypted_password      :string(255)      not null
#  fullname                :string(255)
#  phone                   :string(255)
#  address                 :string(255)
#  avatar                  :string(255)
#  updated_password        :boolean          default(FALSE)
#  last_update_password_at :datetime
#  reset_password_token    :string(255)
#  reset_password_sent_at  :datetime
#  remember_created_at     :datetime
#  sign_in_count           :integer          default(0), not null
#  current_sign_in_at      :datetime
#  last_sign_in_at         :datetime
#  current_sign_in_ip      :string(255)
#  last_sign_in_ip         :string(255)
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#
# Indexes
#
#  index_admins_on_email                 (email) UNIQUE
#  index_admins_on_reset_password_token  (reset_password_token) UNIQUE
#

require 'test_helper'

class AdminTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
