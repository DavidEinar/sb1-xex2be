import { useState } from 'react';
import { Search, Plus, Loader } from 'lucide-react';
import { searchIngredient, getNutritionInfo } from '../services/food';
import { Ingredient, FoodSuggestion } from '../types';

interface IngredientInputProps {
  onAdd: (ingredient: Ingredient) => void;
}

export function IngredientInput({ onAdd }: IngredientInputProps) {
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState<number>(100);
  const [unit, setUnit] = useState<Ingredient['unit']>('g');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<FoodSuggestion[]>([]);

  const units: Ingredient['unit'][] = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'piece'];

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleSearch = debounce(async (value: string) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchIngredient(value);
      setSuggestions(results);
    } catch (error) {
      console.error('Error searching foods:', error);
      setSuggestions([]);
    }
    setLoading(false);
  }, 300);

  async function handleAdd(suggestion: FoodSuggestion) {
    setLoading(true);
    try {
      const nutrition = await getNutritionInfo(suggestion.food.foodId, amount);
      onAdd({
        foodId: suggestion.food.foodId,
        name: suggestion.food.label,
        amount,
        unit,
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat
      });
      setSearch('');
      setAmount(100);
      setSuggestions([]);
    } catch (error) {
      console.error('Error getting nutrition info:', error);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
            placeholder="Search ingredient..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
          {loading && (
            <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin" />
          )}
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          min="0"
          className="w-24 px-3 py-2 border border-gray-300 rounded-md"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as Ingredient['unit'])}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {units.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full max-w-2xl bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.food.foodId}-${index}`}
              onClick={() => handleAdd(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
            >
              <div className="flex-1">
                <div className="font-medium">{suggestion.food.label}</div>
                <div className="text-sm text-gray-500">{suggestion.food.category}</div>
              </div>
              <div className="text-sm text-gray-500">
                {suggestion.food.nutrients.ENERC_KCAL.toFixed(0)} kcal/100g
              </div>
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}