# Smart Recipe Generator

Ever stared at your fridge wondering what to cook? I built this app to solve exactly that problem. Just snap a photo of your ingredients or type them in, and it'll suggest recipes you can actually make right now.

🔗 **Live Demo**: [https://recipie-cyan.vercel.app/](https://recipie-cyan.vercel.app/)

## What It Does

The app uses Google's Gemini AI to recognize ingredients from photos. Once it knows what you have, it matches them against a database of 22 recipes and shows you what you can cook, sorted by how many ingredients you already have. Pretty handy when you're trying to avoid another grocery run.

**Main Features:**
- Upload ingredient photos and let AI identify them
- Manual ingredient entry if you prefer typing
- Smart matching that understands "tomato" and "cherry tomatoes" are related
- Filter by dietary needs (vegetarian, gluten-free) and cooking time
- Save your favorite recipes
- See nutritional info for each recipe
- Works great on mobile

## Tech Stack

Built with React and Vite because they're fast and straightforward. Used Tailwind for styling since I wanted something that looks good without spending hours on CSS. The AI part uses Google's Generative AI SDK with the Gemini model.

- React 18 + Vite
- Tailwind CSS
- Google Gemini AI (for image recognition)
- Lucide React (icons)
- Vercel (hosting)

## Running It Locally

You'll need Node.js installed and a Google AI API key (they're free to get).

1. Clone and install:
```bash
git clone https://github.com/prathamji02/recipie.git
cd recipie
npm install
```

2. Set up your API key:
```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Google AI API key:
```
VITE_GOOGLE_AI_API_KEY=your_key_here
```

Get a free API key at: https://makersuite.google.com/app/apikey

3. Start the dev server:
```bash
npm run dev
```

Open http://localhost:5173 and you're good to go.

## How It Works

### The Image Recognition Part

When you upload a photo, it gets converted to base64 and sent to Gemini with a prompt asking for a comma-separated list of ingredients. I spent some time tweaking the prompt to get consistent results - turns out being very specific about the output format helps a lot.

### The Matching Algorithm

The recipe matcher uses a weighted scoring system. Exact ingredient matches get full points, partial matches (like "tomato" matching "cherry tomatoes") get half points. Then it calculates a percentage based on how many of the recipe's ingredients you have. Recipes are sorted by this percentage, so the ones you can actually make show up first.

Here's the basic formula:
```
score = (exact_matches + 0.5 × partial_matches) / total_ingredients × 100
```

### The Recipe Database

I manually curated 22 recipes covering North Indian and Chinese cuisines. Each recipe includes ingredients, instructions, cooking time, dietary tags, and nutritional information. It's stored in a simple JSON file - nothing fancy, but it works.

## Project Structure

```
src/
├── components/          # UI components
│   ├── FileUpload.jsx   # Handles image uploads
│   ├── IngredientInput.jsx
│   ├── RecipeCard.jsx
│   ├── FilterSidebar.jsx
│   └── Toast.jsx
├── hooks/
│   └── useIngredients.js  # State management for ingredients
├── lib/
│   └── gemini.js        # Gemini AI integration
├── utils/
│   └── recipeMatch.js   # Matching algorithm
├── data/
│   └── recipes.json     # Recipe database
└── App.jsx              # Main component
```

## Deploying Your Own

If you want to deploy this yourself, Vercel makes it super easy:

1. Push your code to GitHub
2. Import the repo in Vercel
3. Add your `VITE_GOOGLE_AI_API_KEY` in the environment variables
4. Hit deploy

The `vercel.json` file is already set up to handle routing properly.

## Things I'd Add If I Had More Time

- User accounts so favorites sync across devices
- More recipes (obviously)
- Recipe ratings and reviews
- Shopping list generation for missing ingredients
- Support for more dietary restrictions (vegan, keto, etc.)
- Voice input for ingredients
- Better mobile camera integration

## A Note on the Code

I tried to write this in a way that feels natural and maintainable. You'll see a mix of arrow functions and regular functions, practical variable names, and comments only where things get tricky. The goal was to make it easy for someone else to jump in and understand what's happening.

## License

MIT - feel free to use this however you want.
