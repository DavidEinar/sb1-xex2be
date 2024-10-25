import { NutritionInfo } from '../types';

const EDAMAM_APP_ID = '2d0386f0';
const EDAMAM_APP_KEY = 'd0a64f23991f975680b765bd64e3fad5';
const BASE_URL = 'https://api.edamam.com/api/food-database/v2';

interface EdamamResponse {
  text: string;
  hints: Array<{
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
  }>;
}

export async function searchIngredient(query: string): Promise<EdamamResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching ingredients:', error);
    // Return empty results instead of throwing
    return {
      text: query,
      hints: []
    };
  }
}

export async function getNutritionInfo(ingredient: string, quantity: number, unit: string): Promise<NutritionInfo> {
  try {
    const response = await fetch(
      `${BASE_URL}/nutrients?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: [
            {
              quantity,
              measureURI: `http://www.edamam.com/ontologies/edamam.owl#Measure_${unit}`,
              foodId: ingredient
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      calories: data.calories || 0,
      protein: data.totalNutrients?.PROCNT?.quantity || 0,
      carbs: data.totalNutrients?.CHOCDF?.quantity || 0,
      fat: data.totalNutrients?.FAT?.quantity || 0
    };
  } catch (error) {
    console.error('Error getting nutrition info:', error);
    // Return zero values instead of throwing
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
  }
}