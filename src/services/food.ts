import { FoodSuggestion, NutritionInfo } from '../types';

const USDA_API_KEY = 'H64wSEzRAGE4knMQ60OkFYGV5INCRMw6detyRg3f';
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export async function searchIngredient(query: string): Promise<FoodSuggestion[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(query)}&dataType=Foundation,SR%20Legacy,Survey%20(FNDDS)&pageSize=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.foods.map((food: any) => ({
      food: {
        foodId: food.fdcId,
        label: food.description,
        category: food.foodCategory || 'Other',
        image: food.finalFoodInputFoods?.[0]?.portionDescription,
        nutrients: {
          ENERC_KCAL: food.foodNutrients.find((n: any) => n.nutrientNumber === '208')?.value || 0,
          PROCNT: food.foodNutrients.find((n: any) => n.nutrientNumber === '203')?.value || 0,
          FAT: food.foodNutrients.find((n: any) => n.nutrientNumber === '204')?.value || 0,
          CHOCDF: food.foodNutrients.find((n: any) => n.nutrientNumber === '205')?.value || 0
        }
      }
    }));
  } catch (error) {
    console.error('Error searching foods:', error);
    return [];
  }
}

export async function getNutritionInfo(fdcId: string, amount: number): Promise<NutritionInfo> {
  try {
    const response = await fetch(
      `${BASE_URL}/food/${fdcId}?api_key=${USDA_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const nutrients = data.foodNutrients;

    // Convert amount from grams to 100g ratio
    const ratio = amount / 100;

    return {
      calories: (nutrients.find((n: any) => n.nutrientNumber === '208')?.amount || 0) * ratio,
      protein: (nutrients.find((n: any) => n.nutrientNumber === '203')?.amount || 0) * ratio,
      carbs: (nutrients.find((n: any) => n.nutrientNumber === '205')?.amount || 0) * ratio,
      fat: (nutrients.find((n: any) => n.nutrientNumber === '204')?.amount || 0) * ratio
    };
  } catch (error) {
    console.error('Error getting nutrition info:', error);
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
  }
}