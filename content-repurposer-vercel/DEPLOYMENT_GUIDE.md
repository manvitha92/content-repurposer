# 🚀 DEPLOYMENT GUIDE - Content Repurposer

## ⚡ FASTEST METHOD: Vercel (5 Minutes)

### Step-by-Step Instructions:

#### **1. Prepare Your Code**
- Download the entire project folder
- Make sure all files are in one folder

#### **2. Create GitHub Account (if you don't have one)**
- Go to [github.com](https://github.com)
- Click "Sign up"
- Follow the registration process

#### **3. Upload Code to GitHub**

**Option A: Using GitHub Desktop (Easiest)**
1. Download [GitHub Desktop](https://desktop.github.com)
2. Install and sign in
3. Click "File" → "New Repository"
4. Name it "content-repurposer"
5. Choose the folder location
6. Click "Create Repository"
7. Click "Publish repository"

**Option B: Using GitHub Website**
1. Go to [github.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Name it "content-repurposer"
4. Click "Create repository"
5. Follow the instructions to upload your files

#### **4. Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" → Choose "Continue with GitHub"
3. Authorize Vercel to access GitHub
4. Click "New Project"
5. Select "content-repurposer" repository
6. Click "Deploy"
7. Wait 2-3 minutes ⏳
8. **DONE!** 🎉 Your app is live!

You'll get a URL like: `https://content-repurposer-abc123.vercel.app`

---

## 🔄 Alternative: Netlify

### Step-by-Step:

1. **Push code to GitHub** (same as steps 1-3 above)

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Sign up" → Choose GitHub
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select "content-repurposer" repository
   - **Build settings:**
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"
   - Wait 2-3 minutes
   - **DONE!** You get a URL like: `content-repurposer.netlify.app`

---

## 💻 Local Testing (Before Deployment)

Want to test locally first?

1. **Install Node.js:**
   - Download from [nodejs.org](https://nodejs.org)
   - Install the LTS version

2. **Open Terminal/Command Prompt:**
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type `terminal`, press Enter

3. **Navigate to project folder:**
```bash
cd path/to/content-repurposer-vercel
```

4. **Install dependencies:**
```bash
npm install
```

5. **Run development server:**
```bash
npm run dev
```

6. **Open browser:**
   - Go to `http://localhost:5173`

---

## 🆘 Troubleshooting

### "npm command not found"
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart your terminal

### "Build failed on Vercel"
- Check that `package.json` exists
- Make sure all files are in the repository
- Try deploying again

### "App loads but shows blank page"
- Check browser console (F12)
- Make sure all files are uploaded correctly
- Clear cache and refresh

### "API not working"
- The Claude API is free to use in artifacts
- No API key needed for this version
- Make sure you're accessing via the deployed URL

---

## 📱 Share Your App

Once deployed, you can:
- Share the Vercel/Netlify URL with anyone
- Add to your portfolio
- Share on social media
- Use it yourself daily!

---

## 🎯 Next Steps After Deployment

1. **Custom Domain** (Optional):
   - Buy a domain from Namecheap, GoDaddy, etc.
   - Connect it in Vercel/Netlify settings
   - Example: `contentrepurposer.com`

2. **Analytics** (Optional):
   - Add Google Analytics
   - Track user engagement
   - See how many people use your app

3. **Improvements**:
   - Add more output formats
   - Add more tone options
   - Improve UI/UX based on feedback

---

## ✅ Deployment Checklist

- [ ] Code uploaded to GitHub
- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Deployment successful
- [ ] App URL working
- [ ] Tested on mobile
- [ ] Shared with friends!

---

**Need help? Common issues:**
- Forgot GitHub password? Reset it
- Vercel deployment stuck? Try again
- App not loading? Check browser console

**You've got this!** 🚀
