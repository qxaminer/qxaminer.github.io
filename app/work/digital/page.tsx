import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { WindwardSketch } from "@/components/windward-sketch"

const digitalSketches = [
  {
    id: 1,
    title: "pB_windwardMod",
    year: "2024",
    status: "Complete",
    description: "Kaleidoscopic flow field with hourglass geometry",
    renderSketch: true,
  },
  {
    id: 2,
    title: "faveTorus",
    year: "2025",
    status: "Complete",
    description: "3D torus grid with flashing segments and orbiting shapes",
    image: "/artwork/faveTorus.jpeg",
    href: "/work/digital/fave-torus",
  },
  {
    id: 3,
    title: "Sketch 3",
    year: "TBD",
    status: "Pending",
    description: "To be converted to p5.js"
  },
  {
    id: 4,
    title: "Sketch 4",
    year: "TBD",
    status: "Pending",
    description: "To be converted to p5.js"
  },
  {
    id: 5,
    title: "Sketch 5",
    year: "TBD",
    status: "Pending",
    description: "To be converted to p5.js"
  },
  {
    id: 6,
    title: "Sketch 6",
    year: "TBD",
    status: "Pending",
    description: "To be converted to p5.js"
  },
  {
    id: 7,
    title: "Sketch 7",
    year: "TBD",
    status: "Pending",
    description: "To be converted to p5.js"
  },
  {
    id: 8,
    title: "Sketch 8",
    year: "TBD",
    status: "Pending",
    description: "To be converted to p5.js"
  },
  {
    id: 9,
    title: "Sketch 9",
    year: "TBD",
    status: "Pending",
    description: "To be converted to p5.js"
  },
  {
    id: 10,
    title: "Sketch 10",
    year: "TBD",
    status: "Pending",
    description: "To be converted to p5.js"
  },
  {
    id: 11,
    title: "Sketch 11",
    year: "TBD",
    status: "Pending",
    description: "To be converted to p5.js"
  },
]

export default function DigitalGalleryPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="space-y-3 sm:space-y-4">
            <Link
              href="/work"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              ← Back to Studio Work
            </Link>
            <div className="space-y-2 sm:space-y-3">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Digital Series
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                p5.js and Processing sketches
              </p>
              <Separator className="w-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {digitalSketches.map((sketch) => (
              <Link
                key={sketch.id}
                href={sketch.href || "#"}
                className="no-underline"
              >
                <Card className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full">
                  {/* Sketch or Image */}
                  {sketch.id === 1 ? (
                    <WindwardSketch />
                  ) : sketch.image ? (
                    <div className="aspect-square overflow-hidden bg-black relative">
                      <Image
                        src={sketch.image}
                        alt={sketch.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  ) : (
                  <div className="aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">
                        Pending Conversion
                      </p>
                      <p className="text-xs text-muted-foreground">{sketch.description}</p>
                    </div>
                  </div>
                )}

                <CardHeader>
                  <div className="p-4 sm:p-6 space-y-2">
                    <CardTitle className="font-serif text-base sm:text-lg">
                      {sketch.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {sketch.year}
                      </Badge>
                      <Badge 
                        variant={sketch.status === "Complete" ? "default" : "outline"} 
                        className="text-xs"
                      >
                        {sketch.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="border-t py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Converting generative art and interactive sketches to p5.js for web display.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
