def all
  @recipes = Recipe.all
  render json: @recipes
end 