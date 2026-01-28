const fs = require('fs');

console.log('Minifying HTML...');
let html = fs.readFileSync('public/index.html', 'utf8');

const originalSize = html.length;

// Remove HTML comments (except IE conditionals and important ones)
html = html.replace(/<!--(?!\s*(?:\[if\s+gt|endif|\s*LCP\s+image))[^>]*-->/gi, '');

// Remove CSS comments
html = html.replace(/\/\*[\s\S]*?\*\//g, '');

// Minify inline CSS - remove extra whitespace but preserve semicolons and braces
html = html.replace(/style="([^"]*)"/g, (match, css) => {
  const minified = css
    .replace(/\s+/g, ' ')
    .replace(/\s*([:;{}])\s*/g, '$1')
    .trim();
  return `style="${minified}"`;
});

// Remove excess whitespace between tags
html = html.replace(/>\s+</g, '><');

// Remove leading/trailing whitespace in text nodes
html = html.replace(/\n\s*/g, '');
html = html.replace(/\s*\n/g, '');

// Remove multiple spaces
html = html.replace(/\s{2,}/g, ' ');

// Remove spaces before/after specific characters
html = html.replace(/\s*([<>;=:,])\s*/g, '$1');

// Preserve DOCTYPE formatting
html = html.replace(/<!doctype/i, '<!DOCTYPE');

const minifiedSize = html.length;
const savings = originalSize - minifiedSize;

console.log('Original size:', (originalSize / 1024).toFixed(2), 'KB');
console.log('Minified size:', (minifiedSize / 1024).toFixed(2), 'KB');
console.log('Savings:', (savings / 1024).toFixed(2), 'KB', `(${((savings/originalSize)*100).toFixed(1)}%)`);

// Write the minified file
fs.writeFileSync('public/index.html', html);
console.log('Minification complete!');
