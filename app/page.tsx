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
        <div className="container relative">
          <div className="mx-auto max-w-7xl py-20 md:py-28 lg:py-32">
            <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:text-left">
              {/* Hero Content */}
              <div className="flex-1 space-y-6">
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                      Vero Fields
                    </h1>
                    <p className="text-xl text-muted-foreground sm:text-2xl md:text-3xl">
                      Creative Technologist
                    </p>
                  </div>

                  {/* Profile Photo - Centered between name and p5 sketch */}
                  <Avatar className="h-32 w-32 border-4 border-border md:h-40 md:w-40">
                    <AvatarImage src="/avatar.jpg" alt="Vero Fields" />
                    <AvatarFallback className="text-3xl font-bold">VF</AvatarFallback>
                  </Avatar>
                </div>

                <Separator className="mx-auto w-24 md:mx-0" />

                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:mx-0 md:text-xl">
                  Building connection infrastructure—tools that help humans collaborate and flourish.
                  Where others see AI as automation, I see translation: between languages, skill levels,
                  and cultural values.
                </p>

                <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="#projects">
                      View My Work
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link href="/about">About Me</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <a href="mailto:overtgreen@gmail.com">
                      <Mail className="h-4 w-4" />
                      Contact
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right Column: p5.js Sketch */}
              <div className="flex flex-shrink-0 items-center md:items-start">
                <div className="w-full max-w-[600px]">
                  <P5Sketch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="border-b py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <Card className="border-2">
              <CardHeader className="space-y-4 p-8">
                <div>
                  <CardTitle className="text-3xl font-bold tracking-tight">
                    About Me
                  </CardTitle>
                  <CardDescription className="mt-2 text-lg">
                    Responsible Innovator | Masters in Creative Technology @ SMU
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-8">
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-foreground">
                    Mister Fields is a responsible innovator building connection infrastructure—tools that help humans collaborate and flourish. Recent work includes Colorista (deployed color-matching for artists), Itenerator (AI-powered travel assistant), and qScribe (adaptive learning through edge AI).
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Where others see AI as automation, they see translation: between languages, skill levels, and cultural values. Currently pursuing a Masters in Creative Technology at SMU, their work centers on implementing AI ethics in design—respecting agency, preserving cultural uniqueness, and ensuring human value alignment through constitutional principles.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Recent research explores multi-modal edge LLMs that personalize learning by mapping human desires, behaviors, and passions to outcomes—adapting to individual needs without extracting data. They practice rapid iteration and direct communication, shipping working prototypes in weeks that embody their values: tools that amplify human agency, not automate it away.
                  </p>
                </div>

                <div className="flex justify-center pt-4 md:justify-start">
                  <Button asChild variant="outline">
                    <Link href="/about">
                      Learn More About Me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-6xl space-y-12">
            {/* Section Header */}
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Featured Projects
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Exploring the intersection of AI, creativity, and human-computer interaction
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
            <div className="flex justify-center pt-8">
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

      {/* Artwork Section */}
      <section id="artwork" className="border-b py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-6xl space-y-12">
            {/* Section Header */}
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Artwork
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Exploring multiple mediums and creative expressions
              </p>
            </div>

            {/* Artwork Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Digital */}
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                <CardHeader className="space-y-2 p-4">
                  <CardTitle className="text-lg">Digital</CardTitle>
                  <CardDescription className="text-sm">
                    Digital art and creative coding projects
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Paper */}
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-amber-500/10 to-orange-500/10" />
                <CardHeader className="space-y-2 p-4">
                  <CardTitle className="text-lg">Paper</CardTitle>
                  <CardDescription className="text-sm">
                    Drawings, sketches, and paper-based works
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Paint */}
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-red-500/10 to-pink-500/10" />
                <CardHeader className="space-y-2 p-4">
                  <CardTitle className="text-lg">Paint</CardTitle>
                  <CardDescription className="text-sm">
                    Paintings and mixed media artworks
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Writings */}
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-slate-500/10 to-zinc-500/10" />
                <CardHeader className="space-y-2 p-4">
                  <CardTitle className="text-lg">Writings</CardTitle>
                  <CardDescription className="text-sm">
                    Essays, poetry, and creative writing
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Photography */}
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-cyan-500/10 to-teal-500/10" />
                <CardHeader className="space-y-2 p-4">
                  <CardTitle className="text-lg">Photography</CardTitle>
                  <CardDescription className="text-sm">
                    Photographic works and visual storytelling
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Photogrammetry */}
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-emerald-500/10 to-green-500/10" />
                <CardHeader className="space-y-2 p-4">
                  <CardTitle className="text-lg">Photogrammetry</CardTitle>
                  <CardDescription className="text-sm">
                    3D scanning and spatial capture projects
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Aural */}
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-violet-500/10 to-indigo-500/10" />
                <CardHeader className="space-y-2 p-4">
                  <CardTitle className="text-lg">Aural</CardTitle>
                  <CardDescription className="text-sm">
                    Sound art, music, and audio experiences
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Multimedia */}
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-rose-500/10 to-fuchsia-500/10" />
                <CardHeader className="space-y-2 p-4">
                  <CardTitle className="text-lg">Multimedia</CardTitle>
                  <CardDescription className="text-sm">
                    Cross-medium installations and experiments
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* GANs Section */}
      <section className="border-b py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-6xl space-y-12">
            {/* Section Header */}
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                GANs
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Generative Adversarial Networks for creative exploration
              </p>
            </div>

            {/* GAN Projects Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* somekindablue_gan */}
              <Card className="group flex flex-col transition-all hover:shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                <CardHeader className="space-y-3 p-6">
                  <div className="space-y-1.5">
                    <CardTitle className="text-2xl font-bold transition-colors group-hover:text-primary">
                      <a
                        href="https://github.com/qxaminer/somekindablue_gan"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        somekindablue_gan
                      </a>
                    </CardTitle>
                    <p className="text-sm font-medium text-muted-foreground">
                      Album Cover Generator
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4 px-6">
                  <CardDescription className="text-base leading-relaxed">
                    Deep Convolutional GAN for generating album cover artwork, trained on 20,000
                    diverse album covers with advanced DCGAN stability techniques including label
                    smoothing, noise injection, and separate learning rates to produce diverse,
                    colorful 128×128 RGB album cover designs.
                  </CardDescription>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="px-2.5 py-0.5">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="px-2.5 py-0.5">
                      PyTorch
                    </Badge>
                    <Badge variant="secondary" className="px-2.5 py-0.5">
                      DCGAN
                    </Badge>
                    <Badge variant="secondary" className="px-2.5 py-0.5">
                      Computer Vision
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-3 p-6 pt-0">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <a
                      href="https://github.com/qxaminer/somekindablue_gan"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
