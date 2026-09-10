# Aura – AI Personal Stylist (MERN Stack)

Aura is a fullstack AI-powered personal stylist application built on the **MERN** stack (**M**ongoDB, **E**xpress, **R**eact.js, **N**ode.js).

The repository is organized into distinct `client/` (Frontend) and `server/` (Backend) directories.

---

## Architecture Overview

```
Aura-FashionAI/
├── client/                     # React.js Frontend (Vite + TailwindCSS)
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ColorPaletteCard, WardrobeItemCard, etc.
│   │   ├── context/            # AuthContext (JWT session management)
│   │   ├── pages/              # Home, Login, Register, Wardrobe, ColorAnalysis,
│   │   │                       # StyleConsultant, OutfitStudio, OutfitAnalyzer, Pricing
│   │   ├── services/           # Axios API client with Bearer interceptor
│   │   ├── App.jsx             # React Router layout
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Modern fashion luxury styling
│   ├── index.html
│   ├── vite.config.js          # API proxy (/api -> http://localhost:5000)
│   └── package.json
│
├── server/                     # Node.js & Express REST Backend (MongoDB)
│   ├── src/
│   │   ├── config/             # Mongoose connection (db.js)
│   │   ├── controllers/        # Auth, Wardrobe, Color, Consultation, Outfits, Subscription
│   │   ├── middleware/         # JWT Protect, Multer File Uploads, Error Handling
│   │   ├── models/             # User, WardrobeItem, ColorAnalysis, Outfit, Consultation
│   │   ├── routes/             # Clean REST endpoints (/api/*)
│   │   ├── services/           # 12-Season color engine & AI Stylist service
│   │   └── seeder.js           # Seeds demo data
│   ├── uploads/                # Stored user clothing and selfie photos
│   ├── index.js                # Server entry point
│   ├── .env                    # Environment configuration
│   └── package.json
│
├── package.json                # Root orchestrator with concurrently
├── start.bat                   # 1-Click launcher for Windows
└── start.sh                    # 1-Click launcher for macOS / Linux
```

---

## Quick Start (Without Docker)

### Option 1: 1-Click Launch (Windows)
Double-click:
```
start.bat
```
*(Automatically checks Node.js, installs dependencies in both client and server if needed, launches both development servers, and opens http://localhost:5173)*

### Option 2: 1-Click Launch (macOS / Linux)
```bash
chmod +x start.sh
./start.sh
```

### Option 3: Terminal Command
```bash
# 1. Install all dependencies (root, server, and client)
npm run install:all

# 2. Launch both client and server concurrently
npm run dev
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## Database Configuration (MongoDB)

In `server/.env`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/aura_fashion
# Or use free MongoDB Atlas cloud URI:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/aura_fashion?retryWrites=true&w=majority
```

### Pre-Seeded Demo Account
To seed sample clothes, color analysis, and the demo user into MongoDB:
```bash
npm run seed
```
Demo Credentials:
- **Email**: `demo@aura.com`
- **Password**: `Password123!`

---

## Core Features

1. **12-Season Color Analysis** (`/color-analysis`):
   - Analyzes undertone (warm, cool, neutral) and contrast (low, medium, high).
   - Generates signature power swatches, flattering neutrals, and metals.
   - Allows exploring all 12 seasonal palettes.

2. **Digital Wardrobe** (`/wardrobe`):
   - Photo upload and automatic categorization (Tops, Bottoms, Shoes, Coats, Accessories).
   - Real-time palette harmony evaluation (tells you how well each piece matches your color season).

3. **AI Stylist Consultation** (`/consultation`):
   - Conversational AI stylist ("Aura") giving outfit recommendations, layering tips, and style briefs.
   - Interactive prompt chips.
   - Optional live Gemini (`GEMINI_API_KEY`) or OpenAI (`OPENAI_API_KEY`) integration.

4. **Mix-and-Match Outfit Studio** (`/studio`):
   - Assemble full looks from your closet with real-time styling synergy rating.
   - Save looks to your personal lookbook tagged by occasion.

5. **Street Style & Pinterest Matcher** (`/analyzer`):
   - Upload inspiration photos from Pinterest or street style.
   - Identifies pieces in the look and shows what you already own vs what pieces are missing.

---

## REST API Reference

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Create user account | Public |
| `POST` | `/api/auth/login` | Login & receive JWT | Public |
| `GET` | `/api/auth/me` | Current user profile | Private |
| `GET` | `/api/wardrobe` | List user's wardrobe items | Private |
| `POST` | `/api/wardrobe` | Add wardrobe item (photo upload) | Private |
| `DELETE` | `/api/wardrobe/:id` | Remove wardrobe item | Private |
| `GET` | `/api/color-analysis` | Get active season analysis | Private |
| `POST` | `/api/color-analysis` | Run 12-season analysis | Private |
| `GET` | `/api/consultation` | Get AI chat session | Private |
| `POST` | `/api/consultation/message` | Send message to AI Stylist | Private |
| `GET` | `/api/outfits` | List saved outfits | Private |
| `POST` | `/api/outfits` | Create outfit ensemble | Private |
| `POST` | `/api/outfits/analyze-inspo` | Match inspiration image to closet | Private |
| `GET` | `/api/subscription/plans` | List subscription plans | Public |
| `POST` | `/api/subscription/upgrade` | Upgrade subscription plan | Private |
