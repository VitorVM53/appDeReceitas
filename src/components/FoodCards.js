import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Cards({ meal, index }) {
/*   const pickMeal = () => {

  } */

  const { strMeal, strMealThumb } = meal;
  return (
    <button
      type="button"
      className="bg-amber-200 w-36 rounded-lg ml-7 mb-2"
      data-testid={ `${index}-recipe-card` }
    >
      <Link
        key={ meal.idMeal }
        to={ `/foods/${meal.idMeal}` }
      >
        <h2 data-testid={ `${index}-card-name` }>{ strMeal }</h2>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt="Card receita"
          className="rounded-lg box-border h-32 w-32 border-4 absolute-inset-0 ml-2 mb-4"
        />
      </Link>
    </button>
  );
}

Cards.propTypes = {
  meal: PropTypes.node,
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;

export default Cards;
