import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import DoneFavoriteIdem from '../Components/DoneFavoriteEqual';
import ProfileIcon from '../Components/ProfileIcon';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const handleFilter = ({ target }) => {
    if (target.value === 'all') setFilteredRecipes(doneRecipes);
    else {
      const filtered = doneRecipes.filter((recipe) => recipe.type === target.value);
      setFilteredRecipes(filtered);
    }
  };

  return (
    <div>
      <header title="Done Recipes" profile>
        <Header />
        <ProfileIcon />
        <h1 data-testid="page-title">Done Recipes</h1>
      </header>

      <main className="header-btns">
        <button
          className="btn-favo"
          type="button"
          value="meal"
          data-testid="filter-by-meal-btn"
          onClick={ handleFilter }
        >
          Meals
        </button>
        <button
          type="button"
          value="drink"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
          className="btn-favo"
        >
          Drinks
        </button>
        <button
          type="button"
          value="all"
          data-testid="filter-by-all-btn"
          onClick={ handleFilter }
          className="btn-favo"
        >
          All
        </button>
      </main>

      { filteredRecipes.map((doneRecipe, index) => (<DoneFavoriteIdem
        key={ `done-recipe-card-${index}` }
        recipe={ doneRecipe }
        doneOrFav="done"
        index={ index }
        handleFavorites={ () => {} }
      />))}
      <p className="blank-space">espaço</p>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
