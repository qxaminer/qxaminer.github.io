declare module "p5/core" {
  const p5: any
  export default p5
}

declare module "p5/shape" {
  const addon: (p5: any) => void
  export default addon
}

declare module "p5/color" {
  const addon: (p5: any) => void
  export default addon
}

declare module "p5/math" {
  const addon: (p5: any) => void
  export default addon
}

declare module "p5/events" {
  const addon: (p5: any) => void
  export default addon
}

declare module "p5/webgl" {
  const addon: (p5: any) => void
  export default addon
}
