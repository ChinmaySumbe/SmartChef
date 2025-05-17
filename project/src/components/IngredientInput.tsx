import React, { useState, useRef } from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { Tag } from './ui/Tag';
import { Button } from './ui/Button';
import { Plus } from 'lucide-react';

export const IngredientInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { ingredients, addIngredient, removeIngredient } = useRecipeStore();

  const handleAddIngredient = () => {
    if (inputValue.trim()) {
      addIngredient(inputValue);
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add an ingredient (e.g., chicken, tomatoes)"
          className="input flex-1"
          aria-label="Add ingredient"
        />
        <Button
          onClick={handleAddIngredient}
          iconLeft={<Plus size={16} />}
          aria-label="Add ingredient"
        >
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-10">
        {ingredients.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            Add some ingredients to get started!
          </p>
        ) : (
          ingredients.map((ingredient) => (
            <Tag
              key={ingredient.id}
              onRemove={() => removeIngredient(ingredient.id)}
            >
              {ingredient.name}
            </Tag>
          ))
        )}
      </div>
    </div>
  );
};