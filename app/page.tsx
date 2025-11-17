import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { P5Sketch } from "@/components/p5-sketch"

const projects = [
  {
    title: "Colorista",
    subtitle: "AI-Powered Color Matching for Artists",
    description: "Web application that analyzes artwork and recommends specific colored pencils using the Delta-E 2000 algorithm for perceptually accurate color matching. Built in 2 weeks and deployed to production.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "p5.js", "Vercel"],
    liveUrl: "https://colorista-mvp.vercel.app",
    slug: "colorista",
    featured: true,
  },
  {
    title: "Itenerator",
    subtitle: "Cognitive Load Optimization",
    description: "Interactive automation tool that removes decision fatigue from complex multi-step workflows through intelligent task orchestration and process visualization.",
    tags: ["PWA", "Mobile-First", "JavaScript", "UX Design"],
    liveUrl: "https://qxaminer.github.io/itenerator-app/",
    githubUrl: "https://github.com/qxaminer/itenerator-app",
    slug: "itenerator",
    featured: true,
  },
  {
    title: "qScribe",
    subtitle: "Adaptive Learning Through Edge AI",
    description: "qScribe explores how local LLMs can personalize education by mapping individual desires, behaviors, and passions to learning outcomes. Deployed on Raspberry Pi 5, the system uses multi-modal interaction to adapt to each learner's unique context—without cloud connectivity or data extraction. Investigates AI ethics in practice: respecting learner agency, preserving privacy, and ensuring human value alignment in educational technology.",
    tags: ["Raspberry Pi 5", "Llama 3.2 Vision", "Edge ML", "Python", "Multi-modal AI"],
    slug: "qscribe",
    featured: true,
    status: "Prototype / Research Phase",
  },
  {
    title: "Giant Shoulders",
    subtitle: "Strategic Open Source Discovery",
    description: "AI-powered discovery system that analyzes the GitHub ecosystem to find open source projects aligned with career goals and learning objectives.",
    tags: ["LangChain", "Streamlit", "GitHub API", "Python"],
    liveUrl: "https://qxaminer-giant-shoulders.streamlit.app",
    githubUrl: "https://github.com/qxaminer/GiantShoulders",
    slug: "giant-shoulders",
    featured: false,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="relative mx-auto max-w-7xl px-6 py-32 md:px-8 md:py-40 lg:px-12">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
              {/* Hero Content */}
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <h1 className="font-serif text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                    Mister Fields
                  </h1>
                  <p className="text-2xl text-muted-foreground sm:text-3xl">
                    Artist & Creative Technologist
                  </p>
                </div>

                <Separator className="mx-auto w-24 lg:mx-0" />

                <p className="mx-auto max-w-2xl text-xl leading-relaxed text-foreground lg:mx-0">
                  Mister Fields is a practicing artist and creative technologist whose work bridges studio practice with emerging technology. As a responsible innovator, they build tools that augment human agency while developing a philosophy of practice that keeps human creativity central to technological innovation.
                </p>

                {/* Dual Navigation */}
                <div className="flex flex-col items-center gap-4 pt-8 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/work">View Studio Work</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href="/projects">View Technical Projects</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                      Download CV
                    </a>
                  </Button>
                </div>
              </div>

              {/* P5.js Sketch */}
              <div className="flex w-full max-w-[500px] flex-shrink-0 items-center justify-center lg:w-auto">
                <P5Sketch />
              </div>
            </div>
          </div>
      </section>

      {/* Quick Links Section */}
      <section className="border-b py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-8 md:grid-cols-3">
              <Card className="group transition-all hover:shadow-lg">
                <CardHeader className="space-y-2 text-center">
                  <CardTitle className="text-xl">Studio Practice</CardTitle>
                  <CardDescription>
                    Paintings and gallery works exploring perception and technology
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button asChild variant="link" className="h-auto p-0">
                    <Link href="/work">
                      View Gallery →
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group transition-all hover:shadow-lg">
                <CardHeader className="space-y-2 text-center">
                  <CardTitle className="text-xl">Technical Work</CardTitle>
                  <CardDescription>
                    Deployed applications, research prototypes, and creative tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button asChild variant="link" className="h-auto p-0">
                    <Link href="/projects">
                      View Projects →
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group transition-all hover:shadow-lg">
                <CardHeader className="space-y-2 text-center">
                  <CardTitle className="text-xl">About</CardTitle>
                  <CardDescription>
                    Philosophy of practice, background in NLP research, and current work at SMU
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button asChild variant="link" className="h-auto p-0">
                    <Link href="/about">
                      Learn More →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="space-y-12">
            {/* Section Header */}
            <div className="space-y-4 text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Selected Work
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Technical projects bridging AI, creativity, and human agency
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((p) => p.featured)
                .map((project) => (
                  <Card
                    key={project.slug}
                    className="group flex flex-col transition-all hover:shadow-lg"
                  >
                    <CardHeader className="space-y-3 p-6">
                      <div className="space-y-1.5">
                        <CardTitle className="text-2xl font-bold transition-colors group-hover:text-primary">
                          <Link
                            href={project.liveUrl || project.githubUrl || `/projects/${project.slug}`}
                            target={project.liveUrl || project.githubUrl ? "_blank" : undefined}
                            rel={
                              project.liveUrl || project.githubUrl ? "noopener noreferrer" : undefined
                            }
                          >
                            {project.title}
                          </Link>
                        </CardTitle>
                        <p className="text-sm font-medium text-muted-foreground">
                          {project.subtitle}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4 px-6">
                      <CardDescription className="text-base leading-relaxed">
                        {project.description}
                      </CardDescription>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-2.5 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="flex gap-3 p-6 pt-0">
                      {project.liveUrl && (
                        <Button asChild size="sm" className="flex-1">
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button asChild variant="outline" size="sm" className={project.liveUrl ? "" : "flex-1"}>
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>

            {/* View All Projects CTA */}
            <div className="flex justify-center pt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
