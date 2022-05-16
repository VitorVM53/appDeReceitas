import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { handleButtonFavorite } from '../utils/handleFavoritesRecipes';

const copy = require('clipboard-copy');

const urlImage = (isFavorite) => {
  if (isFavorite) {
    return blackHeartIcon;
  }
  return whiteHeartIcon;
};

function FoodProgress() {
  const history = useHistory();
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [copiedIt, setCopiedIt] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { getDetailsById, recipeDetails } = useContext(RecipesContext);

  const { id } = useParams();

  const reloadPage = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (storage) {
      const existFavoriteRecipe = storage.some((recipe) => recipe.id === id);
      setIsFavorite(existFavoriteRecipe);
    }
  };

  // retirado de https://stackoverflow.com/questions/35583334/react-router-get-full-current-path-name
  useEffect(() => {
    reloadPage();
    const currentLocation = (window.location.pathname);
    getDetailsById(currentLocation);
  }, []);

  const copyIt = (idMeal) => {
    const limitTimeToRemove = 2000;
    setCopiedIt(true);
    copy(`http://localhost:3000/foods/${idMeal}`);
    setTimeout(() => { setCopiedIt(false); }, limitTimeToRemove);
  };

  const checkedUpdtate = ({ target }) => {
    if (target.parentNode.className === 'checked') {
      target.parentNode.classList.add('noChecked');
      target.parentNode.classList.remove('checked');
      target.parentNode.style = 'text-decoration: none';
    } else {
      target.parentNode.classList.add('checked');
      target.parentNode.classList.remove('noChecked');
      target.parentNode.style = 'text-decoration: line-through';
      setIsAllChecked(target.parentNode.parentNode.parentNode.innerHTML
        .includes('noChecked'));
    }
  };

  const renderFoodIngredients = () => {
    const endIndex = 47;
    const startIndex = 17;
    const startMeasurement = 15;
    const ingredients = Object.values(recipeDetails)
      .slice(startIndex, endIndex)
      .filter((item) => item !== null
    && !(item.includes('.jpg')));

    return ingredients.map((item, index) => {
      if (item !== null && index < startMeasurement
        && item !== ''
        && recipeDetails[`strMeasure${index + 1}`] !== null) {
        return (
          <li
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            <label
              htmlFor={ `checkbox-ingredient-${index}` }
              className="noChecked"
            >
              <input
                onClick={ (e) => checkedUpdtate(e) }
                name={ `checkbox-ingredient-${index}` }
                id={ `checkbox-ingredient-${index}` }
                type="checkbox"
              />
              {`${item} - ${recipeDetails[`strMeasure${index + 1}`]}`}
            </label>
          </li>
        );
      }
      return '';
    });
  };

  return (
    <div className=" bottom-0 h-maxeen bg-gradient-to-b from-cyan-200 to-purple-400">
      <img
        data-testid="recipe-photo"
        alt="recipe-img"
        src={ recipeDetails.strMealThumb }
      />
      <div
        className="p-4 m-3 space-y-4 rounded-lg shadow-2xl
          bg-gradient-to-b to-amber-200"
      >
        <h1
          className="sm:text-left text-center text-lg text-black font-semibold"
          data-testid="recipe-title"
        >
          { recipeDetails.strMeal }
        </h1>
        <div
          className="space-x-7 ml-2"
        >
          <button
            type="button"
            onClick={ () => copyIt(recipeDetails.idMeal) }
          >
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="share recipe"
            />
          </button>
          <button
            type="button"
            onClick={ () => {
              handleButtonFavorite(setIsFavorite, isFavorite, recipeDetails);
            } }
          >
            <img
              data-testid="favorite-btn"
              src={ urlImage(isFavorite) }
              alt="favorite recipe"
            />
          </button>
        </div>

      </div>
      <p
        className="sm:text-left text-center text-lg text-black font-semibold"
        data-testid="recipe-category"
      >
        { `Recipe category:
        ${recipeDetails.strCategory}` }
      </p>

      <div
        className="p-4 mt-4 mb-4 ml-4 mr-40
        rounded-lg shadow-2xl bg-amber-200"
      >
        <ul>
          { renderFoodIngredients() }
        </ul>
      </div>

      <div
        className="p-4 m-5 space-y-4 rounded-lg shadow-2xl
        bg-gradient-to-b from-amber-200"
      >
        <h3> Instructions: </h3>
        <p data-testid="instructions">
          { recipeDetails.strInstructions }
        </p>
      </div>

      <button
        data-testid="finish-recipe-btn"
        className="block w-full px-5 py-3 text-sm font-medium
         text-white bg-cyan-400 rounded-full"
        type="button"
        onClick={ () => history.push('/done-recipes') }
        disabled={ isAllChecked }
      >
        Finish Recipe
      </button>
      { copiedIt && <p>Link copied!</p> }
    </div>
  );
}

export default FoodProgress;
