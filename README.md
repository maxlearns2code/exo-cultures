# 👾 EXO-CULTURES: 4 Alien Civilizations Web Arcade

> **Interactive Arcade Cabinet & Web Platform for Raspberry Pi 400 + 8BitDo Arcade Stick + 14" CRT TV**  
> **Exhibition Context:** Physical gallery showcase & worldwide web platform  
> **Team Creators:** Maxime Dewynter, Aisah, Martin, Mana  
> **Framework:** Next.js (App Router, React 19, TypeScript, Tailwind CSS)  
> **GitHub Repository:** [https://github.com/maxlearns2code/exo-cultures](https://github.com/maxlearns2code/exo-cultures.git)  

---

## 🏛️ Platform Overview

`exo-cultures` is a unified arcade hub launcher hosting 4 playable alien games:
1. **Chromatic Symbiosis (Maxime Dewynter):** *Harmonic Wave Resonator* — 2D Top-down optical light & frequency puzzle set in the sub-ice abyssal ocean.
2. **Aisah's Culture (Aisah):** Interactive alien ecosystem & bioluminescent collective showcase.
3. **Martin's Culture (Martin):** Cybernetic & geometric resonance architecture showcase.
4. **Mana's Culture (Mana):** Gravitational & atmospheric fluid dynamics showcase.

---

## 🕹️ Hardware & Controls

### Universal Control Mapping (8BitDo Arcade Stick & Keyboard)

| Logical Action | 8BitDo Arcade Stick | Keyboard Primary | Keyboard Alternative |
| :--- | :--- | :--- | :--- |
| **Move Up** | Joystick UP / D-Pad Up | `ArrowUp` | `W` |
| **Move Down** | Joystick DOWN / D-Pad Down | `ArrowDown` | `S` |
| **Move Left** | Joystick LEFT / D-Pad Left | `ArrowLeft` | `A` |
| **Move Right** | Joystick RIGHT / D-Pad Right | `ArrowRight` | `D` |
| **Action 1 (Primary / Beam / Select)** | Button A (Bottom Row 1) | `Space` | `Z` |
| **Action 2 (Secondary / Shift / Back)** | Button B (Bottom Row 2) | `Enter` | `X` |
| **Action 3 (Special / Pulse)** | Button X (Top Row 1) | `ShiftLeft` | `C` |
| **Action 4 (Cycle / Harmonize)** | Button Y (Top Row 2) | `KeyQ` | `V` |
| **Menu / Pause** | START | `Escape` | `P` |
| **Universal Exit to Hub (Hold 2s)** | SELECT + START | `Escape` (Hold 2s) | `Backspace` |

---

## 🚀 Getting Started

### Installation
```bash
# Install dependencies
pnpm install # or npm install

# Run development server (accessible at http://localhost:3000)
pnpm dev

# Build for production / exhibition kiosk
pnpm build
pnpm start
```

### 📺 Exhibition Mode (Raspberry Pi 400 + Recalbox RGB Dual)
- **Aspect Ratio:** Native 4:3 (640×480 @ 60Hz 15kHz SCART).
- **Attract Mode:** Automatically triggers after 90s of inactivity to showcase animated previews of all 4 cultures.
- **Universal Exit:** Holding `SELECT + START` for 2 seconds safely brings players back to the central hub without needing a keyboard or mouse.
- **Deflicker Protection:** Chunky 2px+ borders and high-contrast typography prevent scanline jitter on interlaced CRT tubes.
