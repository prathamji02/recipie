# Technical Approach

🔗 **Live Demo**: [https://recipie-cyan.vercel.app/](https://recipie-cyan.vercel.app/)

## The Problem

I wanted to build something that solves a real problem I face - figuring out what to cook with whatever's in my fridge. The challenge was making ingredient recognition accurate enough to be useful while keeping the matching algorithm smart enough to handle ingredient variations.

## How I Built It

**Image Recognition Pipeline**

The image upload flow is pretty straightforward. When someone uploads a photo, I convert it to base64 and send it to Google's Gemini AI with a specific prompt. The trick was getting the prompt right - I ask for "ONLY a comma-separated list" to avoid getting paragraphs of text back. This structured output makes parsing super reliable.

**The Matching Algorithm**

For recipe matching, I went with a weighted scoring system. Exact ingredient matches count as 1.0, but partial matches (like "tomato" matching "cherry tomatoes") count as 0.5. This handles real-world scenarios where ingredient names vary. The final percentage is just the total score divided by required ingredients, multiplied by 100. Simple but effective.

**User Experience Decisions**

I added two input methods because sometimes you want speed (photo upload) and sometimes you want precision (manual entry). The filters apply instantly without any loading states because everything runs client-side. Recipe cards show the important stuff upfront - match percentage, time, dietary tags - with full instructions tucked behind a collapsible section to avoid overwhelming people.

Favorites use localStorage so they persist without needing an account. It's a small detail but removes friction for first-time users.

The whole thing is built with React hooks and keeps components focused on rendering while business logic lives in utility functions. Makes it easier to test and modify later.
