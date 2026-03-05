# AI City Intelligence

> Full-stack urban report card platform  
> Stack: React · Node/Express · SQLite · Vanilla CSS  
> Version: 0.9.2 (thesis prototype)

---

## What this is

A multi-page web application that generates data-driven "report cards" for cities across 8 scored dimensions: Safety, Affordability, Job Market, Lifestyle, Transit, Food & Culture, Nature, and Expat Friendliness. Each dimension gets a score out of 100, a letter grade, and a verdict.

---

## Project Structure

```
ai-city-intelligence/
│
├── package.json              ← root workspace config
├── .env.example              ← environment variable template
├── README.md
│
├── client/                   ← React frontend (Vite)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx          ← React entry point
│       ├── App.jsx           ← Router + layout wrapper
│       ├── components/
│       │   ├── ui/           ← reusable primitives (Button, Badge, Chip…)
│       │   ├── layout/       ← Nav, Footer
│       │   ├── cards/        ← CityCard, DimensionCard, CompareCard
│       │   └── charts/       ← ScoreBar, RadarChart, MiniBar
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Explore.jsx
│       │   ├── CityReport.jsx
│       │   ├── Compare.jsx
│       │   ├── Methodology.jsx
│       │   └── NotFound.jsx
│       ├── hooks/
│       │   ├── useCities.js  ← data fetching hooks
│       │   └── useSearch.js
│       ├── context/
│       │   └── AppContext.jsx
│       ├── utils/
│       │   ├── grading.js    ← score → grade/color logic
│       │   └── animate.js    ← IntersectionObserver helpers
│       └── styles/
│           ├── global.css
│           ├── variables.css
│           └── animations.css
│
├── server/                   ← Node.js / Express API
│   ├── package.json
│   ├── index.js              ← server entry point
│   ├── config/
│   │   └── database.js       ← SQLite connection + init
│   ├── db/
│   │   ├── schema.sql        ← table definitions
│   │   └── seed.js           ← populate cities + scores
│   ├── models/
│   │   ├── City.js
│   │   └── Score.js
│   ├── controllers/
│   │   ├── cityController.js
│   │   └── scoreController.js
│   ├── routes/
│   │   ├── cities.js
│   │   └── scores.js
│   └── middleware/
│       ├── errorHandler.js
│       └── requestLogger.js
│
└── shared/
    └── constants.js          ← dimension definitions shared by both sides
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Clone and install

```bash
git clone <repo>
cd ai-city-intelligence
npm run install:all
```

### 2. Set up environment

```bash
cp .env.example .env
# Edit .env if needed (defaults work out of the box)
```

### 3. Seed the database

```bash
npm run seed
```

This creates `server/db/cities.db` and populates it with 10 cities and all dimension scores.

### 4. Run in development

```bash
npm run dev
```

This starts:
- **Express API** on `http://localhost:3001`
- **React (Vite)** on `http://localhost:5173`

The React app proxies `/api/*` to the Express server automatically.

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/cities` | All cities (summary) |
| GET | `/api/cities/:id` | Single city with full scores |
| GET | `/api/cities/search?q=tokyo` | Search cities by name/country/region |
| GET | `/api/scores/top?dim=safety` | Top cities by dimension |
| GET | `/api/scores/compare?a=tokyo&b=lisbon` | Side-by-side score comparison |

---

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, search, featured cities |
| `/explore` | Browse all cities with filters and sort |
| `/city/:id` | Full report card for one city |
| `/compare` | Side-by-side two-city comparison |
| `/methodology` | How scores are derived |

---

## Tech decisions

**Why SQLite?** It's a thesis prototype. SQLite requires zero infrastructure, the file travels with the project, and it's trivially swappable for PostgreSQL when this goes to production. The query patterns (read-heavy, low concurrency) are ideal for SQLite.

**Why Vite over CRA?** Faster dev server, proper ES module support, and the proxy config is three lines.

**Why no Redux?** The state is simple enough for Context + hooks. Adding Redux here would be premature complexity.

**Why vanilla CSS over Tailwind?** The design system is specific enough that utility classes would fight the layout. Custom CSS variables give us everything we need with better readability.

---

## Known limitations

- No auth — all data is public
- Scores are seed data (model-generated), not live API pulls
- SQLite not suitable for multi-server deployment
- No rate limiting on the API (fine for local/thesis use)

---

## Planned

- [ ] PostgreSQL migration script
- [ ] Admin panel to edit scores
- [ ] User weighting of dimensions
- [ ] Historical score tracking
- [ ] Neighbourhood-level data
