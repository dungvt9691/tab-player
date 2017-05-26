class Admin::DashboardController < ApplicationController
  before_action :authenticate_admin!
  layout 'admin_dashboard'
  include I18nHelper
end
