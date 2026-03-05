// server/index.js
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');
const path     = require('path');

const { initDB }        = require('./config/database');
const cityRoutes        = require('./routes/cities');
const scoreRoutes       = require('./routes/scores');
const { errorHandler }  = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/requestLogger');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://aici.netlify.app"
  ]
}));;
app.use(express.json());
app.use(morgan('dev'));
app.use(requestLogger);

// ── Routes ────────────────────────────────────────────────────
app.use('/api/cities', cityRoutes);
app.use('/api/scores', scoreRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '0.9.2' });
});

// ── Error handler ─────────────────────────────────────────────
app.use(errorHandler);

// ── Boot ──────────────────────────────────────────────────────
initDB();

app.listen(PORT, () => {
  console.log(`\n  ▸ API running on http://localhost:${PORT}`);
  console.log(`  ▸ ENV: ${process.env.NODE_ENV || 'development'}\n`);
});
