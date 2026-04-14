import Link from "next/link"
import { FaveTorusSketch } from "@/components/fave-torus-sketch"

export default function FaveTorusPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Back Link */}
      <div className="border-b py-4 px-6">
        <Link
          href="/work/digital"
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          ← Back to Digital Gallery
        </Link>
      </div>

      {/* Sketch */}
      <div className="flex-1 flex items-center justify-center p-4 bg-black">
        <FaveTorusSketch fullscreen={true} />
      </div>
    </div>
  )
}
