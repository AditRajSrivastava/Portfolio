# 🚂 Deploy Backend to Railway - Step by Step

## Why Railway?
- ✅ Works with your existing code (no changes needed)
- ✅ JSON file storage persists
- ✅ Free $5 credit/month
- ✅ Super easy deployment (5 minutes)

---

## 📋 Step-by-Step Instructions

### Step 1: Prepare Your Repository

1. **Make sure all files are committed to GitHub**:
   ```powershell
   git add .
   git commit -m "Add backend for deployment"
   git push origin master
   ```

### Step 2: Sign Up for Railway

1. Go to **https://railway.app**
2. Click **"Start a New Project"**
3. Sign in with **GitHub**
4. Authorize Railway to access your repositories

### Step 3: Create New Project

1. Click **"Deploy from GitHub repo"**
2. Select your repository: **Portfolio**
3. Railway will automatically detect it's a Node.js project ✅

### Step 4: Configure Environment Variables

1. In Railway dashboard, click on your project
2. Go to **"Variables"** tab
3. Add these variables:

   ```
   EMAIL_USER
   Value: your-email@gmail.com
   
   EMAIL_PASSWORD
   Value: your-gmail-app-password
   
   RECIPIENT_EMAIL
   Value: adityasrivastava13112003@gmail.com
   
   PORT
   Value: 3000
   ```

4. Click **"Add Variable"** for each one

### Step 5: Deploy

1. Railway will automatically deploy! ✅
2. Wait for deployment to complete (2-3 minutes)
3. Click **"Settings"** → **"Generate Domain"**
4. You'll get a URL like: `https://portfolio-production-xxxx.up.railway.app`

### Step 6: Update Frontend API URL

1. Open `api-config.js` in your project
2. Update the `PRODUCTION_API` line:

   ```javascript
   const PRODUCTION_API = 'https://your-railway-url.railway.app';
   ```

3. Save and push to GitHub:
   ```powershell
   git add api-config.js
   git commit -m "Update API URL for Railway backend"
   git push origin master
   ```

4. Your Vercel frontend will auto-deploy with the update! ✅

### Step 7: Test It!

1. Go to your Vercel portfolio site
2. Fill out the contact form
3. Submit!
4. Check Railway logs to see the request
5. View messages at: `https://your-railway-url.railway.app/admin.html`

---

## 🎯 Your Setup After Deployment

```
Frontend (Vercel)                    Backend (Railway)
├── index.html         →  API  →    ├── server.js
├── script.js                        ├── data/contacts.json
├── api-config.js ──────────────────→├── /api/contact
└── style.css                        └── /api/contacts
```

---

## 🔍 Troubleshooting

### Issue: "Cannot GET /"
**Solution**: Access your portfolio via Vercel URL, not Railway URL
- Railway is backend only: `https://your-app.railway.app/api/contact`
- Portfolio is on Vercel: `https://your-portfolio.vercel.app`

### Issue: CORS Error
**Solution**: Already handled! Your `server.js` has `app.use(cors())` ✅

### Issue: Email not sending
**Solution**: 
1. Check environment variables are set in Railway
2. Verify Gmail App Password is correct
3. Check Railway logs for errors

### Issue: Messages not saving
**Solution**: Check Railway logs for file system errors
- Railway provides persistent disk automatically ✅

---

## 📊 Railway Dashboard Quick Guide

### View Logs
1. Go to Railway dashboard
2. Click your project
3. Click **"Deployments"**
4. Click latest deployment
5. View logs in real-time

### View Environment Variables
1. Click **"Variables"** tab
2. View/Edit/Add variables

### Restart Service
1. Click **"Settings"**
2. Click **"Restart"**

---

## 💰 Railway Pricing

- **Free Tier**: $5 credit/month
- **Usage**: ~$0.50-1/month for hobby project
- **Upgrade**: $5/month for $5 credit (if needed)

Your portfolio backend will easily fit in free tier! ✅

---

## 🔄 Auto-Deploy Setup

Railway automatically deploys when you push to GitHub! ✅

To disable:
1. **Settings** → **Service Settings**
2. Toggle **"Auto Deploy"**

---

## 🌐 Custom Domain (Optional)

Want to use your own domain?

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Railway: **Settings** → **Domains**
3. Add custom domain
4. Update DNS records as shown
5. Wait for SSL certificate (automatic)

---

## ✅ Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Domain generated
- [ ] `api-config.js` updated with Railway URL
- [ ] Changes pushed to GitHub
- [ ] Vercel auto-deployed
- [ ] Contact form tested
- [ ] Admin panel accessible

---

## 📞 Need Help?

Check:
1. Railway logs for backend errors
2. Browser console (F12) for frontend errors
3. Network tab to see API requests

---

## 🎉 That's It!

Your portfolio is now fully deployed:
- ✅ Frontend on Vercel
- ✅ Backend on Railway  
- ✅ Database (JSON) on Railway
- ✅ Auto-deploy enabled
- ✅ Contact form working

**Total time**: ~10 minutes
**Total cost**: $0 (free tiers)

---

Need help with deployment? Let me know! 🚀
