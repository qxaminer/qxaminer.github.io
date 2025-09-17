# veroFields Portfolio

A modern, responsive portfolio website showcasing creative coding projects, full-stack development work, and interactive design.

## 🚀 Features

- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Responsive**: Mobile-first approach with full responsive design
- **Fast Loading**: Optimized performance with lazy loading and efficient code
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Comprehensive meta tags and semantic HTML structure
- **Interactive**: Smooth scrolling, hover effects, and dynamic content
- **Dark Mode**: Automatic theme switching based on user preference
- **Contact Form**: Ready for integration with form services (Formspree, Netlify Forms, etc.)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Modern CSS with custom properties, Grid, and Flexbox
- **JavaScript**: Vanilla JS for interactions and animations
- **Fonts**: Inter and JetBrains Mono from Google Fonts
- **Icons**: Unicode emojis for universal compatibility

## 📁 Project Structure

```
portfolio/
├── assets/
│   ├── css/
│   │   └── main.css          # Main stylesheet with CSS custom properties
│   ├── js/
│   │   └── main.js           # Interactive functionality and animations
│   └── images/               # Project thumbnails and assets
├── index.html                # Main HTML file
├── robots.txt               # SEO robots file
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🎨 Customization

### Colors
The color scheme is defined using CSS custom properties in `:root`:
- Primary: `#667eea`
- Secondary: `#764ba2`
- Accent: `#f093fb`

### Typography
- Primary font: Inter (Google Fonts)
- Monospace: JetBrains Mono (Google Fonts)

### Sections
1. **Hero**: Introduction with animated elements
2. **About**: Personal information and statistics
3. **Projects**: Featured work with hover effects
4. **Skills**: Technical skills with animated progress bars
5. **Contact**: Contact form and social links

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Customize the content**
   - Update personal information in `index.html`
   - Replace project descriptions and links
   - Add your own project images to `assets/images/`
   - Update social media links and contact information

3. **Deploy**
   - Push to GitHub and enable GitHub Pages
   - Or deploy to Netlify, Vercel, or any static hosting service

## 📝 Content Customization

### Projects
Update the project cards in the `#projects` section:
- Replace image sources with your project screenshots
- Update titles, descriptions, and technologies used
- Add links to live demos and GitHub repositories

### Skills
Modify skill categories and progress bars in the `#skills` section:
- Adjust `data-width` attributes for skill levels
- Add or remove skill categories as needed

### Contact Form
The contact form is ready for integration with:
- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [EmailJS](https://www.emailjs.com/)

Simply update the form action or add the necessary JavaScript integration.

## 🔧 Advanced Features

### Theme Toggle
The site includes an automatic dark/light theme toggle that:
- Respects user's system preference
- Allows manual switching
- Saves preference in localStorage

### Performance Optimizations
- Throttled scroll events for better performance
- Intersection Observer for efficient scroll animations
- Lazy loading for images (when implemented)
- Minimal JavaScript footprint

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus management for mobile menu
- Respects `prefers-reduced-motion`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from Unicode emoji set
- Fonts from Google Fonts
- Color palette inspired by modern design trends

---

**Built with ❤️ by veroFields**