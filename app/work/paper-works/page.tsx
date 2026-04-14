import Link from "next/link"
import Image from "next/image"

export default function PaperWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Back Link */}
      <div className="border-b py-4 px-6">
        <Link
          href="/work"
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          ← Back to Studio Work
        </Link>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <div className="relative w-full h-full max-w-4xl max-h-screen">
          <Image
            src="/artwork/dangerBarton.png"
            alt="Paper Works"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Info */}
      <div className="border-t py-8 px-6 bg-white dark:bg-black">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-serif text-3xl font-bold mb-2">Paper Works</h1>
          <p className="text-muted-foreground mb-6">2020–present</p>
          <p className="text-lg leading-relaxed">
            Drawings, sketches, and paper-based explorations of form and color. A continuing investigation
            into mark-making, composition, and the relationship between drawing and painting.
          </p>
        </div>
      </div>
    </div>
  )
}
