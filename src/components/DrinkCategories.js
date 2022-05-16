import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function DrinkCategories() {
  const { drink, setDrink } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [allDrink, setAllDrink] = useState('');
  const [select, setSelect] = useState(false);
  const [selectCategory, setSelectCategory] = useState('');

  useEffect(() => {
    const getCategoriesApi = async () => {
      const limite = 5;
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const results = await response.json();
      setCategories(results.drinks.slice(0, limite));
    };
    getCategoriesApi();
  }, []);

  async function fetchCategoriesByFood(param) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}`);
    const foodCategoriesResponse = await response.json();
    return foodCategoriesResponse;
  }

  const categoriesItemsFetch = async ({ target }) => {
    setAllDrink(drink);
    if (select === false || selectCategory !== target.name) {
      const response = await fetchCategoriesByFood(target.name);
      setDrink(response);
      setSelectCategory(target.name);
      setSelect(!select);
    } else if (select === true) {
      setDrink(allDrink);
      setSelect(!select);
    }
  };

  const returnAll = () => {
    setDrink(allDrink);
  };

  return (
    <div>
      <button
        className="bg-purple-600 text-white rounded-lg shadow-sm p-1 ml-4 mr-4"
        data-testid="All-category-filter"
        onClick={ returnAll }
        type="button"
      >
        All
      </button>
      {categories.map((category) => ((
        <button
          className="bg-purple-400 rounded-lg shadow-sm p-0.5 ml-4 mr-4 mt-2 mb-2"
          data-testid={ `${category.strCategory}-category-filter` }
          name={ category.strCategory }
          key={ category.strCategory }
          onClick={ categoriesItemsFetch }
          type="button"
        >
          {category.strCategory}
        </button>
      )
      ))}
    </div>
  );
}
export default DrinkCategories;
