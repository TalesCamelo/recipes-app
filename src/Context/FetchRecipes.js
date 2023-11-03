import { createContext, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export const FetchRecipeContext = createContext();

function FetchNameApi({ children }) {
  const [isLoading, setLoading] = useState(false);
  const [ingredientFoodValue, setIngredient] = useState([]);
  const [filterIngredient, setFilterIngredient] = useState([]);
  const [filterMeasure, setMeasure] = useState([]);
  const [drinkValue, setDrink] = useState([]);
  const [filterDrink, setFilterDrink] = useState([]);
  const [drinkMeasure, setDrinkMeasure] = useState({});
  const history = useHistory();
  const [isChecked, setIsChecked] = useState({});
  const GOATNUMBER = 52968;
  /* const AQUAMARINE = '178319'; */

  const fetchIngredientFood = async (letter, method, ingredient) => {
    setLoading(true);
    const url = `https://www.themealdb.com/api/json/v1/1/${method}.php?${letter}=${ingredient}`;

    const ingredientFood = await fetch(url);

    const ingredientJson = await ingredientFood.json();

    if (ingredientJson.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (ingredientJson.meals.length === 1
      && ingredientJson.meals[0].idMeal === GOATNUMBER) {
      history.push(`/meals/${ingredientJson.meals[0].idMeal}`);
    } else {
      const ingredientsFilter = Object.entries(ingredientJson.meals[0]);

      const ingredientFoods = ingredientsFilter
        .filter((ingredientFiltered) => ingredientFiltered[1] !== '')
        .filter((ingredients) => ingredients[1] !== null)
        .filter((ingredientes) => ingredientes[0].includes('strIngredient'));

      const measureEntries = Object.entries(ingredientJson.meals[0]);

      const filterMeasured = measureEntries
        .filter((ingredientFiltered) => ingredientFiltered[1] !== ' ')
        .filter((ingredientFiltered) => ingredientFiltered[1] !== '')
        .filter((ingredients) => ingredients[1] !== null)
        .filter((ingredientes) => ingredientes[0].includes('strMeasure'));

      setMeasure(filterMeasured);

      setFilterIngredient(ingredientFoods);

      setIngredient(ingredientJson);
    }

    setLoading(false);
  };

  const fetchDrinkApi = async (letter, method, ingredient) => {
    setLoading(true);

    const url = `https://www.thecocktaildb.com/api/json/v1/1/${method}.php?${letter}=${ingredient}`;

    const drinkResults = await fetch(url);

    const drinkJson = await drinkResults.json();

    const drinksFilter = Object.entries(drinkJson.drinks[0]);

    const ingredientDrinks = drinksFilter
      .filter((ingredientFiltered) => ingredientFiltered[1] !== '')
      .filter((ingredientFiltered) => ingredientFiltered[1] !== ' ')
      .filter((ingredients) => ingredients[1] !== null)
      .filter((ingredientes) => ingredientes[0].includes('strIngredient'));

    const measureEntries = Object.entries(drinkJson.drinks[0]);

    const drinkFilterMeasured = measureEntries
      .filter((ingredientFiltered) => ingredientFiltered[1] !== ' ')
      .filter((ingredientFiltered) => ingredientFiltered[1] !== '')
      .filter((ingredients) => ingredients[1] !== null)
      .filter((ingredientes) => ingredientes[0].includes('strMeasure'));

    setDrinkMeasure(drinkFilterMeasured);

    setFilterDrink(ingredientDrinks);

    setDrink(drinkJson);

    setLoading(false);
    if (drinkJson.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if
    (drinkJson.drinks.length === 1) {
      history.push(`/drinks/${drinkJson.drinks[0].idDrink}`);
    }
  };

  const saveAllData = useMemo(() => ({
    fetchIngredientFood,
    fetchDrinkApi,
    isLoading,
    ingredientFoodValue,
    drinkValue,
    filterIngredient,
    filterMeasure,
    filterDrink,
    drinkMeasure,
    setIsChecked,
    isChecked,
  }), [isLoading, ingredientFoodValue, drinkValue, filterIngredient,
    filterMeasure, filterDrink, drinkMeasure, isChecked]);

  return (
    <FetchRecipeContext.Provider value={ saveAllData }>
      { children }
    </FetchRecipeContext.Provider>

  );
}

FetchNameApi.propTypes = {
  children: propTypes.element.isRequired,
};

export default FetchNameApi;
