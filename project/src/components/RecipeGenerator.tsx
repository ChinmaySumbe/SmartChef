import React, { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { IngredientInput } from './IngredientInput';
import { DietaryPreferences } from './DietaryPreferences';
import { Button } from './ui/Button';
import { ChefHat, Wand2 } from 'lucide-react';
import type { Recipe } from '../types';

interface RecipeGeneratorProps {
  onRecipeGenerated: (recipe: Recipe) => void;
}

export const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({ onRecipeGenerated }) => {
  const { ingredients, dietaryPreferences, generateRecipe, isGenerating, clearIngredients } = useRecipeStore();
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = async () => {
    if (ingredients.length < 2) {
      setError('Please add at least 2 ingredients');
      return;
    }

    setError(null);

    try {
      const recipe = await generateRecipe({
        ingredients,
        dietaryPreferences: dietaryPreferences.length > 0 ? dietaryPreferences : undefined
      });
      
      onRecipeGenerated(recipe);
    } catch (err) {
      setError((err as Error).message || 'Failed to generate recipe');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <ChefHat className="w-8 h-8 text-primary-600 mr-3" />
        <h2 className="text-2xl font-display font-bold text-gray-900">Recipe Generator</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Add the ingredients you have on hand, and our AI chef will create a 
        delicious recipe for you!
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Ingredients</h3>
          <IngredientInput />
        </div>
        
        <DietaryPreferences />
        
        {error && (
          <div className="p-3 bg-accent-50 text-accent-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          <Button
            variant="primary"
            size="lg"
            iconLeft={<Wand2 size={20} />}
            onClick={handleGenerateRecipe}
            isLoading={isGenerating}
            disabled={ingredients.length < 2 || isGenerating}
            className="flex-1"
          >
            {isGenerating ? 'Creating Recipe...' : 'Generate Recipe'}
          </Button>
          
          <Button
            variant="outline"
            onClick={clearIngredients}
            disabled={ingredients.length === 0 || isGenerating}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};