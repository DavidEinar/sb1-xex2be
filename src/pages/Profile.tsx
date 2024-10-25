import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { User as UserIcon, Settings, Users } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe, User } from '../types';

export function Profile() {
  const { username } = useParams();
  const [user] = useState<User>({
    id: '1',
    username: 'johndoe',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    followers: ['2', '3', '4'],
    following: ['2', '3']
  });

  const [recipes] = useState<Recipe[]>([
    {
      id: '1',
      title: 'Homemade Pizza Margherita',
      description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
      ingredients: ['Pizza dough', 'Tomatoes', 'Mozzarella', 'Basil'],
      instructions: ['Prepare dough', 'Add toppings', 'Bake'],
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800',
      authorId: '1',
      createdAt: new Date().toISOString(),
      likes: 156,
      rating: 4.8,
      comments: []
    }
  ]);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">@{user.username}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{user.followers.length} followers</span>
              </div>
              <span>·</span>
              <span>{user.following.length} following</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Follow
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}