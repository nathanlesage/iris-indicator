declare module '*.glsl' {
  const content: string
  export default content
}

declare interface Window {
  setupIrisIndicator: Function
}
