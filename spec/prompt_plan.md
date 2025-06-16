### Prompt 01 – Project Bootstrap
```text
Create a vanilla-JS Vite project called “tryangle”.
Add ESLint (airbnb-base), Prettier, and Vitest.
Provide a passing sample test in `tests/smoke.test.js`.
Ensure:
  - `npm run dev` starts the app
  - `npm test` runs Vitest
  - `npm run lint` runs ESLint
Return the exact shell commands a contributor must run after cloning.
```

### Prompt 02 – GitHub Actions CI
```text
Add `.github/workflows/ci.yml` that:
  1. Checks out code
  2. Caches node_modules with actions/setup-node
  3. Runs `npm ci`
  4. Executes: lint → test → build
Fail the build on any non-zero exit.
```
### Prompt 03 – Render Dot Grid
```text
Implement `components/Board.js`.
Responsibilities:
  - Render an SVG `<g>` of 25 `<circle>`s (radius = 8) in a 5×5 grid.
  - Accept props: `rows`, `cols` (default 5).
Add `board.test.js`:
  - Mount Board with defaults; assert there are exactly 25 dots via @testing-library/dom.
```
### Prompt 04 – Parameterize Board Size
```text
Refactor Board so `rows`/`cols` props are required (no defaults).
Update tests: mount 10×10, expect 100 dots.
```
### Prompt 05 – Geometry Utils – Lines Intersection
```text
Create `core/geometry.js` with `doLinesIntersect(a, b, c, d)`.
Implement robust 2-segment intersection ignoring shared endpoints.
Write exhaustive unit tests for:
  - Crossing lines
  - Touching at endpoints (should be false for “intersect”)
  - Parallel non-overlapping
```
### Prompt 06 – Basic Line Drawing
```text
Enhance Board:
  - First dot click: highlight selection.
  - Second dot click: draw an SVG `<line>` element (class `line line--pending`).
  - Draw line over 200ms
  - Clear selection after draw.
  - Add line segment to game state
Add DOM test: simulate two clicks → one line element present.
```
### Prompt 07 – Line Validity Enforcement
```text
Before committing a line:
  - Reject if identical line exists.
  - Reject if `doLinesIntersect` detects crossing.
  - Reject if the new segment’s interior passes through any dot coordinate.
Add unit tests covering each rejection path.
```
### Prompt 08 – Triangle Detection
```text
Add `detectTriangles(lines)` in `core/geometry.js` returning an array of triangles
(each as `[dotId1, dotId2, dotId3]` sorted ascending).
Tests:
  - Feed a known 3-line set → expect one triangle.
  - Feed non-triangle set → expect empty array.
```
### Prompt 09 – Triangle Fill & Score
```text
When detectTriangles returns NEW triangles:
  - Append an SVG `<polygon>` with 40 % opacity in the current player color.
  - Update `player.areaScore` (Shoelace).
  - Add triangle(s) to game state identified by owner
Unit test: supply a forced triangle scenario → expect polygon + score change.
```
### Prompt 10 – Gray Enclosed Dots
```text
After filling a triangle:
  - Identify dots whose centroid lies strictly inside ANY filled triangle.
  - Add class `dot--inside` (CSS sets fill:#777).
Unit test: create triangle, assert enclosed dots get the class.
```
### Prompt 11 – Remove Enclosed Lines
```text
After filling a triangle:
  - Identify line segments between dots whose centroid lies strictly inside ANY filled triangle.
  - Remove line from segment from grid
  - Remove line from game state
Unit test: create triangle, assert enclosed lines removed, assert outer lines remain.
```
### Prompt 12 – Turn Management
```text
Introduce `state.activePlayer`.
Rule:
  - If the last move formed ≥ 1 triangle, the same player moves again.
  - Else toggle player.
Unit tests for both branches.
```
### Prompt 13 – Player Identity
```text
You are enhancing TryAngle’s player-setup logic.

**Task**  
Add a function `getRandomHumanIdentity()` in `core/identity.js` that:

1. Imports the array `HUMAN_IDENTITIES` (30 emoji/name/color tuples).  
2. Returns a shallow-copied random object `{ emoji, name, color }`.  
3. Guarantees no collision with an already-selected player by accepting an optional `exclude` array of emoji strings.

Call this function to set up player identities after start button is pressed

**Deliverables**  
- Implementation in `core/identity.js`.  
- Unit test `identity.test.js` mocking Math.random to verify deterministic pick and collision avoidance.
```
### Prompt 14 – AI Identity
```text
Add `AI_IDENTITIES` constant to `core/identity.js`:

```js
export const AI_IDENTITIES = {
  easy:   { emoji: "🪱", name: "Wiggly Worm", color: "#4CAF50" },   // green
  greedy: { emoji: "🦫", name: "Busy Beaver",  color: "#FFD700" },  // yellow
  pro:    { emoji: "🦉", name: "Wise Owl",     color: "#8A2BE2" }   // violet
};

Create helper getAiIdentity(level) that:
- Accepts "easy" | "greedy" | "pro".
- Returns the corresponding identity object (no randomness).
- Throws if level is unknown.

Add unit tests in identity.test.js for happy paths and invalid input.
```
### Prompt 15 – Score/Turn Banner
```text
Create `components/ScoreBar.js`:
  - Shows each player’s emoji, captured area %, and whose turn (glow player name and emoji).
Snapshot-test the DOM output for a sample state.
```
### Prompt 16 – Main Menu & Settings
```text
Build `components/Menu.js`:
  - Fields: boardSize (radio 5/10/20), mode (HvH/HvAI), aiLevel (easy/greedy/pro).
  - Start button routes to game view with chosen settings.
Add integration test that selecting 10×10+HvAI starts a game with 100 dots.
```
### Prompt 17 – Help Modal
```text
Create `components/HelpModal.js`:
  - Hidden by default; opens via ❓ icon in Menu.
  - Contains concise rules copied from `rules.md`.
Write a test: click icon → modal visible → ESC closes.

```
### Prompt 18 – Abandon Flow
```text
Add “Abandon” button in game toolbar:
  - Confirm dialog. On confirm → return to Menu and clear state.
Test: start game, abandon, ensure Board unmounts and localStorage cleared.
```
### Prompt 19 – Random AI
```text
Implement `ai.randomMove(state)` → returns a legal `[dotIdA, dotIdB]`.
Hook into main loop when mode=HvAI+easy.
Unit test: mock RNG to deterministic pair; expect move performed.
```
### Prompt 20 – Greedy AI
```text
`ai.greedyMove(state)` chooses the move that maximises immediate area gain.
Test: simulate 200 games random vs greedy; assert greedy total area > random by ≥ 10 %.
```
### Prompt 21 – Look-Ahead AI
```text
Implement depth-2 minimax with alpha-beta pruning (`ai.minimaxMove(state)`).
Provide benchmark test: in 50 minimax vs greedy games, minimax wins ≥ 60 %.
```
### Prompt 22 – localStorage Persistence
```text
Add `persistence.save(state)` called after each committed move.
On app start, if saved state exists → show “Resume?” overlay with Yes/No.
Test: simulate save, refresh (jsdom reload), click Yes → board re-hydrates.
```
### Prompt 23 – Board Fade-In Transition
```text
Add `.board--enter` CSS with 0→1 opacity over 200 ms.
Apply class on game view mount; remove after animationend.
Manual QA checklist entry; no unit test.
```
### Prompt 24 – Responsive & Touch
```text
CSS:
  - On ≤ 600 px width: vertical stack (Menu above Board).
JS:
  - Support tap events for dot selection.
Write an e2e-like DOM test emulating touchstart/touchend for line draw.
```
### Prompt 25 – GitHub Pages Release
```text
Adjust `vite.config.js` base to `/tryangle/`.
Add `deploy.yml` GitHub Actions workflow:
  - On push to main + passing CI
  - Build, deploy `dist` to gh-pages branch.
Update `README.md` with badge and live link.
```
