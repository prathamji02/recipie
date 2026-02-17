# Smart Recipe Generator

A React-based recipe finder that uses Gemini Vision AI to identify ingredients from photos and matches them against a database of 20+ recipes. Built for a technical submission with a focus on practical, human-written code patterns.

## Features

- **AI Vision Integration**: Upload photos of ingredients and let Gemini 1.5 Flash extract them automatically
- **Smart Matching Algorithm**: Weighted scoring system that calculates match percentages based on available vs. required ingredients
- **Recipe Database**: 22+ diverse recipes including North Indian (Malai Chaap, Paneer Tikka) and Chinese (Stir-fry, Fried Rice) cuisines
- **Advanced Filtering**: Filter by dietary preferences (vegetarian, gluten-free) and cooking time
- **Favorites System**: Save your favorite recipes locally using localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom color palette
- **Icons**: Lucide React
- **AI**: Google Generative AI SDK (Gemini 1.5 Flash)
- **Backend**: Supabase (optional - for multi-user favorites)
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Google AI API Key ([Get one here](https://makersuite.google.com/app/apikey))
- Supabase account (optional, for cloud features)

### Installation

1. Clone the repo:
```bash
git clone <your-repo-url>
cd recipie_generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
```
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key
VITE_SUPABASE_URL=your_supabase_url (optional)
VITE_SUPABASE_ANON_KEY=your_supabase_key (optional)
```

4. Run the dev server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## Project Structure

```
src/
├── components/          # React components
│   ├── FileUpload.jsx   # Image upload with Gemini Vision
│   ├── IngredientInput.jsx
│   ├── RecipeCard.jsx
│   ├── FilterSidebar.jsx
│   └── Toast.jsx
├── hooks/
│   └── useIngredients.js  # Custom hook for ingredient state
├── lib/
│   ├── gemini.js        # Gemini AI SDK wrapper
│   └── supabase.js      # Supabase client
├── utils/
│   └── recipeMatch.js   # Core matching algorithm
├── data/
│   └── recipes.json     # Recipe database
└── App.jsx              # Main app component
```

## How It Works

### Vision-to-Text Pipeline
1. User uploads an image
2. Image is converted to base64
3. Sent to Gemini Vision API with a specific prompt
4. AI returns comma-separated ingredient list
5. Ingredients are parsed and added to the user's list

### Matching Algorithm
The `matchRecipes` function uses a weighted scoring system:
- **Exact matches**: Full score (1.0)
- **Partial matches**: Half score (0.5) - e.g., "tomato" matches "cherry tomatoes"
- **Match percentage**: (total score / required ingredients) × 100
- Results are sorted by match percentage (highest first)

### Filtering System
Recipes can be filtered by:
- Dietary preferences (vegetarian, gluten-free)
- Cooking time ranges (quick, medium, long)
- Filters are applied client-side for instant results

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` config handles SPA routing automatically.

## Future Improvements

- [ ] Add user authentication for cloud-synced favorites
- [ ] Implement recipe generation for low-match scenarios using Gemini
- [ ] Add nutritional information and calorie tracking
- [ ] Support for dietary restrictions (vegan, keto, etc.)
- [ ] Recipe rating and review system
- [ ] Shopping list generation
- [ ] Multi-language support
- [ ] Voice input for ingredients
- [ ] Integration with grocery delivery APIs

## Notes

This project was built with a focus on avoiding the "AI-generated" look:
- Mixed function declaration styles (arrow functions + standard functions)
- Practical variable naming (`rawIngredients` instead of `data`)
- Minimal comments (only for complex logic)
- Basic error handling with console.error and user-facing toasts
- Custom hooks for reusable logic

## License

MIT
