class Api::V1::UsersController < ApplicationController
  before_action :authorize_request, except: [:register, :login]
  before_action :find_user, except: %i[register login]

  # POST /user/register
  def register
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      validation_error(@user)
    end
  end

  # POST /user/login
  def login
    if !login_param_errors.empty?
      render json: login_param_errors, status: :unauthorized
      return
    end
    @user = User.find_by_email(params[:email])

    if @user
      if @user.authenticate(params[:password])
        token = JsonWebToken.encode(@user.as_json(only: [:id, :username, :email]))
        render json: {success: true, token: token}, status: :ok
      else
        render json: { password: 'Incorrect Password' }, status: :unauthorized
      end
    else
      render json: { email: 'User not found' }, status: :not_found
    end
  end

  # GET /users
  def index
    @users = User.all
    render json: @users, status: :ok
  end

  # GET /users/{username}
  def show
    render json: @user, status: :ok
  end

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  # PUT /users/{username}
  def update
    unless @user.update(user_params)
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  # DELETE /users/{username}
  def destroy
    @user.destroy
  end

  private

  def find_user
    @user = User.find_by_email!(params[:email])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: 'User not found' }, status: :not_found
  end

  def user_params
    params.permit(
      :name, :username, :email, :password, :password_confirmation
    )
  end

  def register_params
    params.permit(:username, :email, :password, :password_confirmation)
  end

  def login_param_errors
    errors = {}
    params[:email] = params[:email].strip
    if params[:email] == ""
      errors[:email] = "Email can't be blank"
    end

    if params[:password] == ""
      errors[:password] = "Password can't be blank"
    end

    return errors
  end
end
