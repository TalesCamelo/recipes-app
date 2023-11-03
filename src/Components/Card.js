import PropTypes from 'prop-types';
import '../css/Card.css';

function Card({ name, img, index }) {
  return (/* data-testid="0-recipe-card" */
    <div data-testid={ `${index}-recipe-card` } className="allRecipes">
      <img
        src={ img }
        alt={ name }
        data-testid={ `${index}-card-img` }
        className="cardImg"
      />
      <p data-testid={ `${index}-card-name` }>
        { name }
      </p>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
