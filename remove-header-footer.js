const fs = require('fs');

console.log('Removing header and footer...');
let html = fs.readFileSync('public/index.html', 'utf8');

const originalSize = html.length;

// Remove the header section: <header id="mfn-header-template" ... >...</header>
// Using a regex that handles nested tags properly
const headerRegex = /<header[^>]*id=["']mfn-header-template["'][^>]*>[\s\S]*?<\/header>/i;
const headerMatch = html.match(headerRegex);
if (headerMatch) {
  console.log('Found header, removing...');
  html = html.replace(headerRegex, '');
} else {
  console.log('Header not found with primary pattern, trying alternative...');
  // Try without the id attribute specifically
  const altHeaderRegex = /<header[^>]*mfn-header[^>]*>[\s\S]*?<\/header>/i;
  const altMatch = html.match(altHeaderRegex);
  if (altMatch) {
    console.log('Found header with alternative pattern, removing...');
    html = html.replace(altHeaderRegex, '');
  }
}

// Remove the footer section: <footer id="mfn-footer-template" ... >...</footer>
const footerRegex = /<footer[^>]*id=["']mfn-footer-template["'][^>]*>[\s\S]*?<\/footer>/i;
const footerMatch = html.match(footerRegex);
if (footerMatch) {
  console.log('Found footer, removing...');
  html = html.replace(footerRegex, '');
} else {
  console.log('Footer not found with primary pattern, trying alternative...');
  // Try without the id attribute specifically
  const altFooterRegex = /<footer[^>]*mfn-footer[^>]*>[\s\S]*?<\/footer>/i;
  const altMatch = html.match(altFooterRegex);
  if (altMatch) {
    console.log('Found footer with alternative pattern, removing...');
    html = html.replace(altFooterRegex, '');
  }
}

// Also remove any remaining mfn-header-template or mfn-footer-template elements (just in case)
html = html.replace(/<[^>]*mfn-header-template[^>]*>[\s\S]*?<\/[^>]*>/gi, '');
html = html.replace(/<[^>]*mfn-footer-template[^>]*>[\s\S]*?<\/[^>]*>/gi, '');

const newSize = html.length;
const savings = originalSize - newSize;

console.log('\nResults:');
console.log('Original size:', (originalSize / 1024).toFixed(2), 'KB');
console.log('New size:', (newSize / 1024).toFixed(2), 'KB');
console.log('Removed:', (savings / 1024).toFixed(2), 'KB', `(${((savings/originalSize)*100).toFixed(1)}%)`);

// Clean up any double spaces or empty lines that may have been left
html = html.replace(/\n\s*\n/g, '\n');
html = html.replace(/\s{2,}/g, ' ');

fs.writeFileSync('public/index.html', html);
console.log('\nHeader and footer removed successfully!');
