import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function DrinksExplore({ history }) {
  const [randomSupriseDrinks, setRandomSupriseDrinks] = useState(false);
  const fetchAPIReturn = async () => {
    const fetchAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const jsonAPI = await fetchAPI.json();
    const { drinks } = jsonAPI;
    return drinks[0].idDrink;
  };

  useEffect(() => {
    const requestAPI = async () => {
      const results = await fetchAPIReturn();
      setRandomSupriseDrinks(results);
    };
    requestAPI();
  }, []);
  return (
    <body className="h-screen bg-gradient-to-b from-cyan-200 to-purple-400">
      <Header title="Explore Drinks" />
      {/* <h1 data-testid="page-title">Explore Drinks</h1> */}
      <button
        className="bg-purple-600 text-white rounded-lg shadow-sm
        p-1 ml-12 mr-4 mt-5"
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        className="bg-purple-600 text-white rounded-lg shadow-sm p-1 ml-9 mr-4"
        onClick={ () => history.push(`/drinks/${randomSupriseDrinks}`) }
      >
        Surprise me!
      </button>
      <Footer />
    </body>
  );
}
DrinksExplore.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func,
}.isRequired;
export default DrinksExplore;
