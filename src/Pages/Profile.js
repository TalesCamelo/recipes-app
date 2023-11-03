import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../Components/ProfileIcon';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../css/Profile.css';

function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user')) || '';

  function doneRecipes(path) {
    history.push(path);
  }
  function favoriteRecipes(path) {
    history.push(path);
  }
  function logoutClear(path) {
    history.push(path);
    localStorage.clear('userProfile');
  }

  return (
    <>
      <Header />
      <ProfileIcon />
      <h1 data-testid="page-title">Profile</h1>
      <span
        data-testid="profile-email"
        className="usr-name"
      >
        { `User: ${user.email.slice(0, user.email.indexOf('@'))}` }
      </span>
      <div className="profile-content">
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => doneRecipes('/done-recipes') }
          className="profile-buttons"
        >
          Done Recipes
        </button>

        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => favoriteRecipes('/favorite-recipes') }
          className="profile-buttons"
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => logoutClear('/') }
          className="profile-buttons"
        >
          Logout
        </button>

      </div>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  props: PropTypes.element,
}.insRequired;

export default Profile;
