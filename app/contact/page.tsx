"use client"

import { useState } from "react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"

const FORMSPREE_ACTION = "https://formspree.io/f/meepyoev"

const fieldClass =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

const labelClass = "mb-2 block text-sm font-medium text-foreground"

function ContactForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(false)
    setPending(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    try {
      const res = await fetch(FORMSPREE_ACTION, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setSent(true)
        form.reset()
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setPending(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-border bg-card/50 px-8 py-14 text-center shadow-sm">
        <p className="text-lg text-foreground">Message sent — I&apos;ll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form
      action={FORMSPREE_ACTION}
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-8 text-left"
    >
      <input type="hidden" name="_subject" value="xanthos.dev inquiry" />

      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name <span className="text-destructive">*</span>
        </label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-3 block text-sm font-medium text-foreground">
          Inquiry type <span className="text-destructive">*</span>
        </legend>
        <div className="space-y-3">
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-transparent px-1 py-1.5 transition-colors hover:border-border hover:bg-muted/30">
            <input
              type="radio"
              name="inquiry_type"
              value="Studio Work & Commissions"
              required
              className="mt-1 h-4 w-4 border-input text-primary focus:ring-ring"
            />
            <span className="text-sm leading-snug text-foreground">Studio Work &amp; Commissions</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-transparent px-1 py-1.5 transition-colors hover:border-border hover:bg-muted/30">
            <input
              type="radio"
              name="inquiry_type"
              value="Technical Collaboration"
              className="mt-1 h-4 w-4 border-input text-primary focus:ring-ring"
            />
            <span className="text-sm leading-snug text-foreground">Technical Collaboration</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-transparent px-1 py-1.5 transition-colors hover:border-border hover:bg-muted/30">
            <input type="radio" name="inquiry_type" value="Other" className="mt-1 h-4 w-4 border-input text-primary focus:ring-ring" />
            <span className="text-sm leading-snug text-foreground">Other</span>
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className={fieldClass + " min-h-[140px] resize-y"}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="space-y-4 sm:space-y-6 text-center">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Contact
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
              For inquiries about artwork, commissions, technical collaboration, or research opportunities
            </p>
            <Separator className="mx-auto w-24" />
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-xl space-y-12">
            <Card className="border-2 border-border bg-card/40 shadow-sm">
              <CardHeader className="space-y-4 p-8 text-center sm:text-left">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 sm:mx-0">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Contact via form below
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-0">
                <ContactForm />
              </CardContent>
            </Card>

            {/* Connect Section */}
            <div className="space-y-6 text-center">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Connect Elsewhere</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild variant="outline" size="lg">
                    <a
                      href="https://github.com/qxaminer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <Github className="h-5 w-5" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a
                      href="https://www.linkedin.com/in/patrickbarfield/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <Linkedin className="h-5 w-5" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Note */}
      <section className="border-t py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              I aim to respond to all inquiries within 2–3 business days. For urgent matters, please say so in your
              message.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Verified recruiters:{" "}
              <Link href="/intel" className="underline-offset-2 hover:underline">
                restricted research →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
