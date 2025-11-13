import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const projects = [
  {
    title: "Colorista",
    description: "Web application that analyzes artwork and recommends specific colored pencils using the Delta-E 2000 algorithm for perceptually accurate color matching. Built in 2 weeks and deployed to production, this tool helps artists make informed decisions about their color palette choices with scientific precision.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "p5.js", "Color Science"],
    liveUrl: "https://colorista-mvp.vercel.app",
    category: "AI Tools",
    slug: "colorista",
  },
  {
    title: "Itenerator",
    description: "Interactive automation tool that removes decision fatigue from complex multi-step workflows through intelligent task orchestration. By visualizing process dependencies and handling routine decisions, it frees users to concentrate on strategic thinking and creative problem-solving.",
    tags: ["Progressive Web App", "Mobile-First Design", "Vanilla JavaScript", "UX Design"],
    liveUrl: "https://qxaminer.github.io/itenerator-app/",
    githubUrl: "https://github.com/qxaminer/itenerator-app",
    category: "Interactive",
    slug: "itenerator",
  },
  {
    title: "somekindablue_gan",
    description: "Deep Convolutional Generative Adversarial Network for generating album cover artwork, trained on 20,000 diverse album covers from multiple genres. Implements advanced DCGAN stability techniques including label smoothing, noise injection, and separate learning rates to produce diverse, colorful 128×128 RGB album cover designs.",
    tags: ["Python", "PyTorch", "DCGAN", "Generative AI", "Computer Vision"],
    githubUrl: "https://github.com/qxaminer/somekindablue_gan",
    category: "AI Tools",
    slug: "somekindablue-gan",
  },
  {
    title: "Giant Shoulders",
    description: "AI-powered strategic discovery system that analyzes the GitHub ecosystem to find open source projects perfectly aligned with career trajectory, learning goals, and networking objectives. Transforms random repository browsing into strategic career advancement through intelligent project matching and contribution opportunity analysis.",
    tags: ["LangChain", "AI Strategy", "GitHub API", "Career Tools", "Python"],
    liveUrl: "https://qxaminer-giant-shoulders.streamlit.app",
    githubUrl: "https://github.com/qxaminer/GiantShoulders",
    category: "AI Tools",
    slug: "giant-shoulders",
  },
]

export default function ProjectsPage() {
  return (
    <div className="container py-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            All Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A collection of my work exploring the intersection of AI, creativity, and human-computer interaction.
          </p>
          <Separator />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.slug} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-2xl hover:text-primary transition-colors">
                      <Link
                        href={project.liveUrl || project.githubUrl || `/projects/${project.slug}`}
                        target={project.liveUrl || project.githubUrl ? "_blank" : undefined}
                        rel={project.liveUrl || project.githubUrl ? "noopener noreferrer" : undefined}
                      >
                        {project.title}
                      </Link>
                    </CardTitle>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed pt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {project.liveUrl && (
                  <Button asChild variant="default" size="sm">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant="outline" size="sm">
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
    </div>
  )
}
