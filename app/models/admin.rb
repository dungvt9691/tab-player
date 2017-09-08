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

class Admin < ActiveRecord::Base
  attr_accessor :account, :system
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable,
  :trackable, :validatable, :authentication_keys => [:account]

  has_many :images, dependent: :destroy
  has_many :admin_permissions, dependent: :destroy
  has_many :permissions, through: :admin_permissions, source: :permission

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, multiline: true

  def avatar
    return super if super
    "https://api.adorable.io/avatars/500/#{email.downcase}.png"
  end

  class << self
    include Filter

    def authenticate(username, password)
      admin = Admin.find_for_authentication(:username => username)
      admin.valid_password?(password) ? admin : nil
    end

    def find_for_database_authentication(warden_conditions)
      conditions = warden_conditions.dup
      if account = conditions.delete(:account)
        where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", { value: account.downcase }]).first
      elsif conditions.has_key?(:username) || conditions.has_key?(:email)
        where(conditions.to_h).first
      end
    end

    def filter(params)
      searchable_columns = %w(id email fullname)

      search_scope = search_string(searchable_columns, params)

      if params[:order]
        sortable_columns = {
          '2' => 'email',
          '3' => 'username',
          '4' => 'fullname',
          '5' => 'created_at'
        }

        order_scope = sort_string(sortable_columns, params)
      else
        order_scope = 'created_at desc'
      end

      where(search_scope).order(order_scope)
    rescue => e
      ErrorNotification.send(e)
      Kaminari.paginate_array([])
    end
  end
end
