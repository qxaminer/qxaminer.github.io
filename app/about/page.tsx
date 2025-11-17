import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="space-y-6 text-center">
            <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              About
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
              Bridging studio practice with emerging technology
            </p>
            <Separator className="mx-auto w-24" />
          </div>
        </div>
      </section>

      {/* Main Bio */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p className="text-xl leading-relaxed">
                Mister Fields is a practicing artist and creative technologist whose work bridges studio practice with emerging technology. As a responsible innovator, they build tools that augment human agency while developing a philosophy of practice that keeps human creativity central to technological innovation.
              </p>

              <Separator className="my-8" />

              <h2 className="font-serif text-3xl font-bold">Background</h2>
              
              <p className="text-lg leading-relaxed text-foreground">
                With a background in NLP research and currently pursuing a Masters in Creative Technology at SMU, Mister Fields operates at the intersection of artistic practice and technical capability. Their work encompasses traditional studio practice—paintings and gallery works—alongside deployed software applications and research prototypes.
              </p>

              <p className="text-lg leading-relaxed text-foreground">
                Recent technical work includes Colorista (color-matching tool for artists), qScribe (adaptive learning through edge AI), and Itenerator (cognitive load optimization). These projects demonstrate a consistent approach: building tools that emerge from real creative needs and amplify human agency rather than automating it away.
              </p>

              <Separator className="my-8" />

              <h2 className="font-serif text-3xl font-bold">Philosophy of Practice</h2>

              <p className="text-lg leading-relaxed text-foreground">
                Where others see AI as automation, Mister Fields sees translation: between languages, skill levels, and cultural values. Their work centers on implementing AI ethics in design—respecting agency, preserving cultural uniqueness, and ensuring human value alignment through constitutional principles.
              </p>

              <p className="text-lg leading-relaxed text-foreground">
                Current research explores multi-modal edge LLMs that personalize learning by mapping human desires, behaviors, and passions to outcomes—adapting to individual needs without extracting data. This approach reflects a broader commitment to building connection infrastructure: tools that help humans collaborate and flourish.
              </p>

              <p className="text-lg leading-relaxed text-foreground">
                The practice emphasizes rapid iteration and direct communication, shipping working prototypes that embody core values. Whether through studio work or technical projects, the goal remains constant: keeping human creativity central to technological innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="border-t py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">Masters in Creative Technology</p>
                    <p className="text-sm text-muted-foreground">SMU (in progress)</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-semibold">NLP Research</p>
                    <p className="text-sm text-muted-foreground">Background in Natural Language Processing</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Practice Areas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">Studio Practice</p>
                    <p className="text-sm text-muted-foreground">Painting, multimedia</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-semibold">Creative Technology</p>
                    <p className="text-sm text-muted-foreground">AI tools, edge computing, HCI</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Current Focus</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">AI Ethics in Design</p>
                    <p className="text-sm text-muted-foreground">Human-centered technology</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-semibold">Adaptive Learning Systems</p>
                    <p className="text-sm text-muted-foreground">Edge AI, privacy-preserving ML</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              Available for Collaboration
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Open to discussions about artwork commissions, technical collaboration, 
              and research opportunities.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
