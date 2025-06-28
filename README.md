# Edward Balbares - Portfolio Website

A modern, responsive portfolio website featuring a message board system with full CRUD functionality.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes
- **Message Board System**: Full CRUD operations (Create, Read, Update, Delete)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Contact Form**: Integrated message submission system
- **Resume Section**: Professional resume display with download option

## 🚀 Live Demo

Visit the live website: [Your GitHub Pages URL]

## 📋 Prerequisites

### For GitHub Pages (This Repository)
- No server required (static files only)
- Works immediately when deployed

### For Local Development (Full Functionality)
- XAMPP, WAMP, or similar local server
- PHP 7.4 or higher
- MySQL 5.7 or higher

## 🛠️ Installation & Setup

### Option 1: GitHub Pages Deployment (Recommended)

1. **Fork/Clone this repository**
   ```bash
   git clone https://github.com/yourusername/Portfolio_By_BalbaresE-main.git
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select source branch (usually `main`)
   - Save to get your GitHub Pages URL

3. **Access your website**
   - Your site will be available at: `https://yourusername.github.io/Portfolio_By_BalbaresE-main/`

### Option 2: Local Development (For Full Backend Features)

1. **Download the full version** from the releases or use the original repository
2. **Set up XAMPP**
   - Download and install [XAMPP](https://www.apachefriends.org/)
   - Start Apache and MySQL services
   - Place the project folder in `htdocs` directory

3. **Create Database**
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Create a new database named `message_board_db`
   - Import the database SQL file

4. **Access the Website**
   - Open: `http://localhost/Portfolio_By_BalbaresE-main/`

## 📁 Project Structure

```
Portfolio_By_BalbaresE-main/
├── index.html              # Main HTML file (GitHub Pages compatible)
├── style.css               # Stylesheet
├── sctipt.js               # JavaScript functionality (static version)
├── images/                 # Image assets
│   ├── Edward.png
│   ├── Ed.jpg
│   └── Award.jpg
├── README.md               # This file
└── GITHUB_DEPLOYMENT.md    # Detailed deployment guide
```

## 🎨 Customization

### Personal Information
- Update personal details in `index.html`
- Replace images in the `images/` folder
- Modify contact information and social links

### Styling
- Edit `style.css` for color schemes and layout
- Modify CSS variables in `:root` for easy theming

### Functionality
- Edit `sctipt.js` for JavaScript behavior

## 🔧 Troubleshooting

### Common Issues

1. **Images Not Loading**
   - Check file paths in `index.html`
   - Ensure images exist in `images/` folder

2. **Styling Issues**
   - Check CSS file is properly linked
   - Clear browser cache

3. **JavaScript Not Working**
   - Check browser console for errors
   - Verify JS file is properly linked

## 🌐 Deployment Options

### GitHub Pages (This Version)
- ✅ Automatic deployment from repository
- ✅ All visual features work
- ✅ Responsive design
- ✅ Dark/Light mode
- ⚠️ Message board is demo mode (no backend)

### Netlify/Vercel (Static)
- Similar to GitHub Pages
- Better performance and features
- Still no backend functionality

### Heroku/Railway (Full Stack)
- Supports PHP and MySQL
- Full functionality including message board
- Requires database setup

### Shared Hosting
- Upload files via FTP
- Set up MySQL database
- Full functionality available

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Edward Apolinario Balbares**
- Email: edwardblbaresz@gmail.com
- Facebook: [Edward Balbares](https://www.facebook.com/edward.apolinario.balbares)

## 🙏 Acknowledgments

- Boxicons for icons
- Swiper.js for carousel functionality
- ScrollReveal for animations
- DLSJBC for academic support

---

**Note**: This repository is optimized for GitHub Pages deployment. For full backend functionality including a working message board, please use the local development setup with XAMPP. 