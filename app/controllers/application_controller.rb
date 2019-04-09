class ApplicationController < ActionController::API
  def not_found
    render json: { error: 'not_found' }
  end

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.where(id: @decoded[:id], email: @decoded[:email]).first
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { unauthorized: "You are not authorized." }, status: :unauthorized
    end
  end

  def render_resource(resource)
    if resource.errors.empty?
      render json: resource
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    errors = {}
    resource.errors.each do |attribute, full_messages|
      message = resource.errors[attribute][0]
      errors[attribute] = resource.errors.full_message(attribute, message)
    end
    render status: :bad_request, json: errors
  end
end