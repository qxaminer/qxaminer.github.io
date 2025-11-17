# Mister Fields - Portfolio

Dual-identity portfolio for a practicing artist and creative technologist. This site presents both studio practice and technical work as equal and integrated aspects of a unified creative practice.

## Design Philosophy

- **Gallery Aesthetic:** Clean, minimal design with generous whitespace
- **Professional Typography:** Playfair Display (serif) for headings, Inter for body text
- **Dual Identity:** Equal emphasis on artistic and technical work
- **Accessibility First:** Semantic HTML, keyboard navigation, proper contrast ratios
- **Monochromatic Palette:** Black, white, and grays for professional gallery feel

## Features

- ⚡ Next.js 15 with App Router
- 🎨 Tailwind CSS for styling
- 🧩 shadcn/ui component library
- 🌗 Dark mode support with refined monochromatic palette
- 📱 Fully responsive design
- 🚀 Optimized for static export (GitHub Pages)
- ♿ Accessible components
- 🖼️ Gallery-quality aesthetics

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

This will create a static export in the `out/` directory optimized for GitHub Pages.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will build and deploy to the `gh-pages` branch.

## Project Structure

```
├── app/
│   ├── about/           # About page with philosophy of practice
│   ├── contact/         # Contact page
│   ├── projects/        # Technical projects
│   ├── work/            # Studio work / gallery
│   ├── layout.tsx       # Root layout with fonts
│   ├── page.tsx         # Home page with dual navigation
│   └── globals.css      # Global styles and design tokens
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── navigation.tsx   # Main navigation
│   ├── p5-sketch.tsx    # Creative coding sketch
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/
│   └── utils.ts         # Utility functions
└── public/
    ├── avatar.jpg       # Profile photo
    └── cv.pdf           # CV/Resume (add your own)
```

## Content Areas

### Home (`/`)
- Hero section with name, title, and bio
- Dual navigation buttons (Studio Work / Technical Projects)
- Quick links to main sections

### Studio Work (`/work`)
- Featured piece: Dora Maar (2017)
- Additional works across multiple media
- Gallery-style layout with placeholders for professional photography

### Technical Projects (`/projects`)
- Colorista (color-matching tool)
- qScribe (adaptive learning through edge AI)
- Itenerator (cognitive load optimization)
- somekindablue_gan (album cover generator)
- Giant Shoulders (open source discovery)

### About (`/about`)
- Full bio and background
- Philosophy of practice
- Education and focus areas
- Call-to-action for collaboration

### Contact (`/contact`)
- Email contact information
- Links to GitHub and LinkedIn
- Inquiry categories (studio work, technical collaboration)

## Customization

### Adding Your CV

Place your CV as `public/cv.pdf`. The site links to this from multiple locations.

### Adding Artwork Images

Replace placeholder images in `app/work/page.tsx` with professional photography of your work. Maintain aspect ratios and use high-quality images.

### Updating Colors

Edit `app/globals.css` to adjust the monochromatic palette if desired. The current palette uses pure black/white for a gallery aesthetic.

### Typography

Fonts are configured in `app/layout.tsx`:
- **Serif (Playfair Display):** Used for all headings and names
- **Sans-serif (Inter):** Used for body text and UI elements

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Icons:** Lucide React
- **Theme:** next-themes
- **Fonts:** Playfair Display, Inter

## License

© 2025 Mister Fields. All rights reserved.
