class Admin::ImagesController < ApplicationController
  include Admin::ImagesHelper
  include Admin::ErrorsHelper
  include I18nHelper

  before_action :authenticate_admin!
  before_action :set_image, only: [:destroy]
  layout 'admin_dashboard'

  def index
    @count = Image.count
    if params[:format] == 'json'
      page = 1
      page = params[:start].to_i / params[:length].to_i + 1 unless params[:start].to_i.zero?

      images = current_admin.images.filter(params).page(page).per(params[:length].to_i)
      images_data = []
      images.each do |image|
        data = render_image_as_html(image)
        images_data << data
      end

      data = {
        'draw' => params[:draw].to_i,
        'recordsTotal' => images.count,
        'recordsFiltered' => images.total_count,
        'data' => images_data
      }

      render json: data
    else
      respond_to do |format|
        format.html
        format.js do
          @images = current_admin.images.page(params[:page]).per(12)
          @count  = @images.total_count
          @images = @images.group_by { |x| x.created_at.strftime('%d/%m/%Y') }
        end
      end
    end
  rescue => e
    ErrorNotification.send(e)
    render_error_or_redirect
  end

  def create
    @image = current_admin.images.new image_params

    data = if @image.save
             {
               id: @image.id,
               s200: @image.attachment_url(:s200),
               s420: @image.attachment_url(:s420),
               s500: @image.attachment_url(:s500),
               original: @image.attachment_url(:original)
             }
           else
             {
               name: image_params['attachment'].original_filename,
               errors: @image.errors.full_messages
             }
           end

    render json: data
  end

  def destroy
    @params = params
    @errors = []
    @filename = @image.attachment_file_name
    unless @image.destroy
      @errors << t_scope(params, 'fail', name: @filename)
    end
  rescue => e
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  def multi_destroy
    ActiveRecord::Base.transaction do
      @params = params
      @errors = []
      @destroyed_images = []
      params[:image_ids].split(',').each do |image_id|
        image = begin
                  current_admin.images.find(image_id)
                rescue
                  nil
                end

        filename = image.attachment_file_name if image

        if image.nil?
          @errors << I18n.t('images.not_found')
          raise ActiveRecord::Rollback
        elsif image.destroy
          @destroyed_images << OpenStruct.new(id: image.id, attachment_file_name: filename)
        else
          @errors << t_scope(params, 'fail', name: image.attachment_file_name)
          raise ActiveRecord::Rollback
        end
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  private

  def set_image
    @image  = current_admin.images.find(params[:id])
  rescue
    nil
  end

  def image_params
    params.require(:image).permit(:attachment)
  end
end
