import Link from "next/link"
import { FaveTorusSketch } from "@/components/fave-torus-sketch"

export default function FaveTorusPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Back Link */}
      <div className="border-b py-3 sm:py-4 px-4 sm:px-6 md:px-8">
        <Link
          href="/work/digital"
          className="text-xs sm:text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          ← Back to Digital Gallery
        </Link>
      </div>

      {/* Sketch */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black">
        <FaveTorusSketch fullscreen={true} />
      </div>
    </div>
  )
}
