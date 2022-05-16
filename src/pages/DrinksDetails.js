import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../components/carousel.css';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { handleButtonFavoriteDrinks, ReloadPage } from '../utils/handleFavoritesRecipes';

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

function DrinksDetails() {
  const { getDetailsById, recipeDetails,
    getRecommendation, recommended } = useContext(RecipesContext);
  const [modifyBottom, setModifyBottom] = useState(false);
  const history = useHistory();
  const [shouldShowBtn, setShouldShowBtn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  const verifyStorage2 = () => {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (progressRecipe) {
      const isProgressMeals = Object.keys(progressRecipe.cocktails)
        .some((key) => key === id);

      if (isProgressMeals) {
        setModifyBottom(true);
      }
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
    ReloadPage(id, setIsFavorite);
    const currentLocation = (window.location.pathname);
    getDetailsById(currentLocation);
    verifyStorage2();
    showBtn();
    getRecommendation('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }, []);

  const renderDrinkIngredients = () => {
    const endIndex = 47;
    const startIndex = 17;
    const startMeasurement = 15;
    const ingredients = Object.values(recipeDetails)
      .slice(startIndex, endIndex)
      .filter((item) => item !== null
    && !(item.includes('.jpg')));

    return ingredients.map((item, index) => {
      if (item !== null && index < startMeasurement) {
        return (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${item} - ${recipeDetails[`strMeasure${index + 1}`]}`}
          </li>
        );
      }
      return null;
    });
  };

  const renderDrinkRecommendations = () => {
    const limite = 6;
    const { meals } = recommended;
    return (meals && meals.slice(0, limite).map((meal, index) => (

      <div
        data-testid={ `${index}-recomendation-card` }
        className="recommended-card"
        key={ index }
      >
        <img
          alt="recommended-img"
          src={ meal.strMealThumb }
          width="100px"
          height="100px"
        />
        <p>
          { meal.strCategory }
        </p>

        <h3 data-testid={ `${index}-recomendation-title` }>
          { meal.strMeal }
        </h3>
      </div>

    )));
  };

  return (
    <div className=" bottom-0 h-maxeen bg-gradient-to-b from-cyan-200 to-purple-400">
      <img
        data-testid="recipe-photo"
        alt="recipe-img"
        src={ recipeDetails.strDrinkThumb }
      />
      <div
        className="p-2 mb-5 block-right shadow-2xl
      bg-gradient-to-b block mx-auto h-20 rounded-full sm:mx-0 sm:shrink-0 "
      >
        <h1
          data-testid="recipe-title"
          className="sm:text-left text-center text-lg text-black font-semibold"
        >
          {recipeDetails.strDrink}
        </h1>

        <div
          className="space-x-7 ml-7 "
        >
          { copied && <span>Link copied!</span> }
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
              setCopied(true);
            } }
          >
            <img src={ shareIcon } alt="compartilhar" />
          </button>

          <input
            type="image"
            data-testid="favorite-btn"
            onClick={ () => (
              handleButtonFavoriteDrinks(setIsFavorite, isFavorite, recipeDetails)
            ) }
            src={ urlImage(isFavorite) }
            /* src={ globalStorage.some(({ idMeal }) => idMeal === id)
              ? blackHeartIcon : whiteHeartIcon } */
            alt="not favorite"
          />
        </div>

      </div>
      <p data-testid="recipe-category">
        {`Recipe category:
        ${recipeDetails.strAlcoholic}`}
      </p>

      <div
        className="p-4 mt-4 mb-4 ml-4 mr-40
        rounded-lg shadow-2xl bg-amber-200"
      >
        <ul>
          { renderDrinkIngredients() }
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

      <div className="recommended-container">
        { renderDrinkRecommendations() }
      </div>

      { !shouldShowBtn && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="block w-full px-5 py-3 text-sm font-medium
         text-white bg-purple-500 rounded-full"
          onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        >
          {valueBtn(modifyBottom)}
        </button>) }
    </div>
  );
}

export default DrinksDetails;
