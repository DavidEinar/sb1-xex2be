import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle, Star, Clock, Users } from 'lucide-react';
import { Recipe as RecipeType } from '../types';

export function Recipe() {
  const { id } = useParams();
  const [recipe] = useState<RecipeType>({
    id: '1',
    title: 'Homemade Pizza Margherita',
    description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
    ingredients: [
      '1 lb pizza dough',
      '1 cup San Marzano tomatoes, crushed',
      '8 oz fresh mozzarella, sliced',
      'Fresh basil leaves',
      '2 tbsp extra virgin olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat your oven to 450°F (230°C) with a pizza stone or baking sheet inside.',
      'Roll out the pizza dough on a floured surface to your desired thickness.',
      'Spread the crushed tomatoes evenly over the dough, leaving a small border for the crust.',
      'Add the mozzarella slices and drizzle with olive oil.',
      'Carefully transfer the pizza to the preheated stone or baking sheet.',
      'Bake for 12-15 minutes until the crust is golden and the cheese is bubbly.',
      'Remove from oven, add fresh basil leaves, and season with salt and pepper.'
    ],
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800',
    authorId: '1',
    createdAt: new Date().toISOString(),
    likes: 156,
    rating: 4.8,
    comments: [
      {
        id: '1',
        text: 'Turned out perfect! The family loved it.',
        authorId: '2',
        createdAt: new Date().toISOString()
      }
    ]
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-96 object-cover"
        />
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
            <p className="text-lg text-gray-600">{recipe.description}</p>
          </div>

          <div className="flex items-center justify-between py-4 border-y border-gray-200">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-500">
                <Heart className="w-6 h-6" />
                <span>{recipe.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-500">
                <MessageCircle className="w-6 h-6" />
                <span>{recipe.comments.length}</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="w-6 h-6 text-yellow-400" />
                <span>{recipe.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>30 mins</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>4 servings</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full font-semibold">
                      {index + 1}
                    </span>
                    <p className="flex-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Comments</h2>
            {recipe.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{comment.text}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}