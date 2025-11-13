"use client"

import { useEffect, useRef } from "react"

export function P5Sketch() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<any>(null)

  useEffect(() => {
    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      const p5 = p5Module.default

      const sketch = (p: any) => {
        let currentDemo = 0
        let maxDemos = 9 // 3 transforms × 3 shapes
        let time = 0

        p.setup = () => {
          const canvas = p.createCanvas(600, 450)
          canvas.parent(containerRef.current!)
          p.colorMode(p.HSB, 360, 100, 100, 100)
        }

        p.draw = () => {
          p.background(40)
          time += 0.02

          if (p.frameCount % 180 === 0) {
            currentDemo = (currentDemo + 1) % maxDemos
          }

          runDemo(p, currentDemo, time)
        }

        p.keyPressed = () => {
          if (p.key === " ") {
            currentDemo = (currentDemo + 1) % maxDemos
          }
        }

        p.windowResized = () => {
          // Adjust canvas size on window resize if needed
          if (window.innerWidth < 768) {
            p.resizeCanvas(Math.min(window.innerWidth - 32, 600), 450)
          } else {
            p.resizeCanvas(600, 450)
          }
        }

        const runDemo = (p: any, demoNum: number, time: number) => {
          const transformType = Math.floor(demoNum / 3)
          const shapeType = demoNum % 3

          p.push()
          p.translate(p.width / 2, p.height / 2)

          switch (transformType) {
            case 0:
              demonstrateTranslate(p, time)
              break
            case 1:
              demonstrateRotate(p, time)
              break
            case 2:
              demonstrateScale(p, time)
              break
          }

          const baseHue = getColorForDemo(p, transformType, shapeType, time)
          p.fill(baseHue, 75, 90)
          p.stroke(baseHue, 50, 100)
          p.strokeWeight(2)

          switch (shapeType) {
            case 0:
              p.ellipse(0, 0, 100, 100)
              break
            case 1:
              p.rectMode(p.CENTER)
              p.rect(0, 0, 100, 100)
              break
            case 2:
              drawTriangle(p)
              break
          }

          p.pop()
        }

        const getColorForDemo = (
          p: any,
          transformType: number,
          shapeType: number,
          t: number
        ) => {
          let baseHue

          switch (transformType) {
            case 0:
              baseHue = 180 + p.sin(t * 0.5) * 60
              break
            case 1:
              baseHue = 330 + p.sin(t * 0.5) * 60
              break
            case 2:
              baseHue = 90 + p.sin(t * 0.5) * 60
              break
            default:
              baseHue = 180
          }

          baseHue += shapeType * 15
          return (baseHue + 360) % 360
        }

        const demonstrateTranslate = (p: any, t: number) => {
          const x = p.cos(t) * 150
          const y = p.sin(t) * 150
          p.translate(x, y)

          const pathHue = (180 + p.sin(t * 0.5) * 60 + 180) % 360
          p.stroke(pathHue, 40, 50, 60)
          p.strokeWeight(1)
          p.noFill()
          p.ellipse(0, 0, 300, 300)
        }

        const demonstrateRotate = (p: any, t: number) => {
          p.rotate(t)

          const axisHue = (330 + p.sin(t * 0.5) * 60 + 180) % 360
          p.stroke(axisHue, 40, 50, 60)
          p.strokeWeight(1)
          p.line(-200, 0, 200, 0)
          p.line(0, -200, 0, 200)
        }

        const demonstrateScale = (p: any, t: number) => {
          const scaleAmount = 0.5 + p.sin(t) * 0.4
          p.scale(scaleAmount)

          const refHue = (90 + p.sin(t * 0.5) * 60 + 180) % 360
          p.stroke(refHue, 40, 50, 60)
          p.strokeWeight(1)
          p.noFill()
          p.rect(-100, -100, 200, 200)
        }

        const drawTriangle = (p: any) => {
          p.beginShape()
          p.vertex(0, -50)
          p.vertex(43, 25)
          p.vertex(-43, 25)
          p.endShape(p.CLOSE)
        }
      }

      // Create the p5 instance
      if (containerRef.current) {
        sketchRef.current = new p5(sketch)
      }
    })

    // Cleanup function
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="rounded-lg border-2 border-border bg-card shadow-lg transition-shadow hover:shadow-xl"
      style={{
        maxWidth: "100%",
        overflow: "hidden",
      }}
    />
  )
}
