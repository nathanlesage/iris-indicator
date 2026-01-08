import { type Vec4 } from '.';
/**
 * We consciously limit the amount of color options to some that can be decently
 * visually distinguished.
 */
export type BuiltInColor = 'blue' | 'red' | 'yellow' | 'green' | 'purple';
/**
 * This class creates and maintains an entire Iris indicator.
 */
export declare class IrisIndicator {
    /**
     * Holds the WebGL engine used to draw onto the canvas.
     *
     * @var {WebGLEngine}
     */
    private engine;
    /**
     * The factor of rays to draw when the indicator should automatically adjust
     * the amount of rays based on the canvas size.
     *
     * @var {number}
     */
    private autoRayAdjustmentFactor;
    /**
     * How many rays to draw
     *
     * @var {number}
     */
    private nRays;
    /**
     * Should the indicator automatically adjust the number of rays to match the
     * current canvas size?
     *
     * @var {boolean}
     */
    private autoAdjustRays;
    /**
     * How quickly should segments be animated towards their correct target ratio
     * if the ratios change (after calling `setSegments`)? This is given in
     * milliseconds per step.
     *
     * @var {number}
     */
    private segmentAdjustmentAnimationStepDuration;
    /**
     * How many milliseconds should the entire indicator take to make a full turn
     * by 360°?
     *
     * @var {number}
     */
    private msPerRotation;
    /**
     * How quickly should the rays move between their inner and outer radii?
     *
     * @var {number}
     */
    private rayMovementSpeed;
    /**
     * Holds colors. Associates simple color names with actual color value vectors.
     */
    private readonly colormap;
    /**
     * Contains the counts associated with each of the four segments (i.e., how
     * large each segment should be rendered).
     */
    private segmentCounts;
    /**
     * Holds the target ratios for each of the four segments (how large they
     * should be once they are done animating).
     */
    private segmentRatiosTarget;
    /**
     * Holds the current ratios for each of the four segments that is used to
     * display them. Is constantly adjusted towards the target ratios for each
     * render cycle using an easing animation.
     */
    private segmentRatiosCurrent;
    /**
     * Specifies the colors to use for each segment (in RGBA 0-1).
     */
    private segmentColors;
    /**
     * Should the engine limit the FPS of the animation?
     */
    private fpsLimitEnabled;
    /**
     * If the animation should limit the FPS, to how many should it limit? Note
     * that this internal variable holds the actual time-to-frame, not the frames
     * per second. Whenever you change the FPS limit the class will convert it to
     * ms per frame to save on calculation costs.
     */
    private fpsLimit;
    /**
     * Holds the timings for each frame, for the last couple of frames. Can be
     * used to calculate the actual FPS with which the indicator is being
     * rendered, using a rolling average.
     */
    private frameTimings;
    /**
     * Internal timestamp used to calculate the delta time between animations.
     */
    private timestamp;
    /**
     * Internal timestamp used to calculate the delta time between animations.
     */
    private previousTimestamp;
    /**
     * Flag set by the onResize handler to indicate to the drawing loop that the
     * canvas has changed. This synchronizes any recalculations to the frame
     * animation to ensure that there is no flickering.
     */
    private resizeOnNextDraw;
    /**
     * Holds the actual rays to be rendered.
     */
    private rays;
    /**
     * Creates a new iris indicator, to be rendered within the WebGL context of a
     * canvas.
     *
     * @param   {WebGL2RenderingContext}  gl  The context
     */
    constructor(gl: WebGL2RenderingContext);
    /**
     * Sets the colors to be used in the corona indicator. Choose one for each
     * from the provided colors.
     *
     * @param  {Vec4<BuiltinColor>}  colors  The colors to use for each segment
     */
    setColors(colors: Vec4<BuiltInColor>): void;
    /**
     * Sets the segment adjustment step duration in Milliseconds. What this means
     * is that each `duration`ms, the segments will be moved closer towards their
     * target size. Note, however, that the actual duration is longer, since the
     * step sizes will be smaller to produce an easing effect.
     *
     * @param   {number}  duration  The duration in milliseconds. Default is 200.
     */
    setSegmentAdjustmentStepDuration(duration: number): void;
    /**
     * Set the current element counts to be displayed in the corona indicator.
     *
     * @param  {number[]}  counts  The amount for each segment. Must be absolute.
     */
    setSegmentCounts(counts: Vec4<number>): void;
    setSegments(): void;
    /**
     * Specify the number of rays to be drawn. NOTE: This disables the auto-
     * adjustment of the number of rays on resizing the canvas.
     *
     * @param   {number}  count  The number of rays to draw.
     */
    setRayCount(count: number): void;
    /**
     * Determines how fast the corona will rotate around the origin. Provide the
     * number of seconds for one full rotation. Default is 45 seconds. We
     * generally do not recommend a fast rate here.
     *
     * @param   {number}  seconds  The number of seconds per full rotation
     */
    setRotationSpeed(seconds: number): void;
    /**
     * Sets the ray movement speed in seconds. Each ray has an "inner" and an
     * "outer" radius, and it will oscillate between these two to provide more
     * movement to the animation. With this function, you can determine how many
     * seconds it will take for each ray to move from its minimum to its maximum
     * radius (and vice versa). The default is 5.
     *
     * @param   {number}  seconds  The number of seconds for one movement.
     */
    setRayMovementSpeed(seconds: number): void;
    /**
     * This will set the renderer to automatically calculate the amount of rays to
     * be draawn.
     */
    enableAutomaticRayAdjustment(): void;
    /**
     * Enables or disables the bloom on the renderer.
     *
     * @param   {boolean}  enabled  Whether bloom is enabled
     */
    setBloomEnabled(enabled: boolean): void;
    /**
     * Sets the intensity of the bloom effect
     *
     * @param  {1|2|4|8}  intensity  The wanted intensity
     */
    setBloomIntensity(intensity: 1 | 2 | 4 | 8): void;
    /**
     * Enables or disables MSAA.
     *
     * @param   {boolean}  enabled  Whether MSAA is enabled
     */
    setMSAAEnabled(enabled: boolean): void;
    /**
     * Sets the rendering resolution/texture size modifier. The higher, the more
     * resource heavy, but also the sharper the result, especially with MSAA on.
     *
     * @param   {number}  mod  The modifier
     */
    setTextureSizeModifier(mod: number): void;
    /**
     * Enables or disables the FPS limiter
     *
     * @param   {boolean}  enabled  Whether the FPS limiter should be enabled
     */
    setFpsLimitEnabled(enabled: boolean): void;
    /**
     * Sets the FPS limit (common values are 30 or 60). Default is 30.
     *
     * @param   {number}  fpsLimit  The new FPS limit.
     */
    setFpsLimit(fpsLimit: number): void;
    /**
     * Returns the current average frames per second, sampled over the last 120 fps.
     *
     * @return  {number}  The average Fps
     */
    getCurrentFps(): number;
    /**
     * Callback function used to indicate to the indicator that the canvas size
     * has changed and the renderer should re-calculate various numbers.
     */
    onResize(): void;
    /**
     * Main function: Call this to start rendering to the canvas.
     */
    enterRenderingLoop(): void;
    /**
     * Main loop executor
     */
    private loop;
    /**
     * Calculates the optimal amount of rays based on the current canvas size. The
     * various calculations have been empirically determined.
     *
     * @return  {number}  The number of rays that would look good at the current
     *                    resolution.
     */
    private calculateOptimalRayCount;
    /**
     * This routine actually calculates everything whenever a resize command is
     * issued.
     */
    private doResizeCalculation;
    /**
     * (Re-)generate the rays to be displayed.
     */
    private generateRays;
    /**
     * This routine actually draws a frame by performing any update calculations
     * and perusing the WebGL rendering engine to draw the data onto the screen.
     */
    private drawFrame;
}
//# sourceMappingURL=iris-indicator.d.ts.map