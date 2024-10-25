export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  followers: string[];
  following: string[];
}

export interface Ingredient {
  foodId: string;
  name: string;
  amount: number;
  unit: 'g' | 'kg' | 'ml' | 'l' | 'tsp' | 'tbsp' | 'cup' | 'piece';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  image: string;
  video?: string;
  authorId: string;
  createdAt: string;
  likes: number;
  rating: number;
  comments: Comment[];
  totalCalories: number;
  servings: number;
  prepTime: number;
  cookTime: number;
  nutritionInfo: NutritionInfo;
}

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  createdAt: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FoodSuggestion {
  food: {
    foodId: string;
    label: string;
    category: string;
    image?: string;
    nutrients: {
      ENERC_KCAL: number;
      PROCNT: number;
      FAT: number;
      CHOCDF: number;
    };
  };
}