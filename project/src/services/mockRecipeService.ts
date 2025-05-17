import { v4 as uuidv4 } from 'uuid';
import { getRandomItem } from '../lib/utils';
import type { GenerateRecipeParams, Recipe } from '../types';

const foodImages = [
  'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1256875/pexels-photo-1256875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

// Mock recipe templates
const recipeTemplates = [
  {
    title: 'Pasta with {0} and {1}',
    description: 'A delicious pasta dish made with fresh {0} and {1}, perfect for a quick weeknight dinner.',
    instructions: [
      'Bring a large pot of salted water to a boil.',
      'Add pasta and cook according to package instructions until al dente.',
      'While pasta is cooking, heat olive oil in a large pan over medium heat.',
      'Add {0} and cook until softened, about 5 minutes.',
      'Add {1} and cook for another 2-3 minutes.',
      'Drain pasta, reserving 1/4 cup of pasta water.',
      'Add pasta to the pan with the vegetables, along with the reserved pasta water.',
      'Toss to combine, season with salt and pepper to taste.',
      'Serve hot, garnished with fresh herbs if desired.'
    ],
    healthTips: [
      'Use whole grain pasta for added fiber and nutrients.',
      'Add more vegetables for extra vitamins and minerals.',
      'Use olive oil instead of butter for heart-healthy fats.'
    ],
    difficulty: 'easy' as const,
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    tags: ['pasta', 'quick', 'dinner', 'vegetarian']
  },
  {
    title: '{0} and {1} Stir-Fry',
    description: 'A quick and healthy stir-fry featuring {0} and {1}, ready in under 30 minutes.',
    instructions: [
      'Prepare all ingredients before cooking. Slice {0} and {1} into bite-sized pieces.',
      'Heat oil in a wok or large frying pan over high heat.',
      'Add {0} and stir-fry for 2-3 minutes until beginning to soften.',
      'Add {1} and continue to stir-fry for another 2 minutes.',
      'Add sauce ingredients and toss to coat.',
      'Cook for 1-2 more minutes until everything is hot and well combined.',
      'Serve immediately over rice or noodles, garnished with green onions.'
    ],
    healthTips: [
      'Use brown rice instead of white rice for more fiber and nutrients.',
      'Add a variety of colorful vegetables for a wider range of vitamins.',
      'Limit sodium by using low-sodium soy sauce or tamari.'
    ],
    difficulty: 'easy' as const,
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    tags: ['stir-fry', 'quick', 'dinner', 'Asian']
  },
  {
    title: 'Roasted {0} and {1} Salad',
    description: 'A hearty salad featuring roasted {0} and fresh {1}, perfect for lunch or a light dinner.',
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Toss {0} with olive oil, salt, and pepper on a baking sheet.',
      'Roast for 20-25 minutes until golden and tender, stirring halfway through.',
      'While {0} is roasting, prepare the dressing by whisking together olive oil, lemon juice, mustard, and honey.',
      'In a large bowl, combine fresh greens, {1}, and any other fresh vegetables.',
      'Add the roasted {0} to the salad while still warm.',
      'Drizzle with dressing, toss gently, and serve immediately.'
    ],
    healthTips: [
      'Add seeds or nuts for healthy fats and extra protein.',
      'Use a variety of colorful vegetables to maximize nutrient intake.',
      'Make your own dressing to control sugar and sodium content.'
    ],
    difficulty: 'medium' as const,
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    tags: ['salad', 'healthy', 'lunch', 'vegetables']
  }
];

export const mockGenerateRecipe = async (params: GenerateRecipeParams): Promise<Recipe> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const { ingredients } = params;
  
  if (ingredients.length < 2) {
    throw new Error('Please add at least 2 ingredients');
  }
  
  // Pick a random template and fill in with user ingredients
  const template = getRandomItem(recipeTemplates);
  const ing1 = ingredients[0].name;
  const ing2 = ingredients[1].name;
  
  // Fill in template with ingredient names
  const title = template.title.replace('{0}', ing1).replace('{1}', ing2);
  const description = template.description.replace('{0}', ing1).replace('{1}', ing2);
  const instructions = template.instructions.map(step => 
    step.replace('{0}', ing1).replace('{1}', ing2)
  );
  
  // Generate ingredient list combining template assumptions and user ingredients
  const recipeIngredients = [
    `${ing1}, prepared as needed`,
    `${ing2}, prepared as needed`,
    'Salt and pepper to taste',
    'Olive oil',
    '2 cloves garlic, minced',
    '1 onion, diced',
    ...ingredients.slice(2).map(ing => `${ing.name}, to taste`)
  ];
  
  return {
    id: uuidv4(),
    title,
    description,
    ingredients: recipeIngredients,
    instructions,
    healthTips: template.healthTips,
    prepTime: template.prepTime,
    cookTime: template.cookTime,
    servings: template.servings,
    difficulty: template.difficulty,
    imageUrl: getRandomItem(foodImages),
    tags: [...template.tags, ing1, ing2],
    isFavorite: false,
    createdAt: new Date().toISOString()
  };
};