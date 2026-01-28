const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for faster transfers
app.use(compression({
  level: 9, // Maximum compression
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

// Security and performance headers
app.use((req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // XSS protection
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files (CSS, JS, images, fonts) with aggressive caching
app.use(express.static('public', {
  maxAge: '1y', // Cache static assets for 1 year (they have hashed names or versions)
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Set cache-control based on file type
    if (path.endsWith('.html')) {
      // HTML files - shorter cache
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    } else if (path.match(/\.(woff2?|ttf|otf|eot)$/)) {
      // Fonts - cache for 1 year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (path.match(/\.(css|js)$/)) {
      // CSS/JS - cache for 1 year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
      // Images - cache for 1 year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Serve the main HTML page with performance headers
app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404s
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Static assets cached for 1 year`);
  console.log(`🗜️  Gzip compression enabled (level 9)`);
  console.log(`Press Ctrl+C to stop`);
});
