# Modern Portfolio Website

A responsive and modern portfolio website for software developers and DevOps engineers, built with semantic HTML, CSS, and JavaScript.

## Features

### 🎨 Design & UI

- Modern, clean design with smooth animations
- Fully responsive (mobile, tablet, desktop)
- Dark/Light mode toggle with system preference detection
- Smooth scrolling navigation
- Professional color scheme with CSS custom properties

### 📱 Responsive Design

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly navigation
- Optimized images and assets

### 🚀 Performance

- Lazy loading for images
- Optimized CSS and JavaScript
- Minimal dependencies
- Fast loading times

### 🔍 Project Management

- Filter projects by category (Software Development / DevOps)
- Multi-select technology filter
- Sort projects by name or date
- Real-time filtering with smooth animations

### 📧 Contact Form

- Functional contact form with validation
- Success/error message handling
- Form submission simulation (ready for backend integration)

### ♿ Accessibility

- Semantic HTML structure
- ARIA labels and attributes
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## Sections

1. **Hero Section** - Introduction with profile image and social links
2. **About** - Personal introduction with statistics
3. **Technologies** - Skills organized by category (Frontend, Backend, DevOps)
4. **Projects** - Portfolio projects with filtering and sorting
5. **Contact** - Contact information and form

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, Grid, Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter)

## Project Structure

```
my_portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── assets/             # Images, CV, and other assets
│   ├── cv.pdf         # CV/Resume file
│   ├── profile.jpg    # Profile image
│   └── project*.jpg   # Project images
└── README.md          # This file
```

## Setup Instructions

1. **Clone or download** the project files
2. **Add your assets**:
   - Replace `assets/profile.jpg` with your profile image
   - Replace `assets/cv.pdf` with your CV/resume
   - Add project images (project1.jpg, project2.jpg, etc.)
3. **Customize content**:
   - Update personal information in `index.html`
   - Modify projects, skills, and contact information
   - Update social media links
4. **Deploy**:
   - Upload files to your web hosting service
   - Or use GitHub Pages, Netlify, Vercel, etc.

## Customization

### Personal Information

Edit the following in `index.html`:

- Name and title
- About section text
- Contact information
- Social media links
- Projects details

### Colors and Styling

Modify CSS custom properties in `styles.css`:

```css
:root {
  --primary-color: #3b82f6;
  --accent-color: #06b6d4;
  /* ... other colors */
}
```

### Projects

Add new projects by copying the project card structure in `index.html` and updating:

- `data-category` (software/devops)
- `data-tech` (comma-separated technologies)
- `data-name` (project name for sorting)
- `data-date` (YYYY-MM format for sorting)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Features

- **Lazy Loading** - Images load only when needed
- **Smooth Animations** - CSS transitions and transforms
- **Optimized CSS** - Efficient selectors and minimal reflows
- **Progressive Enhancement** - Works without JavaScript

## Accessibility Features

- **Semantic HTML** - Proper heading hierarchy and landmarks
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Visible focus indicators
- **Color Contrast** - WCAG compliant color ratios

## SEO Features

- **Meta Tags** - Proper title, description, and viewport
- **Semantic Structure** - Clear content hierarchy
- **Fast Loading** - Optimized performance
- **Mobile Friendly** - Responsive design

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or suggestions, please reach out through the contact form on the website or via:

- Email: saul.tzakum@email.com
- GitHub: [github.com/saul-tzakum](https://github.com/saul-tzakum)
- LinkedIn: [linkedin.com/in/saul-tzakum](https://linkedin.com/in/saul-tzakum)

---

Built with ❤️ by Saul Tzakum
