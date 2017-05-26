class ErrorsController < ApplicationController
  layout 'errors'

  def show
    exception = env['action_dispatch.exception']
    status = ActionDispatch::ExceptionWrapper.new(env, exception).status_code
    case status
    when 403
      render_403(exception)
    when 404
      render_404(exception)
    when 422
      render_422(exception)
    else
      render_error(exception, status)
    end
  rescue
    render 'errors/server_error', status: 500
  end

  protected

  def render_403(ex)
    logger.info("Rendering 403 with exception: #{ex.message}") if ex
    render 'errors/forbidden', status: 403
  end

  def render_404(ex)
    logger.info("Rendering 404 with exception: #{ex.message}") if ex
    render 'errors/not_found', status: 404
  end

  def render_422(ex)
    logger.info("Rendering 422 with exception: #{ex.message}") if ex
    render 'errors/unprocessable_entity', status: 422
  end

  def render_error(ex, status)
    logger.error("Rendering #{status} with exception: #{ex.message}") if ex
    render 'errors/server_error', status: status
  end
end
