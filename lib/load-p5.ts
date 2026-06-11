let baseP5Promise: Promise<any> | null = null
let webglP5Promise: Promise<any> | null = null

export function loadP5() {
  if (!baseP5Promise) {
    baseP5Promise = Promise.all([
      import("p5/core"),
      import("p5/shape"),
      import("p5/color"),
      import("p5/math"),
      import("p5/events"),
    ]).then(([core, shape, color, math, events]) => {
      const p5 = core.default
      shape.default(p5)
      color.default(p5)
      math.default(p5)
      events.default(p5)
      return p5
    })
  }

  return baseP5Promise
}

export function loadP5WebGL() {
  if (!webglP5Promise) {
    webglP5Promise = Promise.all([loadP5(), import("p5/webgl")]).then(
      ([p5, webgl]) => {
        webgl.default(p5)
        return p5
      }
    )
  }

  return webglP5Promise
}
