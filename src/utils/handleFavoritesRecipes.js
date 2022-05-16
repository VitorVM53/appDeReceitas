export const handleButtonFavorite = (setIsFavorite, isFavorite, newRecipe) => {
  const currentFavorites = !isFavorite;
  setIsFavorite(currentFavorites);

  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  if (currentFavorites === false) {
    /* setIsFavorite(true); */
    const filterFavoriteList = favoriteList
      .filter(({ id }) => id !== newRecipe.idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavoriteList));
    console.log(JSON.parse(localStorage.getItem('favoriteRecipes')));
  } else {
    favoriteList.push({
      id: newRecipe.idMeal,
      type: 'food',
      nationality: newRecipe.strArea,
      category: newRecipe.strCategory,
      alcoholicOrNot: '',
      name: newRecipe.strMeal,
      image: newRecipe.strMealThumb });
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteList));
    console.log(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }
};

export const handleButtonFavoriteDrinks = (setIsFavorite, isFavorite, newRecipe) => {
  const currentFavorites = !isFavorite;
  setIsFavorite(currentFavorites);

  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  if (currentFavorites === false) {
    /* setIsFavorite(true); */
    const filterFavoriteList = favoriteList
      .filter(({ id }) => id !== newRecipe.idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavoriteList));
  } else {
    favoriteList.push({
      id: newRecipe.idDrink,
      type: 'drink',
      nationality: '',
      category: newRecipe.strCategory,
      alcoholicOrNot: newRecipe.strAlcoholic,
      name: newRecipe.strDrink,
      image: newRecipe.strDrinkThumb,
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteList));
  }
};

export const ReloadPage = (id, setIsFavorite) => {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (storage) {
    const existFavoriteRecipe = storage.some((recipe) => recipe.id === id);
    setIsFavorite(existFavoriteRecipe);
  }
};
