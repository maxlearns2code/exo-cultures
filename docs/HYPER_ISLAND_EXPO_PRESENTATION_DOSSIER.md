# Intergalactic Worlds Expo: Presentation Dossier & Scenography Guide

> **Institution:** Hyper Island Campus, Earth  
> **Exhibition Timing:** Week 51, December 2026 (Group Deliverable: Dec 15th)  
> **Pavilion:** Group Pavilion — 4 Neighbouring Exoplanetary Civilizations  
> **Team Creators:** Maxime Dewynter, Aisah, Martin, Mana  
> **Concept Anchor:** Retro-Futuristic 14" Analog CRT Arcade Cabinet + Physical Alien Scenography  
> **Live Deployment:** [https://hyper-exo-cultures.vercel.app/](https://hyper-exo-cultures.vercel.app/)  
> **GitHub Repository:** [https://github.com/maxlearns2code/exo-cultures](https://github.com/maxlearns2code/exo-cultures.git)  

---

## 🌌 1. Official Briefing & Exhibition Rationale

### Briefing Context
> *"The Intergalactic Worlds Expo is taking place on Earth, Hyper Island campus, Week 51, 2026. Due to the limited space, neighbouring worlds will join together to present in group pavilions; however, each culture should advertise themselves and the expo with an individual poster ahead of time."*

### Our Strategy: The Hybrid Physical-Digital Pavilion
Rather than presenting passive cardboard mockups or disconnected laptop screens, our team conceptualized an installation that physically & visually immerses the visitor while providing instant tactile engagement:
1. **The Physical Artifact:** A genuine 14" CRT TV driven at **15kHz analog RGB via SCART**, embedded in organic alien bedrock scenography (volcanic rocks, preserved moss, cold UV lighting, and umbilical conduits).
2. **The Tactile Controller:** An authentic **8BitDo Arcade Stick** equipped with Sanwa-style arcade switches (plus full mouse/keyboard support on web), allowing visitors of all ages to explore effortlessly.
3. **The Digital Core:** One unified collaborative game (**Echoes in the Dark**) built in **Next.js 15, HTML5 Canvas 2D, Three.js 3D WebGL, and procedural Web Audio**, running smoothly with zero external audio/model dependency.

---

## 🎙️ 2. The 15-Minute Group Presentation Script (+ 5 Min Q&A)

The official brief requires a 15-minute presentation answering three central questions:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       15-MINUTE PRESENTATION TIMELINE                       │
├───────────────┬─────────────────────────────────────────────┬───────────────┤
│    00 - 03    │ Introduction, Expo Lore & Group Pavilion    │ Whole Team    │
│    03 - 06    │ Question 1: Concept (Unlimited Resources)   │ Aisah & Mana  │
│    06 - 10    │ Question 2: Working Prototype (What Built)  │ Maxime Dewynter│
│    10 - 13    │ Question 3: Process, Tech & AI Reflection   │ Martin & Maxime│
│    13 - 15    │ Conclusion, Team Learnings & Live Play      │ Whole Team    │
│    15 - 20    │ Q&A Jury Defense                            │ All           │
└───────────────┴─────────────────────────────────────────────┴───────────────┘
```

---

### Part 1: Introduction & World-Building (3 Minutes)
- **Speaker:** Whole Team
- **Key Talking Points:**
  - Welcome jury and visitors to the Earth pavilion of the Intergalactic Worlds Expo (Week 51, 2026).
  - Explain why the four neighbouring worlds banded together: spatial limits forced cultural convergence, prompting each world to contribute a distinct fragment of their survival physics, sensory organs, and evolutionary history.
  - Introduce the four individual cultures merged into *Echoes in the Dark*:
    1. **Aisah — *"Cutting Exchange"*:** Moss forest collective mycelium consciousness, invasive viral disruption, and communal root-cutting defense (inspiring the viral spore threat).
    2. **Mana — *"NewLife // Anti-Digital Society"*:** Speculative satire contrasting digital overload with physical, tactile presence and organic connection.
    3. **Martin — *"Ørgäæ"*:** Binary star astronomy, 4D spatial perception, and pulsing resonant flowers mapped through 3D photonic LiDAR echolocation.
    4. **Maxime Dewynter — *"Chromatic Symbiosis"*:** Sub-ice moon ecology, light-wave communication, and the arcade hardware/software architecture uniting all four worlds.

---

### Part 2: Question 1 — With Unlimited Time & Resources, What Would You Have Built? (3 Minutes)
- **Speakers:** Aisah & Mana
- **Key Talking Points:**
  - **Full-Scale Subterranean Immersion Pod:** A physical zero-lux climate chamber with atmospheric mist, where visitors wear photonic haptic suits translating raycasted LiDAR points into gentle tactile vibrations across their skin.
  - **Physical Resonant Floral Beacons:** Kinetic mechanical sculptures surrounding the cabinet that physically bloom in real time when charged by the focused beam, emitting ultrasonic acoustic pulses and warm amber light.
  - **Volumetric 3D Laser Echolocation Tank:** A 360-degree holographic glass sphere projecting 220,000 real-time LiDAR particles floating in mid-air, allowing onlookers to watch the cavern illuminate from every angle.
  - **Bioluminescent Spore Defense Grid:** Chilled nitrogen tubes venting aerosol vapors when viral spores approach, challenging players to defend the resonant ecosystem across physical and digital space.

---

### Part 3: Question 2 — What Did You Build? (Our Prototype) (4 Minutes)
- **Speaker:** Maxime Dewynter
- **Key Talking Points:**
  - **The Arcade Machine as Cultural Archive:** In retro-futuristic speculative design, the arcade cabinet acts as an extraterrestrial reconnaissance terminal uncovered by human explorers.
  - **Physical Hardware Stack:**
    - **Computing Appliance:** Raspberry Pi 400 running Raspberry Pi OS with a custom auto-boot kiosk script.
    - **Analog Video Interface:** Recalbox RGB Dual HAT generating pixel-perfect 15kHz 240p/480i analog RGB video signals over SCART.
    - **Display:** 14" consumer CRT TV. Real phosphor glow, natural aperture grille scanlines, zero digital processing latency.
    - **Input:** 8BitDo Arcade Stick mapping microswitches directly to Web Gamepad API (alongside keyboard/mouse pointer-lock support).
  - **Playable Prototype: *Echoes in the Dark* (2D Surface Intro → 3D Building Exploration):**
    - **Act I — 2D Surface Expedition (`Intro2DGame`):** The human explorer disembarks the lander in pixel-art side-scrolling view, traversing alien ridges past swaying bioluminescent flowers to enter the monolith building.
    - **Act II — Inside the Helmet (`Game` + Three.js 3D):** The camera places you directly inside the explorer's amber-rimmed helmet visor with his gloved right hand holding a photonic light-painting tool.
    - **Painting Lights in the Building:** Sweeping wide cyan-green beams or firing a focused amber burn beam casts raycasted light streaks from the tool nozzle, painting up to 220,000 permanent glowing points across pitch-black doorway arches, ceiling trusses, pilasters, and corner spore vents.
    - **Floral Resonance & Spore Defense:** Discover four dormant floral beacons, charge them with the focused beam, hold `[E]` / `[A]` to bloom them, burn incoming viral spores, and summon your mate across the abyss.

---

### Part 4: Question 3 — Process, Technology Choices, AI Reflection & Challenges (3 Minutes)
- **Speakers:** Martin & Maxime Dewynter
- **Key Talking Points:**
  - **Why 15kHz CRT over Modern 4K OLED?**
    - CRT phosphors create authentic continuous analog color blending. Modern LCDs generate sharp grid pixels that break the illusion of an alien bio-terminal.
    - Physical scanlines render naturally without digital shaders or Moiré banding.
  - **Why Next.js 15, Canvas 2D, Three.js 3D & Procedural Web Audio?**
    - Universal portability: The exact same application powers the physical arcade kiosk offline at Hyper Island and the worldwide web portfolio on Vercel.
    - Three.js powers both the first-person 3D explorer helmet/hand viewmodel and a 220,000-point dynamic LiDAR buffer geometry; Canvas 2D drives the surface expedition intro; procedural Web Audio synthesizes all sound effects offline with zero asset load lag.
  - **AI Reflection & Academic Transparency:**
    - **Brief 1 Deliverable:** Strictly respected the rule (*"No prompt-based generative AI tools"*). All poster artwork, layer separation, and concept designs were authored by hand.
    - **Digital Coding:** Used AI code models as an assistive pair programmer to accelerate Three.js raycasting, 3D viewmodel geometry, and Next.js App Router scaffolding.
  - **Key Team Challenges Overcome:**
    - Synchronizing 8BitDo gamepad latency with 60 FPS `requestAnimationFrame` alongside pointer-lock mouse aim.
    - Ensuring CRT safe-zone framing so HUD telemetry, visor overlays, and the hand-held light-painting tool remain clear across 4:3 CRT and widescreen displays.
    - Universal reset combo (`SELECT + START` held 2s) and idle timeout so exhibition visitors never get stuck in a game without an attendant.

---

### Part 5: Conclusion & Live Demonstration (2 Minutes)
- **Speaker:** Whole Team
- **Key Talking Points:**
  - Invite the jury to physically grip the arcade stick, press [A], and test the machine.
  - Summarize how the hybrid installation honors Hyper Island's brief: externalizing human assumptions through alien lenses, and turning a group challenge into an unforgettable tactile gallery showcase.

---

## 🎨 3. Physical Scenography Blueprint

To build the scene around the CRT TV at the Hyper Island venue:

```
                  ┌────────────────────────────────────────┐
                  │   BRIEF 1 INDIVIDUAL POSTERS ON WALL   │
                  │  [Maxime]   [Aisah]   [Martin]  [Mana] │
                  └────────────────────────────────────────┘
                                      │
                     ▲ COLD UV BACKLIGHT HALO (395nm)
                     │
             ┌──────────────────────────────────┐
             │   14" SONY TRINITRON / CRT TV    │
             │   ┌──────────────────────────┐   │
             │   │    EXO-CULTURES ARCADE   │   │
             │   │    4:3 15kHz ANALOG RGB  │   │
             │   └──────────────────────────┘   │
             └──────────────────────────────────┘
                 ▲ MOSS & VOLCANIC ROCK BEZEL
                 │
  ┌────────────────────────────────────────────────────────────┐
  │   TABLE PODIUM: MATTE BLACK VINYL / TEXTURED CHARCOAL       │
  │   • Preserved reindeer moss & charcoal gravel              │
  │   • Industrial ribbed cable conduit (alien umbilical)       │
  │   • WARM AMBER PIN SPOTLIGHT focusing on:                  │
  │                                                            │
  │            [ 8BitDo V3 ARCADE STICK CONTROLLER ]           │
  │               (Joystick + [A] [B] [X] [Y] Sanwa)           │
  └────────────────────────────────────────────────────────────┘
```

### Material Checklist:
1. **Podium / Table:** Sturdy wooden table or pedestal, covered in matte black stretch velvet or charcoal canvas.
2. **Bedrock Base:** 2 bags of dark volcanic aquarium gravel / pumice stones scattered across the table base around the monitor feet.
3. **Alien Flora:** Preserved preserved green and lichen moss framing the base of the CRT monitor.
4. **Umbilical Cable Conduits:** Black corrugated split-loom wire tubing encasing the power and SCART cables to look like bio-mechanical tentacles.
5. **Lighting Contrast:**
   - **Backlight:** A small 10W UV blacklight strip mounted behind the CRT TV to project an eerie sub-ice violet glow against the rear exhibition wall.
   - **Controller Downlight:** A small warm 2700K amber spotlight pointing strictly down at the 8BitDo Arcade Stick, physically mirroring the father's thermal beacon.
6. **Wall Signage:** High-resolution prints of the 4 Brief 1 posters mounted at eye level directly behind the cabinet.

---

## 🚀 4. Kiosk Auto-Boot Verification Checklist

Before opening day at the Expo:
- [ ] Connect SCART cable from Recalbox RGB Dual to TV SCART input 1.
- [ ] Connect 8BitDo Arcade Stick via USB cable to Pi 400 (USB 3.0 port).
- [ ] Connect 3.5mm audio jack or RCA audio to the sound system.
- [ ] Power on CRT TV and switch to RGB/AV channel.
- [ ] Boot Raspberry Pi 400.
- [ ] Confirm Chromium auto-launches in fullscreen kiosk mode to `http://localhost:3000` (or `https://hyper-exo-cultures.vercel.app/`).
- [ ] Verify `SELECT + START` held for 2 seconds returns to the central Hub from any screen.
- [ ] Verify Attract Mode activates after 90 seconds of inactivity.
