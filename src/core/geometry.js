/**
 * Determines if two line segments intersect, ignoring shared endpoints.
 *
 * @param {Object} a - First point of the first line segment with x and y coordinates
 * @param {Object} b - Second point of the first line segment with x and y coordinates
 * @param {Object} c - First point of the second line segment with x and y coordinates
 * @param {Object} d - Second point of the second line segment with x and y coordinates
 * @returns {boolean} - True if the line segments intersect, false otherwise
 */
export function doLinesIntersect(a, b, c, d) {
  // Check if any endpoints are shared - if so, return false
  if (
    (a.x === c.x && a.y === c.y) ||
    (a.x === d.x && a.y === d.y) ||
    (b.x === c.x && b.y === c.y) ||
    (b.x === d.x && b.y === d.y)
  ) {
    return false;
  }

  // Calculate the direction vectors
  const v1 = { x: b.x - a.x, y: b.y - a.y };
  const v2 = { x: d.x - c.x, y: d.y - c.y };

  // Calculate the cross product of the direction vectors
  const crossProduct = v1.x * v2.y - v1.y * v2.x;

  // If cross product is zero, lines are parallel or collinear
  if (Math.abs(crossProduct) < Number.EPSILON) {
    return false; // Parallel lines don't intersect
  }

  // Calculate vectors from a to c
  const v3 = { x: c.x - a.x, y: c.y - a.y };

  // Calculate parameters for the intersection point
  const t = (v3.x * v2.y - v3.y * v2.x) / crossProduct;
  const u = (v3.x * v1.y - v3.y * v1.x) / crossProduct;

  // Check if the intersection point is within both line segments
  return t > 0 && t < 1 && u > 0 && u < 1;
}

export default {
  doLinesIntersect,
};
