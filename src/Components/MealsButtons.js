import React, { useContext, useState } from 'react';
import { FetchRecipeContext } from '../Context/FetchRecipes';
import '../css/Meals.css';
import plate from '../images/cutlery.png';
import bread from '../images/bread.png';
import chicken from '../images/chicken.png';
import goat from '../images/goat.png';
import dessert from '../images/icons8-dessert-50.png';
import meat from '../images/meat.png';

function MealsButtons() {
  /*  await fetchIngredientFood('c', 'list', 'list'); */
  const { fetchIngredientFood } = useContext(FetchRecipeContext);
  const [isClick, setClick] = useState(0);
  const LIMIT = 1;

  const AllCategory = async () => {
    await fetchIngredientFood('s', 'search', '');
  };

  const BeefCategory = async () => {
    setClick(isClick + 1);
    if (isClick === LIMIT) {
      await fetchIngredientFood('s', 'search', '');
      setClick(0);
      return;
    }
    await fetchIngredientFood('c', 'filter', 'Beef');
  };
  const GoatCategory = async () => {
    setClick(isClick + 1);
    if (isClick === LIMIT) {
      await fetchIngredientFood('s', 'search', '');
      setClick(0);
      return;
    }
    await fetchIngredientFood('c', 'filter', 'Goat');
  };
  const ChickenCategory = async () => {
    setClick(isClick + 1);
    if (isClick === LIMIT) {
      await fetchIngredientFood('s', 'search', '');
      setClick(0);
      return;
    }
    await fetchIngredientFood('c', 'filter', 'Chicken');
  };
  const BreakFastCategory = async () => {
    setClick(isClick + 1);
    if (isClick === LIMIT) {
      await fetchIngredientFood('s', 'search', '');
      setClick(0);
      return;
    }
    await fetchIngredientFood('c', 'filter', 'Breakfast');
  };
  const DessertCategory = async () => {
    setClick(isClick + 1);
    if (isClick === LIMIT) {
      await fetchIngredientFood('s', 'search', '');
      setClick(0);
      return;
    }
    await fetchIngredientFood('c', 'filter', 'Dessert');
  };

  return (
    <div className="mealsButtons">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ AllCategory }
      >
        <img
          src={ plate }
          alt="plate"
          className="img-btn"
        />
        All
      </button>
      <button
        type="button"
        data-testid="Beef-category-filter"
        onClick={ BeefCategory }
      >
        <img
          src={ meat }
          alt="meat"
          className="img-btn"
        />
        Beef
      </button>
      <button
        type="button"
        data-testid="Goat-category-filter"
        onClick={ GoatCategory }
      >
        <img
          src={ goat }
          alt="goat"
          className="img-btn"
        />
        Goat
      </button>
      <button
        type="button"
        data-testid="Chicken-category-filter"
        onClick={ ChickenCategory }
      >
        <img
          src={ chicken }
          alt="chicken"
          className="img-btn"
        />
        Chicken
      </button>
      <button
        type="button"
        data-testid="Breakfast-category-filter"
        onClick={ BreakFastCategory }
        className="btn-ch"
      >
        <img
          src={ bread }
          alt="bread"
          className="img-btn"
        />
        Breakfast
      </button>
      <button
        type="button"
        data-testid="Dessert-category-filter"
        onClick={ DessertCategory }
      >
        <img
          src={ dessert }
          alt="dessert"
          className="img-btn"
        />
        Dessert
      </button>
    </div>
  );
}

export default MealsButtons;
