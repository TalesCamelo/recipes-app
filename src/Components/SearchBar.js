import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import { FetchRecipeContext } from '../Context/FetchRecipes';
// import PropTypes from 'prop-types';
import '../css/Header.css';

function SearchIcon() {
  const { fetchIngredientFood, fetchDrinkApi } = useContext(FetchRecipeContext);

  const history = useHistory();

  const [isShow, setIsShow] = useState(false);

  const [searchInput, setSearch] = useState('');

  const [allInput, setInput] = useState('');

  const handleAllInput = (e) => {
    setInput(e.target.id);
  };

  const handleResults = async () => {
    const location = history.location.pathname;
    if (location === '/meals') {
      switch (allInput) {
      case 'name':
        return fetchIngredientFood('s', 'search', searchInput);
      case 'ingredient':
        return fetchIngredientFood('i', 'filter', searchInput);
      case 'firstLetter':
        if (searchInput.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        }
        return fetchIngredientFood('f', 'search', searchInput);
      default: return null;
      }
    } else if
    (location === '/drinks') {
      switch (allInput) {
      case 'name':
        return fetchDrinkApi('s', 'search', searchInput);
      case 'ingredient':
        return fetchDrinkApi('i', 'filter', searchInput);
      case 'firstLetter':
        if (searchInput.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        }
        return fetchDrinkApi('f', 'search', searchInput);
      default: return null;
      }
    }
  };

  return (
    <>
      <button className="search-btn" type="button" onClick={ () => setIsShow(!isShow) }>
        <img data-testid="search-top-btn" src={ searchIcon } alt="Search Icon" />
      </button>
      {isShow && (
        <>
          <input
            className="text-bar"
            type="text"
            data-testid="search-input"
            onChange={ (e) => setSearch(e.target.value) }
          />
          <p className="radioButtons">
            <label className="radio-input" htmlFor="ingredient">
              Ingredient
              <input
                className="radiocheck"
                type="radio"
                data-testid="ingredient-search-radio"
                name="radioButtons"
                id="ingredient"
                onChange={ handleAllInput }
              />
            </label>
            <label className="radio-input" htmlFor="name">
              Name
              <input
                className="radiocheck"
                id="name"
                type="radio"
                data-testid="name-search-radio"
                name="radioButtons"
                onChange={ handleAllInput }
              />
            </label>
            <label className="radio-input" htmlFor="firstLetter">
              First Letter
              <input
                className="radiocheck"
                name="radioButtons"
                type="radio"
                data-testid="first-letter-search-radio"
                id="firstLetter"
                onChange={ handleAllInput }
              />
            </label>
          </p>
          <button
            className="src-btn"
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleResults }
          >
            Search
          </button>
        </>
      )}
    </>
  );
}

/* SearchIcon.propTypes = {

}; */

export default SearchIcon;
