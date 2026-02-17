# Quick Deployment Instructions

## Step 1: Create GitHub Repository (Manual - 2 minutes)

1. Open your browser and go to: **https://github.com/new**

2. Fill in the form:
   - **Repository name**: `smart-recipe-generator`
   - **Description**: "AI-powered recipe generator with ingredient recognition and nutritional information"
   - **Visibility**: Public
   - **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** add .gitignore or license (we have them)

3. Click **"Create repository"**

4. You'll see a page with commands. **Copy your repository URL** (looks like: `https://github.com/YOUR_USERNAME/smart-recipe-generator.git`)

---

## Step 2: Push Code to GitHub (Run these commands)

Open a terminal in your project folder and run:

```bash
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/smart-recipe-generator.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Expected output**: You should see files being uploaded to GitHub.

---

## Step 3: Deploy to Vercel (Manual - 5 minutes)

1. Go to: **https://vercel.com/login**
   - Sign in with GitHub

2. Click **"Add New..."** → **"Project"**

3. Find and click **"Import"** next to `smart-recipe-generator`

4. **Configure Project**:
   - Framework Preset: **Vite** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)

5. **Add Environment Variable**:
   - Click "Environment Variables"
   - Name: `VITE_GOOGLE_AI_API_KEY`
   - Value: (paste your Google AI API key)
   - Click "Add"

6. Click **"Deploy"**

7. Wait 1-2 minutes for build to complete

8. Your app will be live at: `https://smart-recipe-generator-XXXX.vercel.app`

---

## Step 4: Test Your Deployment

Visit your Vercel URL and test:
- ✅ Upload an ingredient image
- ✅ Add ingredients manually
- ✅ View recipes with nutritional info
- ✅ Apply filters
- ✅ Add favorites

---

## Troubleshooting

**If build fails**:
- Check that `VITE_GOOGLE_AI_API_KEY` is set correctly
- Look at build logs in Vercel dashboard

**If API doesn't work**:
- Verify your Google AI API key is valid
- Check browser console for errors (F12)

---

## What to Submit

1. **GitHub Repository URL**: `https://github.com/YOUR_USERNAME/smart-recipe-generator`
2. **Live Application URL**: `https://smart-recipe-generator-XXXX.vercel.app`
3. **README.md**: Already in your repo with setup instructions
4. **WRITEUP.md**: Already in your repo with technical approach

---

## Need Help?

If you encounter any issues:
1. Check the detailed `deployment_guide.md` in the artifacts
2. Verify all environment variables are set
3. Check Vercel build logs for specific errors
