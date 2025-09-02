import React from 'react';
import Search from '../components/Search';
import RecipeList from '../components/RecipeList';

const HomePage = ({ recipes, searchQuery, setSearchQuery, isLoading, handleSearch, errorMessage }) => {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Recipe Finder</h1>
      <p className="text-center text-muted mb-4">Powered by Spoonacular. If search results don't appear, we may have reached the daily API request limit. Please try again tomorrow.</p>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Search 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            handleSearch={handleSearch} 
            isLoading={isLoading} 
          />
        </div>
      </div>
      
      {errorMessage && (
        <div className="alert alert-warning text-center my-4" role="alert">
          {errorMessage}
        </div>
      )}
      
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default HomePage;
