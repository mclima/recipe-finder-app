import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import './App.scss';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Predefined popular searches to save API calls
  const popularSearches = {
    'quick meals': [
      { id: 715538, title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs', image: 'https://spoonacular.com/recipeImages/715538-312x231.jpg' },
      { id: 716429, title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs', image: 'https://spoonacular.com/recipeImages/716429-312x231.jpg' },
      { id: 715421, title: 'Cheesy Chicken Enchilada Quinoa Casserole', image: 'https://spoonacular.com/recipeImages/715421-312x231.jpg' },
      { id: 715495, title: 'Turkey Tomato Cheese Pizza', image: 'https://spoonacular.com/recipeImages/715495-312x231.jpg' },
      { id: 716381, title: 'Nigerian Snail Stew', image: 'https://spoonacular.com/recipeImages/716381-312x231.jpg' },
      { id: 782601, title: 'Red Kidney Bean Jambalaya', image: 'https://spoonacular.com/recipeImages/782601-312x231.jpg' },
      { id: 794349, title: 'Broccoli and Chickpea Rice Salad', image: 'https://spoonacular.com/recipeImages/794349-312x231.jpg' },
      { id: 715446, title: 'Slow Cooker Beef Stew', image: 'https://spoonacular.com/recipeImages/715446-312x231.jpg' },
      { id: 715415, title: 'Red Lentil Soup with Chicken and Turnips', image: 'https://spoonacular.com/recipeImages/715415-312x231.jpg' }
    ],
    'vegetarian': [
      { id: 716426, title: 'Cauliflower, Brown Rice, and Vegetable Fried Rice', image: 'https://spoonacular.com/recipeImages/716426-312x231.jpg' },
      { id: 715594, title: 'Homemade Garlic and Basil French Fries', image: 'https://spoonacular.com/recipeImages/715594-312x231.jpg' },
      { id: 644387, title: 'Garlicky Kale', image: 'https://spoonacular.com/recipeImages/644387-312x231.jpg' },
      { id: 716268, title: 'African Chickpea Stew', image: 'https://spoonacular.com/recipeImages/716268-312x231.jpg' },
      { id: 716627, title: 'Easy Homemade Rice and Beans', image: 'https://spoonacular.com/recipeImages/716627-312x231.jpg' },
      { id: 716408, title: 'Greek-Style Baked Beans', image: 'https://spoonacular.com/recipeImages/716408-312x231.jpg' },
      { id: 765011, title: 'Snap Pea and Green Bean Salad with Arugula Pesto', image: 'https://spoonacular.com/recipeImages/765011-312x231.jpg' },
      { id: 647875, title: 'Indian-Style Dill and Turmeric Potato Salad', image: 'https://spoonacular.com/recipeImages/647875-312x231.jpg' },
      { id: 157344, title: 'Spicy Salad with Kidney Beans, Cheddar, and Nuts', image: 'https://spoonacular.com/recipeImages/157344-312x231.jpg' }
    ],
    'dessert': [
      { id: 795751, title: 'Chocolate Vanilla Truffle Cake', image: 'https://spoonacular.com/recipeImages/795751-312x231.jpg' },
      { id: 715569, title: 'Strawberry Cheesecake Chocolate Crepes', image: 'https://spoonacular.com/recipeImages/715569-312x231.jpg' },
      { id: 716432, title: 'Finger Foods: Frittata Muffins', image: 'https://spoonacular.com/recipeImages/716432-312x231.jpg' },
      { id: 716276, title: 'Doughnuts', image: 'https://spoonacular.com/recipeImages/716276-312x231.jpg' },
      { id: 658509, title: 'Roasted Strawberry Protein Smoothie', image: 'https://spoonacular.com/recipeImages/658509-312x231.jpg' },
      { id: 664547, title: 'Vegetable Dip', image: 'https://spoonacular.com/recipeImages/664547-312x231.jpg' },
      { id: 661340, title: 'Spinach Salad with Strawberry Vinaigrette', image: 'https://spoonacular.com/recipeImages/661340-312x231.jpg' },
      { id: 715574, title: 'Homemade Strawberry Shake', image: 'https://spoonacular.com/recipeImages/715574-312x231.jpg' },
      { id: 643426, title: 'Fresh Cherry Scones', image: 'https://spoonacular.com/recipeImages/643426-312x231.jpg' }
    ],
    'breakfast': [
      { id: 636589, title: 'Butternut Squash Frittata', image: 'https://spoonacular.com/recipeImages/636589-312x231.jpg' },
      { id: 655235, title: 'Peanut Butter and Jelly Smoothie', image: 'https://spoonacular.com/recipeImages/655235-312x231.jpg' },
      { id: 716195, title: 'Spicy Indian-Style Hummus', image: 'https://spoonacular.com/recipeImages/716195-312x231.jpg' },
      { id: 632573, title: 'Apple Pie Smoothie', image: 'https://spoonacular.com/recipeImages/632573-312x231.jpg' },
      { id: 655575, title: 'Peanut Butter and Jelly Oatmeal', image: 'https://spoonacular.com/recipeImages/655575-312x231.jpg' },
      { id: 716361, title: 'Stir-fried Kale', image: 'https://spoonacular.com/recipeImages/716361-312x231.jpg' },
      { id: 716437, title: 'Chilled Cucumber Avocado Soup with Yogurt and Kefir', image: 'https://spoonacular.com/recipeImages/716437-312x231.jpg' },
      { id: 639535, title: 'Citrusy Pecan Garbanzo Couscous: A Salad For Cold Weather', image: 'https://spoonacular.com/recipeImages/639535-312x231.jpg' },
      { id: 652417, title: 'Moroccan chickpea and lentil stew', image: 'https://spoonacular.com/recipeImages/652417-312x231.jpg' }
    ]
  };

  const handleSearch = async (e, directQuery = null) => {
    e.preventDefault();
    
    // Use directQuery if provided, otherwise use searchQuery from state
    const queryToUse = directQuery || searchQuery;
    
    if (!queryToUse || isLoading) return;

    setIsLoading(true);
    setErrorMessage('');
    
    // Check if the search query matches any of our predefined popular searches
    const normalizedQuery = queryToUse.toLowerCase().trim();
    if (popularSearches[normalizedQuery]) {
      setRecipes(popularSearches[normalizedQuery]);
      setIsLoading(false);
      return;
    }

    // If not a predefined search, make an API call
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${queryToUse}&number=9&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (data.code === 402 || data.status === 'failure' || data.message?.includes('limit')) {
        setErrorMessage('Daily API request limit reached. Please try again tomorrow.');
        setRecipes([]);
      } else if (!data.results || data.results.length === 0) {
        setErrorMessage(`No recipes found for "${queryToUse}". Try a different search term.`);
        setRecipes([]);
      } else {
        setRecipes(data.results);
      }
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      setErrorMessage('An error occurred while searching for recipes. Please try again.');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={(
          <HomePage 
            recipes={recipes} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            isLoading={isLoading} 
            handleSearch={handleSearch}
            errorMessage={errorMessage}
          />
        )} 
      />
      <Route path="/recipe/:id" element={<RecipePage />} />
    </Routes>
  );
}

export default App
