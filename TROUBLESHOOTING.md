# GitHub Pages Troubleshooting Guide

If your portfolio website is not working on GitHub Pages, follow these steps:

## 🔍 Quick Checks

### 1. Repository Name
- Make sure your repository is named correctly
- For user/organization pages: `yourusername.github.io`
- For project pages: any name (like `Portfolio_By_BalbaresE-main`)

### 2. GitHub Pages Settings
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** (in left sidebar)
4. Check that:
   - Source is set to "Deploy from a branch"
   - Branch is set to "main" (or "master")
   - Status shows "Your site is published at..."

### 3. File Structure
Make sure you have these files in your repository root:
```
your-repository/
├── index.html          ✅ Required
├── style.css           ✅ Required
├── sctipt.js           ✅ Required
├── images/             ✅ Required
│   ├── Edward.png
│   ├── Ed.jpg
│   └── Award.jpg
└── README.md           ✅ Optional
```

## 🐛 Common Issues & Solutions

### Issue 1: "404 - Page Not Found"
**Cause**: Missing `index.html` file or wrong file location
**Solution**:
- Ensure `index.html` is in the repository root (not in a subfolder)
- Check that the file is actually uploaded to GitHub

### Issue 2: "Styles not loading"
**Cause**: CSS file not found or wrong path
**Solution**:
- Verify `style.css` exists in repository root
- Check that `index.html` references it correctly: `<link rel="stylesheet" href="style.css">`

### Issue 3: "JavaScript not working"
**Cause**: JS file not found or wrong path
**Solution**:
- Verify `sctipt.js` exists in repository root
- Check that `index.html` references it correctly: `<script src="sctipt.js"></script>`

### Issue 4: "Images not showing"
**Cause**: Images not uploaded or wrong paths
**Solution**:
- Ensure `images/` folder contains all images
- Check paths in HTML: `src="images/Edward.png"`

### Issue 5: "Site takes too long to load"
**Cause**: Large files or GitHub Pages processing
**Solution**:
- Wait 5-10 minutes after pushing changes
- Check file sizes (images should be optimized)

## 🔧 Step-by-Step Fix

### Step 1: Verify Files
1. Go to your repository on GitHub
2. Check that all required files are present
3. Click on each file to ensure they're not empty

### Step 2: Check File Contents
1. Open `index.html` on GitHub
2. Verify it contains the portfolio content
3. Check that CSS and JS links are correct

### Step 3: Test Locally
1. Download your repository
2. Open `index.html` in a browser
3. Check browser console for errors

### Step 4: Force GitHub Pages Update
1. Make a small change to any file
2. Commit and push the change
3. Wait 5-10 minutes for deployment

## 📱 Testing Your Site

### Desktop Testing:
1. Visit your GitHub Pages URL
2. Test all sections (Home, About, Skills, Contact, Resume)
3. Test dark/light mode toggle
4. Test message board demo functionality

### Mobile Testing:
1. Use browser dev tools to simulate mobile
2. Test responsive design
3. Check touch interactions

## 🚨 Emergency Fixes

### If Nothing Works:
1. **Create a new repository** with a simple name
2. **Upload only essential files**:
   - `index.html`
   - `style.css`
   - `sctipt.js`
   - `images/` folder
3. **Enable GitHub Pages** on the new repository
4. **Test the new URL**

### Alternative Deployment:
If GitHub Pages continues to have issues:
1. **Netlify**: Drag and drop your folder to netlify.com
2. **Vercel**: Connect your GitHub repository to vercel.com
3. **Firebase Hosting**: Use Firebase for hosting

## 📞 Getting Help

### Check These First:
- [GitHub Pages Documentation](https://pages.github.com/)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites)
- Browser console for JavaScript errors

### Common Error Messages:
- **"Build failed"**: Check for syntax errors in your files
- **"Page not found"**: Verify file paths and repository settings
- **"Styles not loading"**: Check CSS file path and content

## ✅ Success Checklist

Your site is working correctly if:
- [ ] Home page loads with your name and photo
- [ ] Navigation menu works
- [ ] Dark/light mode toggle works
- [ ] All sections are accessible
- [ ] Images display correctly
- [ ] Message board demo works
- [ ] Site is responsive on mobile

## 🎯 Quick Test URLs

Test these specific features:
- Main page: `https://yourusername.github.io/repository-name/`
- Dark mode: Click the moon icon
- Message board: Scroll to Contact section
- Resume: Click Resume in navigation

---

**Still having issues?** Check the browser console (F12) for specific error messages and share them for more targeted help. 