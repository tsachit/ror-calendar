class JsonWebToken
  SECRET_KEY = Rails.application.secrets.secret_key_base. to_s

  def self.encode(payload = {})
    exp= 24.hours.from_now
    payload[:iat] = Time.now.to_i
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY, 'HS256')
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY,
      true, algorithm: 'HS256')
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::ExpiredSignature
    nil
  end
end