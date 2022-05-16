// const urlFood = (param) => (`www.themealdb.com/api/json/v1/1/search.php?${param}`);
// by name = ?s=~name~ // // first letter = ?f=~letra~ // // by id = ?=i~id~ //
// const urlDrink = (param) => (`www.thecocktaildb.com/api/json/v1/1/search.php?${param}`);
// Roger aqui. Consegui resolver a URL dinamica passando ela quando fizer a busca, desta forma a função FETCH ja recebe a url correta como parametro

async function fetchFood(param) {
  const response = await fetch(param);
  const foodResponse = await response.json();
  return foodResponse;
}

async function fetchDrink(param) {
  const response = await fetch(param);
  const drinkResponse = await response.json();

  return drinkResponse;
}

export { fetchFood, fetchDrink };
