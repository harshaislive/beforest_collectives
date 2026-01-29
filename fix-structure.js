const fs = require('fs');

console.log('Fixing HTML structure and updating font URLs...');
let html = fs.readFileSync('public/index.html', 'utf8');

const originalSize = html.length;

// Keep Typeform embed script (needed for popup buttons with data-tf-popup)
// html = html.replace(/<p><script[^>]*embed\.typeform\.com[^>]*><\/script><\/p>/gi, '');

// Extract the style content (remove the <p> wrapper around <style>)
html = html.replace(/^<p><style>/i, '<style>');

// Remove </p> after </script> at the end if present
html = html.replace(/<\/script><\/p>$/i, '<\/script>');

// Update font URLs to local paths
html = html.replace(
  /https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaFlare-Light-Trial\.woff2/g,
  '/css/ABCArizonaFlare-Light.woff2'
);
html = html.replace(
  /https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaFlare-Light-Trial\.woff/g,
  '/css/ABCArizonaFlare-Light.woff'
);
html = html.replace(
  /https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaFlare-Regular-Trial\.woff2/g,
  '/css/ABCArizonaFlare-Regular.woff2'
);
html = html.replace(
  /https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaFlare-Regular-Trial\.woff/g,
  '/css/ABCArizonaFlare-Regular.woff'
);
html = html.replace(
  /https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaSans-Regular-Trial\.woff2/g,
  '/css/ABCArizonaSans-Regular.woff2'
);
html = html.replace(
  /https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaSans-Regular-Trial\.woff/g,
  '/css/ABCArizonaSans-Regular.woff'
);

const newSize = html.length;

console.log('Original size:', (originalSize / 1024).toFixed(2), 'KB');
console.log('New size:', (newSize / 1024).toFixed(2), 'KB');
console.log('Savings:', ((originalSize - newSize) / 1024).toFixed(2), 'KB');

fs.writeFileSync('public/index.html', html);
console.log('\nHTML structure fixed and font URLs updated to local paths!');
console.log('Note: File contains <style> + content sections + <script> structure');
