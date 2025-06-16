/**
 * Board component that renders a grid of dots
 * @param {Object} props - Component properties
 * @param {number} props.rows - Number of rows in the grid (required)
 * @param {number} props.cols - Number of columns in the grid (required)
 * @returns {SVGElement} - SVG group element containing the grid of dots
 */
export default function Board({ rows, cols }) {
  // Create SVG group element
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.classList.add('board');

  // Constants for grid layout
  const DOT_RADIUS = 8;
  const SPACING = 40; // Space between dots

  // Create dots in a grid pattern
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      // Position the circle in the grid
      circle.setAttribute('cx', col * SPACING + DOT_RADIUS);
      circle.setAttribute('cy', row * SPACING + DOT_RADIUS);
      circle.setAttribute('r', DOT_RADIUS);
      circle.setAttribute('fill', '#333');
      circle.classList.add('dot');

      // Add data attributes for easier identification
      circle.dataset.row = row;
      circle.dataset.col = col;

      // Add the circle to the group
      group.appendChild(circle);
    }
  }

  return group;
}
