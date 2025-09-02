import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes }) => {
  
  const isInitialState = recipes.length === 0;
  
  return (
    <div className="row">
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <div key={recipe.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <Link to={`/recipe/${recipe.id}`} className="text-decoration-none text-dark">
              <div className="card h-100">
                <img src={recipe.image} className="card-img-top recipe-card-img" alt={recipe.title} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="col text-center mt-4">
          {isInitialState ? (
            <div className="py-5">
              <h4>Welcome to Recipe Finder!</h4>
              <p className="text-muted">Search for a recipe above or try one of our suggested searches.</p>
            </div>
          ) : (
            <p>No recipes found. Try another search!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
