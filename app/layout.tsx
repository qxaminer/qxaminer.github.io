import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vero Fields - Creative Technologist & Developer",
  description: "Creative technologist specializing in explainable AI and adaptive learning systems that make complex processes transparent and intuitive.",
  keywords: "creative coding, web development, AI, portfolio, Vero Fields, full-stack developer",
  authors: [{ name: "Vero Fields" }],
  openGraph: {
    title: "Vero Fields - Creative Technologist & Developer",
    description: "Creative technologist specializing in explainable AI and adaptive learning systems.",
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
      <body className={inter.className}>
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
                © 2025 Vero Fields. Built with Next.js and shadcn/ui.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
