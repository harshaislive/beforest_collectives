# Typeform Time Tracking Implementation Summary

## Problem
Needed to track how long users spend on the page before clicking "GET AN INVITE" button and send this data to Typeform.

## Solution
Implemented time tracking using UTM parameters passed as hidden fields to Typeform's SDK popup.

## Implementation Details

### 1. Time Tracking Script
Added JavaScript to `page.html` that:
- Records `pageLoadTime` when page loads
- Calculates `time_spent` (in seconds) when user clicks Typeform button
- Extracts existing UTM parameters from the page URL (preserves Facebook ads attribution)
- Adds `utm_time_spent=XXs` to the hidden fields object
- Opens Typeform as a popup with all UTM params passed as hidden fields

### 2. Key Code
```javascript
// Get UTM params from current URL
function getUrlParams() {
    var params = new URLSearchParams(window.location.search);
    var utmParams = {};
    for (var key of params.keys()) {
        if (key.startsWith('utm_')) {
            utmParams[key] = params.get(key);
        }
    }
    return utmParams;
}

// On button click - opens as popup with hidden fields
var utmParams = getUrlParams();
utmParams['utm_time_spent'] = timeSpent + 's';

window.tf.createPopup(formId, {
    hidden: utmParams,
    opacity: 100,
    size: 100,
    medium: 'snippet'
}).open();
```

### 3. Button Configuration
All Typeform buttons use `data-tf-popup` attribute (not `data-tf-popup-custom`) to work with standard Typeform embed SDK.

Example button:
```html
<button class="cta-button"
    data-tf-popup="kfcjiXxR"
    data-tf-opacity="100"
    data-tf-size="100"
    data-tf-medium="snippet"
    data-tf-hidden="collective=mumbai">
    GET AN INVITE
</button>
```

### 4. Data Flow
1. User lands on page with Facebook ads UTM params (e.g., `?utm_source=facebook&utm_medium=cpc`)
2. User spends 45 seconds on page
3. User clicks "GET AN INVITE"
4. Script captures all UTM params + calculates `time_spent`
5. Opens Typeform popup with `hidden: {utm_source: 'facebook', utm_medium: 'cpc', utm_time_spent: '45s'}`
6. Typeform records all values as hidden fields

## Why UTM Parameters as Hidden Fields?
- Typeform automatically maps `utm_*` params to hidden fields
- Preserves existing UTM tracking from Facebook ads
- Opens as a proper popup overlay (not new tab)
- No need for custom hidden field configuration in Typeform dashboard

## Files Modified
- `D:\AI Apps\time_spent\page.html` - Added time tracking script at end of file

## Result
Users' time on page is tracked and recorded in Typeform responses as `utm_time_spent`, alongside existing Facebook ads attribution data.
