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
Rather than presenting passive cardboard mockups or disconnected laptop screens, our team conceptualized an installation that physically & visually alienates the visitor while providing instant tactile engagement:
1. **The Physical Artifact:** A genuine 14" CRT TV driven at **15kHz analog RGB via SCART**, embedded in organic alien bedrock scenography (volcanic rocks, preserved moss, bio-luminescent tubes, and umbilical conduits).
2. **The Tactile Controller:** An authentic **8BitDo Arcade Stick** equipped with Sanwa-style arcade switches, allowing visitors of all ages to interact without needing keyboards, mice, or instructions.
3. **The Digital Core:** A 4-in-1 multi-world arcade launcher (`EXO-CULTURES`) built in **Next.js 15, Canvas 2D, and procedural Web Audio**, locked at 60 FPS, with zero cloud dependency.

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
  - Introduce the four individual cultures:
    1. **Maxime Dewynter:** *Chromatic Symbiosis* (sub-ice abyssal chromocommunication and thermal energy).
    2. **Aisah:** Alien Culture II (speculative biological systems).
    3. **Martin:** Alien Culture III (cybernetic techno-structures).
    4. **Mana:** Alien Culture IV (atmospheric fluid dynamics).

---

### Part 2: Question 1 — With Unlimited Time & Resources, What Would You Have Built? (3 Minutes)
- **Speakers:** Aisah & Mana
- **Key Talking Points:**
  - **Full-Scale Cryo-Atmospheric Immersion Pods:** Instead of a desktop monitor, visitors would step inside sealed biometric glass pods chilled to sub-zero temperatures with safe breathable gas mixtures simulating Enceladus’ ocean floor.
  - **Neural Chromatic Telemetry:** Direct neural interface helmets translating pure light wavelengths into physical sensations of warmth, pressure, and tactile vibrations.
  - **Living Bioluminescent Algae Columns:** Monumental 3-meter glass tubes filled with living photosynthetic algae cultures that shift colors in real time in response to the user's heartbeat and actions.
  - **Planetary Gravitational Shift:** Pneumatic floors that simulate variable gravitational pull when transitioning between exoplanets.

---

### Part 3: Question 2 — What Did You Build? (Our Prototype) (4 Minutes)
- **Speaker:** Maxime Dewynter
- **Key Talking Points:**
  - **The Arcade Machine as Cultural Archive:** In retro-futuristic speculative design, the arcade cabinet acts as an ancient extraterrestrial data terminal uncovered by Earth explorers.
  - **Physical Hardware Stack:**
    - **Computing Appliance:** Raspberry Pi 400 running Raspberry Pi OS with a custom auto-boot kiosk script.
    - **Analog Video Interface:** Recalbox RGB Dual HAT generating pixel-perfect 15kHz 240p/480i analog RGB video signals over SCART.
    - **Display:** 14" consumer CRT TV. Real phosphor glow, natural aperture grille scanlines, zero digital processing latency.
    - **Input:** 8BitDo Arcade Stick mapping microswitches directly to Web Gamepad API.
  - **Playable Prototype: Chromatic Symbiosis:**
    - A *Super Mario Bros.*-style platformer constructed entirely from **8 layered Photoshop components** originally created for the Brief 1 deliverable.
    - Player 1 controls twin son Mario; companion brother Luigi runs alongside.
    - Thermal father radiates protective beacon; ancient Portal Tree awaits at the finish line.
    - Bumping mystery blocks spawns floating autumn leaves; shooting light fireballs vanquishes abyssal predators.

---

### Part 4: Question 3 — Process, Technology Choices, AI Reflection & Challenges (3 Minutes)
- **Speakers:** Martin & Maxime Dewynter
- **Key Talking Points:**
  - **Why 15kHz CRT over Modern 4K OLED?**
    - CRT phosphors create authentic continuous analog color blending. Modern LCDs generate sharp grid pixels that break the illusion of an alien bio-terminal.
    - Physical scanlines render naturally without digital shaders or Moiré banding.
  - **Why Next.js 15, Canvas 2D & Procedural Web Audio?**
    - Universal portability: The exact same application powers the physical arcade kiosk offline at Hyper Island and the worldwide web portfolio on Vercel.
    - Procedural Web Audio: 100% offline, procedural square/triangle wave synthesis that never stalls waiting for MP3/WAV assets over slow venue Wi-Fi.
  - **AI Reflection & Academic Transparency:**
    - **Brief 1 Deliverable:** Strictly respected the rule (*"No prompt-based generative AI tools"*). All poster artwork, layer separation, and concept designs were authored by hand in Photoshop.
    - **Digital Coding:** Used AI code models as an assistive pair programmer to accelerate canvas collision mathematics and Next.js App Router scaffolding.
  - **Key Team Challenges Overcome:**
    - Synchronizing 8BitDo gamepad latency with 60 FPS requestAnimationFrame.
    - Ensuring 6% CRT overscan margins so UI elements are never clipped by the physical TV bezel.
    - Universal reset combo (`SELECT + START` held 2s) so visitors never get stuck in a game without an attendant.

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
