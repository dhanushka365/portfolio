# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Perfect for showcasing your work, skills, and projects on GitHub Pages.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth scrolling and animations
- 🎯 Easy to customize
- 🚀 Ready for GitHub Pages deployment

## Sections

1. **Hero Section** - Eye-catching introduction with call-to-action buttons
2. **About** - Personal information and statistics
3. **Skills** - Technical skills organized by category
4. **Projects** - Showcase of featured projects
5. **Contact** - Contact information and form

## Customization

### Personal Information

1. **Hero Section** (`index.html`):
   - Update the name in `.hero-title .name`
   - Modify the subtitle in `.hero-subtitle`
   - Change the description in `.hero-description`

2. **About Section**:
   - Edit the about text in `.about-text`
   - Update statistics in `.about-stats`

3. **Skills**:
   - Modify skill tags in `.skill-tags`
   - Add or remove skill categories as needed

4. **Projects**:
   - Replace project placeholders with your actual projects
   - Update project titles, descriptions, and technologies
   - Add links to live demos and GitHub repositories

5. **Contact**:
   - Update email and phone number
   - Add your social media links
   - Configure form submission (see Form Handling below)

### Colors

Edit the CSS variables in `styles.css` to change the color scheme:

```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --secondary-color: #8b5cf6;
    /* ... more variables */
}
```

### Avatar/Profile Image

Replace the SVG avatar in the hero section with your own image:

```html
<div class="hero-avatar">
    <img src="your-image.jpg" alt="Your Name">
</div>
```

## Deployment to GitHub Pages

### Method 1: Using GitHub Web Interface

1. Create a new repository on GitHub (or use an existing one)
2. Upload all files to the repository
3. Go to **Settings** → **Pages**
4. Under **Source**, select the branch (usually `main` or `master`)
5. Select the folder (usually `/ (root)`)
6. Click **Save**
7. Your site will be available at `https://yourusername.github.io/repository-name/`

### Method 2: Using Git Command Line

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then follow steps 3-7 from Method 1.

## Form Handling

The contact form currently shows an alert on submission. To make it functional, you can:

1. **Use Formspree** (free tier available):
   - Sign up at [formspree.io](https://formspree.io)
   - Add your form endpoint to the form action
   - Update the form in `index.html`

2. **Use EmailJS**:
   - Sign up at [emailjs.com](https://www.emailjs.com)
   - Add their script and configure your email service

3. **Build a backend**:
   - Create an API endpoint to handle form submissions
   - Update the form submission handler in `script.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Feel free to use this portfolio template for your personal website!

## Credits

- Fonts: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- Icons: SVG icons (inline)

---

Made with ❤️ for developers who want to showcase their work beautifully.
