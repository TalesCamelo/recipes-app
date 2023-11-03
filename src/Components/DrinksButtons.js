import React, { useContext, useState } from 'react';
import { FetchRecipeContext } from '../Context/FetchRecipes';
import '../css/Meals.css';
import cocktail from '../images/cocktail (1).png';
import all from '../images/cocktail (2).png';
import coffee from '../images/coffee.png';
import other from '../images/icons8-beer-80.png';
import milkshake from '../images/milkshake.png';
import drink from '../images/cocktail.png';

function DrinksButtons() {
  /*  await fetchDrinkApi('c', 'list', 'list'); */
  const { fetchDrinkApi } = useContext(FetchRecipeContext);
  const [isClick, setClick] = useState(0);
  const LIMIT = 1;

  const AllCategory = async () => {
    await fetchDrinkApi('s', 'search', '');
  };

  const OrdinaryCategory = async () => {
    setClick(isClick + 1);
    if (isClick === LIMIT) {
      await fetchDrinkApi('s', 'search', '');
      setClick(0);
      return;
    }
    await fetchDrinkApi('c', 'filter', 'Ordinary Drink');
  };
  const CocktailCategory = async () => {
    setClick(isClick + 1);
    if (isClick === LIMIT) {
      await fetchDrinkApi('s', 'search', '');
      setClick(0);
      return;
    }
    await fetchDrinkApi('c', 'filter', 'Cocktail');
  };
  const ShakeCategory = async () => {
    setClick(isClick + 1);
    if (isClick === LIMIT) {
      await fetchDrinkApi('s', 'search', '');
      setClick(0);
      return;
    }
    await fetchDrinkApi('c', 'filter', 'Shake');
  };
  const OtherCategory = async () => {
    setClick(isClick + 1);
    if (isClick === LIMIT) {
      await fetchDrinkApi('s', 'search', '');
      setClick(0);
      return;
    }
    await fetchDrinkApi('c', 'filter', 'Other/Unknown');/* 'Other/Unknown' ou 'Other / Unknown' */
  };
  const CocoaCategory = async () => {
    setClick(isClick + 1);
    if (isClick === LIMIT) {
      await fetchDrinkApi('s', 'search', '');
      setClick(0);
      return;
    }
    await fetchDrinkApi('c', 'filter', 'Cocoa');
  };

  return (
    <div className="drinksButtons">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ AllCategory }
      >
        <img
          src={ cocktail }
          alt="cocktail"
          className="img-btn"
        />
        All
      </button>
      <button
        type="button"
        data-testid="Ordinary Drink-category-filter"
        onClick={ OrdinaryCategory }
      >
        <img
          src={ drink }
          alt="drink"
          className="img-btn"
        />
        Ordinary Drink
      </button>
      <button
        type="button"
        data-testid="Cocktail-category-filter"
        onClick={ CocktailCategory }
      >
        <img
          src={ all }
          alt="cocktail"
          className="img-btn"
        />
        Cocktail
      </button>
      <button
        type="button"
        data-testid="Shake-category-filter"
        onClick={ ShakeCategory }
      >
        <img
          src={ milkshake }
          alt="milkshake"
          className="img-btn"
        />
        Shake
      </button>
      <button
        type="button"
        data-testid="Other/Unknown-category-filter"
        onClick={ OtherCategory }
      >
        <img
          src={ other }
          alt="other"
          className="img-btn"
        />
        Other/ Unknown
      </button>
      <button
        type="button"
        data-testid="Cocoa-category-filter"
        onClick={ CocoaCategory }
      >
        <img
          src={ coffee }
          alt="coffee"
          className="img-btn"
        />
        Cocoa
      </button>
    </div>
  );
}

export default DrinksButtons;
