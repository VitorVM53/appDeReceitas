import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history }) {
  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <body className="h-screen bg-gradient-to-b from-cyan-200 to-purple-400">
      <Header title="Profile" />
      {/* <h1 data-testid="page-title">Profile</h1> */}
      <div className="space-y-5 grid">
        <p
          className="mt-4 sm:text-left text-center text-lg text-black font-semibold"
          data-testid="profile-email"
        >
          {localStorage.getItem('user')}
        </p>
        <button
          className="bg-purple-600 text-white rounded-lg shadow-sm
          p-2 ml-5 mr-5 mt-5"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="bg-purple-600 text-white rounded-lg shadow-sm
          p-2 ml-5 mr-5 mt-5"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          className="bg-purple-600 text-white rounded-lg shadow-sm
          p-2 ml-5 mr-5 mt-5"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => handleClick() }
        >
          Logout
        </button>
        <br />
        <br />
      </div>

      <Footer />
    </body>
  );
}
Profile.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func,
}.isRequired;
export default Profile;
