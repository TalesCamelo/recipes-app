import React, { useContext } from 'react';
import { FetchRecipeContext } from '../Context/FetchRecipes';

function RecipesFoodCard() {
  const { filterIngredient, ingredientFoodValue,
    filterMeasure } = useContext(FetchRecipeContext);

  return (
    <div>
      {!ingredientFoodValue.meals ? (
        <p> Carregando... </p>
      ) : (

        <div>
          <header>
            <img
              src={ ingredientFoodValue.meals.map((meal) => meal.strMealThumb) }
              alt="recipe img"
              data-testid="recipe-photo"
            />

            <h1 data-testid="recipe-title">
              {ingredientFoodValue.meals.map((meal) => meal.strMeal)}
            </h1>
            <h2 data-testid="recipe-category">
              {ingredientFoodValue.meals.map((meal) => meal.strCategory)}
            </h2>
          </header>
          <section>
            <h1> Ingredients: </h1>
            {
              filterIngredient.map((eachIngredient, index) => (
                <ul key={ index }>
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { `${eachIngredient[1]} : ${(filterMeasure[index])[1]}` }
                  </li>
                </ul>
              ))
            }

            <h1> Instructions </h1>
            <p data-testid="instructions">
              { ingredientFoodValue.meals[0].strInstructions }
            </p>
            <div>
              <video
                data-testid="video"
                width="140"
                height="140"
                controls
                autoPlay
                preload
              >
                <source
                  src={ ingredientFoodValue.meals[0].strYoutube }
                  type="video/mp4"
                />
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            </div>

          </section>
        </div>
      )}
    </div>
  );
}

export default RecipesFoodCard;
