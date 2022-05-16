import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDrink, fetchFood } from '../components/APIs';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setButton] = useState(true);
  const history = useHistory();

  const [food, setFood] = useState([]);
  async function getFood(param) {
    const foodResponse = await fetchFood(param);
    if (foodResponse.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (foodResponse.meals.length === 1) {
      const id = foodResponse.meals[0].idMeal;
      history.push(`/foods/${id}`);
    }
    setFood(foodResponse);
  }

  const [drink, setDrink] = useState([]);
  async function getDrink(param) {
    const drinkResponse = await fetchDrink(param);
    if (drinkResponse.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (drinkResponse.drinks.length === 1) {
      const id = drinkResponse.drinks[0].idDrink;
      history.push(`/drinks/${id}`);
    }
    setDrink(drinkResponse);
  }

  const [recipeDetails, setRecipeDetails] = useState({});

  const getDetailsById = async (currentLocation) => {
    // retirado de https://stackoverflow.com/questions/30607419/return-only-numbers-from-string
    const id = currentLocation.replace(/\D/g, '');

    if (currentLocation.includes('foods')) {
      const foodDetailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const foodDetails = await fetchFood(foodDetailsUrl);
      return setRecipeDetails(foodDetails.meals[0]);
    }
    const drinkDetailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinkDetails = await fetchDrink(drinkDetailsUrl);
    return setRecipeDetails(drinkDetails.drinks[0]);
  };

  const [recommended, setRecommendations] = useState([]);
  async function getRecommendation(param) {
    if (window.location.pathname.includes('foods')) {
      const recommendedResponse = await fetchDrink(param);
      setRecommendations(recommendedResponse);
    }
    const recommendedResponse = await fetchFood(param);
    setRecommendations(recommendedResponse);
  }

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    isButtonDisabled,
    setButton,
    food,
    setFood,
    drink,
    setDrink,
    getFood,
    getDrink,
    getDetailsById,
    recipeDetails,
    recommended,
    getRecommendation,
  };

  return (
    <RecipesContext.Provider
      value={ contextValue }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
