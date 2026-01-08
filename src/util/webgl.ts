/**
 * Compiles a shader using the corresponding source code. Courtesy of WebGL
 * fundamentals.
 *
 * @param   {WebGL2RenderingContext}  gl      WebGL Context
 * @param   {'vertex'|'fragment'}     type    The shader type
 * @param   {string}                  source  The source code
 *
 * @returns {WebGLShader}                     The compiled shader
 */
export function compileShader (gl: WebGL2RenderingContext, type: 'vertex'|'fragment', source: string): WebGLShader {
  const glType = type === 'vertex' ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER
  const shader = gl.createShader(glType)

  if (shader === null) {
    throw new Error('Could not create shader from WebGL Context!')
  }

  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

  if (success) {
    return shader
  }

  const msg = `Error compiling "${type}" shader: ${gl.getShaderInfoLog(shader)}`
  gl.deleteShader(shader)
  throw new Error(msg)
}

/**
 * Takes two shaders and links them to a program. Courtesy of WebGL
 * fundamentals.
 *
 * @param   {WebGL2RenderingContext}  gl              The WebGL context
 * @param   {WebGLShader}             vertexShader    The Vertex shader
 * @param   {WebGLShader}             fragmentShader  The Fragment shader
 *
 * @return  {WebGLProgram}                            The program
 */
export function compileProgram (gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }

  const msg = `Could not link program: ${gl.getProgramInfoLog(program)}`
  gl.deleteProgram(program)
  throw new Error(msg)
}

/**
 * Utility function that resizes a canvas size to its actual dimensions.
 * Courtesy of WebGL fundamentals.
 *
 * @param  {HTMLCanvasElement}  canvas  The canvas to check
 */
export function resizeCanvasToDisplaySize (canvas: HTMLCanvasElement) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth
  const displayHeight = canvas.clientHeight
  
  // Check if the canvas is not the same size.
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight
  
  if (needResize) {
    // Make the canvas the same size
    canvas.width  = displayWidth
    canvas.height = displayHeight
  }
  
  return needResize
}
