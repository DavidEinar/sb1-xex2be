import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe, User } from '../types';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
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

  const [users] = useState<User[]>([
    {
      id: '1',
      username: 'johndoe',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      followers: [],
      following: []
    }
  ]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search recipes or users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
                <button className="ml-auto px-3 py-1 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600">
                  Follow
                </button>
              </div>
            ))}
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
    </div>
  );
}