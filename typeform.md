# Typeform Time Tracking Implementation Summary

## Problem
Needed to track how long users spend actively viewing the page before clicking "GET AN INVITE" button and send this data to Typeform.

## Solution
Implemented accurate time tracking using `setInterval` and Page Visibility API to count only actual time spent viewing the page.

## Why Old Method (Date.now) Was Inaccurate
```javascript
// OLD - Date.now() difference
var pageLoadTime = Date.now();
var timeSpent = Math.floor((Date.now() - pageLoadTime) / 1000);
```

**Problems:**
- Counts ALL time including when user:
  - Switches to another tab
  - Minimizes browser
  - Computer goes to sleep
  - Opens another application

## New Accurate Method (setInterval + Visibility API)
```javascript
// NEW - Accurate timer with Page Visibility API
var timeSpentSeconds = 0;
var timerInterval = null;

// Start timer - increments every second
timerInterval = setInterval(function() {
    // Only count when page is VISIBLE
    if (document.visibilityState === 'visible') {
        timeSpentSeconds++;
    }
}, 1000);

// Track visibility changes
document.addEventListener('visibilitychange', function() {
    isPageVisible = document.visibilityState === 'visible';
});
```

## How It Works:
1. `setInterval` runs every 1 second
2. `document.visibilityState` checks if page is visible
3. Only increments `timeSpentSeconds` when:
   - Tab is active/in foreground
   - Page is visible to user
4. Does NOT count when:
   - User switches tabs
   - User minimizes browser
   - User opens another app/window

## Example:
```
User opens page at:    10:00:00
User switches tab:     10:00:10 (timer PAUSES)
User returns at:       10:00:30 (timer RESUMES)
User clicks button:   10:00:45

Old method: 45 seconds (WRONG - includes background time)
New method: 25 seconds (CORRECT - only visible time)
```

## Implementation Details

### Full Script:
```javascript
// Accurate time tracking using setInterval and Page Visibility API
var timeSpentSeconds = 0;
var timerInterval = null;
var isPageVisible = true;

// Start timer when page loads
function startTimer() {
    timerInterval = setInterval(function() {
        if (document.visibilityState === 'visible') {
            timeSpentSeconds++;
        }
    }, 1000);
}

// Get UTM parameters from current URL
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

// Track page visibility changes
document.addEventListener('visibilitychange', function() {
    isPageVisible = document.visibilityState === 'visible';
});

// Start timer immediately
startTimer();

// On button click - opens as popup with hidden fields
var utmParams = getUrlParams();
utmParams['utm_time_spent'] = timeSpentSeconds + 's';

window.tf.createPopup(formId, {
    hidden: utmParams,
    opacity: 100,
    size: 100,
    medium: 'snippet'
}).open();
```

### Button Configuration
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

### Data Flow
1. User lands on page with Facebook ads UTM params (e.g., `?utm_source=facebook&utm_medium=cpc`)
2. Timer starts immediately, counting only active viewing time
3. User spends 45 seconds on page but only 30 seconds actively viewing
4. User clicks "GET AN INVITE"
5. Script captures all UTM params + calculates `time_spent` (30s)
6. Opens Typeform popup with `hidden: {utm_source: 'facebook', utm_time_spent: '30s'}`
7. Typeform records all values as hidden fields

## Why This Approach?
- **Accurate** - Only counts actual viewing time
- **Respects user behavior** - Pauses when user switches away
- **Preserves Facebook ads UTMs** - Extracts from current URL
- **Opens as proper popup** - Uses Typeform SDK
- **No custom configuration** - Typeform auto-maps utm_* params

## Files Modified
- `D:\AI Apps\time_spent\page.html` - Added time tracking script at end of file

## Result
Users' actual active time on page is tracked and recorded in Typeform responses as `utm_time_spent`, alongside existing Facebook ads attribution data.
