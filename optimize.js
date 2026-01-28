const fs = require('fs');
const path = require('path');

console.log('Reading original HTML...');
let html = fs.readFileSync('public/index.html', 'utf8');

console.log('Original size:', (html.length / 1024).toFixed(2), 'KB');

// Remove WordPress admin bar CSS
html = html.replace(/<link[^>]*id=['"]admin-bar-css['"][^>]*>/g, '');
html = html.replace(/<style[^>]*id=['"]admin-bar-inline-css['"][^>]*>[\s\S]*?<\/style>/g, '');
html = html.replace(/<script[^>]*id=['"]admin-bar-js['"][^>]*>[\s\S]*?<\/script>/g, '');

// Remove various WordPress plugin CSS
html = html.replace(/<link[^>]*id=['"]pys_notice-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]wpcode-admin-bar-css-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]dashicons-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]mediaelement-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]wp-mediaelement-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]contact-form-7-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]woocommerce-layout-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]woocommerce-smallscreen-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]woocommerce-general-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]wp-optimize-global-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]wpcf7-redirect-script-frontend-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]imagify-admin-bar-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]mfn-woo-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]dflip-style-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]litespeed-cache-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]elementor-common-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]elementor-icons-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]e-theme-ui-light-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]wp-block-library-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]mfn-swiper-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]mfn-post-local-styles[^'"]*['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]wc-blocks-style-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]wpcom-notes-admin-bar-css['"][^>]*>/g, '');
html = html.replace(/<link[^>]*id=['"]noticons-css['"][^>]*>/g, '');

// Remove inline styles that are WP-related
html = html.replace(/<style[^>]*id=['"]jetpack-sharing-buttons-style-inline-css['"][^>]*>[\s\S]*?<\/style>/g, '');
html = html.replace(/<style[^>]*id=['"]woocommerce-layout-inline-css['"][^>]*>[\s\S]*?<\/style>/g, '');
html = html.replace(/<style[^>]*id=['"]woocommerce-inline-inline-css['"][^>]*>[\s\S]*?<\/style>/g, '');
html = html.replace(/<style[^>]*id=['"]global-styles-inline-css['"][^>]*>[\s\S]*?<\/style>/g, '');
html = html.replace(/<style[^>]*id=['"]classic-theme-styles-inline-css['"][^>]*>[\s\S]*?<\/style>/g, '');
html = html.replace(/<style[^>]*id=['"]wp-img-auto-sizes-contain-inline-css['"][^>]*>[\s\S]*?<\/style>/g, '');
html = html.replace(/<style[^>]*id=['"]dashicons-inline-css['"][^>]*>[\s\S]*?<\/style>/g, '');

// Remove RSS/Feed/Alternate links
html = html.replace(/<link[^>]*type=['"]application\/rss\+xml['"][^>]*>/g, '');
html = html.replace(/<link[^>]*type=['"]application\/json\+oembed['"][^>]*>/g, '');
html = html.replace(/<link[^>]*type=['"]text\/xml\+oembed['"][^>]*>/g, '');
html = html.replace(/<link[^>]*rel=['"]alternate['"][^>]*>/g, '');
html = html.replace(/<link[^>]*rel=['"]EditURI['"][^>]*>/g, '');
html = html.replace(/<link[^>]*rel=['"]?https:\/\/api\.w\.org\/['"]?[^>]*>/g, '');

// Remove shortlink and canonical (keep canonical for SEO)
// html = html.replace(/<link[^>]*rel=['"]shortlink['"][^>]*>/g, '');

// Remove WP emoji and other inline scripts
html = html.replace(/<script[^>]*id=['"]pys-version-script['"][^>]*>[\s\S]*?<\/script>/g, '');

// Remove WooCommerce scripts
html = html.replace(/<script[^>]*id=['"]wc-jquery-blockui-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]wc-add-to-cart-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]wc-js-cookie-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]woocommerce-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]wc-cart-fragments-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]woocommerce-analytics-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]wc-order-attribution-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]sourcebuster-js-js['"][^>]*>[\s\S]*?<\/script>/g, '');

// Remove WP minified bundle scripts (these are WP-specific)
html = html.replace(/<script[^>]*id=['"]wpo_min[^'"]*['"][^>]*>[\s\S]*?<\/script>/g, '');

// Remove admin bar related scripts
html = html.replace(/<script[^>]*id=['"]hoverintent-js-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]wpcom-notes-common-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]wpcom-notes-admin-bar-js['"][^>]*>[\s\S]*?<\/script>/g, '');

// Remove jQuery UI and other WP scripts that aren't needed for static page
html = html.replace(/<script[^>]*id=['"]jquery-ui-core-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]jquery-ui-mouse-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]jquery-ui-draggable-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]jquery-ui-tabs-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]underscore-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]backbone-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]wp-api-request-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]wp-hooks-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]wp-i18n-js['"][^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*id=['"]wp-polyfill-js['"][^>]*>[\s\S]*?<\/script>/g, '');

// Remove Google Analytics and Facebook Pixel
html = html.replace(/<!-- Google Analytics[^>]*>[\s\S]*?<!-- End Google Analytics[^>]*-->/g, '');
html = html.replace(/<!-- Pixel Cat Facebook Pixel Code -->[\s\S]*?<!-- End Facebook Pixel Code -->/g, '');
html = html.replace(/<script[^>]*googletagmanager[^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<script[^>]*gtag[^>]*>[\s\S]*?<\/script>/g, '');

// Remove admin bar HTML
html = html.replace(/<div[^>]*id=['"]wpadminbar['"][\s\S]*?<\/div>\s*<\/div>/g, '');

// Remove wp-toolbar class from body
html = html.replace(/class=['"]([^'"]*admin-bar[^'"]*)['"]/g, (match, p1) => {
  return 'class="' + p1.replace(/admin-bar/g, '').trim() + '"';
});
html = html.replace(/class=['"]([^'"]*logged-in[^'"]*)['"]/g, (match, p1) => {
  return 'class="' + p1.replace(/logged-in/g, '').trim() + '"';
});

// Update font URLs to local
html = html.replace(/url\(['"]?https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaFlare-Light-Trial\.woff2['"]?\)/g, "url('/css/ABCArizonaFlare-Light.woff2')");
html = html.replace(/url\(['"]?https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaFlare-Light-Trial\.woff['"]?\)/g, "url('/css/ABCArizonaFlare-Light.woff')");
html = html.replace(/url\(['"]?https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaFlare-Regular-Trial\.woff2['"]?\)/g, "url('/css/ABCArizonaFlare-Regular.woff2')");
html = html.replace(/url\(['"]?https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaFlare-Regular-Trial\.woff['"]?\)/g, "url('/css/ABCArizonaFlare-Regular.woff')");
html = html.replace(/url\(['"]?https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaSans-Regular-Trial\.woff2['"]?\)/g, "url('/css/ABCArizonaSans-Regular.woff2')");
html = html.replace(/url\(['"]?https:\/\/isdbyvwocudnlwzghphw\.supabase\.co\/storage\/v1\/object\/public\/web\.images\/fonts\/ABCArizonaSans-Regular-Trial\.woff['"]?\)/g, "url('/css/ABCArizonaSans-Regular.woff')");

// Remove DNS prefetch and preconnect links to external WP resources
html = html.replace(/<link[^>]*rel=['"]dns-prefetch['"][^>]*>/g, '');
html = html.replace(/<link[^>]*rel=['"]preconnect['"][^>]*>/g, '');

// Remove jquery migrate (we'll keep jQuery core if needed but migrate is for WP backwards compat)
html = html.replace(/<script[^>]*id=['"]jquery-migrate-js['"][^>]*>[\s\S]*?<\/script>/g, '');

// Remove empty lines and excessive whitespace
html = html.replace(/\n\s*\n/g, '\n');

// Remove Typeform if present
html = html.replace(/<script[^>]*embed\.typeform\.com[^>]*>[\s\S]*?<\/script>/g, '');

console.log('After cleanup size:', (html.length / 1024).toFixed(2), 'KB');

// Write the optimized file
fs.writeFileSync('public/index.html', html);
console.log('Optimized HTML saved to public/index.html');
