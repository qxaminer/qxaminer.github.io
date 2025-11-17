import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="space-y-6 text-center">
            <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Contact
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
              For inquiries about artwork, commissions, technical collaboration, or research opportunities
            </p>
            <Separator className="mx-auto w-24" />
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Primary Contact */}
            <Card className="border-2">
              <CardHeader className="space-y-4 p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription className="text-lg">
                  The best way to reach out is via email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-8">
                <div className="text-center">
                  <Button asChild size="lg" className="gap-2">
                    <a href="mailto:overtgreen@gmail.com">
                      <Mail className="h-4 w-4" />
                      overtgreen@gmail.com
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Studio Work & Commissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center text-muted-foreground">
                  <p>
                    Interested in discussing artwork purchases, commissions, or studio visits? 
                    Please reach out with details about your project or inquiry.
                  </p>
                  <p className="text-sm">
                    Available for select commission work and gallery collaborations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Technical Collaboration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center text-muted-foreground">
                  <p>
                    Open to collaborations on AI ethics, creative technology, edge computing, 
                    and human-centered design projects.
                  </p>
                  <p className="text-sm">
                    Currently available for research partnerships and consulting opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Connect Section */}
            <div className="space-y-6 text-center">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Connect Elsewhere</h2>
                <div className="flex justify-center gap-4">
                  <Button asChild variant="outline" size="lg">
                    <a 
                      href="https://github.com/qxaminer" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <Github className="h-5 w-5" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a 
                      href="https://www.linkedin.com/in/patrickbarfield/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <Linkedin className="h-5 w-5" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Note */}
      <section className="border-t py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm text-muted-foreground">
              I aim to respond to all inquiries within 2-3 business days. 
              For urgent matters, please indicate this in your subject line.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

