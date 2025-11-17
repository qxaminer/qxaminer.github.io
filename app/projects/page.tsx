import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const projects = [
  {
    title: "Colorista",
    subtitle: "AI-Powered Color Matching for Artists",
    description: "Built to solve the creator's own analysis paralysis with color selection—demonstrating tools born from real creative need. Analyzes artwork and recommends specific colored pencils using the Delta-E 2000 algorithm for perceptually accurate color matching. Deployed to production in 2 weeks.",
    tags: ["Next.js 15", "TypeScript", "p5.js", "Color Science", "Delta-E 2000"],
    liveUrl: "https://colorista-mvp.vercel.app",
    category: "Creative Tools",
    slug: "colorista",
  },
  {
    title: "Itenerator",
    subtitle: "Cognitive Load Optimization",
    description: "Interactive automation tool that removes decision fatigue from complex multi-step workflows through intelligent task orchestration. By visualizing process dependencies and handling routine decisions, it frees users to concentrate on strategic thinking and creative problem-solving.",
    tags: ["PWA", "Mobile-First", "JavaScript", "UX Design"],
    liveUrl: "https://qxaminer.github.io/itenerator-app/",
    githubUrl: "https://github.com/qxaminer/itenerator-app",
    category: "Creative Tools",
    slug: "itenerator",
  },
  {
    title: "qScribe",
    subtitle: "Adaptive Learning Through Edge AI",
    description: "Explores how local LLMs can personalize education by mapping individual desires, behaviors, and passions to learning outcomes. Deployed on Raspberry Pi 5, the system uses multi-modal interaction to adapt to each learner's unique context—without cloud connectivity or data extraction.",
    tags: ["Raspberry Pi 5", "Llama 3.2 Vision", "Edge ML", "Python", "AI Ethics"],
    category: "Research",
    slug: "qscribe",
  },
  {
    title: "somekindablue_gan",
    subtitle: "Album Cover Generator",
    description: "Deep Convolutional GAN for generating album cover artwork, trained on 20,000 diverse album covers. Implements advanced DCGAN stability techniques to produce colorful, diverse 128×128 RGB designs.",
    tags: ["Python", "PyTorch", "DCGAN", "Computer Vision"],
    githubUrl: "https://github.com/qxaminer/somekindablue_gan",
    category: "Creative Tools",
    slug: "somekindablue-gan",
  },
  {
    title: "Giant Shoulders",
    subtitle: "Strategic Open Source Discovery",
    description: "AI-powered discovery system that analyzes the GitHub ecosystem to find open source projects aligned with career goals and learning objectives. Transforms repository browsing into strategic opportunity analysis.",
    tags: ["LangChain", "Streamlit", "GitHub API", "Python"],
    liveUrl: "https://qxaminer-giant-shoulders.streamlit.app",
    githubUrl: "https://github.com/qxaminer/GiantShoulders",
    category: "Research",
    slug: "giant-shoulders",
  },
]

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="space-y-6 text-center">
            <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Technical Projects
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
              Deployed applications, research prototypes, and creative tools exploring AI, creativity, 
              and human-computer interaction.
            </p>
            <Separator className="mx-auto w-24" />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <Card key={project.slug} className="group flex flex-col transition-all hover:shadow-lg">
                  <CardHeader className="space-y-3 p-8">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-2xl font-bold transition-colors group-hover:text-primary">
                          <Link
                            href={project.liveUrl || project.githubUrl || `/projects/${project.slug}`}
                            target={project.liveUrl || project.githubUrl ? "_blank" : undefined}
                            rel={project.liveUrl || project.githubUrl ? "noopener noreferrer" : undefined}
                          >
                            {project.title}
                          </Link>
                        </CardTitle>
                        <Badge variant="outline" className="shrink-0">{project.category}</Badge>
                      </div>
                      {project.subtitle && (
                        <p className="text-sm font-medium text-muted-foreground">
                          {project.subtitle}
                        </p>
                      )}
                    </div>
                    <CardDescription className="text-base leading-relaxed pt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 px-8">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3 p-8 pt-4">
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
          </div>
      </section>
    </div>
  )
}
