import { type BuiltInColor } from "./iris-indicator";
export type Vec4<T = number> = [T, T, T, T];
declare const globalState: {
    fpsLimit: number;
    enableFpsLimit: boolean;
    segmentColors: Vec4<BuiltInColor>;
    segmentCounts: Vec4;
    segmentAdjustmentStepDuration: number;
    simulation: boolean;
    rotationSpeed: number;
    raySpeed: number;
    bloomEnabled: boolean;
    bloomIntensity: 1 | 2 | 4 | 8;
    enableMSAA: boolean;
    renderingResolution: 4 | 1 | 2 | 8 | 16;
};
export type GLOBAL_STATE = typeof globalState;
export declare const MAX_SUPPORTED_SEGMENTS = 4;
/**
 * Creates a new iris indicator to render within the provided Canvas element.
 *
 * @param   {HTMLCanvasElement}  canvas  The target canvas element
 */
export declare function setupIrisIndicator(canvas: HTMLCanvasElement): void;
export {};
//# sourceMappingURL=index.d.ts.map