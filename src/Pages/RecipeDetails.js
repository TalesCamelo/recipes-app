import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { FetchRecipeContext } from '../Context/FetchRecipes';
import '../css/RecipeDetails.css';
import share from '../images/shareIcon.svg';
import favoriteImg from '../images/blackHeartIcon.svg';
import notFavoriteImg from '../images/whiteHeartIcon.svg';

const num = 6;
const num2 = -1;

function MealsIdRecipeProgress({ match }) {
  const {
    fetchIngredientFood,
    fetchDrinkApi,
    filterIngredient,
    ingredientFoodValue,
    filterMeasure,
    drinkValue,
  } = useContext(FetchRecipeContext);
  const idToBeFetched = match.params.id;
  const history = useHistory();
  const [copySuccess, setCopySuccess] = useState('');
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const resolvePromese = async () => {
      await fetchIngredientFood('i', 'lookup', idToBeFetched);
      await fetchDrinkApi('s', 'search', '');
    };

    resolvePromese();
    const storageFavorites = localStorage.getItem('favoriteRecipes') || [];

    if (storageFavorites.includes(idToBeFetched)) {
      setFavorite(true);
    }
  }, []);

  const recipes = {
    id: 523977,
  };

  const obj = {
    drinks: {
      17203: [1, 2],
    },
    meals: {
      52977: [1, 2],
    },
  };

  localStorage.setItem('DoneRecipes', JSON.stringify(recipes));
  localStorage.setItem('inProgressRecipes', JSON.stringify(obj));

  const storage = JSON.parse(localStorage.getItem('DoneRecipes'));

  const storageString = JSON.stringify(storage.id);

  const storage2 = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const storageString2 = Object.keys(storage2.meals)[0];

  const handleClick = (e) => {
    if (e.target.innerText === 'Start Recipe') {
      history.push(`${idToBeFetched}/in-progress`);
    }
  };

  const handleShareBtn = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopySuccess('Link copiado!');
    }, () => {
      setCopySuccess('Erro ao copiar link');
    });
  };

  const handleFavoritBtn = () => {
    setFavorite(!isFavorite);

    const mealsToFavorite = ingredientFoodValue.meals[0];

    const mealObj = {
      id: mealsToFavorite.idMeal,
      type: 'meal',
      nationality: mealsToFavorite.strArea,
      category: mealsToFavorite.strCategory,
      alcoholicOrNot: '',
      name: mealsToFavorite.strMeal,
      image: mealsToFavorite.strMealThumb,
    };

    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (!Array.isArray(favoriteRecipes)) {
      favoriteRecipes = [];
    }

    const isMealInFavorites = favoriteRecipes
      .findIndex((favoriteMeal) => favoriteMeal.id === mealObj.id) !== num2;

    if (isMealInFavorites) {
      favoriteRecipes = favoriteRecipes
        .filter((favoriteMeal) => favoriteMeal.id !== mealObj.id);
    } else {
      favoriteRecipes.push(mealObj);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  return (
    <div>
      {!ingredientFoodValue.meals ? (
        <p> Carregando... </p>
      ) : (
        <div>
          <header className="header">
            <img
              src={ ingredientFoodValue.meals.map((meal) => meal.strMealThumb) }
              alt="recipe img"
              data-testid="recipe-photo"
              width="360"
              height="330"
              className="detailsImg"
            />
            <div className="header-btns">
              <button
                type="button"
                className="share-btn"
                onClick={ handleShareBtn }
                src={ share }
              >
                <img src={ share } alt="shareImg" />
              </button>
              <button
                type="button"
                className="favorite-btn"
                onClick={ handleFavoritBtn }
                src={ isFavorite ? favoriteImg : notFavoriteImg }
              >
                <img
                  src={ isFavorite ? favoriteImg : notFavoriteImg }
                  alt="FavoriteImg"
                />
              </button>
              {
                !copySuccess ? '' : <p>Link copied!</p>
              }
            </div>
            <h1 data-testid="recipe-title">
              {ingredientFoodValue.meals.map((meal) => meal.strMeal)}
            </h1>
            <h5 data-testid="recipe-category">
              {ingredientFoodValue.meals.map((meal) => meal.strCategory)}
            </h5>
          </header>
          <section>
            <h1> Ingredients: </h1>
            {filterIngredient.map((eachIngredient, index) => (
              <ul key={ index }>
                <li data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${eachIngredient[1]} : ${filterMeasure[index][1]}`}
                </li>
              </ul>
            ))}

            <h1> Instructions </h1>
            <p className="instuctions" data-testid="instructions">
              {ingredientFoodValue.meals[0].strInstructions}
            </p>

            <div className="video-src">
              <iframe
                title={ `${ingredientFoodValue.meals
                  .map((meal) => meal.strMeal)} Video` }
                src={ `https://www.youtube.com/embed/${ingredientFoodValue.meals[0].strYoutube.slice(ingredientFoodValue.meals[0].strYoutube.indexOf('=') + 1)}` }
              />
            </div>
          </section>

          <h1> Drink Recommendation </h1>
          <Carousel className="scroll">
            {!drinkValue.drinks
              ? ''
              : drinkValue.drinks.slice(0, num).map((drink, index) => (
                <Carousel.Item key={ index }>
                  <img
                    src={ drink.strDrinkThumb }
                    alt={ index }
                    className="scroll2"
                  />
                  <Carousel.Caption>
                    <h3>{ drink.strDrink }</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>

          <button
            type="button"
            data-testid="start-recipe-btn"
            className={ idToBeFetched === storageString ? 'hidden' : 'profile-buttons' }
            onClick={ handleClick }
          >
            {
              idToBeFetched !== storageString2 ? 'Start Recipe' : 'Continue Recipe'
            }
          </button>
        </div>
      )}
    </div>
  );
}

MealsIdRecipeProgress.propTypes = {
  props: PropTypes.element,
}.insRequired;

export default MealsIdRecipeProgress;
