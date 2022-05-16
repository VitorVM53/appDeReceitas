import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function FoodExploreNationalities() {
  const history = useHistory();

  const [nationalities, setNationalities] = useState([]);
  const [mealsByNation, setMealsByNation] = useState([]);

  const apiNationList = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  const fetchAPIReturn = async (url) => {
    const fetchAPI = await fetch(url);
    const jsonAPI = await fetchAPI.json();
    return jsonAPI.meals;
  };

  useEffect(() => {
    const requestAPI = async () => {
      const results = await fetchAPIReturn(apiNationList);
      setNationalities(results);
      const apiAllMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const arrayAllMeals = await fetchAPIReturn(apiAllMeals);
      return setMealsByNation(arrayAllMeals);
    };
    requestAPI();
  }, []);
  const limit = 12;

  const requestAPI2 = async (nation) => {
    if (nation === 'All') {
      const apiAllMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const arrayAllMeals = await fetchAPIReturn(apiAllMeals);
      return setMealsByNation(arrayAllMeals);
    }

    const apiMealsByNation = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nation}`;
    const arrayMealsByNation = await fetchAPIReturn(apiMealsByNation);
    setMealsByNation(arrayMealsByNation);
  };

  return (
    <body className="h-screen bg-gradient-to-b from-cyan-200 to-purple-400">
      <Header title="Explore Nationalities" />
      {/* <h1 data-testid="page-title">Explore Nationalities</h1> */}
      <select
        data-testid="explore-by-nationality-dropdown"
        onClick={ (e) => requestAPI2(e.target.value) }
      >
        { nationalities[0] && Object
          .values(nationalities)
          .map(({ strArea }) => (
            <option
              data-testid={ `${strArea}-option` }
              aria-label="nacionality"
              key={ strArea }
              name={ strArea }
            >
              { strArea }
            </option>
          ))}
        <option
          data-testid="All-option"
          aria-label="nacionality"
          key="All"
          name="All"
        >
          All
        </option>
      </select>
      <section>
        { mealsByNation[0] && mealsByNation
          .slice(0, limit)
          .map((food, index) => (
            <button
              type="button"
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
              onClick={ () => history.push(`/foods/${food.idMeal}`) }
            >
              <img
                width="100px"
                data-testid={ `${index}-card-img` }
                src={ food.strMealThumb }
                alt=""
              />
              <p data-testid={ `${index}-card-name` }>
                { food.strMeal }
              </p>
            </button>
          ))}
      </section>
      <Footer />
    </body>
  );
}

export default FoodExploreNationalities;
