import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getByTestId } from '@testing-library/dom';
import Board from '../src/components/Board';

describe('Board component', () => {
  let container;

  beforeEach(() => {
    // Create a container for the board
    container = document.createElement('div');
    container.setAttribute('data-testid', 'board-container');

    // Create an SVG element to hold the board
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    container.appendChild(svg);

    // Add the board to the SVG
    const board = Board(); // Using default props (5x5)
    svg.appendChild(board);

    // Add the container to the document body
    document.body.appendChild(container);
  });

  it('should render a 5x5 grid with 25 dots by default', () => {
    // Get the board container
    const boardContainer = getByTestId(document, 'board-container');

    // Get all circles within the SVG using querySelector
    const dots = boardContainer.querySelectorAll('circle.dot');

    // Assert there are exactly 25 dots (5x5 grid)
    expect(dots.length).toBe(25);

    // Additional assertions to verify the grid structure
    expect(dots[0].getAttribute('r')).toBe('8'); // Check radius
    expect(dots[0].classList.contains('dot')).toBe(true); // Check class
  });

  // Clean up after each test
  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });
});
