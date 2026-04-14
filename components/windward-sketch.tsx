"use client"

import { useEffect, useRef } from "react"

export function WindwardSketch() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let p5Instance: any = null

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      if (cancelled) return

      const p5 = p5Module.default

      const sketch = (p: any) => {
        // Tunable parameters
        let numParticles = 2000 // Reduced from 5000 for better performance
        let particles: any[] = []
        let symmetry = 5

        let numSand = 150 // Reduced from 250
        let sands: any[] = []
        let hgH = 220
        let hgW = 90

        // Particle class
        class Particle {
          pos: any
          prev: any
          hue: number

          constructor() {
            this.pos = p5.Vector.random2D().mult(Math.min(p.width, p.height) * 0.25)
            this.prev = this.pos.copy()
            this.hue = p.random(360)
          }

          update(nScale: number, spd: number) {
            this.prev.set(this.pos)
            const ang =
              p.noise(
                this.pos.x * nScale,
                this.pos.y * nScale,
                p.frameCount * 0.005
              ) *
              p.TWO_PI *
              4
            const v = p5.Vector.fromAngle(ang).mult(spd * 0.5)
            this.pos.add(v)
            if (this.pos.mag() > Math.min(p.width, p.height) * 0.25) {
              this.pos = p5.Vector.random2D().mult(Math.min(p.width, p.height) * 0.25)
              this.prev.set(this.pos)
              this.hue = p.random(360)
            }
          }

          display() {
            p.stroke(this.hue, 80, 100, 30)
            p.strokeWeight(1.2)
            p.line(this.prev.x, this.prev.y, this.pos.x, this.pos.y)
          }
        }

        // Sand class
        class Sand {
          pos: any
          vy: number
          hue: number

          constructor() {
            this.pos = new p5.Vector(p.random(-hgW, hgW), -hgH / 2)
            this.vy = p.random(0.5, 1.5)
            this.hue = p.random(360)
          }

          reset() {
            this.pos = new p5.Vector(p.random(-hgW, hgW), -hgH / 2)
            this.vy = p.random(0.5, 1.5)
            this.hue = p.random(360)
          }

          update() {
            this.vy += 0.04
            this.pos.y += this.vy
            if (this.pos.y > hgH / 2) this.reset()
          }

          display() {
            const w = p.map(Math.abs(this.pos.y), 0, hgH / 2, 0, hgW)
            this.pos.x = p.constrain(this.pos.x, -w, w)
            p.stroke(this.hue, 80, 100, 80)
            p.strokeWeight(2)
            p.point(this.pos.x, this.pos.y)
          }
        }

        p.setup = () => {
          // Use fixed square dimensions
          p.createCanvas(400, 400)
          p.frameRate(60) // Increased from default for smoother animation
          
          p.colorMode(p.HSB, 360, 100, 100, 100)
          p.background(0)

          for (let i = 0; i < numParticles; i++) {
            particles[i] = new Particle()
          }
          for (let i = 0; i < numSand; i++) {
            sands[i] = new Sand()
          }
        }

        p.draw = () => {
          p.noStroke()
          p.fill(0, 0, 0, 5)
          p.rect(0, 0, p.width, p.height)

          p.translate(p.width / 2, p.height / 2)

          const noiseScale = p.map(p.mouseX, 0, p.width, 0.001, 0.02)
          const speedFactor = 0.5 + p.noise(p.frameCount * 0.01) * 0.8

          for (let particle of particles) {
            particle.update(noiseScale, speedFactor)
            for (let i = 0; i < symmetry; i++) {
              p.push()
              p.rotate((p.TWO_PI * i) / symmetry)
              particle.display()
              p.pop()
            }
          }

          // Only draw hourglass occasionally for performance
          if (p.frameCount % 2 === 0) {
            p.push()
            const baseRotation = p.frameCount * 0.01

            for (let j = 0; j < Math.min(sands.length, 100); j++) {
              sands[j].update()
              sands[j].display()
            }

            const alpha = p.random(60, 200)
            p.stroke(0, 0, 100, alpha)
            p.strokeWeight(2)
            p.noFill()
            p.triangle(-hgW, -hgH / 2, hgW, -hgH / 2, 0, 0)
            p.triangle(-hgW, hgH / 2, hgW, hgH / 2, 0, 0)
            p.pop()
          }
        }

        p.windowResized = () => {
          if (containerRef.current && containerRef.current.offsetWidth > 0) {
            const w = containerRef.current.clientWidth
            const h = containerRef.current.clientHeight || w
            p.resizeCanvas(w, h)
          }
        }

        p.keyPressed = () => {
          if (p.keyCode === p.UP) symmetry = Math.min(12, symmetry + 1)
          if (p.keyCode === p.DOWN) symmetry = Math.max(2, symmetry - 1)
        }
      }

      // Create sketch - pass container directly to p5
      if (containerRef.current) {
        p5Instance = new p5(sketch, containerRef.current)
      }

      return () => {
        if (p5Instance) {
          p5Instance.remove()
        }
      }
    }).catch((e) => {
      console.error("Failed to load p5:", e)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="aspect-square w-full overflow-hidden rounded-lg bg-black"
    />
  )
}
