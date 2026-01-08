import type { GLOBAL_STATE } from '.'
import { IrisIndicator, type BuiltInColor } from './iris-indicator'

/**
 * Utility function to make hooking up UI inputs easier.
 *
 * @param   {string}            id            The ID of the input element
 * @param   {any}               defaultValue  The default value for the input element
 * @param   {HTMLInputElement}  onChange      A callback to be called on change
 */
function setupInputElement (id: string, defaultValue: boolean|number|string, onChange: (elem: HTMLInputElement) => void) {
  const elem = document.querySelector<HTMLInputElement>(`#${id}`)

  if (elem === null) {
    return
  }

  if (typeof defaultValue === 'boolean') {
    elem.checked = defaultValue
  } else if (typeof defaultValue === 'string') {
    elem.value = defaultValue
  } else if (typeof defaultValue === 'number') {
    elem.value = String(defaultValue)
  }

  elem.addEventListener('change', () => onChange(elem))
}

/**
 * Sets up a basic UI for the demo page.
 *
 * @param  {IrisIndicator}  iris   The indicator to apply changes to
 * @param  {GLOBAL_STATE}   state  The initial state
 */
export function setupUI (iris: IrisIndicator, state: GLOBAL_STATE) {
  setupInputElement('fps-limit', state.enableFpsLimit, fpsLimiter => {
    state.enableFpsLimit = fpsLimiter.checked
    iris.setFpsLimitEnabled(fpsLimiter.checked)
  })

  setupInputElement('fps-limit-count', state.fpsLimit, fpsLimit => {
    state.fpsLimit = parseInt(fpsLimit.value)
    iris.setFpsLimit(state.fpsLimit)
  })

  setupInputElement('rotation-speed', state.rotationSpeed, rotationSpeed => {
    state.rotationSpeed = parseInt(rotationSpeed.value)
    iris.setRotationSpeed(state.rotationSpeed)
  })

  setupInputElement('ray-speed', state.raySpeed, raySpeed => {
    state.raySpeed = parseFloat(raySpeed.value)
    iris.setRayMovementSpeed(state.raySpeed)
  })

  setupInputElement('segment-adjustment-step-duration', state.segmentAdjustmentStepDuration, adj => {
    state.segmentAdjustmentStepDuration = parseInt(adj.value)
    iris.setSegmentAdjustmentStepDuration(state.segmentAdjustmentStepDuration)
  })

  setupInputElement('enable-bloom', state.bloomEnabled, bloom => {
    state.bloomEnabled = bloom.checked
    iris.setBloomEnabled(bloom.checked)
  })

  setupInputElement('bloom-intensity', state.bloomIntensity, bloom => {
    state.bloomIntensity = parseInt(bloom.value) as any
    iris.setBloomIntensity(state.bloomIntensity)
  })

  setupInputElement('enable-msaa', state.enableMSAA, msaa => {
    state.enableMSAA = msaa.checked
    iris.setMSAAEnabled(state.enableMSAA)
  })

  setupInputElement('rendering-resolution', Math.min(window.devicePixelRatio, 2), renderingResolution => {
    iris.setTextureSizeModifier(parseInt(renderingResolution.value))
  })

  setupInputElement('enable-simulation', state.simulation, simulation => {
    state.simulation = simulation.checked
  })

  for (let i = 0; i < 4; i++) {
    setupInputElement(`segment-${i+1}-color`, state.segmentColors[i]!, col => {
      state.segmentColors[i] = col.value as BuiltInColor
      iris.setColors(state.segmentColors)
    })

    setupInputElement(`segment-${i+1}-count`, state.segmentCounts[i]!, cnt => {
      state.segmentCounts[i] = parseInt(cnt.value)
      iris.setSegmentCounts(state.segmentCounts)
    })
  }
}
