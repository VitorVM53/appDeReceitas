import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function DrinksExploreIngredients() {
  const { getDrink, setDrink } = useContext(RecipesContext);
  const history = useHistory();
  const [Ingredients, setIngredients] = useState([]);
  const limit = 12;

  const fetchAPIReturn = async () => {
    const fetchAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const jsonAPI = await fetchAPI.json();
    return jsonAPI.drinks;
  };

  useEffect(() => {
    const requestAPI = async () => {
      const results = await fetchAPIReturn();
      setIngredients(results);
    };
    requestAPI();
  }, []);

  const urlGenerator = (id) => (
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${id}`
  );

  return (
    <body className="h-maxeen bg-gradient-to-b from-cyan-200 to-purple-400">
      <Header title="Explore Ingredients" />
      {/* <h1 data-testid="page-title">Explore Ingredients</h1> */}
      { Ingredients[0] && Ingredients
        .slice(0, limit)
        .map(({ strIngredient1 }, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ async () => {
              setDrink([]);
              await getDrink(urlGenerator(strIngredient1));
              history.push('/drinks');
            } }
            // precisa do requisito 17
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt="Card"
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
              className="mt-4 sm:text-left text-center text-lg text-black font-semibold"
            >
              { strIngredient1 }
            </p>
          </button>
        )) }
      <Footer />
    </body>
  );
}

DrinksExploreIngredients.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func.isRequired,
}.isRequired;
export default DrinksExploreIngredients;
