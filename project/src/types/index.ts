export interface Ingredient {
  id: string;
  name: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  healthTips: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  tags: string[];
  isFavorite?: boolean;
  createdAt: string;
}

export type DietaryPreference = 
  | 'vegetarian'
  | 'vegan'
  | 'glutenFree'
  | 'dairyFree'
  | 'lowCarb'
  | 'keto'
  | 'paleo';

export interface GenerateRecipeParams {
  ingredients: Ingredient[];
  dietaryPreferences?: DietaryPreference[];
  excludeIngredients?: string[];
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';
}