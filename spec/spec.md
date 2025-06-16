# TryAngle – Developer Specification

## Overview
TryAngle is a minimalist browser-based two-player strategy game where players take turns connecting dots to form triangles. The game focuses on clean UI, strategic play, and no distractions.

---

## 1. Technology Stack
- **Frontend only**
- **Languages**: HTML, CSS, vanilla JavaScript
- **Persistence**: `localStorage` (for temporary in-session state recovery)
- **Rendering**: SVG

---

## 2. Game Modes
- **Human vs Human** (same device)
- **Human vs Computer**
    - Easy: Random valid moves (AI identity: 🪱 Wiggly Worm)
    - Advanced: Greedy strategy (🦫 Busy Beaver)
    - Pro: Greedy + lookahead (🦉 Wise Owl)

---

## 3. Game Initialization
- Main Menu:
    - Board size: 5×5, 10×10, 20×20
    - Mode: Human vs Human / Human vs AI
    - AI difficulty: Easy / Advanced / Pro
    - Start button
    - Help icon (rules popup)
- Settings **reset to default** on each visit

---

## 4. UI & UX Design
- **Minimalist layout**, fully responsive (desktop & mobile)
- **Dots**: circular, hover when valid, highlight on selection
- **Lines**: neutral color, animated draw (~200ms)
- **Triangles**:
    - Semi-transparent fill with player’s color
    - Area-calculated, triangle scored instantly
- **Scoring UI**:
    - Area % per player, visible at top or sidebar
    - Active player visually highlighted
- **Colors**: Distinct pastel palette, mapped to animal+emoji identities

---

## 5. Player Identity
- Players assigned:
    - Pastel color
    - Animal name + emoji
- Fixed color-to-animal mapping for consistency
    - Example: pastel blue = 🦊 Fox, pastel pink = 🐢 Turtle
- AI identities:
    - Easy: 🪱 Wiggly Worm (green)
    - Advanced: 🦫 Busy Beaver (yellow)
    - Pro: 🦉 Wise Owl (violet)

---

## 6. Game Mechanics
### Valid Move
- Select first dot (highlighted)
- Select second dot:
    - If illegal (crosses existing line or dot): not hoverable/selectable
    - If valid: draw line, animate

### Triangle Formation
- After each move, check if a triangle is formed:
    - Topological check: 3 lines forming a closed loop of 3 dots
    - Only one triangle can exist per 3-dot combo
- On triangle completion:
    - Fill with player’s color (semi-transparent)
    - Disable and gray out all **enclosed** dots (not vertices)
    - Update player’s score (area % of board)
    - If triangle **engulfs another triangle**:
        - Revoke smaller triangle
        - Transfer area to enclosing triangle owner
- If any triangle formed → same player plays again

### Game End
- Triggered when:
    - One player has >50% area
    - No moves left and equal score
- Final screen:
    - Winner (or Draw)
    - Final percentages
    - "Play Again" or "Main Menu"

### Abandon Game
- Button shown during game
- Shows confirmation dialog
- Returns to main menu, state discarded

### Session Persistence
- Game state is **stored in localStorage** to survive refresh/reopen
- No long-term stat tracking or account storage

---

## 7. Error Handling & Validations
- Dot selection strictly validated:
    - Non-hoverable if move would be invalid
    - Dot-to-dot line blocked if it intersects any existing line or passes through another dot
- Triangle detection logic should prevent double scoring

---

## 8. Data Structure Example (Simplified)
```js
{
  boardSize: 10,
  players: [
    { color: '#AEC6CF', name: '🦊 Fox', score: 23 },
    { color: '#FFDAB9', name: '🐢 Turtle', score: 17 }
  ],
  activePlayerIndex: 0,
  lines: [ [0,1], [1,2], [2,0] ],
  triangles: [ { points: [0,1,2], owner: 0 } ],
  disabledDots: [3, 4, 5],
  mode: 'human_vs_ai',
  difficulty: 'pro'
}
```

---

## 9. Testing Plan
- **Unit tests**:
    - Triangle detection logic
    - Line validity (no intersection / dot-crossing)
    - Scoring & area calculation
- **Integration tests**:
    - Full game flow (start to finish)
    - AI move strategies
- **Manual testing**:
    - Mobile vs Desktop layouts
    - Refreshing in mid-game
    - Abandon and restart flows

---
