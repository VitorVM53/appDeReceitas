import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../components/carousel.css';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { handleButtonFavorite } from '../utils/handleFavoritesRecipes';

const urlImage = (isFavorite) => {
  if (isFavorite) {
    return blackHeartIcon;
  }
  return whiteHeartIcon;
};

const valueBtn = (modifyBottom) => {
  if (modifyBottom) {
    return 'Continue Recipe';
  }
  return 'Start Recipe';
};

function FoodsDetails() {
  const { getDetailsById, recipeDetails,
    getRecommendation, recommended } = useContext(RecipesContext);
  const [modifyBottom, setModifyBottom] = useState(false);
  const history = useHistory();
  const [shouldShowBtn, setShouldShowBtn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  const verifyStorage = () => {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (progressRecipe) {
      const isProgressMeals = Object.keys(progressRecipe.meals).some((key) => key === id);

      if (isProgressMeals) {
        setModifyBottom(true);
      }
    }
  };

  const reloadPage = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (storage) {
      const existFavoriteRecipe = storage.some((recipe) => recipe.id === id);
      setIsFavorite(existFavoriteRecipe);
    }
  };

  const showBtn = () => {
    const isDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    if (isDoneRecipes.length > 0) {
      const isDoneRecipesResult = isDoneRecipes.some((key) => key.id === id);
      setShouldShowBtn(isDoneRecipesResult);
    }
  };

  // retirado de https://stackoverflow.com/questions/35583334/react-router-get-full-current-path-name
  useEffect(() => {
    reloadPage();
    const currentLocation = (window.location.pathname);
    getDetailsById(currentLocation);
    verifyStorage();
    showBtn();
    getRecommendation('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  }, []);

  const renderFoodIngredients = () => {
    const endIndex = 49;
    const startIndex = 9;
    const startMeasurement = 20;
    const ingredients = Object.values(recipeDetails).slice(startIndex, endIndex);
    // console.log(ingredients);
    return ingredients.map((item, index, array) => {
      if (item !== '' && index < startMeasurement) {
        return (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${item} - ${array[index + startMeasurement]}`}
          </li>
        );
      }
      return null;
    });
  };

  const renderFoodRecommendations = () => {
    const limite = 6;
    const { drinks } = recommended;
    return (drinks && drinks.slice(0, limite).map((drink, index) => (
      <div
        className="bg-amber-200 w-36 rounded-lg ml-7 mb-2"
        data-testid={ `${index}-recomendation-card` }
        key={ index }
      >
        <img
          alt="recommended-img"
          src={ drink.strDrinkThumb }
          className="rounded-lg box-border h-12 w-12 border-4 ml-2 mb-2"

        />

        <p>
          { drink.strCategory }
        </p>

        <h3 data-testid={ `${index}-recomendation-title` }>
          { drink.strDrink }
        </h3>
      </div>
    )));
  };

  return (
    <div className=" bottom-0 h-maxeen bg-gradient-to-b from-cyan-200 to-purple-400">
      <img
        data-testid="recipe-photo"
        alt="recipe-img"
        src={ recipeDetails.strMealThumb }
      />
      <div
        className="p-2 mb-5 block-right shadow-2xl
          bg-gradient-to-b block mx-auto h-20 rounded-full sm:mx-0 sm:shrink-0 "
      >
        <h1
          className="sm:text-left text-center text-lg text-black font-semibold"
          data-testid="recipe-title"
        >
          {recipeDetails.strMeal}
        </h1>

        <div
          className="space-x-7 ml-7 "
        >
          { copied && <span>Link copied!</span> }
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
              setCopied(true);
            } }
          >
            <img src={ shareIcon } alt="compartilhar" />
          </button>

          <input
            type="image"
            data-testid="favorite-btn"
            onClick={ () => (
              handleButtonFavorite(setIsFavorite, isFavorite, recipeDetails)
            ) }
            src={ urlImage(isFavorite) }
            /* src={ globalStorage.some(({ idMeal }) => idMeal === id)
              ? blackHeartIcon : whiteHeartIcon } */
            alt="not favorite"
          />
        </div>

      </div>

      <div
        className="p-4 mt-4 mb-4 ml-4 mr-40
        rounded-lg shadow-2xl bg-amber-200"
      >
        <ul>
          { renderFoodIngredients() }
        </ul>
      </div>

      <div
        className="p-5 m-4 space-y-4 rounded-lg shadow-2xl
        bg-gradient-to-b from-amber-200"
      >
        <h3> Instructions: </h3>
        <p data-testid="instructions">
          {recipeDetails.strInstructions}
        </p>
      </div>
      {/* referencia: https://www.hostinger.com.br/tutoriais/o-que-e-iframe?ppc_campaign=google_performance_max&gclid=Cj0KCQjwpcOTBhCZARIsAEAYLuX3FL3afxfWsxk47QRyzzjW8nAjA8TNj9TH_vGj2R2Y75YgzhiY3V4aAiyhEALw_wcB */}
      <div className="video-container">
        <iframe
          title="recipe-video"
          data-testid="video"
          src={ recipeDetails.strYoutube }
          width="680"
          height="480"
          allowFullScreen
        />
      </div>

      <div className="recommended-container">
        { renderFoodRecommendations() }
      </div>

      { !shouldShowBtn && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="block w-full px-5 py-3 text-sm font-medium
         text-white bg-purple-500 rounded-full"
          onClick={ () => history.push(`/foods/${id}/in-progress`) }
        >
          {valueBtn(modifyBottom)}
        </button>) }
    </div>
  );
}

export default FoodsDetails;
