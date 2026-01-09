import { type Vec4 } from ".";
export interface Segment {
    color: [number, number, number, number];
    ratio: number;
}
/**
 * This class handles all the nitty-gritty of the WebGL code and ensures our
 * rays and the rest of the indicator are properly rendered onto the canvas.
 */
export declare class WebGLEngine {
    /**
     * The WebGL2 context
     *
     * @var {WebGL2RenderingContext}
     */
    private readonly gl;
    /**
     * The compiled program utilizing our Vertex and Fragment shaders.
     *
     * @var {WebGLProgram}
     */
    private readonly program;
    /**
     * The vertex array used to hold our primitives to be rendered.
     *
     * @var {WebGLVertexArrayObject}
     */
    private readonly vao;
    /**
     * The position buffer that can be loaded up with coordinates for the
     * primitives to be rendered.
     *
     * @var {WebGLContextAttributes}
     */
    private readonly positionBuffer;
    /**
     * Uniform and attribute locations for the various values we need to provide
     * to our shaders.
     */
    private resolutionUniformLocation;
    private matrixUniformLocation;
    private passUniformLocation;
    private textureUniformLocation;
    private blurTexUniformLocation;
    private blurHorizontalUniformLocation;
    private blendRatioUniformLocation;
    private segmentLocs;
    private positionAttributeLocation;
    /**
     * The "pingpong" contains two frame buffers that can be used in a ping-pong
     * fashion to post-process rendered textures. It is done by loading one of the
     * framebuffers, using it to render a single pass, then loading the second
     * buffer and providing the output of the first framebuffer as input to
     * continue to render. This way, we can, e.g., blur an image multiple times
     * with minimal effort.
     */
    private pingpong;
    /**
     * The scene target contains two framebuffers (one used with and one without
     * MSAA enabled) to render our actual rays onto. The result from rendering
     * into either of these two framebuffers will then be post-processed by
     * adding, e.g., bloom and tonemapping.
     */
    private scenetarget;
    /**
     * Determines whether bloom is currently enabled.
     *
     * @var {boolean}
     */
    private bloomEnabled;
    /**
     * How many bloom passes should we do? The actual passes is twice this number
     * since we have to blur horizontally and vertically separately.
     *
     * @var {number}
     */
    private nBloomPasses;
    /**
     * How large should the textures be rendered? Usually, it is recommended to
     * render at the actual device pixel size, not the CSS pixel size (which, on
     * high-DPI displays, is often half or a third of the actual pixels).
     *
     * @var {number}
     */
    private textureSizeModifier;
    /**
     * Should we perform a MSAA pass over the rendered image?
     *
     * @var {boolean}
     */
    private msaaEnabled;
    /**
     * This is a non-settable factor by which to multiply our colors. We are using
     * HDR colors (that exceed 1.0 or 255 in color intensity) to enable a better
     * bloom experience.
     *
     * @var {number}
     */
    private hdrFactor;
    constructor(gl: WebGL2RenderingContext);
    /**
     * Enables or disables bloom effect.
     *
     * @param  {boolean}  enabled  Whether bloom should be enabled
     */
    setBloomEnabled(enabled: boolean): void;
    /**
     * Sets the intensity of bloom to be applied.
     *
     * @param  {number}  intensity  The intensity to use. Higher numbers are more bloomy results.
     */
    setBloomIntensity(intensity: 1 | 2 | 4 | 8): void;
    /**
     * Enables or disables MSAA.
     *
     * @param   {boolean}  enabled  Whether MSAA should run
     */
    setMSAAEnabled(enabled: boolean): void;
    /**
     * Determines how large textures are being rendered. By default, this uses the
     * device's pixel ratio (window.devicePixelRatio), but it can be overridden.
     * The larger the textures, the more resource-intensive.
     *
     * @param   {number}  mod  The new modifier. Should be 1, 2, 3, 4, or so.
     */
    setTextureSizeModifier(mod: number): void;
    /**
     * Sets the color segments. Allows up to four segments.
     *
     * @param  {Vec4<{ color: number[], ratio: number }>}  segments  The new segments
     */
    setSegments(segments: Vec4<Segment>): void;
    /**
     * Whenever the canvas size changes, we must call this routine to re-configure
     * all textures and framebuffers. Otherwise, all hell will break loose.
     */
    onResize(): void;
    /**
     * Creates textures with some defaults. Courtesy of WebGL fundamentals.
     *
     * @return  {WebGLTexture}  The created and configured texture.
     */
    private createTexture;
    /**
     * Set a given framebuffer including a viewport setting. Courtesy of WebGL
     * fundamentals.
     *
     * @param {WebGLFramebuffer|null} fbo
     * @param {number} width
     * @param {number} height
     */
    setFramebuffer(fbo: WebGLFramebuffer | null, width: number, height: number, variant?: 'read' | 'draw' | 'both'): void;
    /**
     * Returns the wanted texture size. NOTE that this is NOT the same as the
     * canvas size. Higher texture sizes are more performance-heavy, but can
     * result in smoother results.
     *
     * @return  {{ cWidth: number, cHeight: number }}  The wanted size
     */
    textureSize(): {
        cWidth: number;
        cHeight: number;
    };
    /**
     * Expects a bunch of coordinates (pixels) and accompanying colors. This
     * function is called by the Iris Indicator to perform the actual rendering.
     *
     * @param {Float32Array} triangleData
     * @param {number} count
     * @param {number[]} matrix
     */
    draw(triangleData: Float32Array, count: number, matrix: number[]): void;
    /**
     * Performs a blur pass across the provides source texture. This uses the
     * "ping pong" strategy to progressively apply blur to the image.
     *
     * @param   {WebGLTexture}  sourceTexture  The image to be "bloomed."
     *
     * @return  {WebGLTexture}                 The texture to which the bloom has
     *                                         been applied.
     */
    private bloomPass;
    /**
     * Very simple routine to write the coordinates for a full-screen rectangle
     * into the vertex buffer. NOTE: This requires the position buffer to be
     * bound. Currently, we only have a single buffer, so this will work, but if
     * we ever add more vertex buffers, this becomes important.
     *
     * @param  {number}  width   The width of the rectangle
     * @param  {number}  height  The height of the rectangle
     */
    setFramebufferRectangle(width: number, height: number): void;
}
//# sourceMappingURL=webgl-engine.d.ts.map