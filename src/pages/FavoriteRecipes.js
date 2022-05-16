import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { favoriteRecipes } from '../new';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const history = useHistory();
  const [copiedIt, setCopiedIt] = useState(false);
  const [itemTypeName, setItemTypeName] = useState('all');
  const copyIt = ({ type, id }, { target }) => {
    const limitTimeToRemove = 2000;
    console.log(target);
    setCopiedIt(true);
    copy(`http://localhost:3000/${type}s/${id}`);
    setTimeout(() => { setCopiedIt(false); }, limitTimeToRemove);
  };

  // Apagar essa linha dps
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  const unLikedItem = ({ target }) => {
    const parentDiv = target.parentNode.parentNode;

    parentDiv.remove();
    const get = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updatedData = get.filter(
      (item) => !parentDiv.innerText.includes(item.name),
    );
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(updatedData));
  };

  return (
    <body className="h-screen bg-gradient-to-b from-cyan-200 to-purple-400">
      <Header title="Favorite Recipes" />
      {/* <h1 data-testid="page-title">Favorite Recipes</h1> */}
      {/* Talvez criar um componente */}
      <button
        type="button"
        onClick={ () => setItemTypeName('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => setItemTypeName('food') }
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>
      <button
        type="button"
        onClick={ () => setItemTypeName('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      <div>
        { JSON.parse(localStorage.getItem('favoriteRecipes'))
          .filter((item) => item.type === (itemTypeName === 'all'
            ? item.type : itemTypeName)) // melhorar lógica?
          .map((item, index) => (
            <div
              key={ index }
            >
              <img
                key={ index }
                width="200"
                src={ item.image }
                alt=""
                data-testid={ `${index}-horizontal-image` }
                onClick={ () => history.push(`/${item.type}s/${item.id}`) }
                aria-hidden="true" // lint https://stackoverflow.com/a/64858019
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { (item.type === 'food')
                  ? `${item.nationality} - ${item.category}`
                  : item.alcoholicOrNot}
              </p>
              <p
                onClick={ () => history.push(`/${item.type}s/${item.id}`) }
                data-testid={ `${index}-horizontal-name` }
                aria-hidden="true" // lint https://stackoverflow.com/a/64858019
              >
                {item.name}
              </p>
              <button
                type="button"
                onClick={ (event) => copyIt(item, event) }
              >
                <img
                  src={ shareIcon }
                  alt=""
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
                onClick={ (event) => unLikedItem(event) }
              >
                <img
                  src={ blackHeartIcon }
                  alt=""
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          ))}
        { copiedIt && <p>Link copied!</p> }
        {/* Melhorar lógica do Copy? */}
      </div>
    </body>
  );
}
FavoriteRecipes.propTypes = {
  history: PropTypes.node,
}.isRequired;

export default FavoriteRecipes;
