import { useState, useEffect } from 'react'
import { ChefHat, Sparkles, Search, TrendingUp, Plus, Heart } from 'lucide-react'
import FileUpload from './components/FileUpload'
import IngredientInput from './components/IngredientInput'
import RecipeCard from './components/RecipeCard'
import FilterSidebar from './components/FilterSidebar'
import Toast from './components/Toast'
import useIngredients from './hooks/useIngredients'
import { matchRecipes } from './utils/recipeMatch'
import recipesData from './data/recipes.json'

function App() {
  const { ingredients, addIngredient, addMultiple, removeIngredient, clearAll } = useIngredients()
  const [matchedRecipes, setMatchedRecipes] = useState([])
  const [filters, setFilters] = useState({ dietary: [], maxTime: 999 })
  const [favorites, setFavorites] = useState([])
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipe_favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    if (ingredients.length > 0) {
      const matched = matchRecipes(ingredients, recipesData)
      setMatchedRecipes(matched)
    } else {
      setMatchedRecipes([])
    }
  }, [ingredients])

  const handleIngredientsExtracted = (extractedIngredients) => {
    addMultiple(extractedIngredients)
    setToast({
      message: `Found ${extractedIngredients.length} ingredients!`,
      type: 'success'
    })
  }

  const handleError = (errorMsg) => {
    setToast({ message: errorMsg, type: 'error' })
  }

  const toggleFavorite = (recipeId) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId]

    setFavorites(newFavorites)
    localStorage.setItem('recipe_favorites', JSON.stringify(newFavorites))
  }

  const filteredRecipes = matchedRecipes.filter(recipe => {
    if (filters.dietary.length > 0) {
      const hasAllDietary = filters.dietary.every(diet =>
        recipe.dietary?.includes(diet)
      )
      if (!hasAllDietary) return false
    }

    if (recipe.cookingTime > filters.maxTime) return false

    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-green-100">
      {/* Header with vibrant orange */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <ChefHat className="w-10 h-10 text-orange-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Smart Recipe Generator</h1>
              <p className="mt-1 text-orange-100 font-medium">
                Find delicious recipes from your ingredients ✨
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />

            {/* Colorful Stats Cards */}
            {favorites.length > 0 && (
              <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl shadow-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/30 backdrop-blur rounded-xl flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/90 font-semibold">Favorites</p>
                    <p className="text-3xl font-bold text-white">{favorites.length}</p>
                  </div>
                </div>
              </div>
            )}

            {ingredients.length > 0 && (
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/30 backdrop-blur rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/90 font-semibold">Matches Found</p>
                    <p className="text-3xl font-bold text-white">{filteredRecipes.length}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Upload Section - Orange Theme */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-8 border-orange-500">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <span>Upload Ingredient Photo</span>
              </h2>
              <FileUpload
                onIngredientsExtracted={handleIngredientsExtracted}
                onError={handleError}
              />
            </div>

            {/* Manual Input - Green Theme */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-8 border-green-500">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span>Add Ingredients Manually</span>
              </h2>
              <IngredientInput
                ingredients={ingredients}
                onAdd={addIngredient}
                onRemove={removeIngredient}
                onClear={clearAll}
              />
            </div>

            {/* Results */}
            {ingredients.length > 0 && (
              <div className="animate-slide-up">
                <div className="mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-6">
                  <h2 className="text-3xl font-bold text-white">Recipe Matches</h2>
                  <p className="text-purple-100 mt-2 font-medium">
                    {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found based on your ingredients
                  </p>
                </div>

                {filteredRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredRecipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={favorites.includes(recipe.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-4 border-dashed border-gray-300">
                    <p className="text-gray-600 text-lg">
                      No recipes match your filters. Try adjusting them!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {ingredients.length === 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-16 text-center border-4 border-dashed border-gray-300">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <ChefHat className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Ready to Cook?
                </h3>
                <p className="text-gray-600 text-lg">
                  Upload a photo or add ingredients to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default App
