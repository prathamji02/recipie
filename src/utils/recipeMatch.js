// Calculate match percentage between user ingredients and recipe requirements
// Uses a weighted scoring system that prioritizes exact matches
function matchRecipes(userIngredients, dbRecipes) {
    const normalizedUserIngredients = userIngredients.map(ing => ing.toLowerCase().trim())

    const scoredRecipes = dbRecipes.map(recipe => {
        const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase().trim())

        let matchCount = 0
        let partialMatchCount = 0

        // Check each recipe ingredient against user's ingredients
        recipeIngredients.forEach(recipeIng => {
            const exactMatch = normalizedUserIngredients.some(userIng =>
                userIng === recipeIng || recipeIng.includes(userIng) || userIng.includes(recipeIng)
            )

            if (exactMatch) {
                matchCount++
            } else {
                // Check for partial matches (e.g., "tomato" matches "cherry tomatoes")
                const partialMatch = normalizedUserIngredients.some(userIng => {
                    const userWords = userIng.split(' ')
                    const recipeWords = recipeIng.split(' ')
                    return userWords.some(uw => recipeWords.some(rw => uw === rw && uw.length > 3))
                })

                if (partialMatch) {
                    partialMatchCount++
                }
            }
        })

        // Calculate match percentage
        // Exact matches count as 1.0, partial matches as 0.5
        const totalScore = matchCount + (partialMatchCount * 0.5)
        const maxScore = recipeIngredients.length
        const matchPercentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0

        return {
            ...recipe,
            matchPercentage,
            matchCount,
            totalIngredients: recipeIngredients.length
        }
    })

    // Sort by match percentage (highest first) and filter out recipes with no matches
    return scoredRecipes
        .filter(recipe => recipe.matchPercentage > 0)
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
}

export { matchRecipes }
