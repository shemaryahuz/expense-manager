# Deployment Guide

Complete guide for deploying the Expense Manager application to production.

## Prerequisites

- GitHub account with your code pushed
- Supabase project set up
- Domain name (optional)

## Deployment Options

### Option 1: Render (Recommended)

- ✅ Free tier available
- ✅ Easy setup
- ✅ Automatic deployments
- ⚠️ Free tier has cold starts

### Option 2: Vercel + Render

- ✅ Best performance for frontend
- ✅ Free tier available
- ✅ Excellent CDN

### Option 3: Railway

- ✅ Simple deployment
- ✅ Good free tier
- ✅ Built-in database options

---

## Deployment Steps

### Part 1: Prepare Your Code

#### 1. Ensure all tests pass

```bash
# Backend
cd backend
npm test

# Frontend
cd ../frontend
npm test
```

#### 2. Create production environment templates

**backend/.env.production.template**

```env
JWT_SECRET=generate-32-byte-random-string
PORT=3000
CLIENT_URL=https://your-frontend-url.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NODE_ENV=production
```

**frontend/.env.production.template**

```env
VITE_API_URL=https://your-backend-url.com/api
```

#### 3. Push to GitHub

```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

---

### Part 2: Deploy Backend (Render)

#### Step 1: Create Web Service

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository

#### Step 2: Configure Service

**Basic Settings:**

- Name: `expense-manager-backend`
- Region: Choose closest to your users
- Branch: `main`
- Root Directory: `backend`
- Runtime: `Node`

**Build Settings:**

- Build Command: `npm install`
- Start Command: `npm start`

**Instance Type:**

- Select "Free" (or paid for better performance)

#### Step 3: Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these variables:

| Key                         | Value                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `JWT_SECRET`                | Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `PORT`                      | `3000`                                                                               |
| `CLIENT_URL`                | `https://your-frontend.vercel.app` (will update later)                               |
| `SUPABASE_URL`              | Your Supabase project URL                                                            |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key                                                       |
| `NODE_ENV`                  | `production`                                                                         |

#### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://expense-manager-backend.onrender.com`

#### Step 5: Test Backend

```bash
curl https://your-backend-url.onrender.com/api/auth/logout
# Should return: {"message":"You are logged out successfully"}
```

---

### Part 3: Deploy Frontend

#### Option A: Vercel (Recommended for Frontend)

**Step 1: Create Project**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository

**Step 2: Configure**

- Framework Preset: `Vite`
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Step 3: Environment Variables**

Add:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

**Step 4: Deploy**

1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Note your frontend URL: `https://your-app.vercel.app`

**Step 5: Update Backend CORS**

Go back to Render dashboard:

1. Open your backend service
2. Go to "Environment"
3. Update `CLIENT_URL` to your Vercel URL
4. Service will redeploy automatically

#### Option B: Render Static Site

**Step 1: Create Static Site**

1. In Render, click "New +" → "Static Site"
2. Select your repository

**Step 2: Configure**

- Name: `expense-manager-frontend`
- Branch: `main`
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

**Step 3: Environment Variables**

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

**Step 4: Deploy**

Click "Create Static Site"

---

### Part 4: Verify Deployment

#### 1. Test Backend API

```bash
# Health check
curl https://your-backend.onrender.com/api/auth/logout

# Should return success message
```

#### 2. Test Frontend

1. Open your frontend URL
2. Sign up with test account
3. Log in
4. Create transaction
5. Test all features:
   - Dashboard
   - Categories
   - Transactions
   - Profile
   - Theme toggle
   - Language switch
   - Currency change

#### 3. Check Browser Console

- No CORS errors
- No 404 errors
- API calls successful

---

## Troubleshooting

### Issue: CORS Error

**Symptom**: Browser console shows CORS error

**Fix**:

1. Check `CLIENT_URL` in backend environment matches frontend URL exactly
2. Ensure no trailing slash
3. Redeploy backend after changing

### Issue: Cookies Not Set

**Symptom**: Login works but user not authenticated

**Fix**: Ensure in `authController.js`:

```javascript
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 3600000,
};
```

### Issue: API 500 Errors

**Symptom**: Backend returns 500 status

**Fix**:

1. Check Render logs: Dashboard → Service → "Logs"
2. Verify Supabase credentials
3. Check database connection

### Issue: Frontend Build Fails

**Symptom**: Vercel/Render build fails

**Fix**:

1. Check build logs
2. Ensure all dependencies in `package.json`
3. Try building locally: `npm run build`
4. Check for TypeScript/ESLint errors

### Issue: Environment Variables Not Working

**Symptom**: App can't connect to API

**Fix**:

1. Verify environment variables in platform dashboard
2. Ensure `VITE_` prefix for frontend vars
3. Redeploy after adding/changing vars
4. Check no typos in variable names

---

## Production Checklist

Before going live:

- [ ] All tests passing
- [ ] Environment variables set correctly
- [ ] HTTPS enabled (automatic on Render/Vercel)
- [ ] CORS configured properly
- [ ] Cookie settings correct for production
- [ ] Supabase RLS policies enabled
- [ ] Database backed up
- [ ] Error monitoring set up (optional: Sentry)
- [ ] Domain configured (optional)
- [ ] README updated with live URLs

---

## Custom Domain (Optional)

### Vercel

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records as instructed

### Render

1. Go to service settings
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records

---

## Monitoring

### Render

- View logs: Dashboard → Service → "Logs"
- View metrics: Dashboard → Service → "Metrics"

### Vercel

- Analytics: Project → "Analytics"
- Logs: Project → "Deployments" → Select deployment → "Runtime Logs"

---

## Updating Production

### Automatic Deployments

Both Render and Vercel support automatic deployments from GitHub:

1. Push changes to `main` branch
2. Deployment triggers automatically
3. Monitor deployment status in dashboard

### Manual Deployment

1. Go to service dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

---

## Rollback

If something goes wrong:

**Vercel:**

1. Go to "Deployments"
2. Find previous working deployment
3. Click "···" → "Promote to Production"

**Render:**

1. Go to "Events"
2. Find previous deployment
3. Click "Redeploy"

---

## Security Best Practices

- ✅ Use environment variables for all secrets
- ✅ Enable HTTPS (automatic on platforms)
- ✅ Set `secure: true` for cookies in production
- ✅ Enable Supabase Row-Level Security
- ✅ Use strong JWT secret (32+ bytes)
- ✅ Keep dependencies updated
- ✅ Enable rate limiting (consider Cloudflare)
- ✅ Monitor error logs regularly

---

## Cost Optimization

**Free Tier Limits:**

- Render: 750 hours/month, sleeps after 15min inactivity
- Vercel: Unlimited bandwidth on Hobby plan
- Supabase: 500MB database, 1GB file storage

**Staying Free:**

- Use free tiers for development/portfolio
- Upgrade for production traffic
- Monitor usage in dashboards

---

## Support

- Render: [docs.render.com](https://docs.render.com)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)

For issues with this application, open an issue on GitHub.
