import { useState } from 'react'

// Custom hook for managing ingredient list
function useIngredients() {
    const [rawIngredients, setRawIngredients] = useState([])

    const addIngredient = (ingredient) => {
        const trimmed = ingredient.trim()
        if (trimmed && !rawIngredients.includes(trimmed)) {
            setRawIngredients(prev => [...prev, trimmed])
        }
    }

    const addMultiple = (ingredients) => {
        const newIngredients = ingredients
            .map(ing => ing.trim())
            .filter(ing => ing && !rawIngredients.includes(ing))

        if (newIngredients.length > 0) {
            setRawIngredients(prev => [...prev, ...newIngredients])
        }
    }

    const removeIngredient = (ingredient) => {
        setRawIngredients(prev => prev.filter(ing => ing !== ingredient))
    }

    const clearAll = () => {
        setRawIngredients([])
    }

    return {
        ingredients: rawIngredients,
        addIngredient,
        addMultiple,
        removeIngredient,
        clearAll
    }
}

export default useIngredients
