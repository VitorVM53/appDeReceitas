import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
// import { doneRecipes } from '../new';

const copy = require('clipboard-copy');

function RecipesDone() {
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
  // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  // console.log(doneRecipes);

  return (
    <body className="h-screen bg-gradient-to-b from-cyan-200 to-purple-400">
      <Header title="Done Recipes" />
      {/* <h1 data-testid="page-title">Done Recipes</h1> */}
      {/* Talvez criar um componente */}
      <div className="space-y-5 grid">
        <button
          className="bg-purple-600 text-white rounded-lg shadow-sm
          p-2 ml-5 mr-5 mt-5"
          type="button"
          onClick={ () => setItemTypeName('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          className="bg-purple-600 text-white rounded-lg shadow-sm
          p-2 ml-5 mr-5 mt-5"
          type="button"
          onClick={ () => setItemTypeName('food') }
          data-testid="filter-by-food-btn"
        >
          Foods
        </button>
        <button
          className="bg-purple-600 text-white rounded-lg shadow-sm
          p-2 ml-5 mr-5 mt-5"
          type="button"
          onClick={ () => setItemTypeName('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      { doneRecipes !== null && doneRecipes
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
              onClick={ () => unLikeItem(item) }
            >
              <img
                src={ blackHeartIcon }
                alt=""
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            <p
              data-testid={ `${index}-${item.tags[0]}-horizontal-tag` }
            >
              { item.tags[0] }
            </p>
            <p
              data-testid={ `${index}-${item.tags[1]}-horizontal-tag` }
            >
              { item.tags[1] }
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { item.doneDate }
            </p>
            { copiedIt && <p>Link copied!</p> }
            {/* Melhorar lógica do Copy? */}
          </div>
        ))}
    </body>
  );
}

export default RecipesDone;
