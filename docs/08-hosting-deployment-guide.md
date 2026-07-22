# 08 - Hosting & Deployment Guide

## Local Development Execution
- **Command**: `npm run dev`
- **Frontend URL**: `http://localhost:3000`
- **Backend API URL**: `http://localhost:3001/api`

## Production Deployment Options

### Option 1: Vercel / Render Deployment
1. **Frontend**: Deploy the root repository to Vercel or Netlify (`npm run build`). Output directory: `dist`.
2. **Backend**: Deploy `server/index.js` to Render, Railway, or Heroku.
3. **Environment Variables**:
   - `PORT`: `3001`
   - `VITE_API_URL`: Backend server public URL.

### Option 2: Single VPS / Docker Container
Build production static bundle with `npm run build` and serve static files directly via Express:
```javascript
app.use(express.static(path.join(__dirname, '../dist')));
```

---
*Delivered for DormLights PRD Section 6.*
