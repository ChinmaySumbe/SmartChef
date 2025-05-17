import React from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../types';

interface RecipeListProps {
  isFavorites?: boolean;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({ 
  isFavorites = false,
  onSelectRecipe 
}) => {
  const { recipes, favoriteRecipes } = useRecipeStore();
  const recipesToDisplay = isFavorites ? favoriteRecipes : recipes;

  if (recipesToDisplay.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          {isFavorites 
            ? "No favorite recipes yet" 
            : "Generate your first recipe"}
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {isFavorites
            ? "Save recipes you love and they'll appear here for easy access"
            : "Add ingredients and click 'Generate Recipe' to create your first dish"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipesToDisplay.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onViewDetails={() => onSelectRecipe(recipe)}
        />
      ))}
    </div>
  );
};