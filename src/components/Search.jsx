import React from 'react';

const Search = ({ searchQuery, setSearchQuery, handleSearch, isLoading }) => {

  const suggestions = ['quick meals', 'vegetarian', 'dessert', 'breakfast'];
  
  const handleSuggestionClick = (suggestion) => {

    setSearchQuery(suggestion);
     
    const mockEvent = { preventDefault: () => {} };
    
    handleSearch(mockEvent, suggestion);
  };
  
  return (
    <div>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="input-group">
          <input 
            type="text" 
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a recipe..."
            disabled={isLoading}
          />
          <button className="btn btn-dark" type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="d-flex flex-wrap mb-4 justify-content-center">
        <small className="text-muted me-2 mt-1">Try:</small>
        {suggestions.map(suggestion => (
          <button 
            key={suggestion}
            className="btn btn-sm btn-outline-secondary me-2 mb-2"
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={isLoading}
          >
            {suggestion}
          </button>
        ))}
        <small className="text-muted ms-2 mt-1">(no API calls)</small>
      </div>
    </div>
  )
};

export default Search;
