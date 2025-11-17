import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Mister Fields - Artist & Creative Technologist",
  description: "Practicing artist and creative technologist whose work bridges studio practice with emerging technology. Building tools that augment human agency while keeping human creativity central to technological innovation.",
  keywords: "artist, creative technologist, AI ethics, studio practice, NLP, human-centered technology, Mister Fields",
  authors: [{ name: "Mister Fields" }],
  openGraph: {
    title: "Mister Fields - Artist & Creative Technologist",
    description: "Practicing artist and creative technologist bridging studio practice with emerging technology.",
    type: "website",
    url: "https://qxaminer.github.io",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2025 Mister Fields. All rights reserved.
              </p>
              <p className="text-center text-xs text-muted-foreground md:text-right">
                Built with Next.js and shadcn/ui
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
