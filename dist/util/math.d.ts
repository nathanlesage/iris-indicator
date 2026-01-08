/**
 * Defines a simple 3d-matrix type
 */
export type Mat3 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
/**
 * Calculates a triangle based on some information on a ray.
 *
 * @param  {number}  radians      The circule position of the ray
 * @param  {number}  width        The width of the ray at its base (in radians/2)
 * @param  {number}  innerRadius  The inner radius of the ray
 * @param  {number}  outerRadius  The outer radius of the ray
 */
export declare function coordsForRay(radians: number, width: number, innerRadius: number, outerRadius: number): number[];
/**
 * Takes a translation coordinate (x/y) and creates a 3D-matrix which, when
 * multiplied with a position vector, will translate that vector by this amount.
 * Courtesy of WebGL fundamentals.
 *
 * @param   {number}  tx  The x-axis translation
 * @param   {number}  ty  The y-axis translation
 * @returns {Mat3}        The translation matrix
 */
export declare function translationMatrix(tx: number, ty: number): Mat3;
/**
 * Takes a rotation in radians and produces a matrix that, when multiplied with
 * a position vector, will rotate this vector by this amount. Courtesy of WebGL
 * fundamentals.
 *
 * @param   {number}  rad  The angles to rotate around
 * @returns {Mat3}         The rotation matrix
 */
export declare function rotationMatrix(rad: number): Mat3;
/**
 * Takes two matrices and multiplies them. Courtesy of WebGL fundamentals.
 *
 * @param   {Mat3}  mat1  Matrix one
 * @param   {Mat3}  mat2  Matrix two
 * @returns {Mat3}        The resulting matrix
 */
export declare function mat3mul(mat1: Mat3, mat2: Mat3): Mat3;
//# sourceMappingURL=math.d.ts.map