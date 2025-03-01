def all
  @beans = Bean.all
  render json: @beans
end 