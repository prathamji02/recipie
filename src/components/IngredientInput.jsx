import { useState } from 'react'
import { Plus, X } from 'lucide-react'

function IngredientInput({ ingredients, onAdd, onRemove, onClear }) {
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputValue.trim()) {
            onAdd(inputValue.trim())
            setInputValue('')
        }
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g., tomatoes, chicken, rice"
                    className="flex-1 px-5 py-3 border-3 border-green-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 text-base shadow-lg"
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2 font-bold shadow-xl text-base"
                >
                    <Plus className="w-5 h-5" />
                    Add
                </button>
            </form>

            {ingredients.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-base font-bold text-gray-800">
                            Your Ingredients ({ingredients.length})
                        </p>
                        <button
                            onClick={onClear}
                            className="text-sm text-white bg-red-500 hover:bg-red-600 font-bold px-4 py-2 rounded-lg transition-colors shadow-lg"
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {ingredients.map((ingredient, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-900 rounded-xl text-sm font-bold border-2 border-green-300 hover:border-green-400 transition-all shadow-md"
                            >
                                <span>{ingredient}</span>
                                <button
                                    onClick={() => onRemove(ingredient)}
                                    className="hover:bg-green-300 rounded-full p-1 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default IngredientInput
