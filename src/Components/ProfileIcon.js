import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
// import PropTypes from 'prop-types';
import '../css/Header.css';

function ProfileIcon() {
  return (
    <Link to="/profile">
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile Icon"
        className="profile-btn"
      />
    </Link>

  );
}

/* ProfileIcon.propTypes = {

}; */

export default ProfileIcon;
