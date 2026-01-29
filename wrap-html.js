const fs = require('fs');

console.log('Wrapping content in proper HTML document structure...');
let content = fs.readFileSync('public/index.html', 'utf8');

// Keep trailing content intact (including Typeform)
// content = content.replace(/<\/script><\/p>(\s*<!--.*-->|\s*<p>.*<\/p>|\s*)*$/is, '</script>');

// Keep Typeform script and comment
// content = content.replace(/<!-- Typeform Embed Script -->/gi, '');
// content = content.replace(/<p>\s*<script[^>]*embed\.typeform\.com[^>]*>.*?<\/script>\s*<\/p>/gis, '');

// Wrap in proper HTML structure
const fullHtml = `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<title>Mumbai Collective | Beforest</title>
<link rel="preconnect" href="https://isdbyvwocudnlwzghphw.supabase.co" />
<link rel="dns-prefetch" href="https://isdbyvwocudnlwzghphw.supabase.co" />
${content}
</body>
</html>`;

// Extract just the style section for the head
const styleMatch = fullHtml.match(/<style>[\s\S]*?<\/style>/i);
const styleSection = styleMatch ? styleMatch[0] : '';

// Extract sections and scripts for the body
const bodyContent = content
  .replace(/<style>[\s\S]*?<\/style>/i, '')  // Remove style section
  .replace(/<script>[\s\S]*?<\/script>/gi, (match) => `\n${match}`);  // Add newlines before scripts

const finalHtml = `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mumbai Collective | Beforest</title>
<link rel="preconnect" href="https://isdbyvwocudnlwzghphw.supabase.co">
<link rel="dns-prefetch" href="https://isdbyvwocudnlwzghphw.supabase.co">
${styleSection}
</head>
<body>
${bodyContent}
</body>
</html>`;

fs.writeFileSync('public/index.html', finalHtml);

const size = finalHtml.length;
console.log('Final HTML size:', (size / 1024).toFixed(2), 'KB');
console.log('HTML document structure complete!');
