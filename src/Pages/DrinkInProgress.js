import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FetchRecipeContext } from '../Context/FetchRecipes';
import shareIcon from '../images/shareIcon.svg';
import favoriteImg from '../images/blackHeartIcon.svg';
import notFavoriteImg from '../images/whiteHeartIcon.svg';
import '../css/Recipes.css';

const num2 = -1;

function DrinkInProgress({ match }) {
  const {
    fetchDrinkApi,
    filterDrink,
    drinkValue,
    drinkMeasure,
    setIsChecked,
    isChecked,
  } = useContext(FetchRecipeContext);
  const idToBeFetched = match.params.id;
  const [isDisabled, setDisabled] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [isFavorite, setFavorite] = useState(false);
  /* const [checkVoid, setCheckVoid] = useState([false]); */
  const checkboxesFromLocalStorage = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );

  const value = Object.values(isChecked);

  useEffect(() => {
    const resolvePromese = async () => {
      await fetchDrinkApi('i', 'lookup', idToBeFetched);
    };
    resolvePromese();

    if (checkboxesFromLocalStorage) {
      setIsChecked(checkboxesFromLocalStorage);
    }
    const storageFavorites = localStorage.getItem('favoriteRecipes') || [];

    if (storageFavorites.includes(idToBeFetched)) {
      setFavorite(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(isChecked),
    );
    /*  setCheckVoid([
      Object.values(isChecked),
    ]); */
    /* value.length === filterDrink.length &&  */
    setDisabled(value
      .every((valueChecked) => valueChecked === true));
  }, [checkboxesFromLocalStorage]);

  const handleShareBtn = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopySuccess('Link copiado!');
    }, () => {
      setCopySuccess('Erro ao copiar link');
    });
  };
  const handleFavoritBtn = () => {
    setFavorite(!isFavorite);
    const drinksToFavorite = drinkValue.drinks[0];

    const drinkObj = {
      id: drinksToFavorite.idDrink,
      type: 'drink',
      nationality: '',
      category: drinksToFavorite.strCategory,
      alcoholicOrNot: drinksToFavorite.strAlcoholic,
      name: drinksToFavorite.strDrink,
      image: drinksToFavorite.strDrinkThumb,
    };

    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (!Array.isArray(favoriteRecipes)) {
      favoriteRecipes = [];
    }

    const isMealInFavorites = favoriteRecipes
      .findIndex((favoriteMeal) => favoriteMeal.id === drinkObj.id) !== num2;

    if (isMealInFavorites) {
      favoriteRecipes = favoriteRecipes
        .filter((favoriteMeal) => favoriteMeal.id !== drinkObj.id);
    } else {
      favoriteRecipes.push(drinkObj);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const handleClick = () => {
    console.log('clicou');
  };

  return (
    <div>
      {!drinkValue.drinks ? (
        <p> Carregando... </p>
      ) : (

        <div>
          <header>
            <p>
              <button
                data-testid="share-btn"
                type="button"
                onClick={ handleShareBtn }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ handleFavoritBtn }
                src={ isFavorite ? favoriteImg : notFavoriteImg }
              >
                <img
                  src={ isFavorite ? favoriteImg : notFavoriteImg }
                  alt="FavoriteImg"
                />
              </button>
              {
                !copySuccess ? '' : <span>Link copied!</span>
              }
            </p>

            <img
              src={ drinkValue.drinks.map((meal) => meal.strDrinkThumb) }
              alt="recipe img"
              data-testid="recipe-photo"
              width="360"
              height="330"
            />
            <h1 data-testid="recipe-title">
              {drinkValue.drinks.map((meal) => meal.strDrink)}
            </h1>
            <h2 data-testid="recipe-category">
              {drinkValue.drinks.map((meal) => meal.strCategory)}
            </h2>
          </header>
          <section>
            <h1> Ingredients: </h1>
            {
              filterDrink.map((eachIngredient, index) => (
                <label
                  key={ index }
                  htmlFor="ingredient"
                  data-testid={ `${index}-ingredient-step` }
                  className={ isChecked[eachIngredient[1]] && 'scratched' }
                >
                  <div>
                    <input
                      type="checkbox"
                      className="ingredients"
                      checked={ isChecked[eachIngredient[1]] }
                      name={ eachIngredient[1] }
                      value={ eachIngredient[1] }
                      onChange={ ({ target: { name, checked } }) => setIsChecked({
                        ...isChecked,
                        [name]: checked,
                      }) }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    />
                    { `${eachIngredient[1]} : ${(drinkMeasure[index])[1]}` }
                  </div>
                </label>
              ))
            }

            <h1> Instructions </h1>
            <p data-testid="instructions">
              { drinkValue.drinks[0].strInstructions }
            </p>
            <button
              type="button"
              disabled={ !isDisabled }
              onClick={ handleClick }
              data-testid="finish-recipe-btn"
              className="profile-buttons"
            >
              FINISH RECIPE
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

DrinkInProgress.propTypes = {
  props: PropTypes.element,
}.insRequired;

export default DrinkInProgress;
