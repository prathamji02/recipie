import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY

let genAI = null
let visionModel = null
let textModel = null

if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey)
    // Using gemini-2.5-flash which may have separate quota from gemini-pro
    visionModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    textModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
}

// Extract ingredients from an image
async function analyzeImage(base64Image) {
    if (!visionModel) {
        throw new Error('Gemini API not configured')
    }

    try {
        const imageParts = [
            {
                inlineData: {
                    data: base64Image.split(',')[1], // remove data:image/... prefix
                    mimeType: 'image/jpeg'
                }
            }
        ]

        const prompt = `Analyze this image and list all visible food ingredients. Return ONLY a comma-separated list of ingredient names, nothing else. Be specific but concise. Example: "tomatoes, onions, garlic, chicken breast"`

        const result = await visionModel.generateContent([prompt, ...imageParts])
        const response = await result.response
        const rawText = response.text()

        // Parse the comma-separated list
        const ingredients = rawText
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0)

        return ingredients
    } catch (err) {
        console.error('Gemini Vision failed:', err)
        throw err
    }
}

// Generate a recipe dynamically if no good match exists
async function generateRecipe(availableIngredients) {
    if (!textModel) {
        throw new Error('Gemini API not configured')
    }

    const prompt = `Create a simple recipe using these ingredients: ${availableIngredients.join(', ')}. 
  
Return a JSON object with this exact structure:
{
  "name": "Recipe Name",
  "cuisine": "Cuisine Type",
  "cookingTime": 30,
  "dietary": ["vegetarian"],
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["step 1", "step 2"]
}

Keep it practical and realistic. Only use the ingredients provided.`

    try {
        const result = await textModel.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        // Extract JSON from markdown code blocks if present
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/)
        const jsonText = jsonMatch ? jsonMatch[1] : text

        return JSON.parse(jsonText)
    } catch (err) {
        console.error('Recipe generation failed:', err)
        throw err
    }
}

export { analyzeImage, generateRecipe }
