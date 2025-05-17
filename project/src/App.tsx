import React, { useState, useEffect } from 'react';
import { ChefHat } from 'lucide-react';
import { Header } from './components/Header';
import { RecipeGenerator } from './components/RecipeGenerator';
import { RecipeList } from './components/RecipeList';
import { RecipeDetail } from './components/RecipeDetail';
import { useRecipeStore } from './store/recipeStore';
import type { Recipe } from './types';

function App() {
  const { recipes } = useRecipeStore();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [view, setView] = useState<'home' | 'detail' | 'favorites'>('home');
  const [showAppIntro, setShowAppIntro] = useState(true);
  
  useEffect(() => {
    if (recipes.length > 0) {
      setShowAppIntro(false);
    }
  }, [recipes.length]);
  
  const handleRecipeGenerated = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBackToRecipes = () => {
    setSelectedRecipe(null);
    setView('home');
  };
  
  const toggleFavorites = () => {
    if (view === 'favorites') {
      setView('home');
    } else {
      setView('favorites');
      setSelectedRecipe(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onFavoritesClick={toggleFavorites}
        hasGeneratedRecipes={recipes.length > 0}
        currentView={view}
      />
      
      <main className="container-custom py-8">
        {view === 'detail' && selectedRecipe ? (
          <RecipeDetail recipe={selectedRecipe} onBack={handleBackToRecipes} />
        ) : (
          <div className="space-y-12">
            {showAppIntro && view === 'home' && (
              <section className="text-center max-w-4xl mx-auto py-6 animate-fade-in">
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full">
                    <ChefHat size={36} className="text-primary-600" />
                  </div>
                </div>
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                  Turn Random Ingredients into Delicious Meals
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  SmartChef uses AI to create healthy, tasty recipes from whatever ingredients you have on hand.
                </p>
              </section>
            )}
            
            {view === 'home' && (
              <RecipeGenerator onRecipeGenerated={handleRecipeGenerated} />
            )}
            
            {recipes.length > 0 && (
              <section className="animate-slide-up">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  {view === 'favorites' ? 'Your Favorite Recipes' : 'Your Generated Recipes'}
                </h2>
                <RecipeList 
                  isFavorites={view === 'favorites'} 
                  onSelectRecipe={handleSelectRecipe} 
                />
              </section>
            )}
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container-custom text-center text-gray-500 text-sm">
          <p>© 2025 SmartChef. All rights reserved.</p>
          <p className="mt-1">Powered by AI to turn ordinary ingredients into extraordinary meals.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;