import PropTypes from 'prop-types';
import React, { useEffect, useContext } from 'react';
import coocking from '../css/images/undrawCooking.svg';
import RecipesContext from '../context/RecipesContext';

function Login({ history }) {
  const { email, setEmail, password,
    setPassword, isButtonDisabled, setButton } = useContext(RecipesContext);

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);
    const MIN_LENGTH = 6;
    const validPassword = password.length > MIN_LENGTH;
    if (validEmail && validPassword) {
      return setButton(false);
    }
    return setButton(true);
  }, [email, password, setButton]);

  return (
    <div className="h-screen bg-gradient-to-b from-cyan-200 to-purple-600">
      <div className="p-2 mb-0 space-y-4 rounded-lg shadow-2xl">
        <label htmlFor="email-input" className="text-sm font-medium">
          <input
            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            type="text"
            placeholder="E-mail"
            data-testid="email-input"
            id="email-input"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <div>
          <label htmlFor="password-input" className="text-sm font-medium">
            <input
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              id="password-input"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
        </div>
        <button
          className="block w-full px-5 py-3 text-sm font-medium
         text-white bg-purple-500 rounded-full"
          type="button"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </div>
      <img src={ coocking } alt="" />
      <footer
        className="bg-purple-70"
      >
        <br />
        <br />
        <br />
        <br />
      </footer>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func,
}.isRequired;

export default Login;
