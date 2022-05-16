import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore({ history }) {
  return (
    <body className="h-screen bg-gradient-to-b from-cyan-200 to-purple-400">
      <Header title="Explore" />
      {/* <h1 data-testid="page-title">Explore</h1> */}
      <div>
        <button
          data-testid="explore-foods"
          type="button"
          className="bg-purple-600 text-white rounded-lg shadow-sm
          p-1 ml-12 mr-4 mt-5"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          className="bg-purple-600 text-white rounded-lg shadow-sm p-1 ml-9 mr-4"
          type="button"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
        <Footer />
      </div>
    </body>
  );
}
//
Explore.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func,
}.isRequired;

export default Explore;
