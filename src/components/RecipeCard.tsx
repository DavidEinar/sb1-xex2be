import { Heart, MessageCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-orange-500">
            {recipe.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{recipe.likes}</span>
            </button>
            <button className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{recipe.comments.length}</span>
            </button>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{recipe.rating.toFixed(1)}</span>
            </div>
          </div>
          <span className="text-gray-400">
            {new Date(recipe.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}