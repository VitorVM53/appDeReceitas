import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCards({ drink, index }) {
  const { strDrink, strDrinkThumb } = drink;
  return (
    <button
      type="button"
      className="bg-amber-200 w-36 rounded-lg ml-7 mb-2"
      data-testid={ `${index}-recipe-card` }
    >
      <Link
        key={ drink.idDrink }
        to={ `/drinks/${drink.idDrink}` }
      >
        <h2 data-testid={ `${index}-card-name` }>{ strDrink }</h2>
        <img
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          alt="Card receita"
          className="rounded-lg box-border h-32 w-32 border-4 absolute-inset-0 ml-2 mb-4"
        />
      </Link>
    </button>
  );
}

DrinkCards.propTypes = {
  meal: PropTypes.node,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
}.isRequired;

export default DrinkCards;
