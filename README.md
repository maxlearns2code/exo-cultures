# 👾 EXO-CULTURES: Unified Collaborative Alien Expedition

> **Interactive Arcade Cabinet & Web Platform for Raspberry Pi 400 + 8BitDo Arcade Stick + 14" CRT TV**  
> **Exhibition Context:** Physical gallery showcase & worldwide web platform  
> **Team Creators:** Maxime Dewynter, Martin, Aisah, Mana  
> **Framework:** Next.js (App Router, React 19, TypeScript, Three.js, Tailwind CSS)  
> **GitHub Repository:** [https://github.com/maxlearns2code/exo-cultures](https://github.com/maxlearns2code/exo-cultures.git)  

---

## 🏛️ Project Overview: One Unified Game

Rather than presenting fragmented individual mini-demos, our team (Maxime Dewynter, Martin, Aisah, and Mana) has **combined our speculative fiction into one common collaborative game**: **Echoes in the Dark**.

- **Narrative Fusion:**
  1. **The Sub-Ice Oceanic Abyss (Maxime):** The environmental foundation—a subterranean void deprived of star-light where acoustic and light frequencies replace conventional speech.
  2. **3D Photonic LiDAR & Floral Resonance (Martin):** The core 3D interaction engine—real-time raycasting LiDAR scans that reveal pitch-black terrain, with dormant floral beacons waiting to bloom.
  3. **Acoustic Harmony & Calling Chambers (Aisah):** The resonance ecology—bloomed flowers emit acoustic harmonic pulses to call a distant counterpart through the cosmos.
  4. **Atmospheric Vectors & Spore Defense (Mana):** The exospheric hazards—airborne viral spore colonies that threaten to infect and wither the resonant flowers.

---

## 🕹️ Hardware & Controls

### Universal Control Mapping (8BitDo Arcade Stick & Keyboard/Mouse)

| Logical Action | 8BitDo Arcade Stick | Keyboard / Mouse Primary | Keyboard Alternative |
| :--- | :--- | :--- | :--- |
| **Move Forward/Back** | Joystick UP / DOWN | `W` / `S` | `ArrowUp` / `ArrowDown` |
| **Strafe Left/Right** | Joystick LEFT / RIGHT | `A` / `D` | `ArrowLeft` / `ArrowRight` |
| **Wide LiDAR Scan** | Button X (Top Row 1) | **Mouse Left-Click** | `Space` / `Z` |
| **Focused Beam (Charge/Burn)** | Button Y (Top Row 2) | **Mouse Right-Click** | `KeyQ` / `C` |
| **Bloom Floral Beacon** | Hold Button A (Bottom Row 1) | **Hold `E`** | Hold `Enter` |
| **Exhibition Dossier** | Button Y (on Hub) | `Y` | `D` |
| **Universal Exit (Hold 1.2s)** | Hold START / SELECT | **Hold `Escape` (1.2s)** | `Backspace` |

---

## 🚀 Getting Started

### Installation
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production / exhibition kiosk
pnpm build
pnpm start
```

### 📺 Exhibition Mode (Raspberry Pi 400 + Recalbox RGB Dual)
- **Display Output:** 15kHz analog RGB via SCART to 14" CRT TV.
- **Aspect Ratio:** CRT 4:3 safe-zone framing with procedural scanlines and curvature.
- **Universal Exit:** Holding `START` for 1.2 seconds safely returns to the exhibition title screen.
- **Zero Asset Loading Lag:** Procedural Three.js vector point cloud buffer and Web Audio API synthesis for 100% offline reliability.
