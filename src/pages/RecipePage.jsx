import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaRegClock, FaStar, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import NutritionChart from '../components/NutritionChart';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const navigate = useNavigate();
  const summaryRef = useRef(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      setIsLoading(true);
      setRecipe(null);

      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code === 402) {
          // API quota exceeded
          setApiLimitReached(true);
          setRecipe(null);
        } else {
          setRecipe(data);
        }
      } catch (error) {
        console.error("Failed to fetch recipe details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const summaryElement = summaryRef.current;
    if (!summaryElement) return;

    const handleLinkClick = (event) => {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        const idMatch = href.match(/-(\d+)$/);
        if (idMatch && idMatch[1]) {
          navigate(`/recipe/${idMatch[1]}`);
        }
      }
    };

    summaryElement.addEventListener('click', handleLinkClick);

    return () => {
      summaryElement.removeEventListener('click', handleLinkClick);
    };
  }, [recipe, navigate]);

  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (apiLimitReached) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning text-center" role="alert">
          <h4 className="alert-heading">Daily API request limit reached!</h4>
          <p>We've reached the daily limit for recipe requests. Please try again tomorrow.</p>
          <hr />
          <Link to="/" className="btn btn-outline-secondary">Back to Search</Link>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return <div className="text-center py-5">Recipe not found.</div>;
  }

  
  const getNutrient = (nutrientName) => {
    const nutrient = recipe.nutrition.nutrients.find(n => n.name === nutrientName);
    return nutrient ? nutrient.amount : 0;
  };

  const renderStars = (score) => {
    const rating = Math.round(score / 20); // Convert score from 0-100 to 0-5
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className="me-1" 
          style={{ color: i < rating ? '#f5c518' : '#e0e0e0' }} 
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="recipe-header py-3">
        <div className="container d-flex justify-content-around text-white">
          {recipe.preparationMinutes > 0 && (
            <div className="text-center">
              <div className="text-uppercase small">Prep Time</div>
              <FaRegClock className="me-1" /> {recipe.preparationMinutes} min
            </div>
          )}
          {recipe.cookingMinutes > 0 && (
            <div className="text-center">
              <div className="text-uppercase small">Cook Time</div>
              <FaRegClock className="me-1" /> {recipe.cookingMinutes} min
            </div>
          )}
          {recipe.readyInMinutes > 0 && (
            <div className="text-center">
              <div className="text-uppercase small">Ready Time</div>
              <FaRegClock className="me-1" /> {recipe.readyInMinutes} min
            </div>
          )}
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-md-1 d-flex flex-column align-items-center">
            <div className="text-uppercase small mb-2">Share</div>
            <a 
              href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Check out this recipe: ${recipe.title}`)}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Share on Facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this recipe: ${recipe.title}`)}&url=${encodeURIComponent(window.location.href)}&via=recipefinder&hashtags=cooking,recipes`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Share on X (formerly Twitter)"
            >
              <FaXTwitter />
            </a>
            <a 
              onClick={(e) => {
                e.preventDefault();
                alert('To share on Instagram:\n1. Take a screenshot of this recipe\n2. Open Instagram\n3. Create a new post or story\n4. Upload the screenshot\n5. Add the recipe URL in your caption');
              }}
              href="#"
              className="social-icon"
              aria-label="Share on Instagram"
            >
              <FaInstagram />
            </a>
          </div>

          <div className="col-md-7">
            <h1>{recipe.title}</h1>
            {recipe.aggregateLikes > 0 && (
              <div className="d-flex align-items-center mb-3">
                {renderStars(recipe.spoonacularScore)}
                <span className="ms-2">{recipe.aggregateLikes} ratings</span>
              </div>
            )}
            <div ref={summaryRef} dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            <div className="my-4">
              {recipe.dishTypes?.map(type => (
                <span key={type} className="badge bg-light text-dark me-2 p-2">{type}</span>
              ))}
            </div>
            
            {/* Ingredients Section */}
            <div className="card p-4 mb-4">
              <h5 className="mb-3">Ingredients</h5>
              <ul className="list-group list-group-flush">
                {recipe.extendedIngredients?.map((ingredient, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{ingredient.original}</span>
                    <span className="badge bg-light text-dark">{ingredient.amount} {ingredient.unit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Section */}
            <div className="card p-4 mb-4">
              <h5 className="mb-3">Instructions</h5>
              {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                <ol className="ps-3">
                  {recipe.analyzedInstructions[0].steps.map(step => (
                    <li key={step.number} className="mb-3">
                      <div className="fw-bold mb-1">Step {step.number}</div>
                      <div>{step.step}</div>
                    </li>
                  ))}
                </ol>
              ) : recipe.instructions ? (
                <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
              ) : (
                <p>No instructions available for this recipe.</p>
              )}
            </div>

            <div className="card p-4">
              <div className="row">
                <div className="col-md-8">
                  <h5 className="mb-3">Nutrition</h5>
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <span><span className="dot protein-dot me-2"></span>Net Carbs</span>
                    <strong>{getNutrient('Carbohydrates')}g</strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <span><span className="dot protein-dot me-2"></span>Protein</span>
                    <strong>{getNutrient('Protein')}g</strong>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span><span className="dot fat-dot me-2"></span>Fats</span>
                    <strong>{getNutrient('Fat')}g</strong>
                  </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                  <NutritionChart recipe={recipe} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <img src={recipe.image} className="img-fluid rounded recipe-detail-img" alt={recipe.title} />
          </div>
        </div>
        <Link to="/" className="btn btn-outline-secondary mt-5">Back to Search</Link>
      </div>
    </div>
  );
};

export default RecipePage;
