require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const YAML = require('js-yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db');

// ── Route imports ────────────────────────────────────────────
const authRoutes   = require('./routes/auth');
const plotRoutes   = require('./routes/plots');
const bannerRoutes = require('./routes/banners');
const uploadRoutes = require('./routes/upload');

const app = express();

// ── CORS ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

// Origins are built from env — plus own port in dev for Swagger UI testing
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  ...(process.env.NODE_ENV !== 'production' ? [`http://localhost:${PORT}`, `http://127.0.0.1:${PORT}`] : [])
].filter(Boolean); // removes undefined / empty strings

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin in development (curl, Postman, server-to-server)
      if (!origin && process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: origin "${origin}" is not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ── Body parser ───────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Swagger UI ────────────────────────────────────────────────
const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, 'docs', 'openapi.yaml'), 'utf8')
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customSiteTitle: 'Bhoomi API Docs',
  swaggerOptions: { persistAuthorization: true },
}));

// ── API routes ────────────────────────────────────────────────
app.use('/api/auth',    authRoutes);
app.use('/api/plots',   plotRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/upload',  uploadRoutes);

// ── Health check ──────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── 404 handler ───────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler ──────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ── Start ─────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📄 Swagger UI: http://localhost:${PORT}/api-docs`);
    console.log(`🔗 Health:     http://localhost:${PORT}/health`);
    console.log(`🌐 CORS allowed origins: ${allowedOrigins.join(', ')}`);
  });
});
