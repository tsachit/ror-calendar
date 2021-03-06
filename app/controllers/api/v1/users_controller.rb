class Api::V1::UsersController < ApplicationController
  before_action :authorize_request, except: [:register, :login, :confirm_registration]
  before_action :find_user, except: %i[register login confirm_registration]

  # POST /user/register
  def register
    final_params = user_params
    # final_params['email'] = final_params['email'].downcase
    final_params['registration_token'] = SecureRandom.hex(20)
    @user = User.new(final_params)
    
    if @user.save
      NotifyMailer.with(user: @user).confirm_registration_email.deliver_now
      render json: @user, status: :created
    else
      validation_error(@user)
    end
  end

  def confirm_registration
    @user = User.where(registration_token: params[:registration_token]).first
    if @user
      @user['registration_token'] = nil
      if @user.save
        return render json: {success: true}, status: :ok
      else
        validation_error(@user)
      end
    else
      return render json: { email: 'User not found' }, status: :not_found
    end
  end

  # POST /user/login
  def login
    if !login_param_errors.empty?
      render json: login_param_errors, status: :unauthorized
      return
    end
    @user = User.where(email: params[:email].downcase, registration_token: nil).first

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
    params[:username] = params[:username].downcase
    params[:email] = params[:email].downcase
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
