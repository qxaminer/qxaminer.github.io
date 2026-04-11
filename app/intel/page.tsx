"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

const CORRECT_HASH = "e172e13bd5ddb503adebe1a0c5862cd86a4625d19598698d2a3f4aa3c3bbff93"

async function sha256(text: string): Promise<string> {
  const encoded = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export default function IntelPage() {
  const [boot, setBoot] = useState(true)
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [rejectVisual, setRejectVisual] = useState(false)
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const rejectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem("intel_auth") === "1") {
      setUnlocked(true)
    } else {
      queueMicrotask(() => inputRef.current?.focus())
    }
    setBoot(false)
  }, [])

  useEffect(() => {
    return () => {
      if (rejectTimeoutRef.current) clearTimeout(rejectTimeoutRef.current)
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const hash = await sha256(password)
    if (hash === CORRECT_HASH) {
      if (rejectTimeoutRef.current) clearTimeout(rejectTimeoutRef.current)
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current)
      setRejectVisual(false)
      setShaking(false)
      sessionStorage.setItem("intel_auth", "1")
      setUnlocked(true)
    } else {
      if (rejectTimeoutRef.current) clearTimeout(rejectTimeoutRef.current)
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current)
      setPassword("")
      setRejectVisual(true)
      setShaking(true)
      shakeTimeoutRef.current = setTimeout(() => setShaking(false), 500)
      rejectTimeoutRef.current = setTimeout(() => setRejectVisual(false), 1000)
    }
  }

  if (boot) {
    return <div className="min-h-screen bg-zinc-950" />
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950 transition-opacity duration-500 ease-out ${
          unlocked ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden={unlocked}
      >
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
          <div
            className={shaking ? "animate-[intel-shake_0.5s_ease-in-out]" : undefined}
          >
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="off"
              className={`w-56 border-0 border-b bg-transparent px-0 py-2 text-center text-sm text-zinc-200 outline-none transition-[border-color] duration-200 placeholder:text-zinc-600 focus:ring-0 ${
                rejectVisual
                  ? "border-b border-red-500"
                  : "border-b border-zinc-700 focus:border-zinc-400"
              }`}
            />
          </div>
          <button
            type="submit"
            className="text-lg text-zinc-500 transition-colors hover:text-zinc-300"
            aria-label="Submit"
          >
            →
          </button>
        </form>
        <style>{`
          @keyframes intel-shake {
            0%, 100% { transform: translateX(0); }
            15% { transform: translateX(-8px); }
            30% { transform: translateX(8px); }
            45% { transform: translateX(-6px); }
            60% { transform: translateX(6px); }
            75% { transform: translateX(-4px); }
            90% { transform: translateX(4px); }
          }
        `}</style>
      </div>

      <div
        className={`bg-zinc-950 px-6 py-16 text-zinc-200 transition-opacity duration-500 ease-out ${
          unlocked
            ? "relative min-h-screen opacity-100"
            : "pointer-events-none fixed inset-0 z-[55] overflow-hidden opacity-0"
        }`}
      >
        <div className="mx-auto max-w-3xl space-y-10">
          {/* Back link */}
          <Link
            href="/projects"
            className="font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            ← Public Portfolio
          </Link>

          {/* Header */}
          <div className="space-y-2 border-b border-zinc-800 pb-8">
            <h1 className="font-mono text-2xl font-bold tracking-tight text-zinc-100">
              nik³ — Full Context
            </h1>
            <p className="font-mono text-sm text-zinc-500">
              For verified recruiters and hiring teams. Not for public distribution.
            </p>
          </div>

          {/* Main description */}
          <div className="space-y-4 text-sm leading-relaxed text-zinc-300">
            <p>
              nik³ is a Persian-language OSINT corpus analysis tool built to analyze framing
              divergence between Iranian state media and diaspora outlets across 21,857 articles
              from 7 sources.
            </p>
          </div>

          {/* Analytical capability */}
          <div className="space-y-4">
            <h2 className="font-mono text-base font-semibold text-zinc-100">
              Analytical Capability
            </h2>
            <ul className="space-y-2 font-mono text-sm text-zinc-400">
              <li>— Political register classification: regime-aligned, diaspora, reformist, international, independent</li>
              <li>— Semantic divergence mapping: رژیم as the sharpest provable divergence node across source types</li>
              <li>— Frequency anomaly detection: پدافند as date-stamped signal in regime-bin sources</li>
              <li>— Named entity extraction: LOC/PER/ORG/GPE via trained Persian NER (ParsBERT)</li>
              <li>— Provenance graph: event propagation across sources, time-delta weighted cosine similarity edges</li>
              <li>— Acquisition frontier: vocabulary acquisition tracking calibrated to news register</li>
            </ul>
          </div>

          {/* Source corpus table */}
          <div className="space-y-4">
            <h2 className="font-mono text-base font-semibold text-zinc-100">
              Source Corpus
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-zinc-500">
                    <th className="pb-2 pr-8">Source</th>
                    <th className="pb-2 pr-8">Register</th>
                    <th className="pb-2">Articles</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400">
                  <tr className="border-b border-zinc-900">
                    <td className="py-2 pr-8">Mehr News</td>
                    <td className="py-2 pr-8">State</td>
                    <td className="py-2">8,600</td>
                  </tr>
                  <tr className="border-b border-zinc-900">
                    <td className="py-2 pr-8">IRNA</td>
                    <td className="py-2 pr-8">State</td>
                    <td className="py-2">4,927</td>
                  </tr>
                  <tr className="border-b border-zinc-900">
                    <td className="py-2 pr-8">Tasnim</td>
                    <td className="py-2 pr-8">Semiofficial</td>
                    <td className="py-2">4,596</td>
                  </tr>
                  <tr className="border-b border-zinc-900">
                    <td className="py-2 pr-8">BBC Persian</td>
                    <td className="py-2 pr-8">International</td>
                    <td className="py-2">1,603</td>
                  </tr>
                  <tr className="border-b border-zinc-900">
                    <td className="py-2 pr-8">Radio Farda</td>
                    <td className="py-2 pr-8">Diaspora</td>
                    <td className="py-2">1,116</td>
                  </tr>
                  <tr className="border-b border-zinc-900">
                    <td className="py-2 pr-8">IranWire</td>
                    <td className="py-2 pr-8">Diaspora</td>
                    <td className="py-2">915</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-8">Iran International</td>
                    <td className="py-2 pr-8">Diaspora</td>
                    <td className="py-2">100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CamelBeast */}
          <div className="space-y-4 border-t border-zinc-800 pt-8">
            <h2 className="font-mono text-base font-semibold text-zinc-100">
              CamelBeast (nik³ Backend)
            </h2>
            <p className="font-mono text-sm text-zinc-400">
              Persian-language OSINT pipeline. Rust core, seven source ingesters, SQLite corpus,
              cosine similarity scoring, political register classification, NER rail.
              Available for review under NDA.
            </p>
          </div>

          {/* Relevance to role */}
          <div className="space-y-4 border-t border-zinc-800 pt-8">
            <h2 className="font-mono text-base font-semibold text-zinc-100">
              Relevance to Role
            </h2>
            <p className="font-mono text-sm text-zinc-500 italic">
              [Leave blank — fill in per application before sharing this link]
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3 border-t border-zinc-800 pt-8">
            <a
              href="https://nik3.xanthos.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-mono text-sm text-zinc-400 transition-colors hover:text-zinc-200"
            >
              Full Technical Demo → nik3.xanthos.dev
            </a>
            <a
              href="mailto:overtgreen@gmail.com"
              className="block font-mono text-sm text-zinc-400 transition-colors hover:text-zinc-200"
            >
              GitHub (private on request) → overtgreen@gmail.com
            </a>
          </div>

          {/* Footer back link */}
          <div className="border-t border-zinc-800 pt-8">
            <Link
              href="/projects"
              className="font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-400"
            >
              ← Public Portfolio
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
