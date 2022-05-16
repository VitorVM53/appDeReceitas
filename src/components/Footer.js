import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => {
  const history = useHistory();

  return (
    <footer
      data-testid="footer"
      className="container pt-6 flex justify-center
      inset-x-0 bottom-0 fixed bg-amber-200 pb-7"
    >
      <button
        className="mx-9"
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks" />
      </button>
      <button className="mx-9" type="button" onClick={ () => history.push('/explore') }>
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
      </button>
      <button className="mx-9" type="button" onClick={ () => history.push('/foods') }>
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal" />
      </button>
    </footer>
  );
};

export default Footer;
