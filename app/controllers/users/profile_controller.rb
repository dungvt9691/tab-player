class Users::ProfileController < ApplicationController
  before_action :set_tab
  before_action :authenticate_user!
end
