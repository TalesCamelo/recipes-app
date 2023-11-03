import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchRecipeContext } from '../Context/FetchRecipes';

function Recipes() {
  const { fetchIngredientFood, fetchDrinkApi } = useContext(FetchRecipeContext);
  const history = useHistory();
  useEffect(() => {
    const resolvePromese = async () => {
      const location = history.location.pathname;
      if (location === '/meals') {
        await fetchIngredientFood('s', 'search', '');
      } else if (location === '/drinks') {
        await fetchDrinkApi('s', 'search', '');
      }
    };
    resolvePromese();
  }, []);
  return (
    <div />
  );
}

export default Recipes;
