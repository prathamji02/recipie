import { Clock, Heart, ChefHat } from 'lucide-react'

function RecipeCard({ recipe, onToggleFavorite, isFavorite }) {
    const { name, cuisine, cookingTime, dietary, matchPercentage, ingredients, instructions, nutrition } = recipe

    const getMatchColor = (percentage) => {
        if (percentage >= 80) return 'text-green-600 bg-green-50'
        if (percentage >= 50) return 'text-yellow-600 bg-yellow-50'
        return 'text-orange-600 bg-orange-50'
    }

    return (
        <div className="bg-white rounded-xl shadow-sm hover-lift border border-gray-200 overflow-hidden">
            <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{cuisine}</p>
                    </div>

                    <button
                        onClick={() => onToggleFavorite(recipe.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Heart
                            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                        />
                    </button>
                </div>

                <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {matchPercentage !== undefined && (
                        <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getMatchColor(matchPercentage)}`}>
                            {matchPercentage}% Match
                        </span>
                    )}

                    <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{cookingTime} min</span>
                    </div>

                    {dietary && dietary.length > 0 && (
                        <div className="flex gap-2">
                            {dietary.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Nutritional Information */}
                {nutrition && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                        <h4 className="text-xs font-bold text-purple-700 mb-2">Nutritional Info (per serving)</h4>
                        <div className="grid grid-cols-4 gap-2">
                            <div className="text-center">
                                <div className="text-lg font-bold text-purple-600">{nutrition.calories}</div>
                                <div className="text-xs text-gray-600">Calories</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">{nutrition.protein}g</div>
                                <div className="text-xs text-gray-600">Protein</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-green-600">{nutrition.carbs}g</div>
                                <div className="text-xs text-gray-600">Carbs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-orange-600">{nutrition.fat}g</div>
                                <div className="text-xs text-gray-600">Fat</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                        <ChefHat className="w-4 h-4" />
                        Ingredients
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                        {ingredients.slice(0, 5).map((ing, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                {ing}
                            </li>
                        ))}
                        {ingredients.length > 5 && (
                            <li className="text-gray-500 italic text-xs">
                                + {ingredients.length - 5} more
                            </li>
                        )}
                    </ul>
                </div>

                <details className="text-sm">
                    <summary className="cursor-pointer font-medium text-primary-600 hover:text-primary-700 py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        View Instructions
                    </summary>
                    <ol className="mt-3 space-y-2 text-gray-600">
                        {instructions.map((step, idx) => (
                            <li key={idx} className="flex gap-2">
                                <span className="flex-shrink-0 w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                </span>
                                <span className="flex-1">{step}</span>
                            </li>
                        ))}
                    </ol>
                </details>
            </div>
        </div>
    )
}

export default RecipeCard
