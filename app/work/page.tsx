import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const artworks = [
  {
    title: "Dora Maar",
    year: "2017",
    medium: "Oil on canvas, custom LED lighting, shadow box installation",
    status: "Private collection",
    description: "Interactive painting exploring perception and autonomy through programmable color temperature. Early exploration of distributed value systems.",
    dimensions: null,
    featured: true,
  },
  {
    title: "Untitled (Digital Series)",
    year: "2023-2024",
    medium: "Digital",
    status: "Available",
    description: "Digital art and creative coding explorations using p5.js and Processing.",
    dimensions: null,
    featured: false,
  },
  {
    title: "Paper Works",
    year: "2022-2024",
    medium: "Mixed media on paper",
    status: "Available",
    description: "Drawings, sketches, and paper-based explorations of form and color.",
    dimensions: null,
    featured: false,
  },
  {
    title: "Photogrammetry Studies",
    year: "2023",
    medium: "3D scanning, spatial capture",
    status: "Research",
    description: "Investigations into spatial representation and digital preservation.",
    dimensions: null,
    featured: false,
  },
]

export default function WorkPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="space-y-6 text-center">
            <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Studio Work
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
              Paintings and multimedia works exploring the intersection of perception, 
              technology, and human experience.
            </p>
            <Separator className="mx-auto w-24" />
          </div>
        </div>
      </section>

      {/* Featured Work - Dora Maar */}
      <section className="border-b py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                Featured
              </h2>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
              {/* Image Placeholder */}
              <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10">
                <div className="flex h-full items-center justify-center">
                  <span className="text-lg text-muted-foreground">Image forthcoming</span>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-4xl font-bold">Dora Maar</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">2017</Badge>
                    <Badge variant="outline">Private Collection</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Medium
                    </p>
                    <p className="text-lg">
                      Oil on canvas, custom LED lighting, shadow box installation
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      About
                    </p>
                    <p className="text-lg leading-relaxed">
                      Interactive painting exploring perception and autonomy through programmable color 
                      temperature. Early exploration of distributed value systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Works */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                Additional Works
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Selected pieces across multiple media
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {artworks
                .filter((work) => !work.featured)
                .map((work) => (
                  <Card 
                    key={work.title} 
                    className="group overflow-hidden transition-all hover:shadow-lg"
                  >
                    {/* Image Placeholder */}
                    <div className="aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                      <div className="flex h-full items-center justify-center p-6">
                        <span className="text-center text-sm text-muted-foreground">
                          Image forthcoming
                        </span>
                      </div>
                    </div>

                    <CardHeader className="space-y-3 p-8">
                      <div className="space-y-2">
                        <CardTitle className="font-serif text-2xl">
                          {work.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {work.year}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {work.status}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        <span className="text-sm font-medium text-foreground">{work.medium}</span>
                        <br />
                        <br />
                        {work.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Note about images */}
      <section className="border-t py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Professional photography of works in progress. Please{" "}
              <a 
                href="/contact" 
                className="underline underline-offset-4 hover:text-foreground"
              >
                contact
              </a>
              {" "}for inquiries about artwork, commissions, or studio visits.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

