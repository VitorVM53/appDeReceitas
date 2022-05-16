import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function FoodExploreIngredients() {
  const { getFood, setFood } = useContext(RecipesContext);
  const history = useHistory();
  const [Ingredients, setIngredients] = useState([]);
  const limit = 12;

  const fetchAPIReturn = async () => {
    const fetchAPI = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const jsonAPI = await fetchAPI.json();
    return jsonAPI.meals;
  };

  useEffect(() => {
    const requestAPI = async () => {
      const results = await fetchAPIReturn();
      setIngredients(results);
    };
    requestAPI();
  }, []);

  const urlGenerator = (id) => (
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`
  );

  return (
    <body className="h-maxeen bg-gradient-to-b from-cyan-200 to-purple-400">
      <Header title="Explore Ingredients" />
      {/* <h1 data-testid="page-title">Explore Ingredients</h1> */}
      { Ingredients[0] && Ingredients
        .slice(0, limit)
        .map(({ strIngredient }, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ async () => {
              setFood([]);
              await getFood(urlGenerator(strIngredient));
              history.push('/foods');
            } }
            // precisa do requisito 17
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt="Card"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
          </button>
        )) }
      <Footer />
    </body>
  );
}
FoodExploreIngredients.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func.isRequired,
}.isRequired;
export default FoodExploreIngredients;
