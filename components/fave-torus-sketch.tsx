"use client"

import { useEffect, useRef } from "react"

export function FaveTorusSketch({ fullscreen = false }: { fullscreen?: boolean } = {}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let p5Instance: any = null

    import("p5").then((p5Module) => {
      if (cancelled) return

      const p5 = p5Module.default

      const sketch = (p: any) => {
        const cols = 3
        const rows = 3
        const panelW = fullscreen ? window.innerWidth / 3 : 320
        const panelH = fullscreen ? window.innerHeight / 3 : 240
        const totalW = fullscreen ? window.innerWidth : cols * panelW
        const totalH = fullscreen ? window.innerHeight : rows * panelH

        const sphereCount = cols * rows
        let spherePos: any[] = []
        let sphereAngle: any[] = []
        let decisionMade: boolean[] = []
        let action: number[] = []
        let speed: number[] = []
        let acceleration: number[] = []
        let zOff: number[] = []
        let sphereSize: number[] = []

        let blinkSpeeds: number[] = []
        let blinkOffsets: number[] = []
        let flashPanel: number[] = []
        let flashColor: any[] = []

        let motionType: number[] = []
        let rotationAngle: number[] = []
        let flashTimer: number[] = []
        const flashInterval = 150

        let sizeTimer: number[] = []
        const sizeInterval = 90

        let shapeType: number[] = []
        let revCounter: number[] = []
        let torusAlpha: number[] = []
        let torusRotationSpeed: number[] = []

        p.setup = () => {
          p.createCanvas(totalW, totalH, p.WEBGL)
          p.frameRate(30)

          for (let i = 0; i < sphereCount; i++) {
            spherePos[i] = p.createVector(-200, 0, 0)
            sphereAngle[i] = 0
            decisionMade[i] = false
            action[i] = Math.floor(p.random(3))
            speed[i] = 2
            acceleration[i] = 0.1
            zOff[i] = 0
            sphereSize[i] = 20

            blinkSpeeds[i] = Math.floor(p.random(10, 60))
            blinkOffsets[i] = Math.floor(p.random(0, blinkSpeeds[i]))
            flashPanel[i] = Math.floor(p.random(40))
            flashColor[i] = p.color(p.random(255), p.random(255), p.random(255))

            motionType[i] = Math.floor(p.random(3))
            rotationAngle[i] = 0
            flashTimer[i] = Math.floor(p.random(flashInterval))
            sizeTimer[i] = Math.floor(p.random(sizeInterval))

            shapeType[i] = Math.floor(p.random(3))
            revCounter[i] = 0

            torusAlpha[i] = p.random(80, 255)
            torusRotationSpeed[i] = p.random(0.005, 0.03)
          }
        }

        const drawFlashingTorus = (r1: number, r2: number, segs1: number, segs2: number, flashIndex: number, flashCol: any, speed: number, offset: number, alphaVal: number) => {
          for (let i = 0; i < segs1; i++) {
            const theta1 = (Math.PI * 2 * i) / segs1
            const theta2 = (Math.PI * 2 * (i + 1)) / segs1

            if (i === flashIndex || i === (flashIndex + 1) % segs1 || i === (flashIndex - 1 + segs1) % segs1) {
              const blink = p.map(Math.sin(((p.frameCount + offset) * Math.PI * 2) / speed), -1, 1, 0, alphaVal)
              p.fill(blink, blink, blink, alphaVal)
            } else if (i === (flashIndex + 2) % segs1 || i === (flashIndex - 2 + segs1) % segs1) {
              p.fill(flashCol)
            } else {
              p.fill(100, alphaVal)
            }

            p.beginShape(p.QUAD_STRIP)
            for (let j = 0; j <= segs2; j++) {
              const phi = (Math.PI * 2 * j) / segs2
              for (let k = 0; k < 2; k++) {
                const theta = k === 0 ? theta1 : theta2
                const x = (r1 + r2 * Math.cos(phi)) * Math.cos(theta)
                const y = (r1 + r2 * Math.cos(phi)) * Math.sin(theta)
                const z = r2 * Math.sin(phi)
                p.vertex(x, y, z)
              }
            }
            p.endShape()
          }
        }

        const cone = (r: number, h: number) => {
          const sides = 24
          const angleStep = (Math.PI * 2) / sides
          p.beginShape(p.TRIANGLE_FAN)
          p.vertex(0, 0, -h / 2)
          for (let i = 0; i <= sides; i++) {
            const angle = i * angleStep
            const x = Math.cos(angle) * r
            const y = Math.sin(angle) * r
            p.vertex(x, y, h / 2)
          }
          p.endShape()
        }

        p.draw = () => {
          const lightning = p.map(Math.sin((p.frameCount * 0.05)), -1, 1, 0, 255)
          p.background(lightning)
          p.lights()

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              p.push()
              const idx = r * cols + c
              const xOffset = c * panelW - totalW / 2
              const yOffset = r * panelH - totalH / 2
              p.translate(xOffset + panelW / 2, yOffset + panelH / 2, -200)

              p.rotateX((Math.PI / 8) * r)
              p.rotateY((Math.PI / 8) * c)

              switch (motionType[idx]) {
                case 0:
                  p.rotateX(rotationAngle[idx])
                  break
                case 1:
                  p.rotateY(rotationAngle[idx])
                  break
                case 2:
                  p.rotateZ(Math.sin(rotationAngle[idx]) * 0.2)
                  break
              }
              rotationAngle[idx] += torusRotationSpeed[idx]

              p.push()
              p.rotateX(Math.PI / 2)
              drawFlashingTorus(60, 20, 40, 20, Math.floor((flashPanel[idx] + p.frameCount / 3) % 40), flashColor[idx], blinkSpeeds[idx], blinkOffsets[idx], torusAlpha[idx])
              p.pop()

              p.push()
              p.fill(p.random(255), p.random(255), p.random(255))
              p.translate(spherePos[idx].x, spherePos[idx].y, spherePos[idx].z)
              switch (shapeType[idx]) {
                case 0:
                  p.sphere(sphereSize[idx])
                  break
                case 1:
                  p.box(sphereSize[idx])
                  break
                case 2:
                  cone(sphereSize[idx], sphereSize[idx] * 1.5)
                  break
              }
              p.pop()

              p.pop()

              if (!decisionMade[idx]) {
                spherePos[idx].x += speed[idx]
                if (spherePos[idx].x >= 200) {
                  decisionMade[idx] = true
                }
              } else {
                const prevAngle = sphereAngle[idx]
                switch (action[idx]) {
                  case 0:
                    sphereAngle[idx] += 0.05
                    break
                  case 1:
                    sphereAngle[idx] -= 0.05
                    break
                }
                if (Math.abs(prevAngle) > Math.PI && Math.abs(sphereAngle[idx]) <= Math.PI) {
                  revCounter[idx]++
                  shapeType[idx] = Math.floor(p.random(3))
                }
                spherePos[idx].x = 100 * Math.cos(sphereAngle[idx])
                spherePos[idx].y = 100 * Math.sin(sphereAngle[idx])

                if (action[idx] === 2) {
                  zOff[idx] += speed[idx]
                  speed[idx] += acceleration[idx]
                  spherePos[idx].z = zOff[idx]
                }
              }

              flashTimer[idx]--
              if (flashTimer[idx] <= 0) {
                if (idx !== 4) {
                  flashPanel[idx] = Math.floor(p.random(40))
                  flashColor[idx] = p.color(p.random(255), p.random(255), p.random(255))
                }
                flashTimer[idx] = flashInterval
              }

              sizeTimer[idx]--
              if (sizeTimer[idx] <= 0) {
                if (idx !== 4) {
                  sphereSize[idx] = p.random(10, 40)
                }
                sizeTimer[idx] = sizeInterval
              }
            }
          }
        }
      }

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
      className="aspect-square w-full overflow-hidden rounded-lg bg-black flex items-center justify-center"
    />
  )
}
