import React from 'react';
import { Clock, Users, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Button } from './ui/Button';
import { Tag } from './ui/Tag';
import { useRecipeStore } from '../store/recipeStore';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onViewDetails }) => {
  const { toggleFavoriteRecipe } = useRecipeStore();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteRecipe(recipe.id);
  };

  return (
    <Card className="w-full cursor-pointer group" onClick={onViewDetails}>
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-opacity-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={20} 
            className={recipe.isFavorite ? "fill-accent-500 text-accent-500" : "text-gray-600"} 
          />
        </button>
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-1">{recipe.title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-1">
          {recipe.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <Tag key={index} color="neutral" className="text-xs py-0.5">
              {tag}
            </Tag>
          ))}
          {recipe.tags.length > 3 && (
            <Tag color="neutral" className="text-xs py-0.5">
              +{recipe.tags.length - 3}
            </Tag>
          )}
        </div>
        
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-between">
        <div className="text-sm font-medium text-primary-700 capitalize">
          {recipe.difficulty}
        </div>
        <Button variant="outline" size="sm">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
};