import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function FoodsExplore({ history }) {
  const [randomSupriseFoods, setRandomSupriseFoods] = useState(false);
  const fetchAPIReturn = async () => {
    const fetchAPI = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const jsonAPI = await fetchAPI.json();
    const { meals } = jsonAPI;
    return meals[0].idMeal;
  };

  useEffect(() => {
    const requestAPI = async () => {
      const results = await fetchAPIReturn();
      setRandomSupriseFoods(results);
    };
    requestAPI();
  }, []);
  return (
    <body className="h-screen bg-gradient-to-b from-cyan-200 to-purple-400">
      <Header title="Explore Foods" />
      {/* <h1 data-testid="page-title">Explore Foods</h1> */}
      <div className="space-y-5 grid">
        <button
          className="bg-purple-600 text-white rounded-lg shadow-sm
          p-2 ml-5 mr-5 mt-5"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          className="bg-purple-600 text-white rounded-lg shadow-sm p-2 ml-5 mr-5 mt-5"
          data-testid="explore-by-nationality"
          type="button"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          className="bg-purple-600 text-white rounded-lg shadow-sm
          p-2 ml-5 mr-5 mt-5"
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/foods/${randomSupriseFoods}`) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </body>
  );
}

FoodsExplore.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func,
}.isRequired;

export default FoodsExplore;
