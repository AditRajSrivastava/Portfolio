# Backend Deployment Guide

Since your frontend is already deployed on Vercel, here are your options for deploying the backend:

## 🎯 Option 1: Deploy Backend on Vercel (RECOMMENDED - Easiest)

### Step 1: Update Your Vercel Project

Since you already have a Vercel deployment, we'll add the backend to it:

1. **Push your backend code to GitHub** (if not already done):
   ```powershell
   git add .
   git commit -m "Add backend server"
   git push origin master
   ```

2. **Configure Environment Variables on Vercel**:
   - Go to https://vercel.com/dashboard
   - Select your portfolio project
   - Go to **Settings** → **Environment Variables**
   - Add these variables:
     ```
     EMAIL_USER = your-email@gmail.com
     EMAIL_PASSWORD = your-app-password
     RECIPIENT_EMAIL = adityasrivastava13112003@gmail.com
     ```

3. **Important: Database Setup**
   
   Vercel uses serverless functions, so we can't use local JSON file storage.
   Choose one of these:

   **A. Use Vercel KV (Redis) - FREE Tier Available**
   - Go to Vercel Dashboard → Storage → Create Database
   - Choose "KV" (Key-Value Store)
   - It will auto-connect to your project
   
   **B. Use MongoDB Atlas - FREE Tier Available**
   - Sign up at https://www.mongodb.com/atlas
   - Create a free cluster
   - Get connection string
   - Add to Vercel env: `MONGODB_URI = your-connection-string`

4. **Redeploy**:
   - Vercel will auto-deploy when you push to GitHub
   - Or manually trigger: `vercel --prod`

### Frontend API Update

Update your API calls to point to your Vercel domain:

In `script.js`, the API calls will automatically work because they use relative paths (`/api/contact`).
No changes needed! ✅

---

## 🎯 Option 2: Deploy Backend on Railway (EASIEST - Works as-is!)

Railway allows persistent storage and works with your current JSON file approach.

### Steps:

1. **Sign up**: Go to https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Select your repository**: Portfolio
4. **Add Environment Variables**:
   ```
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASSWORD = your-app-password
   RECIPIENT_EMAIL = adityasrivastava13112003@gmail.com
   PORT = 3000
   ```
5. **Deploy**: Railway will automatically detect Node.js and deploy

6. **Get Your URL**: Railway gives you a URL like `https://your-app.railway.app`

7. **Update Frontend**: In your `script.js`, update the API endpoint:
   ```javascript
   const API_URL = 'https://your-app.railway.app';
   
   // In the fetch call:
   const response = await fetch(`${API_URL}/api/contact`, {
   ```

### Advantages:
- ✅ Works with existing code (no changes needed!)
- ✅ Persistent storage (JSON file works)
- ✅ Free tier: $5 credit/month
- ✅ Simple deployment

---

## 🎯 Option 3: Deploy Backend on Render

Similar to Railway, Render supports persistent storage.

### Steps:

1. **Sign up**: Go to https://render.com
2. **New** → **Web Service**
3. **Connect GitHub repository**
4. **Settings**:
   - **Name**: portfolio-backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Add Environment Variables** (same as Railway)
6. **Create Web Service**
7. **Get URL**: Something like `https://portfolio-backend.onrender.com`
8. **Update frontend API calls** (same as Railway step 7)

### Advantages:
- ✅ Free tier available
- ✅ Persistent disk storage
- ✅ Auto-deploy from GitHub

---

## 🎯 Option 4: Keep Backend Local (For Testing)

If you're just testing or showcasing locally:

1. **Keep backend running locally**: `npm start`
2. **Use ngrok to expose it**:
   ```powershell
   # Install ngrok: https://ngrok.com/download
   ngrok http 3000
   ```
3. **Update frontend** to use ngrok URL (changes each time)

---

## 📊 Comparison Table

| Option | Difficulty | Cost | Persistent Storage | Best For |
|--------|-----------|------|-------------------|----------|
| **Railway** | ⭐ Easy | Free tier | ✅ Yes | **Recommended for your case** |
| **Render** | ⭐ Easy | Free tier | ✅ Yes | Good alternative |
| **Vercel** | ⭐⭐ Medium | Free tier | ❌ Needs DB setup | If you want everything on Vercel |
| **Heroku** | ⭐⭐ Medium | $5/month | ✅ Yes | Traditional hosting |
| **Local + ngrok** | ⭐ Easy | Free | ✅ Yes | Testing only |

---

## 🚀 My Recommendation for You

Since you're already on Vercel for frontend, I recommend **Railway** for backend because:

1. ✅ **No code changes needed** - works with your current JSON storage
2. ✅ **Easy deployment** - just connect GitHub and click deploy
3. ✅ **Free tier** - $5 credit/month (enough for hobby projects)
4. ✅ **Persistent storage** - your contacts.json will persist
5. ✅ **Simple setup** - done in 5 minutes

---

## 🔧 Quick Railway Setup (Step-by-Step)

I'll create a Railway setup script for you. Would you like me to:

1. Create the Railway deployment files?
2. Or update the code for Vercel serverless with database?
3. Or set up a different option?

**Which option do you prefer?**
