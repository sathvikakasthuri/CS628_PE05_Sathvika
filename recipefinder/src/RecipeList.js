import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';

const RecipeList = ({ recipes, onDelete }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      <h1>Recipe Finder Application</h1>
      <Link to="/recipes">Recipes List</Link>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`} onClick={() => handleRecipeClick(recipe)}>
              {recipe.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/recipes/add">Add Recipe</Link>
      {selectedRecipe && (
        <RecipeDetails recipe={selectedRecipe} onDelete={onDelete} />
      )}
    </div>
  );
};

export default RecipeList;