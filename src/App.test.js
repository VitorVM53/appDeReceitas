import { screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../src/renderWithRouter';
import App from './App';
 

describe('Testa o App.js', () => {
  test('Checando rotas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/')
    
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
    
    history.push('/foods')
    const searchBtn = screen.getByTestId('search-top-btn');
    const foods = screen.getByText(/Foods/i);
    expect(foods).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    history.push('/drinks')
    const drinks = screen.getByText(/Drinks/i);
    expect(drinks).toBeInTheDocument();
    
    history.push('/foods/:id')
    history.push('/drinks/:id')
    history.push('/foods/:id/in-progress')
    history.push('/drinks/:id/in-progress')
      
    history.push('/explore')
    const explore = screen.getAllByText(/Explore/i);
    expect(explore.length).toBe(3);
    expect(searchBtn).not.toBeInTheDocument();
      
    history.push('/explore/foods')
    const exploreFoods = screen.getByText(/Explore Foods/i);
    expect(exploreFoods).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();


    history.push('/explore/drinks')
    const ExploreDrinks = screen.getByText(/Explore Drinks/i);
    expect(ExploreDrinks).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    
    history.push('/explore/foods/ingredients')
    const foodsIng = screen.getByText(/Explore Ingredients/i);
    expect(foodsIng).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    
    history.push('/explore/drinks/ingredients')
    const drinksIng = screen.getByText(/Explore Ingredients/i);
    expect(drinksIng).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    
    history.push('/explore/foods/nationalities')
    const foodsNa = screen.getByText(/Explore Nationalities/i);
    expect(foodsNa).toBeInTheDocument();
    
    history.push('/profile')
    const profile = screen.getByText(/Profile/i);
    expect(profile).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    
    history.push('/done-recipes')
    const RecipesDone = screen.getByText(/Done Recipes/i);
    expect(RecipesDone).toBeInTheDocument();
    
    history.push('/favorite-recipes')
    const favRecipes = screen.getByText(/Favorite Recipes/i);
    expect(favRecipes).toBeInTheDocument();
    
  });

  });


 describe('Testa a Página de Login', () => {
       test('Checando testids e redirecionamento', () => {
       const { history } = renderWithRouter(<App />);
       history.push('/')
    
       const email = screen.getByTestId('email-input');
       expect(email).toBeInTheDocument();

       const password = screen.getByTestId('password-input');
       expect(password).toBeInTheDocument();

       const LoginBtn = screen.getByTestId('login-submit-btn');
       expect(LoginBtn).toBeInTheDocument();
      
       userEvent.click(LoginBtn)
       expect(history.location.pathname).toBe('/foods')
   });

 });


 describe('Testa o Header', () => {
   test('Se contém os botões de profile e Search', () => {
     const { history } = renderWithRouter(<App />);
     history.push('/foods')

     const profileBtn = screen.getByTestId('profile-top-btn');
     expect(profileBtn).toBeInTheDocument();

     const searchBtn = screen.getByTestId('search-top-btn');
     expect(searchBtn).toBeInTheDocument();

     const pageTitle = screen.getByTestId('page-title');
     expect(pageTitle).toBeInTheDocument();

     const pageText = screen.getByText(/Foods/i);
     expect(pageText).toBeInTheDocument();
 
   });

   test('Se o input do search aparece e desaperece ao ser clicado', () => {
     const { history } = renderWithRouter(<App />);
     history.push('/foods')

     const searchBtn = screen.getByTestId('search-top-btn');
     expect(searchBtn).toBeInTheDocument();

     userEvent.click(searchBtn)
     const inputSearch = screen.getByTestId('search-input');
     expect(inputSearch).toBeInTheDocument();

     userEvent.click(searchBtn)   
      expect(inputSearch).not.toBeInTheDocument();
    
   });

 })
