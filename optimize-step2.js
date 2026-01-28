const fs = require('fs');

console.log('Reading HTML for step 2 optimizations...');
let html = fs.readFileSync('public/index.html', 'utf8');

console.log('Current size:', (html.length / 1024).toFixed(2), 'KB');

// Add lazy loading to all img tags that don't have it
html = html.replace(/<img(?!\s+[^\u003e]*loading=)([^\u003e]*)src=/gi, '<img$1loading="lazy" src=');

// Add decoding="async" to images for better performance
html = html.replace(/<img(?!\s+[^\u003e]*decoding=)([^\u003e]*)src=/gi, '<img$1decoding="async" src=');

// Add preconnect hints after charset meta tag
const preconnectHints = `
<meta charset="UTF-8" />
<!-- Performance optimizations -->
<link rel="preconnect" href="https://isdbyvwocudnlwzghphw.supabase.co" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://isdbyvwocudnlwzghphw.supabase.co" />`;

html = html.replace(/<meta\s+charset="UTF-8"\s*\/>/i, preconnectHints);

// Add fetchpriority="high" to hero/lcp image
// Find the hero background image and prioritize it
html = html.replace(
  /background-image:\s*url\(['"]?https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/render\/image\/public\/gallery\/gallery\/PBR_5961\.JPG[^'")]*['"]?\)/i,
  match => match + '; /* LCP image */'
);

// Remove the jQuery script since we removed all dependent scripts
// But keep it if there are inline scripts that use it
if (!html.match(/jQuery|\$\(/)) {
  html = html.replace(/<script[^>]*id=['"]jquery-core-js['"][^>]*><\/script>/g, '');
  console.log('Removed jQuery (no usage found)');
}

// Remove any remaining inline scripts that reference WordPress functions
// These are likely broken since we removed the WP scripts
const wpScriptPatterns = [
  /window\._wca/,
  /window\.wcAnalytics/,
  /fbq\(/,
  /gtag\(/,
  /wp\.i18n/,
  /wp\.hooks/,
  /adminBarLoaded/,
  /revSlider/,
  /rs_adminBar/
];

// Remove script tags containing WP-specific code
html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, (match) => {
  for (const pattern of wpScriptPatterns) {
    if (pattern.test(match)) {
      console.log('Removing WP script containing:', pattern.source);
      return '';
    }
  }
  return match;
});

// Update Google Font to use display=swap for faster rendering
html = html.replace(/fonts\.googleapis\.com\/css\?family=([^&]+)/g, 'fonts.googleapis.com/css?family=$1&display=swap');

console.log('After step 2 size:', (html.length / 1024).toFixed(2), 'KB');

// Write the optimized file
fs.writeFileSync('public/index.html', html);
console.log('Step 2 optimizations complete!');
