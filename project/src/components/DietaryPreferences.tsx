import React from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { Tag } from './ui/Tag';
import type { DietaryPreference } from '../types';

const DIETARY_OPTIONS: { label: string; value: DietaryPreference }[] = [
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Gluten-Free', value: 'glutenFree' },
  { label: 'Dairy-Free', value: 'dairyFree' },
  { label: 'Low-Carb', value: 'lowCarb' },
  { label: 'Keto', value: 'keto' },
  { label: 'Paleo', value: 'paleo' },
];

export const DietaryPreferences: React.FC = () => {
  const { dietaryPreferences, toggleDietaryPreference } = useRecipeStore();

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Dietary Preferences</h3>
      <div className="flex flex-wrap gap-2">
        {DIETARY_OPTIONS.map((option) => {
          const isSelected = dietaryPreferences.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggleDietaryPreference(option.value)}
              className="focus:outline-none"
              aria-pressed={isSelected}
              type="button"
            >
              <Tag
                color={isSelected ? 'primary' : 'neutral'}
                className={isSelected ? 'ring-2 ring-primary-300' : ''}
              >
                {option.label}
              </Tag>
            </button>
          );
        })}
      </div>
    </div>
  );
};