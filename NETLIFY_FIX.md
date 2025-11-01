# Netlify Backend Unreachable - Fix Guide

## Problem
Your Netlify site (https://vitalityclinic.netlify.app/) shows "Backend unreachable" even though the Render backend is working.

## Solution

### Option 1: Add Environment Variable in Netlify Dashboard (Recommended)

1. Go to Netlify Dashboard → Your Site → Site settings
2. Navigate to **Build & deploy** → **Environment variables**
3. Click **Add a variable**
4. Add:
   - Key: `VITE_API_BASE`
   - Value: `https://college-health-center-appointments.onrender.com/api`
5. Click **Save**
6. Go to **Deploys** tab
7. Click **Trigger deploy** → **Clear cache and deploy site**

### Option 2: Use netlify.toml (Already Created)

The `netlify.toml` file has been created with the environment variable. Just:

1. Commit and push the `netlify.toml` file to your repository
2. Netlify will automatically redeploy with the correct settings

### Option 3: Wake Up Render Backend

If the backend is sleeping (Render free tier):

1. Open https://college-health-center-appointments.onrender.com/ in a new tab
2. Wait 30-60 seconds for it to wake up
3. Refresh your Netlify site

## Verify the Fix

1. Open browser console (F12) on https://vitalityclinic.netlify.app/
2. Check the Network tab
3. Look for requests to `https://college-health-center-appointments.onrender.com/api/`
4. If you see CORS errors, the backend needs CORS fix (already done)
5. If you see 503 errors, the backend is waking up (wait 60 seconds)

## Test Backend Directly

Open these URLs in your browser:

1. **Root**: https://college-health-center-appointments.onrender.com/
   - Should show: "College Health Center Backend Running"

2. **API Doctors**: https://college-health-center-appointments.onrender.com/api/doctors
   - Should show: JSON array of doctors

3. **API Services**: https://college-health-center-appointments.onrender.com/api/services
   - Should show: JSON array of services

If any of these fail, the backend is sleeping or has issues.

## Common Issues

### Backend Sleeping (Render Free Tier)
- Render free tier spins down after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- Solution: Keep the backend URL open in a tab, or upgrade to paid tier

### CORS Issues
- Already fixed in backend with proper CORS configuration
- If still seeing CORS errors, check Render logs

### Build Cache
- Netlify might be using cached build without environment variables
- Always use "Clear cache and deploy site" after adding env vars

## Quick Test

Run this in browser console on your Netlify site:

```javascript
fetch('https://college-health-center-appointments.onrender.com/')
  .then(r => r.text())
  .then(console.log)
  .catch(console.error);
```

Should log: "College Health Center Backend Running"
