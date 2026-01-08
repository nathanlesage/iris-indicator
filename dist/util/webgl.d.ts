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
export declare function compileShader(gl: WebGL2RenderingContext, type: 'vertex' | 'fragment', source: string): WebGLShader;
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
export declare function compileProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram;
/**
 * Utility function that resizes a canvas size to its actual dimensions.
 * Courtesy of WebGL fundamentals.
 *
 * @param  {HTMLCanvasElement}  canvas  The canvas to check
 */
export declare function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean;
//# sourceMappingURL=webgl.d.ts.map