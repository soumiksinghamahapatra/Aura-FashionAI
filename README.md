# minniie – AI Personal Stylist (Fullstack)

This repository contains the complete frontend, backend server, database, and AI stylist services for **minniie** (AI Personal Stylist for Outfits & Color Analysis).

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Open in Browser
Navigate to:
```
http://localhost:3000
```

---

## Pre-Configured Demo Account

The database is pre-seeded with a Pro account ready to test immediately:

- **Email**: `demo@minniie.com`
- **Password**: `Password123!`

You can also click **Sign Up** on the website to register a brand new account.

---

## Features & Endpoints

### 1. Authentication (`/auth/v1/*`)
- Fully compatible with `@supabase/supabase-js` Auth client.
- Email & password registration and login with bcrypt hashing.
- Anonymous guest try-on sessions.
- JWT token issuing and automatic session refreshing.

### 2. Database & PostgREST API (`/rest/v1/*`)
- Built-in SQLite database (`database.sqlite`) using Node.js native `node:sqlite` engine (no external DB install or C++ compilation required).
- Supports all 17 schema tables:
  - `profiles`: User preferences, avatar, active color analysis.
  - `wardrobe_items`: Digital closet clothes (categorized by tops, bottoms, shoes, etc.).
  - `color_analyses`: 12-season color analysis, palette swatches, undertones, and wardrobe matches.
  - `collages` & `collage_items`: Outfit collages and styling arrangements.
  - `style_profiles`: AI Stylist chat consultations and custom style briefs.
  - `subscribers` & `plan_limits`: Pro, Studio, and Free tier quotas.
  - `outfit_analyses`, `inspiration_images`, `user_selfies`, `user_roles`, etc.

### 3. Local Storage (`/storage/v1/*`)
- Handles file uploads and static delivery for:
  - `avatars`
  - `wardrobe-images`
  - `collage-assets`
  - `marketing-public`
- Files are stored in the local `/uploads` directory.

### 4. AI & Edge Functions (`/functions/v1/*`)
- **`style-consultation`**: Interactive AI Stylist consultation streaming Server-Sent Events (SSE) in OpenAI format, outputting style briefs and interactive chips (`<CHIPS>`, `<STYLE_BRIEF>`).
- **`color-analysis`**: 12-season color analysis engine with palette generation.
- **`evaluate-wardrobe-colors`**: Matches wardrobe items against the user's seasonal color palette.
- **`categorize-item`**: Clothing auto-categorization (category, color, aesthetic style).
- **`generate-collage` & `edit-collage`**: Outfit collage generator and conversational editor.
- **`analyze-outfit`**: Pinterest and street look breakdown into matching/missing items.
- **`search-products` & `search-product-image`**: Curated fashion shopping recommendations.
- **`landing-tryon-pairs`**: Try-on showcase pairs and outfits for the homepage.
- **`fetch-url-images` & `import-url-image`**: E-commerce URL product image extractor.

---

## Cloud Deployment (Supabase / PostgreSQL)

If you wish to deploy the database to Supabase Cloud:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and run the contents of [`server/db/schema.sql`](./server/db/schema.sql).
4. Update `config.js` with your Supabase Project URL and Anon Key.

---

## Optional: Live Gemini / OpenAI Integration

By default, the server includes built-in intelligent fashion heuristic models so all features work immediately offline without API keys.

To enable live Gemini or OpenAI models for real-time vision and streaming consultations:
1. Open `.env`.
2. Add your API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   # or
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Restart the server (`npm start`).
