import { IrisIndicator, type BuiltInColor } from "./iris-indicator"
import { setupUI } from "./ui"

export type Vec4<T = number> = [T, T, T, T]

// We derive the rendering resolution from the device pixel ratio (which often
// is either 1 or 2). To make it a bit simpler to see, we only allow powers of
// two.
function normalizedDPR (): 1|2|4|8|16 {
  let dpr = Math.ceil(window.devicePixelRatio)
  if ([1, 2, 4, 8, 16].includes(dpr)) {
    return dpr as 1|2|4|8|16
  }

  if (dpr > 16) {
    return 16
  } else if (dpr > 8) {
    return 8
  } else if (dpr > 4) {
    return 4
  } else if (dpr > 2) {
    return 2
  } else {
    return 1
  }
}

// Some defaults that the user can adjust
const globalState = {
  fpsLimit: 30, // Automatically limit to 30fps to keep the work simple
  enableFpsLimit: true, // Enable FPS limiter

  // Provide default colors
  segmentColors: ['red', 'green', 'blue', 'purple'] as Vec4<BuiltInColor>,
  // Start with one blue element
  segmentCounts: [0, 0, 1, 0] as Vec4,
  // Default segment adjustment step duration for the animation
  segmentAdjustmentStepDuration: 200,
  // Enable the auto-simulation
  simulation: true,
  // Very slow rotation speed
  rotationSpeed: 240,
  // Very slow ray speed
  raySpeed: 5,
  // Enable bloom and set to a moderate intensity
  bloomEnabled: true,
  bloomIntensity: 2 as 1|2|4|8,
  // Enable MSAA
  enableMSAA: true,
  // Set a default rendering resolution to the actual device pixels (not
  // downsampled ones as is common on very high DPI displays)
  renderingResolution: normalizedDPR()
}

// For easier access in the UI setup
export type GLOBAL_STATE = typeof globalState

// This is hardcoded in the fragment shader
export const MAX_SUPPORTED_SEGMENTS = 4

/**
 * Creates a new iris indicator to render within the provided Canvas element.
 *
 * @param   {HTMLCanvasElement}  canvas  The target canvas element
 */
export function setupIrisIndicator (canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: true })

  if (gl === null) {
    alert("Unable to initialize WebGL.")
    return
  }

  const indicator = new IrisIndicator(gl)

  // Setup a demo-UI
  setupUI(indicator, globalState)

  // Start simulation provider
  setInterval(() => simulationStep(indicator), 1000)

  // Start FPS counter
  const fpsCounter = document.querySelector('#fps-counter')
  setInterval(() => {
    if (fpsCounter !== null) {
      const fps = Math.round(indicator.getCurrentFps())
      fpsCounter.textContent = `Rendering speed: ${String(fps)} fps`
    }
  }, 100)

  // Initialize state
  indicator.setBloomEnabled(globalState.bloomEnabled)
  indicator.setBloomIntensity(globalState.bloomIntensity)
  indicator.setFpsLimitEnabled(globalState.enableFpsLimit)
  indicator.setMSAAEnabled(globalState.enableMSAA)
  indicator.setFpsLimit(globalState.fpsLimit)
  indicator.setRayMovementSpeed(globalState.raySpeed)
  indicator.setTextureSizeModifier(globalState.renderingResolution)
  indicator.setRotationSpeed(globalState.rotationSpeed)
  indicator.setColors(globalState.segmentColors)
  indicator.setSegmentCounts(globalState.segmentCounts)
  indicator.setSegmentAdjustmentStepDuration(globalState.segmentAdjustmentStepDuration)

  // Start the rendering
  indicator.enterRenderingLoop()

  // Also, hook up an event listener
  const obs = new ResizeObserver(() => { indicator.onResize() })
  obs.observe(canvas)
}

// Runs a simple simulation to automate the segments.
function simulationStep (indicator: IrisIndicator) {
  if (!globalState.simulation) {
    return
  }

  const rand = Math.random()
  if (rand < 0.3) {
    globalState.segmentCounts[0]++
  } else if (rand < 0.6) {
    globalState.segmentCounts[1]++
  } else if (rand > 0.9) {
    // 10% chance of resetting the entire state
    globalState.segmentCounts[0] = 1
    globalState.segmentCounts[1] = 0
    globalState.segmentCounts[2] = 0
    globalState.segmentCounts[3] = 0
  } else {
    globalState.segmentCounts[2]++
  }
  indicator.setSegmentCounts(globalState.segmentCounts)

  for (let i = 0; i < 4; i++) {
    document.querySelector<HTMLInputElement>(`#segment-${i+1}-count`)!.value = String(globalState.segmentCounts[i]!)
  }
}

// Provide the constructor to the Window object so that it can be instantiated.
window.setupIrisIndicator = setupIrisIndicator
