import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

// import PropTypes from 'prop-types'

function Footer() {
  const history = useHistory();
  const handleClickDrink = () => {
    history.push('/drinks');
  };
  const handleClickMeals = () => {
    history.push('/meals');
  };
  return (
    <footer
      className="footerCss"
      data-testid="footer"
    >
      <button
        className="select-type-icon"
        type="button"
        onClick={ handleClickDrink }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </button>
      <button
        className="select-type-icon"
        type="button"
        onClick={ handleClickMeals }

      >
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </button>
    </footer>
  );
}

/* Footer.propTypes = {

} */

export default Footer;
