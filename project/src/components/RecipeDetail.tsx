import React from 'react';
import { Clock, Users, Heart, Check, ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';
import { Tag } from './ui/Tag';
import { useRecipeStore } from '../store/recipeStore';
import type { Recipe } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const { toggleFavoriteRecipe } = useRecipeStore();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto animate-fade-in">
      <div className="relative h-64 sm:h-80 md:h-96 w-full">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <Button
          variant="ghost"
          className="absolute top-4 left-4 bg-white/80 hover:bg-white/90 text-gray-800 rounded-full"
          onClick={onBack}
          iconLeft={<ArrowLeft size={18} />}
          aria-label="Back to recipes"
        >
          Back
        </Button>
        <Button
          variant="ghost"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white/90 text-gray-800 rounded-full"
          onClick={() => toggleFavoriteRecipe(recipe.id)}
          iconLeft={<Heart size={18} className={recipe.isFavorite ? "fill-accent-500 text-accent-500" : ""} />}
          aria-label={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {recipe.isFavorite ? 'Saved' : 'Save'}
        </Button>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">{recipe.title}</h1>
          <p className="text-white/90 mb-2 line-clamp-2">{recipe.description}</p>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.slice(0, 5).map((tag, index) => (
              <Tag key={index} color="primary" className="text-xs">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-4 justify-between mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center">
            <Clock size={20} className="text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Prep Time</p>
              <p className="font-medium">{recipe.prepTime} min</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock size={20} className="text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Cook Time</p>
              <p className="font-medium">{recipe.cookTime} min</p>
            </div>
          </div>
          <div className="flex items-center">
            <Users size={20} className="text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Servings</p>
              <p className="font-medium">{recipe.servings}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Difficulty</p>
            <p className="font-medium capitalize">{recipe.difficulty}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-display font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-xl font-display font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-xl font-display font-semibold mb-4">Health Tips</h2>
          <div className="bg-primary-50 rounded-lg p-4">
            <ul className="space-y-2">
              {recipe.healthTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};