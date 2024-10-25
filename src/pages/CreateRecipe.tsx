import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Minus, Upload } from 'lucide-react';
import { IngredientInput } from '../components/IngredientInput';
import { Ingredient } from '../types';

export function CreateRecipe() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState(['']);
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const { register, handleSubmit } = useForm();

  const addInstruction = () => setInstructions([...instructions, '']);
  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nutritionTotals = ingredients.reduce(
    (totals, ing) => ({
      calories: totals.calories + ing.calories,
      protein: totals.protein + ing.protein,
      carbs: totals.carbs + ing.carbs,
      fat: totals.fat + ing.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const onSubmit = (data: any) => {
    const recipeData = {
      ...data,
      ingredients,
      instructions,
      nutritionTotals,
    };
    console.log(recipeData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create Recipe</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            {...register('title')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preparation Time (minutes)
            </label>
            <input
              type="number"
              {...register('prepTime')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cooking Time (minutes)
            </label>
            <input
              type="number"
              {...register('cookTime')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Servings
          </label>
          <input
            type="number"
            {...register('servings')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-gray-500">
                Calories: {nutritionTotals.calories.toFixed(0)} kcal
              </div>
              <div className="text-gray-500">
                Protein: {nutritionTotals.protein.toFixed(1)}g
              </div>
              <div className="text-gray-500">
                Carbs: {nutritionTotals.carbs.toFixed(1)}g
              </div>
              <div className="text-gray-500">
                Fat: {nutritionTotals.fat.toFixed(1)}g
              </div>
            </div>
          </div>
          <IngredientInput onAdd={(ingredient) => setIngredients([...ingredients, ingredient])} />
          <div className="mt-4 space-y-2">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {ingredient.calories.toFixed(0)} kcal · {ingredient.protein.toFixed(1)}g protein · 
                    {ingredient.carbs.toFixed(1)}g carbs · {ingredient.fat.toFixed(1)}g fat
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-600"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Instructions
            </label>
            <button
              type="button"
              onClick={addInstruction}
              className="text-orange-500 hover:text-orange-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {instructions.map((_, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <textarea
                {...register(`instructions.${index}`)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                placeholder={`Step ${index + 1}`}
                rows={2}
              />
              {instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Minus className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-40 mx-auto" />
              ) : (
                <div className="text-gray-500">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p>Click to upload image</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Video (optional)
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {videoPreview ? (
                <video src={videoPreview} className="max-h-40 mx-auto" controls />
              ) : (
                <div className="text-gray-500">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p>Click to upload video</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}