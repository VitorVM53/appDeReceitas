import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const history = useHistory();

  const [showBar, setShowBar] = useState(false);
  const pathNames = ['/drinks', '/foods', '/explore/foods/nationalities'];
  return (
    <div>
      <header className="container pt-7 flex justify-center bg-amber-200 pb-7">
        <button
          type="button"
          className="mx-9"
          data-testid="btn-profile"
          onClick={ () => history.push('/profile') }
        >
          <img
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
        </button>
        <h3
          className="mx-9 font-bold text-2xl"
          data-testid="page-title"
        >
          { title }
        </h3>
        { (history.location.pathname && pathNames
          .some((path) => history.location.pathname === path))
        && (
          <button
            className="mx-9"
            type="button"
            onClick={ () => (setShowBar(!showBar)) }
          >
            <img
              src={ searchIcon }
              alt="Search Icon"
              data-testid="search-top-btn"

            />
          </button>)}
      </header>
      {showBar && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func.isRequired,
}.isRequired;

export default Header;
