# Content Repurposer

AI-powered content transformation tool. Transform your blog posts into tweets, LinkedIn posts, video scripts, and Instagram captions with one click.

![Content Repurposer](https://img.shields.io/badge/AI-Powered-purple)
![React](https://img.shields.io/badge/React-18.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

✨ **Multi-Format Output**
- Twitter threads
- LinkedIn posts
- Video scripts
- Instagram captions

🎨 **Customizable Tone**
- Professional
- Casual
- Inspiring
- Educational
- Humorous

💾 **Persistent History**
- Save all transformations
- Quick access to past content
- One-click reload

🚀 **Fast & Beautiful**
- Modern gradient UI
- Smooth animations
- Mobile responsive

## Quick Start

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open browser:**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build files will be in the `dist/` folder.

## Deploy to Vercel (Recommended)

### Method 1: Using Vercel CLI (Fastest)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

Follow the prompts and your app will be live!

### Method 2: Using Vercel Dashboard

1. **Push code to GitHub:**
   - Create a new repository on GitHub
   - Push this project to the repository

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

That's it! Your app will be live at `your-app-name.vercel.app`

## Deploy to Netlify

1. **Push code to GitHub**

2. **Go to [netlify.com](https://netlify.com)**

3. **Click "Add new site" → "Import an existing project"**

4. **Connect to GitHub and select your repository**

5. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

6. **Click "Deploy"**

## Technology Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **AI:** Claude Sonnet 4 API
- **Icons:** Lucide React
- **Storage:** Browser Storage API

## How It Works

1. User pastes original content
2. Selects desired output formats
3. Chooses tone/style
4. Claude AI analyzes and transforms content
5. Outputs optimized versions for each platform
6. User copies and posts to social media

## API Integration

This app uses the Anthropic Claude API. The API calls are made directly from the browser - no backend server required!

## Browser Compatibility

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

## License

MIT License - feel free to use this project for personal or commercial purposes!

## Support

Found a bug or have a feature request? Open an issue on GitHub!

## Author

Built with ❤️ using Claude AI

---

**Ready to transform your content? Deploy now and start repurposing!** 🚀
