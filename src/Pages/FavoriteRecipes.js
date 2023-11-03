import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProfileIcon from '../Components/ProfileIcon';
import DoneFavoriteEqual from '../Components/DoneFavoriteEqual';
import '../css/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favoriteRecipes,
    setFavoriteRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')) || []);
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  const handleFilter = ({ target }) => {
    if (target.value === 'all') setFilteredRecipes(favoriteRecipes);
    else {
      const filtered = favoriteRecipes.filter((recipe) => recipe.type === target.value);
      setFilteredRecipes(filtered);
    }
  };

  const handleFavorites = (id) => {
    const favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
    const newFavorites = favorites.filter((el) => el.id !== id);

    const newFilteredRecipes = filteredRecipes.filter((el) => el.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteRecipes([...JSON.parse(localStorage.getItem('favoriteRecipes'))]);
    setFilteredRecipes(newFilteredRecipes);
  };

  return (
    <div>
      <header>
        <Header title="Favorite Recipes" profile />
        <ProfileIcon />
        <h1 className="title-favorite-rec" data-testid="page-title">Favorite Recipes</h1>
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
          className="btn-favo"
          type="button"
          value="drink"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
        >
          Drinks
        </button>
        <button
          className="btn-favo"
          type="button"
          value="all"
          data-testid="filter-by-all-btn"
          onClick={ handleFilter }
        >
          All
        </button>
      </main>

      { filteredRecipes.map((favoriteRecipe, index) => (<DoneFavoriteEqual
        key={ `favorite-recipe-card-${index}` }
        recipe={ favoriteRecipe }
        doneOrFav="favorite"
        index={ index }
        handleFavorites={ handleFavorites }
      />))}
      <p className="blank-space">espaço</p>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
