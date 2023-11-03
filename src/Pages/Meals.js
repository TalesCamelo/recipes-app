import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import SearchIcon from '../Components/SearchBar';
import ProfileIcon from '../Components/ProfileIcon';
import Footer from '../Components/Footer';
import { FetchRecipeContext } from '../Context/FetchRecipes';
import Card from '../Components/Card';
import Recipes from '../Components/Recipes';
import MealsButtons from '../Components/MealsButtons';
import '../css/Meals.css';

const num = 12;

function Meals() {
  const { ingredientFoodValue } = useContext(FetchRecipeContext);
  return (
    <>
      <header>
        <Header />
        <ProfileIcon />
        <SearchIcon />
        <div className="title">
          <h1 className="title" data-testid="page-title">Meals</h1>
        </div>
      </header>
      <MealsButtons />
      <main>
        <div className="content-meals">
          { !ingredientFoodValue.meals ? '' : ingredientFoodValue.meals.map(
            (item, index) => index < num && (
              <Link
                key={ item.idMeal }
                to={ `/meals/${item.idMeal}` }
              >
                <Card
                  index={ index }
                  name={ item.strMeal }
                  img={ item.strMealThumb }
                />
              </Link>
            ),
          ) }

        </div>
        <p className="blank-space">espaço</p>
      </main>
      <Recipes />
      <Footer />
    </>
  );
}

Meals.propTypes = {
  props: PropTypes.element,
}.insRequired;

export default Meals;
