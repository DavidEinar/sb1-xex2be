import { useEffect, useState } from 'react';
import { Recipe as RecipeType } from '../types';
import { RecipeCard } from '../components/RecipeCard';

export function Home() {
  const [recipes, setRecipes] = useState<RecipeType[]>([
    {
      id: '1',
      title: 'Homemade Pizza Margherita',
      description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
      ingredients: ['Pizza dough', 'Tomatoes', 'Mozzarella', 'Basil', 'Olive oil'],
      instructions: ['Prepare dough', 'Add toppings', 'Bake at 450°F'],
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800',
      authorId: '1',
      createdAt: new Date().toISOString(),
      likes: 156,
      rating: 4.8,
      comments: []
    },
    {
      id: '2',
      title: 'Avocado Toast',
      description: 'Creamy avocado on toasted sourdough with poached eggs',
      ingredients: ['Sourdough bread', 'Avocado', 'Eggs', 'Salt', 'Pepper'],
      instructions: ['Toast bread', 'Mash avocado', 'Poach eggs'],
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800',
      authorId: '2',
      createdAt: new Date().toISOString(),
      likes: 98,
      rating: 4.5,
      comments: []
    }
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}