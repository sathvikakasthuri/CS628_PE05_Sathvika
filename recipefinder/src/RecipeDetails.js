import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const RecipeDetails = ({ recipes = [], onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!recipes || recipes.length === 0) {
    return <div>Loading recipes...</div>;
  }

  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleDelete = () => {
    onDelete(recipe.id);
    navigate('/recipes'); // Redirect back to the home page after deletion
  };

  return (
    <div>
      <h2>Recipe Details</h2>
      <p>Name: {recipe.name}</p>
      <p>Ingredients: {recipe.Ingredients}</p>
      <p>Description: {recipe.Description}</p>
      <Link to={`/recipes/${recipe.id}/edit`}>Edit Recipe</Link>
      <button onClick={handleDelete}>Delete Recipe</button>
    </div>
  );
};

export default RecipeDetails;
