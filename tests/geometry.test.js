import { describe, it, expect } from 'vitest';
import { doLinesIntersect } from '../src/core/geometry';

describe('Geometry utilities', () => {
  describe('doLinesIntersect', () => {
    // Test case 1: Crossing lines
    it('should return true for crossing lines', () => {
      // Line 1: (0,0) to (10,10)
      // Line 2: (0,10) to (10,0)
      const a = { x: 0, y: 0 };
      const b = { x: 10, y: 10 };
      const c = { x: 0, y: 10 };
      const d = { x: 10, y: 0 };

      expect(doLinesIntersect(a, b, c, d)).toBe(true);
    });

    // Test case 2: Crossing lines (different orientation)
    it('should return true for crossing lines with different orientation', () => {
      // Line 1: (2,2) to (8,8)
      // Line 2: (2,8) to (8,2)
      const a = { x: 2, y: 2 };
      const b = { x: 8, y: 8 };
      const c = { x: 2, y: 8 };
      const d = { x: 8, y: 2 };

      expect(doLinesIntersect(a, b, c, d)).toBe(true);
    });

    // Test case 3: Touching at endpoints (should be false)
    it('should return false for lines touching at endpoints', () => {
      // Line 1: (0,0) to (5,5)
      // Line 2: (5,5) to (10,0)
      const a = { x: 0, y: 0 };
      const b = { x: 5, y: 5 };
      const c = { x: 5, y: 5 };
      const d = { x: 10, y: 0 };

      expect(doLinesIntersect(a, b, c, d)).toBe(false);
    });

    // Test case 4: Touching at endpoints (different points)
    it('should return false for lines touching at different endpoints', () => {
      // Line 1: (0,0) to (5,5)
      // Line 2: (0,0) to (5,0)
      const a = { x: 0, y: 0 };
      const b = { x: 5, y: 5 };
      const c = { x: 0, y: 0 };
      const d = { x: 5, y: 0 };

      expect(doLinesIntersect(a, b, c, d)).toBe(false);
    });

    // Test case 5: Parallel non-overlapping lines
    it('should return false for parallel non-overlapping lines', () => {
      // Line 1: (0,0) to (10,0)
      // Line 2: (0,5) to (10,5)
      const a = { x: 0, y: 0 };
      const b = { x: 10, y: 0 };
      const c = { x: 0, y: 5 };
      const d = { x: 10, y: 5 };

      expect(doLinesIntersect(a, b, c, d)).toBe(false);
    });

    // Test case 6: Parallel non-overlapping lines (vertical)
    it('should return false for vertical parallel non-overlapping lines', () => {
      // Line 1: (0,0) to (0,10)
      // Line 2: (5,0) to (5,10)
      const a = { x: 0, y: 0 };
      const b = { x: 0, y: 10 };
      const c = { x: 5, y: 0 };
      const d = { x: 5, y: 10 };

      expect(doLinesIntersect(a, b, c, d)).toBe(false);
    });

    // Test case 7: Collinear non-overlapping lines
    it('should return false for collinear non-overlapping lines', () => {
      // Line 1: (0,0) to (5,0)
      // Line 2: (6,0) to (10,0)
      const a = { x: 0, y: 0 };
      const b = { x: 5, y: 0 };
      const c = { x: 6, y: 0 };
      const d = { x: 10, y: 0 };

      expect(doLinesIntersect(a, b, c, d)).toBe(false);
    });

    // Test case 8: Almost parallel lines
    it('should correctly handle almost parallel lines', () => {
      // Line 1: (0,0) to (10,0.1)
      // Line 2: (0,5) to (10,4.9)
      const a = { x: 0, y: 0 };
      const b = { x: 10, y: 0.1 };
      const c = { x: 0, y: 5 };
      const d = { x: 10, y: 4.9 };

      expect(doLinesIntersect(a, b, c, d)).toBe(false);
    });

    // Test case 9: T-junction (touching at endpoint)
    it('should return false for T-junction (one line ending at the middle of another)', () => {
      // Line 1: (0,5) to (10,5)
      // Line 2: (5,0) to (5,5)
      const a = { x: 0, y: 5 };
      const b = { x: 10, y: 5 };
      const c = { x: 5, y: 0 };
      const d = { x: 5, y: 5 };

      // This should be false because they touch at an endpoint of the second line
      expect(doLinesIntersect(a, b, c, d)).toBe(false);
    });
  });
});
