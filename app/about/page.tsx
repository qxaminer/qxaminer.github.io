import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            About veroFields
          </h1>
          <p className="text-xl text-muted-foreground">
            Specializing in explainable AI and adaptive learning systems
          </p>
          <Separator />
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <p className="text-lg leading-relaxed">
            veroFields is a creative technologist specializing in explainable AI and adaptive
            learning systems that make complex processes transparent and intuitive. Through
            artistic interfaces and data visualization, they create tools that bridge the gap
            between sophisticated technology and human understanding, enabling users to learn
            faster and create more effectively.
          </p>

          <p className="text-lg leading-relaxed">
            Currently pursuing a Masters in Creative Technology, with a focus on building systems
            that amplify human cognitive capabilities through thoughtful interface design.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 pt-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Colorista demonstrates intelligent task delegation in creative workflows by
                analyzing artwork and recommending specific colored pencils using the Delta-E 2000
                algorithm for perceptually accurate color matching.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Research Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Core research explores AR Cultural Understanding systems, intelligent task
                delegation in creative workflows, and cognitive load optimization in complex
                processes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Creating AI systems that enhance human flourishing by augmenting creativity,
                facilitating meaningful collaboration, and preserving cultural nuance in our
                algorithmically-mediated world.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Background</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold">AI+Art</p>
                  <p className="text-sm text-muted-foreground">Research Focus</p>
                </div>
                <Separator />
                <div>
                  <p className="font-semibold">Masters</p>
                  <p className="text-sm text-muted-foreground">Creative Technology</p>
                </div>
                <Separator />
                <div>
                  <p className="font-semibold">Human-AI</p>
                  <p className="text-sm text-muted-foreground">Collaboration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
