"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

// REPLACE BEFORE DEPLOY
// To generate the hash for your real password, run:
//   echo -n "yourpassword" | shasum -a 256 | awk '{print $1}'
// Then replace the string below with the output.
const CORRECT_HASH = "1bdaae429e33bf50acf100f7b1c893851ac769d86f0a4e0d904adb043bfb9051"

async function sha256(text: string): Promise<string> {
  const encoded = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export default function IntelPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem("intel_unlocked") === "1") {
      setUnlocked(true)
    } else {
      inputRef.current?.focus()
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const hash = await sha256(password)
    if (hash === CORRECT_HASH) {
      sessionStorage.setItem("intel_unlocked", "1")
      setError(false)
      setUnlocked(true)
    } else {
      setError(true)
      setShaking(true)
      setPassword("")
      setTimeout(() => setShaking(false), 600)
    }
  }

  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col items-center gap-6 ${shaking ? "animate-shake" : ""}`}
          style={shaking ? { animation: "shake 0.5s ease-in-out" } : undefined}
        >
          <p className="font-mono text-sm tracking-widest text-zinc-500 uppercase">
            Restricted Access
          </p>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="off"
            className="w-64 rounded border border-zinc-700 bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-500"
          />
          {error && (
            <p className="font-mono text-xs text-red-500 tracking-wide">
              Access denied
            </p>
          )}
          <button
            type="submit"
            className="w-64 rounded border border-zinc-700 bg-zinc-800 px-4 py-2 font-mono text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-700"
          >
            Enter
          </button>
        </form>
        <style>{`
          @keyframes shake {
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
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-200">
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
  )
}
