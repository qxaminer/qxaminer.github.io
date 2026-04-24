import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const projects = [
  {
    title: "CamelBeast",
    subtitle: "Persian Corpus Analysis Pipeline",
    description: "Rust-core corpus analysis pipeline powering nik³. Seven source ingesters, SQLite corpus, cosine similarity scoring, political register classification, and NER rail. Processes 21,857 articles from 7 sources. Available for review under NDA.",
    tags: ["Rust", "SQLite", "NLP", "ParsBERT", "NER"],
    category: "Research",
    slug: "camelbeast",
    accentColor: "#c9a84c",
  },
  {
    title: "nik³",
    subtitle: "Language Acquisition Engine",
    description: "Persian language acquisition, built for serious learners. A living corpus of 16,000+ articles feeding contextual word acquisition — vocabulary learned in the wild, not in a vacuum. For anyone who wants to read the world in Farsi, not just pass a test.",
    tags: ["Rust", "Tauri", "SQLite", "Python", "NLP", "TypeScript"],
    githubUrl: "https://github.com/qxaminer/nik3",
    category: "Research",
    slug: "nik3",
    accentColor: "#c9a84c",
  },
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
    title: "Dulce-A",
    subtitle: "Consent-Layered AI Introduction Protocol",
    description: "A consent-layered protocol for introducing AI into human relationships. Because the first conversation between a person and an AI shapes everything that follows. Built to preserve agency, establish trust, and keep humans at the center.",
    tags: ["Protocol Design", "AI Ethics", "Human-AI Interaction", "Python"],
    category: "Research",
    slug: "dulce-a",
  },
  {
    title: "QoZ",
    subtitle: "Resource-Aware LLM Orchestrator",
    description: "A resource-aware LLM orchestrator. The insight: the delta between what different models produce is itself the product. QoZ routes, compares, and synthesizes — making the most of what you have without burning compute you don't.",
    tags: ["LLM Orchestration", "Python", "Multi-model AI", "TypeScript"],
    category: "Research",
    slug: "qoz",
  },
  {
    title: "GhostMaus",
    subtitle: "Screen-Aware Learning Overlay",
    description: "A screen-aware learning overlay that fades as you master. Trimodal guidance that reveals multiple paths, then gets out of your way. Built on a simple belief: the best tool teaches you not to need it.",
    tags: ["Electron", "JavaScript", "UX Design", "Pedagogy"],
    category: "Creative Tools",
    slug: "ghostmaus",
  },
  {
    title: "Lucint",
    subtitle: "End-of-Session Mastery Ritual",
    description: "A mastery engine for builders. End-of-session ritual that turns reflection into momentum — five honest questions, AI coaching back, four docs written automatically. Because shipping without understanding is just moving fast in the wrong direction.",
    tags: ["AI Coaching", "Python", "Developer Tools", "Automation"],
    category: "Creative Tools",
    slug: "lucint",
  },
  {
    title: "Giant Shoulders",
    subtitle: "Strategic Open Source Discovery",
    description: "Strategic open source discovery. Stop browsing randomly — find the repos that actually advance where you're going. AI-powered alignment between your trajectory and the GitHub ecosystem.",
    tags: ["LangChain", "Streamlit", "GitHub API", "Python"],
    liveUrl: "https://qxaminer-giant-shoulders.streamlit.app",
    githubUrl: "https://github.com/qxaminer/GiantShoulders",
    category: "Research",
    slug: "giant-shoulders",
    image: "/giantsShoulders.png",
  },
  {
    title: "SK8-XR",
    subtitle: "AR Skateboarding Instruction — iPhone LiDAR + ARKit",
    description: "iPhone LiDAR meets skateboarding pedagogy. Mocap trick overlays, difficulty and injury ratings, and a crawl/walk/run learning framework that meets riders where they are. Embodied learning for a discipline that's always been about watching, then doing.",
    tags: ["Unity", "ARKit", "LiDAR", "iPhone"],
    liveUrl: "https://xanthos.dev/SK8-XR/sk8xr-deck.html",
    category: "Creative Tools",
    slug: "sk8xr",
    accentColor: "#ff6b00",
    status: "IN PROGRESS — SMU CRCP6380 Capstone",
  },
]

function projectHref(project: (typeof projects)[number]): string {
  return project.liveUrl ?? project.githubUrl ?? `/projects/${project.slug}`
}

function projectOpensNewTab(project: (typeof projects)[number]): boolean {
  return !!(project.liveUrl || project.githubUrl)
}

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
                <Card
                  key={project.slug}
                  className="group flex flex-col transition-all hover:shadow-lg"
                  style={project.accentColor ? { borderLeft: `4px solid ${project.accentColor}` } : undefined}
                >
                  {project.image && (
                    <div className="w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={900}
                        height={1200}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader className="space-y-3 p-8">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-2xl font-bold transition-colors group-hover:text-primary">
                          {projectOpensNewTab(project) ? (
                            <a
                              href={projectHref(project)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {project.title}
                            </a>
                          ) : (
                            <Link href={projectHref(project)}>{project.title}</Link>
                          )}
                        </CardTitle>
                        <Badge variant="outline" className="shrink-0">{project.category}</Badge>
                      </div>
                      {project.subtitle && (
                        <p className="text-sm font-medium text-muted-foreground">
                          {project.subtitle}
                        </p>
                      )}
                      {project.status && (
                        <Badge variant="outline" className="w-fit text-xs">
                          {project.status}
                        </Badge>
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
