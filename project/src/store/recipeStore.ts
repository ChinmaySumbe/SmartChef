import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Ingredient, Recipe, DietaryPreference, GenerateRecipeParams } from '../types';
import { mockGenerateRecipe } from '../services/mockRecipeService';

interface RecipeState {
  ingredients: Ingredient[];
  recipes: Recipe[];
  favoriteRecipes: Recipe[];
  dietaryPreferences: DietaryPreference[];
  isGenerating: boolean;
  
  // Actions
  addIngredient: (ingredient: string) => void;
  removeIngredient: (id: string) => void;
  clearIngredients: () => void;
  generateRecipe: (params: GenerateRecipeParams) => Promise<Recipe>;
  toggleFavoriteRecipe: (recipeId: string) => void;
  toggleDietaryPreference: (preference: DietaryPreference) => void;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      ingredients: [],
      recipes: [],
      favoriteRecipes: [],
      dietaryPreferences: [],
      isGenerating: false,
      
      addIngredient: (ingredient: string) => {
        const trimmedIngredient = ingredient.trim();
        if (!trimmedIngredient) return;
        
        // Check if ingredient already exists
        const exists = get().ingredients.some(
          (item) => item.name.toLowerCase() === trimmedIngredient.toLowerCase()
        );
        
        if (!exists) {
          set((state) => ({
            ingredients: [
              ...state.ingredients,
              { id: uuidv4(), name: trimmedIngredient }
            ]
          }));
        }
      },
      
      removeIngredient: (id: string) => {
        set((state) => ({
          ingredients: state.ingredients.filter((item) => item.id !== id)
        }));
      },
      
      clearIngredients: () => {
        set({ ingredients: [] });
      },
      
      generateRecipe: async (params: GenerateRecipeParams) => {
        set({ isGenerating: true });
        
        try {
          // In a real app, this would call the OpenAI API via a backend service
          // For now, we'll use mock data
          const recipe = await mockGenerateRecipe(params);
          
          set((state) => ({
            recipes: [recipe, ...state.recipes],
            isGenerating: false
          }));
          
          return recipe;
        } catch (error) {
          set({ isGenerating: false });
          throw error;
        }
      },
      
      toggleFavoriteRecipe: (recipeId: string) => {
        set((state) => {
          // Update in main recipes list
          const updatedRecipes = state.recipes.map((recipe) => {
            if (recipe.id === recipeId) {
              return { ...recipe, isFavorite: !recipe.isFavorite };
            }
            return recipe;
          });
          
          // Update favorites list
          let updatedFavorites = [...state.favoriteRecipes];
          const existingIndex = updatedFavorites.findIndex(
            (recipe) => recipe.id === recipeId
          );
          
          if (existingIndex >= 0) {
            updatedFavorites = updatedFavorites.filter(
              (recipe) => recipe.id !== recipeId
            );
          } else {
            const recipeToAdd = updatedRecipes.find(
              (recipe) => recipe.id === recipeId
            );
            if (recipeToAdd) {
              updatedFavorites = [{ ...recipeToAdd, isFavorite: true }, ...updatedFavorites];
            }
          }
          
          return {
            recipes: updatedRecipes,
            favoriteRecipes: updatedFavorites
          };
        });
      },
      
      toggleDietaryPreference: (preference: DietaryPreference) => {
        set((state) => {
          const exists = state.dietaryPreferences.includes(preference);
          
          if (exists) {
            return {
              dietaryPreferences: state.dietaryPreferences.filter(
                (item) => item !== preference
              )
            };
          } else {
            return {
              dietaryPreferences: [...state.dietaryPreferences, preference]
            };
          }
        });
      },
      
      setIsGenerating: (isGenerating: boolean) => {
        set({ isGenerating });
      }
    }),
    {
      name: 'smartchef-storage',
      partialize: (state) => ({
        favoriteRecipes: state.favoriteRecipes,
        dietaryPreferences: state.dietaryPreferences
      })
    }
  )
);