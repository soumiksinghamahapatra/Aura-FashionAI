const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const seedDatabase = require('./db/seed');

// Initialize Express
const app = express();

// CORS configuration for Supabase client headers
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'apikey',
    'Prefer',
    'Range',
    'Range-Unit',
    'x-client-info',
    'x-total-count'
  ],
  exposedHeaders: [
    'Content-Range',
    'x-total-count',
    'Preference-Applied'
  ]
}));

// Body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logger for API calls
app.use((req, res, next) => {
  if (req.path.startsWith('/auth') || req.path.startsWith('/rest') || req.path.startsWith('/functions') || req.path.startsWith('/storage')) {
    console.log(`[API] ${req.method} ${req.path}`);
  }
  next();
});

// Mount Supabase-compatible API routes
app.use('/auth/v1', require('./auth'));
app.use('/rest/v1', require('./rest'));
app.use('/storage/v1', require('./storage'));
app.use('/functions/v1', require('./functions'));

// Analytics endpoint for flock.js / Tinybird
app.all('/api/analytics', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve frontend static assets
const rootDir = path.join(__dirname, '..');
app.use('/assets', express.static(path.join(rootDir, 'assets')));
app.use('/fonts', express.static(path.join(rootDir, 'fonts')));
app.use(express.static(rootDir, { index: false }));

// SPA Fallback for client-side routing
app.get('*', (req, res) => {
  // If requesting a file that doesn't exist, don't serve HTML
  if (req.path.startsWith('/assets/') || req.path.startsWith('/fonts/')) {
    return res.status(404).end();
  }
  res.sendFile(path.join(rootDir, 'index.html'));
});

// Run seed data on startup
seedDatabase();

// Start Server
app.listen(config.PORT, () => {
  console.log('====================================================');
  console.log(`Aura AI Stylist Backend & Database Running!`);
  console.log(`URL: http://localhost:${config.PORT}`);
  console.log(`Demo Account: demo@aura.com | Password: Password123!`);
  console.log('====================================================');
});
