# Render.com Deployment Guide

## Backend Deployment

1. **Create New Web Service** on Render.com
   - Connect your GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables** (Add in Render Dashboard):
   ```
   MONGODB_URI=mongodb+srv://sayanbhowmik156:Sayan1234@cluster0.6frf0kx.mongodb.net/college_health?retryWrites=true&w=majority
   JWT_SECRET=your-secure-jwt-secret-here
   ADMIN_CREATION_KEY=your-admin-key-here
   NODE_ENV=production
   ```

3. **Important Settings**:
   - Instance Type: Free
   - Auto-Deploy: Yes
   - Health Check Path: `/`

4. **After Deployment**:
   - Copy your backend URL (e.g., `https://college-health-center-appointments.onrender.com`)
   - Backend will be available at this URL

## Frontend Deployment

1. **Update Frontend Config**:
   - Already done: `src/utils/api.js` points to your Render backend

2. **Deploy Frontend** (Choose one):

   ### Option A: Render Static Site
   - Create New Static Site
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

   ### Option B: Vercel/Netlify
   - Connect repository
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add Environment Variable: `VITE_API_BASE=https://your-backend-url.onrender.com/api`

## Testing Deployment

1. **Test Backend**:
   ```bash
   curl https://college-health-center-appointments.onrender.com/
   ```
   Should return: "College Health Center Backend Running"

2. **Test API Endpoint**:
   ```bash
   curl https://college-health-center-appointments.onrender.com/api/doctors
   ```
   Should return JSON array of doctors

3. **If Backend Shows "Backend Unreachable"**:
   - Check Render logs for errors
   - Verify MongoDB connection string is correct
   - Wait 30-60 seconds (free tier takes time to spin up)
   - Check if service is sleeping (free tier sleeps after 15 min inactivity)

## Common Issues

### Port Scan Timeout
- ✓ Fixed: Server now binds to `0.0.0.0:PORT`
- ✓ Fixed: Uses `process.env.PORT` (Render sets this)

### CORS Errors
- ✓ Fixed: CORS enabled for all origins
- ✓ Fixed: Proper headers configured

### Backend Sleeping
- Free tier spins down after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Solution: Upgrade to paid tier or use a ping service

### Database Connection
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Or add Render's IP addresses to whitelist

## Seed Database

After backend is deployed, seed the database:

```bash
# SSH into Render service or run locally with production DB
cd backend
npm run seed
npm run create-admin
```

Or use MongoDB Compass to manually add data.
