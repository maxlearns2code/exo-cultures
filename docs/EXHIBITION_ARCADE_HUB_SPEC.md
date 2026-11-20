# Exhibition Arcade Platform Spec: 4 Alien Cultures

> **Interactive Web Arcade Hub for Raspberry Pi 400 + 8BitDo Arcade Stick**  
> **Exhibition Context:** Physical gallery/showcase installation + Online browser web platform  
> **Team Creators:** Maxime, Aisah, Martin, Mana (4 Unique Alien Civilizations)  
> **Framework & Hosting:** Next.js (App Router, React 19) deployed on **Vercel**  
> **GitHub Repository:** [https://github.com/maxlearns2code/exo-cultures](https://github.com/maxlearns2code/exo-cultures.git)  
> **Target Display:** 14" CRT Monitor / CRT TV (4:3 Aspect Ratio, 640×480 / 800×600)  
> **Hardware Target:** Raspberry Pi 400 (Chromium Kiosk) + Recalbox RGB Dual & 8BitDo Arcade Stick  
> **Desktop Target:** Standard Web Browsers (Chrome, Firefox, Safari) + Standard Keyboard

---

## 🏛️ 1. Platform Architecture & Exhibition Hub

The website acts as a **central arcade cabinet launcher** hosting 4 playable games, each dedicated to a distinct alien culture developed by your team.

```
┌─────────────────────────────────────────────────────────────┐
│                 EXHIBITION ARCADE LAUNCHER                  │
│            "EXO-CULTURES: 4 Alien Civilizations"            │
├──────────────┬──────────────┬───────────────┬───────────────┤
│    GAME 1    │    GAME 2    │    GAME 3     │    GAME 4     │
│  Chromatic   │   Aisah's    │   Martin's    │    Mana's     │
│  Symbiosis   │   Culture    │    Culture    │    Culture    │
│   (Maxime)   │   (Aisah)    │   (Martin)    │    (Mana)     │
├──────────────┴──────────────┴───────────────┴───────────────┤
│ Attract Mode Screensaver • Universal Exit • Gamepad / Keys   │
└─────────────────────────────────────────────────────────────┘
```

### Next.js App Router Architecture
```
src/
├── app/
│   ├── layout.tsx                     # Global CRT frame, safe-zones & emergency reset listener
│   ├── page.tsx                       # Central 4-Alien-Cultures Launcher / Hub
│   ├── games/
│   │   ├── chromatic-symbiosis/       # Maxime's game
│   │   │   └── page.tsx
│   │   ├── aisah/                     # Aisah's game
│   │   │   └── page.tsx
│   │   ├── martin/                    # Martin's game
│   │   │   └── page.tsx
│   │   └── mana/                      # Mana's game
│   │       └── page.tsx
├── components/
│   ├── hub/                           # Shared launcher UI & Culture previews
│   └── arcade/                        # Reusable Gamepad / Arcade HUD components
└── hooks/
    └── useArcadeInput.ts              # Unified 8BitDo & Keyboard input manager
```

### Dual Deployment Strategy (Vercel + Offline Exhibition)
1. **Global Web Deployment (Vercel):**
   - Automatically builds from `main` branch upon every commit.
   - Hosted at `https://exo-cultures.vercel.app`.
   - Anyone around the world can play with their keyboard (`WASD`/Arrows + `Space`/`Enter`).
2. **Exhibition Kiosk (Raspberry Pi 400):**
   - **Online Mode:** Chromium kiosk directly points to `https://exo-cultures.vercel.app`.
   - **Offline Standalone Mode:** If venue Wi-Fi is unreliable, build the static export (`output: 'export'` or local `next start` on `http://localhost:3000`) so the entire exhibition runs smoothly with zero internet required.

### Essential Exhibition Features
1. **Attract Mode / Idle Loop:** If no button is pressed for 90 seconds, the site returns to the main menu and plays an animated visual reel / gameplay preview of the 4 cultures.
2. **Universal Exit Button Combo:** In a physical exhibition, players cannot press browser back or refresh. Holding **`SELECT + START`** (or pressing a dedicated physical reset button) for 2 seconds quits any active game and returns to the Culture Selection Hub.
3. **Cursor Hiding:** When running on the Raspberry Pi with the arcade stick, hide the mouse cursor (`cursor: none` or `unclutter -idle 0.1` on Linux).
4. **Offline Resilience:** The entire suite can run locally on the Pi without requiring an active internet connection at the venue.

---

## 🕹️ 2. Hardware Constraints & Pi 400 Performance Rules

The **Raspberry Pi 400** is an ARM-based quad-core computer (Broadcom BCM2711 @ 1.8GHz, 4GB RAM) running Chromium on Raspberry Pi OS. To guarantee **locked 60 FPS** on an exhibition monitor:

### What Works Great on Pi 400:
- **HTML5 2D Canvas (`CanvasRenderingContext2D`):** Extremely fast, lightweight, and rock-solid.
- **PixiJS (WebGL 2D):** Hardware-accelerated 2D sprite rendering and particle effects.
- **Phaser 3 (2D Engine):** Excellent for arcade physics, tilemaps, and controller support.
- **Framer Motion / CSS Transforms:** Great for UI menus, as long as `transform: translate3d()` and `will-change` are used.

### What to Avoid on Pi 400:
- Heavy 3D post-processing shaders (bloom, volumetric caustics, screen-space reflections in Three.js).
- Heavy DOM recreation in rapid animation loops.
- Large uncompressed textures (> 2048px).

---

## 🎮 3. Universal Controller Mapping (8BitDo Stick + Keyboard)

The **8BitDo Arcade Stick** presents itself as a standard gamepad via the browser's native **HTML5 Gamepad API** (`navigator.getGamepads()`). 

Below is the standard input mapping to make your game feel native on both the physical arcade stick and any regular keyboard:

### Standard Control Mapping Table

| Logical Action | 8BitDo Arcade Stick Physical Input | Keyboard Primary | Keyboard Alternative |
| :--- | :--- | :--- | :--- |
| **Move Up** | Joystick UP (Axis 1 < -0.5 / D-Pad Up) | `ArrowUp` | `W` |
| **Move Down** | Joystick DOWN (Axis 1 > 0.5 / D-Pad Down) | `ArrowDown` | `S` |
| **Move Left** | Joystick LEFT (Axis 0 < -0.5 / D-Pad Left) | `ArrowLeft` | `A` |
| **Move Right** | Joystick RIGHT (Axis 0 > 0.5 / D-Pad Right) | `ArrowRight` | `D` |
| **Action 1 (Primary / Fire / Emit)** | Button A (Arcade Bottom Row 1) | `Space` | `Z` |
| **Action 2 (Secondary / Shift / Mode)** | Button B (Arcade Bottom Row 2) | `Enter` | `X` |
| **Action 3 (Special / Pulse)** | Button X (Arcade Top Row 1) | `ShiftLeft` | `C` |
| **Action 4 (Cycle / Harmonize)** | Button Y (Arcade Top Row 2) | `KeyQ` | `V` |
| **Menu / Pause** | START | `Escape` | `P` |
| **Return to Hub (Hold 2s)** | SELECT + START (Buttons 8 + 9) | `Escape` (Hold) | `Backspace` |

---

## ⚡ 4. Reusable Unified Input Hook (React / TypeScript)

Use this plug-and-play hook across all 4 games to listen to the 8BitDo Arcade Stick and keyboard simultaneously:

```typescript
// src/hooks/useArcadeInput.ts
"use client";

import { useEffect, useRef } from "react";

export interface ArcadeInputs {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  action1: boolean; // Button A / Space
  action2: boolean; // Button B / Enter
  action3: boolean; // Button X / Shift
  action4: boolean; // Button Y / Q
  start: boolean;
  select: boolean;
  exitCombo: boolean; // SELECT + START held together
}

export function useArcadeInput(onInputStateChange: (inputs: ArcadeInputs) => void) {
  const inputsRef = useRef<ArcadeInputs>({
    up: false,
    down: false,
    left: false,
    right: false,
    action1: false,
    action2: false,
    action3: false,
    action4: false,
    start: false,
    select: false,
    exitCombo: false,
  });

  const keysDown = useRef<Set<string>>(new Set());

  useEffect(() => {
    // 1. Keyboard Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      keysDown.current.add(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDown.current.delete(e.code);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // 2. Gamepad Polling Loop (60Hz)
    let animationId: number;

    const poll = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      const pad = gamepads[0] || gamepads[1]; // First active controller

      const keys = keysDown.current;

      // Stick / D-Pad
      const padUp = pad ? pad.axes[1] < -0.4 || pad.buttons[12]?.pressed : false;
      const padDown = pad ? pad.axes[1] > 0.4 || pad.buttons[13]?.pressed : false;
      const padLeft = pad ? pad.axes[0] < -0.4 || pad.buttons[14]?.pressed : false;
      const padRight = pad ? pad.axes[0] > 0.4 || pad.buttons[15]?.pressed : false;

      // Buttons (8BitDo mapping)
      const btnA = pad?.buttons[0]?.pressed ?? false;
      const btnB = pad?.buttons[1]?.pressed ?? false;
      const btnX = pad?.buttons[2]?.pressed ?? false;
      const btnY = pad?.buttons[3]?.pressed ?? false;
      const btnSelect = pad?.buttons[8]?.pressed ?? false;
      const btnStart = pad?.buttons[9]?.pressed ?? false;

      const state: ArcadeInputs = {
        up: padUp || keys.has("ArrowUp") || keys.has("KeyW"),
        down: padDown || keys.has("ArrowDown") || keys.has("KeyS"),
        left: padLeft || keys.has("ArrowLeft") || keys.has("KeyA"),
        right: padRight || keys.has("ArrowRight") || keys.has("KeyD"),
        action1: btnA || keys.has("Space") || keys.has("KeyZ"),
        action2: btnB || keys.has("Enter") || keys.has("KeyX"),
        action3: btnX || keys.has("ShiftLeft") || keys.has("KeyC"),
        action4: btnY || keys.has("KeyQ") || keys.has("KeyV"),
        start: btnStart || keys.has("Escape") || keys.has("KeyP"),
        select: btnSelect || keys.has("Tab"),
        exitCombo: (btnSelect && btnStart) || (keys.has("Escape") && keys.has("Backspace")),
      };

      inputsRef.current = state;
      onInputStateChange(state);

      animationId = requestAnimationFrame(poll);
    };

    animationId = requestAnimationFrame(poll);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [onInputStateChange]);

  return inputsRef;
}
```

---

## 🎨 5. Game Concepts Adapted for Maxime's Game (*Chromatic Symbiosis*)

Because the arcade stick replaces mouse input, the game mechanics must be **100% digital/stick and button-driven**.

Here are the 3 top designs built specifically for this exhibition:

---

### Concept A (Top Choice): "Harmonic Wave Resonator" — Tactical Arcade Light Puzzle
- **Style:** 2D Top-Down / Isometric Sub-Ice Cavern (HTML5 Canvas 2D or PixiJS).
- **Arcade Controls:**
  - **Joystick:** Maneuver the twin brother around the cavern.
  - **Button 1 (A):** Emit light beam in the direction you are facing.
  - **Button 2 (B):** Cycle light wavelength (Cyan ➔ Magenta ➔ Golden Amber).
  - **Button 3 (X):** Whistle / Call twin brother to hold hands (combines your beams into resonant white/violet energy).
- **Core Loop:**
  - Caverns are pitch-dark. The father stands as a luminous anchor in the center.
  - Stepping into the dark requires following bioluminescent thermal currents.
  - Direct light into optical crystals to refract beams into frozen leaf shrines.
  - Awakening all 3 shrines triggers the Living Portal Tree, clearing the level with dramatic audio chimes.
- **Why it fits the Exhibition:** Fast to learn, beautiful bioluminescent neon aesthetics, instant tactile satisfaction on the arcade buttons.

---

### Concept B: "Sub-Ice Cryo-Runner" — High-Speed Trench Flight
- **Style:** 2D/2.5D High-Speed Scrolling Trench (Canvas 2D / CSS 60 FPS).
- **Arcade Controls:**
  - **Joystick UP / DOWN:** Steer through jagged subterranean ice channels.
  - **Button 1 (A):** Split / Merge brothers. (Merged = heavy shield breaking through ice blocks; Split = dual lanes collecting simultaneous leaf sparks).
  - **Button 2 (B):** Flash thermal burst to vaporize cryo-geysers.
- **Why it fits the Exhibition:** Fast, adrenaline-filled arcade fun. Perfect for quick 2-minute exhibition rounds with an arcade stick high-score board.

---

### Concept C: "Abyssal Pulse" — Circular Arena Defense & Portal Awakening
- **Style:** Circular Arena around the Living Portal Tree.
- **Arcade Controls:**
  - **Joystick:** Orbit around the father and portal tree.
  - **Button 1 (A):** Release directional light wave.
  - **Button 2 (B):** Synchronize twin pulse (stuns incoming dark shadow currents).
  - **Button 3 (X):** Absorb thermal leaf to upgrade light intensity.
- **Why it fits the Exhibition:** Direct feedback, mesmerizing particle explosions, short intense rounds suitable for gallery crowds.

---

## 🤝 6. Integration Guidelines for Teammates (Aisah, Martin & Mana)

To make merging all 4 games seamless into `exo-cultures`, here are the **4 simple rules** for Aisah, Martin, and Mana:

1. **Rule 1: Standardized Resolution & 4:3 Aspect Ratio (CRT Target)**
   - Target a **4:3 aspect ratio** (Native **640 × 480** or **800 × 600**).
   - On widescreen desktop displays, the launcher will neatly center the 4:3 container with cosmic pillarbox margins; on the 14" CRT, it will fill the tube edge-to-edge!
   - **Overscan Safety:** Keep essential UI (text, health, counters) at least **6% away from the screen borders** so the physical CRT bezel doesn't clip it.
2. **Rule 2: No Mouse Dependencies**
   - Every menu, dialogue, and gameplay action must be navigable using **Directions (Up/Down/Left/Right)** and **2 Primary Buttons (A = Confirm, B = Cancel/Back)**.
3. **Rule 3: Export Format**
   - Teammates can build in **Vanilla JS Canvas, React component, PixiJS, Phaser, or Godot 4 (HTML5 Web Export)**.
   - Any engine that exports to standard web/HTML5 works inside your Next.js site (either mounted as a component or loaded cleanly via an `iframe`).
4. **Rule 4: Performance Budget for Pi 400 & CRT**
   - Keep total assets under 50MB per game.
   - At 640×480, the Pi 400 GPU easily locks at a buttery-smooth 60 FPS. Avoid unnecessary heavy 3D shaders or complex real-time lighting cascades.

---

## 🖥️ 7. Raspberry Pi 400 Kiosk Setup (Cheat Sheet for Exhibition Day)

When setting up your exhibition on the Pi 400, run Chromium in full kiosk mode:

```bash
# In ~/.config/lxsession/LXDE-pi/autostart (or bash script):
# 1. Disable screen blanking / sleep
xset s noblank
xset s off
xset -dpms

# 2. Hide mouse cursor when idle
unclutter -idle 0.5 -root &

# 3. Launch local web server and Chromium in Kiosk mode
chromium-browser --kiosk --noerrdialogs --disable-infobars --check-for-update-interval=31536000 http://localhost:3000
```

---

## 📺 8. 14" CRT Display Guide & Technical Setup (Pi 400 Specifics)

Using a **14" CRT (Cathode Ray Tube)** with the **8BitDo Arcade Stick** creates an extraordinary retro-arcade aesthetic for an alien exhibition. However, connecting a Raspberry Pi 400 to a CRT requires specific technical considerations:

### A. Pure 15kHz Analog RGB: The Gold Standard for CRTs
Using a **direct GPIO-based SCART module/HAT** (such as *RGB-Pi*, *Pi2SCART*, *Recalbox RGB Dual*, or a *VGA666/DPI-to-SCART* adapter) plugged into the Pi 400's 40-pin GPIO header is the **absolute best possible way** to drive a CRT TV:

- **Bypasses HDMI Completely:** Instead of using an active HDMI downscaler that adds digital input lag and bleeds colors, the GPIO module taps directly into the Raspberry Pi GPU's **DPI (Display Parallel Interface)** bus.
- **Pure Analog 15kHz RGB Video:** The Pi outputs true, uncompressed Red, Green, Blue, and Clean Sync (CSync) signals directly into the CRT gun.
- **Zero Input Lag:** 100% instantaneous controller-to-screen response—crucial for arcade stick gameplay.
- **Infinite Contrast & Vibrant Colors:** Bioluminescent purples, magentas, and cyans pop with razor-sharp saturation on real CRT phosphors.

---

### B. Your Hardware: Recalbox RGB Dual + 40-Pin Ribbon
The **Recalbox RGB Dual** is widely regarded as the ultimate CRT interface for Raspberry Pi. It gives you studio-grade features out of the box:

```
[Raspberry Pi 400 Keyboard Unit]
       │ (Rear 40-pin GPIO Header)
       ▼
[40-Pin GPIO Ribbon Cable] <─── Note Pin 1 (Red Stripe) Orientation!
       │
       ▼
[Recalbox RGB Dual Board] <─── Set DIP switch to "15kHz"
       │
       ▼
[Recalbox RGB Dual Board] <─── Set DIP switch to "15kHz"
       │
       ▼ (21-Pin SCART Cable)
[14" CRT TV SCART Socket]
```

#### 1. Hardware Checklist on the Recalbox RGB Dual:
- **15kHz DIP Switch:** Ensure the physical selector on the board is set to **15kHz (SCART)**, not 31kHz (VGA).
- **Auto-Switching Magic (Pins 8 & 16):** The Recalbox RGB Dual features an on-board voltage booster that feeds 12V into SCART Pin 8 and 3V into Pin 16. **Your CRT TV will automatically switch on and jump directly to the AV/RGB channel** the moment you power on the Pi—no need for a TV remote control at the exhibition!
- **Audiophile On-board DAC (PCM5102A):** Instead of noisy GPIO PWM audio, the Recalbox RGB Dual has an integrated **Texas Instruments PCM5102A 24-bit/192kHz DAC**. It outputs studio-quality stereo sound directly into the CRT TV's internal speaker.

#### 2. ⚠️ Vital Pin 1 (Red Stripe) Orientation:
- The colored stripe on your 40-pin ribbon cable designates **Pin 1 (3.3V Power)**.
- **On the rear of the Raspberry Pi 400:** Looking directly at the rear ports from behind, **Pin 1 is the bottom-right pin** of the 40-pin GPIO block (Pin 2 is top-right, Pin 39 is bottom-left, Pin 40 is top-left).
- **On the Recalbox RGB Dual:** Match the red stripe to **Pin 1** (marked with a square pad / white dot / triangle next to the 40-pin header).

#### 1. Hardware Checklist on the Recalbox RGB Dual:
- **15kHz DIP Switch:** Ensure the physical selector on the board is set to **15kHz (SCART)**, not 31kHz (VGA).
- **Auto-Switching Magic (Pins 8 & 16):** The Recalbox RGB Dual features an on-board voltage booster that feeds 12V into SCART Pin 8 and 3V into Pin 16. **Your CRT TV will automatically switch on and jump directly to the AV/RGB channel** the moment you power on the Pi—no need for a TV remote control at the exhibition!
- **Audiophile On-board DAC (PCM5102A):** Instead of noisy GPIO PWM audio, the Recalbox RGB Dual has an integrated **Texas Instruments PCM5102A 24-bit/192kHz DAC**. It outputs studio-quality stereo sound directly into the CRT TV's internal speaker.

#### 2. ⚠️ Vital Pin 1 (Red Stripe) Orientation:
- The colored stripe on your 40-pin ribbon cable designates **Pin 1 (3.3V Power)**.
- **On the rear of the Raspberry Pi 400:** Looking directly at the rear ports from behind, **Pin 1 is the bottom-right pin** of the 40-pin GPIO block (Pin 2 is top-right, Pin 39 is bottom-left, Pin 40 is top-left).
- **On the Recalbox RGB Dual:** Match the red stripe to **Pin 1** (marked with a square pad / white dot / triangle next to the 40-pin header).

---

### C. Raspberry Pi OS Configuration for Recalbox RGB Dual (`config.txt`)

To run your exhibition website in Chromium on standard Raspberry Pi OS (or Debian) with the Recalbox RGB Dual:

#### 1. Add the Device Tree Overlays
In `/boot/firmware/config.txt` (or `/boot/config.txt`):

```ini
# --- Recalbox RGB Dual Video & Audio Configuration ---

# 1. Enable DPI video bus (disables HDMI output)
enable_dpi_lcd=1
display_default_lcd=1
dpi_group=2
dpi_mode=87

# 2. Recalbox RGB Dual Overlay (or standard DPI + HiFiBerry DAC)
dtoverlay=recalboxrgbdual
# Note: If your OS doesn't have recalboxrgbdual.dtbo pre-installed:
# dtoverlay=vga666
# dtoverlay=hifiberry-dac

# 3. Audio DAC Configuration (TI PCM5102A on Recalbox RGB Dual)
dtparam=i2s=on
dtparam=audio=on

# 4. Target Resolution: 640x480 Interlaced (480i @ 60Hz) - RECOMMENDED for Web Content
dpi_timings=640 0 16 96 48 480 1 10 2 33 0 0 0 60 0 12500000 1

# Disable digital overscan
disable_overscan=1
```

#### 2. Resolution Choice: 480i vs. 240p
* **Option 1: 640×480 Interlaced (480i @ 60Hz) — RECOMMENDED for Web Kiosk**
  - Keeps web text, titles, scores, and buttons readable in Chromium.
  - Matches standard desktop browser proportions.
* **Option 2: 320×240 Progressive (240p @ 60Hz) — Pure Arcade Scanlines**
  - Delivers thick, razor-sharp authentic arcade scanlines with zero interlace flicker.
  - Note: You must design your web UI with large chunky typography and scaling, as standard 16px desktop text will fill a large portion of a 240p screen.
  ```ini
  # 320x240 progressive 60Hz 15kHz timing
  dpi_timings=320 1 20 29 48 240 1 3 3 16 0 0 0 60 0 6400000 1
  ```

---

### C. Design & Typography Rules for SCART Interlaced Tubes
1. **Natural Phosphor Bloom:** CRTs have true pitch blacks (unlike LCDs) and zero motion blur. The glowing bioluminescent purples, cyans, and magentas of *Chromatic Symbiosis* will look vivid and organic on real phosphors without requiring expensive software post-processing.
2. **Preventing Interlace Jitter (Deflicker):**
   - Standard definition SCART is interlaced (480i or 576i).
   - Fine horizontal lines of **1 pixel** will visibly buzz/flicker between alternating fields.
   - **Rule:** Make all horizontal borders, divider lines, and buttons at least **2px or 3px thick** (`border-2` or `border-4` in Tailwind).
3. **The 6% Overscan Margin:**
   - CRT screens hide the outer ~5–8% behind the physical plastic casing (curved glass edge).
   - In CSS, wrap your game viewport in a safe-zone container:
     ```css
     .crt-safe-zone {
       padding: 5% 6%;
       box-sizing: border-box;
     }
     ```
4. **Typography & Readability:**
   - **Do not use thin hairline fonts** (they flicker on 480i scanlines).
   - Use bold, high-contrast, chunky typography or stylized retro pixel/arcade fonts (e.g. bold *Montserrat*, *Bebas Neue*, *Press Start 2P*, or *Chakra Petch*).
   - Minimum font size on a 14" CRT should be **16px–18px** for body text and **28px+** for titles.

