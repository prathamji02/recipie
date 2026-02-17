# Smart Recipe Generator - Technical Write-up

## Overview

The Smart Recipe Generator is a web application that bridges the gap between available ingredients and recipe discovery through AI-powered vision analysis and intelligent matching algorithms. Built with React and Gemini 1.5 Flash, it transforms ingredient photos into actionable recipe recommendations.

## Technical Approach

### 1. Vision-to-Text Pipeline

The core innovation lies in the image analysis workflow. When users upload a photo, the application converts it to base64 format and sends it to Google's Gemini Vision API with a carefully crafted prompt that requests a comma-separated ingredient list. This structured output format ensures reliable parsing and reduces post-processing complexity.

The prompt engineering was critical: by explicitly requesting "ONLY a comma-separated list," we minimize hallucinations and ensure consistent formatting. Error handling wraps the entire pipeline, providing user-friendly feedback when API calls fail or credentials are missing.

### 2. Scoring Algorithm

The recipe matching system uses a weighted scoring approach that accounts for both exact and partial ingredient matches. Exact matches (e.g., "tomatoes" === "tomatoes") receive full credit, while partial matches (e.g., "tomato" within "cherry tomatoes") contribute 50% to the score. This nuanced approach handles real-world ingredient variations better than binary matching.

The final match percentage is calculated as: `(exact_matches + 0.5 × partial_matches) / total_required_ingredients × 100`. Results are sorted by this percentage, surfacing the most achievable recipes first. This scoring logic lives in a pure utility function, making it testable and reusable.

### 3. UX Considerations

User experience was prioritized through several design decisions:

- **Dual Input Methods**: Users can either upload photos (fast, convenient) or manually type ingredients (precise, reliable). This flexibility accommodates different usage contexts.

- **Real-time Filtering**: Dietary and time filters apply instantly without re-fetching data, providing immediate visual feedback. The filter state is managed separately from ingredient state to prevent unnecessary re-renders.

- **Progressive Disclosure**: Recipe cards show key information (match percentage, cooking time, dietary tags) upfront, with full instructions hidden behind a collapsible details element. This reduces cognitive load while keeping detailed information accessible.

- **Local-First Favorites**: The favorites system uses localStorage for instant persistence without requiring authentication. This reduces friction for first-time users while maintaining a path to cloud sync via Supabase for authenticated users.

The application architecture follows React best practices with custom hooks (`useIngredients`) for state management, keeping components focused on presentation. The modular structure (separate lib/, utils/, components/ directories) ensures maintainability and testability.
