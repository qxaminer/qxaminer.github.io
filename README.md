# veroFields Portfolio

Modern portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- ⚡ Next.js 15 with App Router
- 🎨 Tailwind CSS for styling
- 🧩 shadcn/ui component library
- 🌗 Dark mode support
- 📱 Fully responsive design
- 🚀 Optimized for static export (GitHub Pages)
- ♿ Accessible components

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

This will create a static export in the `out/` directory.

### Deploy to GitHub Pages

```bash
npm run build
```

Then push the `out/` directory contents to the `gh-pages` branch, or configure GitHub Actions for automatic deployment.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── about/           # About page
│   ├── projects/        # Projects listing page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── navigation.tsx  # Navigation component
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/                # Utility functions
│   └── utils.ts
└── public/             # Static assets
```

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Icons:** Lucide React
- **Theme:** next-themes

## License

© 2025 veroFields. All rights reserved.
