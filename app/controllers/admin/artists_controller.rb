class Admin::ArtistsController < ApplicationController
  include I18nHelper
  include Admin::ArtistsHelper
  include Admin::ErrorsHelper

  before_action :authenticate_admin!
  before_action :check_admin_permissions!
  before_action :set_artist, only: [:edit, :update, :destroy]
  before_action :set_page

  layout 'admin_dashboard'

  def index
    @count = Artist.count
    if params[:format] == 'json'
      page = 1
      page = params[:start].to_i / params[:length].to_i + 1 unless params[:start].to_i.zero?


      artists = Artist.filter(params).page(page).per(params[:length].to_i)

      artists_data = []
      artists.each do |artist|
        data = render_artist_as_html(artist)
        artists_data << data
      end

      data = {
        'draw' => params[:draw].to_i,
        'recordsTotal' => artists.count,
        'recordsFiltered' => artists.total_count,
        'data' => artists_data
      }

      render json: data
    end
    if params[:type] == 'search'
      @artists = Artist.search(params[:q]).per(5).records
      render json: @artists.as_json(only: [:id, :name, :avatar_url])
    end
  rescue => e
    ErrorNotification.send(e)
    render_error_or_redirect
  end

  def new
    @artist = Artist.new
  end

  def create
    ActiveRecord::Base.transaction do
      @artist = Artist.new artist_params
      @artist.avatar = decode_base64_image(params[:artist][:avatar])
      @artist.cover = decode_base64_image(params[:artist][:cover])
      if @artist.save
        flash[:success] = t_scope(params, 'success', name: @artist.name)
        redirect_to edit_admin_artist_path(id: @artist.id)
      else
        render 'new'
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @artist = Artist.new
    @artist.errors.add(:system, :error)
    render 'new'
  end

  def update
    ActiveRecord::Base.transaction do
      @artist.avatar = decode_base64_image(params[:artist][:avatar])
      @artist.cover = decode_base64_image(params[:artist][:cover])
      if @artist.update artist_params
        flash[:success] = t_scope(params, 'success', name: @artist.name)
        redirect_to edit_admin_artist_path(id: @artist.id)
      else
        render 'edit'
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @artist.errors.add(:system, :error)
    render 'edit'
  end

  def destroy
    @errors = []
    @params = params
    unless @artist.destroy
      @errors << t_scope(params, 'fail', name: @artist.name)
      @count = Artist.count
    end
  rescue
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  def multi_destroy
    ActiveRecord::Base.transaction do
      @errors = []
      @destroyed_artists = []
      @params = params
      params[:artist_ids].split(',').each do |artist_id|
        artist = begin
                   Artist.find(artist_id)
                 rescue
                   nil
                 end

        if artist.nil?
          @errors << I18n.t('artists.not_found')
          raise ActiveRecord::Rollback
        elsif artist.destroy
          @destroyed_artists << artist
          @count = Artist.count
        else
          @errors << t_scope(params, 'fail', name: artist.name)
          raise ActiveRecord::Rollback
        end
      end
    end
  rescue => e
    ErrorNotification.send(e)
    @errors = I18n.t('alert.system_error')
  end

  private

  def set_artist
    @artist = begin
                Artist.find(params[:id])
              rescue
                nil
              end
    return if @artist

    flash[:error] = I18n.t('artists.not_found')
    redirect_to admin_artist_index_path
  end

  def set_page
    @page = 'artists'
  end

  def artist_params
    params.require(:artist).permit(:name, :name_alias, :birthname)
  end

  def decode_base64_image(data_base64)
    return nil if data_base64.blank?
    return data_base64 unless data_base64.class.to_s == 'String'
    file = Paperclip.io_adapters.for(data_base64)
    file.original_filename = "#{Time.zone.now.to_i}.jpg"
    file.content_type = 'image/jpeg'
    file
  rescue
    data_base64
  end
end
