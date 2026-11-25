"use client";

import React, { useState } from "react";
import { AlienHubDesign } from "@/components/molecules/CalibrationBar";

interface ExpoDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  hubDesign?: AlienHubDesign;
  onToggleHubDesign?: () => void;
}

type DossierTab = "expo" | "unlimited" | "prototype" | "tech" | "team" | "scenography" | "story";

export function ExpoDossierModal({
  isOpen,
  onClose,
  hubDesign,
  onToggleHubDesign,
}: ExpoDossierModalProps) {
  const [activeTab, setActiveTab] = useState<DossierTab>("expo");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[250] bg-black/95 flex items-center justify-center p-3 md:p-6 font-mono text-white select-none backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-black border-2 border-white flex flex-col shadow-[10px_10px_0px_#ffffff] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-white p-3 md:p-4 bg-white text-black">
          <div className="flex items-center gap-2">
            <div>
              <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">
                EXPO DOSSIER • HYPER ISLAND WEEK 51, 2026
              </h2>
              <p className="text-[10px] text-neutral-800">
                The Intergalactic Worlds Expo — Unified Group Pavilion &amp; Collaborative Game
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onToggleHubDesign && hubDesign && (
              <button
                onClick={onToggleHubDesign}
                className="px-2.5 py-1 bg-white hover:bg-neutral-200 text-black border-2 border-black text-xs font-bold transition-all cursor-pointer shadow-[2px_2px_0px_#000000]"
                title="Switch Exhibition Theme [T]"
              >
                <span>[THEME: {hubDesign.toUpperCase()}]</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-2.5 py-1 bg-black text-white hover:bg-neutral-800 border-2 border-black text-xs font-bold transition-all cursor-pointer"
            >
              <span>[B / ESC] CLOSE</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b-2 border-white/30 bg-neutral-950 text-[10px] md:text-xs">
          {[
            { id: "expo", label: "01. THE EXPO BRIEF" },
            { id: "unlimited", label: "02. UNLIMITED CONCEPT" },
            { id: "prototype", label: "03. OUR PROTOTYPE" },
            { id: "tech", label: "04. OUR PROCESS & HARDWARE" },
            { id: "scenography", label: "05. SCENOGRAPHY" },
            { id: "story", label: "06. THE COMBINED STORY" },
            { id: "team", label: "07. TEAM ROLES" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DossierTab)}
              className={`px-3 py-2 font-bold uppercase transition-colors border-r border-white/20 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 text-xs md:text-sm leading-relaxed text-neutral-200">
          {/* TAB 1: THE EXPO BRIEF */}
          {activeTab === "expo" && (
            <div className="space-y-4">
              <div className="border-l-4 border-white pl-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  The Intergalactic Worlds Expo — Earth Pavilion
                </h3>
                <p className="text-xs text-neutral-400">
                  Location: Hyper Island Campus • Timing: Week 51, December 2026
                </p>
              </div>

              <div className="p-4 bg-neutral-900 border border-white/20">
                <h4 className="text-xs font-bold text-white uppercase mb-2">
                  [OFFICIAL BRIEFING CONTEXT]
                </h4>
                <p className="italic text-neutral-300 text-xs">
                  &ldquo;The Intergalactic Worlds Expo is taking place on Earth, Hyper Island campus, Week 51, 2026.
                  Due to the limited space, neighbouring worlds will join together to present in group pavilions;
                  however, each culture should advertise themselves and the expo ahead of time.&rdquo;
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase text-xs">Our Unified Group Pavilion Strategy</h4>
                <p>
                  Rather than fragmenting the pavilion into disconnected, isolated mini-demos, our team (Maxime Dewynter, Martin, Aisah, and Mana) decided to
                  <strong> combine our speculative fiction into one common collaborative game</strong>.
                </p>
                <p>
                  We built a <strong>hybrid physical and digital arcade installation</strong> centered on an authentic
                  14&quot; CRT retro-futuristic arcade cabinet powered by a Raspberry Pi 400 and custom 8BitDo arcade stick,
                  enveloped by tactile alien scenography. Visitors step up to the physical controls to navigate an alien subterranean abyss
                  using real-time 3D photonic LiDAR echolocation.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: UNLIMITED CONCEPT */}
          {activeTab === "unlimited" && (
            <div className="space-y-4">
              <div className="border-l-4 border-white pl-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Question 1: With Unlimited Time &amp; Resources, What Would We Have Built?
                </h3>
                <p className="text-xs text-neutral-400">
                  The Speculative Vision of the Unified Pavilion
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-950 border border-white/30 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase">
                    [1] Full-Scale Subterranean Immersion Pod
                  </h4>
                  <p className="text-xs text-neutral-300">
                    A physical sensory chamber maintaining a zero-lux subterranean atmosphere with micro-climate mist,
                    where visitors wear photonic haptic feedback suits translating raycasted LiDAR points into gentle tactile vibrations across their skin.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-white/30 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase">
                    [2] Physical Resonant Floral Beacons
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Kinetic mechanical sculptures surrounding the cabinet that physically bloom in real time when charged by the player&apos;s focused beam,
                    emitting ultrasonic acoustic frequencies and warm amber warmth.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-white/30 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase">
                    [3] Volumetric 3D Laser Echolocation Tank
                  </h4>
                  <p className="text-xs text-neutral-300">
                    A 360-degree holographic glass sphere projecting 220,000 real-time LiDAR particles floating in mid-air,
                    allowing onlookers outside the cabinet to watch the player illuminate the pitch-black cavern from every angle.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-white/30 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase">
                    [4] Bioluminescent Spore Defense Grid
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Chilled nitrogen tubes venting synthetic aerosol vapors when viral spores approach, challenging players to defend
                    the resonant ecosystem across both physical and digital space.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OUR PROTOTYPE */}
          {activeTab === "prototype" && (
            <div className="space-y-4">
              <div className="border-l-4 border-white pl-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Question 2: What Did We Build? (Our Working Prototype)
                </h3>
                <p className="text-xs text-neutral-400">
                  The Physical Kiosk + Unified 3D WebGL LiDAR Simulator
                </p>
              </div>

              <div className="space-y-3">
                <p>
                  To bring this vision to life within exhibition constraints, we engineered an authentic <strong>retro-futuristic arcade installation</strong>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-neutral-900 border border-white/20">
                    <div className="font-bold text-white mb-1 uppercase">1. Physical Scenography</div>
                    <p className="text-neutral-400">
                      A physical booth surrounding the CRT monitor decorated with alien bedrock soil, preserved moss, cold UV lighting, and umbilical cable conduits.
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-white/20">
                    <div className="font-bold text-white mb-1 uppercase">2. Hardware Engine</div>
                    <p className="text-neutral-400">
                      Raspberry Pi 400 + Recalbox RGB Dual feeding native 15kHz analog RGB via SCART to a 14&quot; CRT TV, controlled with an 8BitDo Arcade Stick.
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-white/20">
                    <div className="font-bold text-white mb-1 uppercase">3. Digital Game Software</div>
                    <p className="text-neutral-400">
                      Custom Next.js 15 + Three.js 3D LiDAR game running locked at 60 FPS with raycasted point-cloud terrain mapping and procedural Web Audio.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-neutral-950 border-2 border-white">
                  <h4 className="font-bold text-white text-xs uppercase mb-2">Our Playable Game: Echoes in the Dark</h4>
                  <p className="text-xs text-neutral-300 mb-2">
                    A real-time 3D subterranean simulation built in Three.js and WebGL. The world is initially pitch-black (0 lux).
                    The player operates an extraterrestrial LiDAR scanner, shooting photonic raycasts into the void that stick to invisible obstacles and reveal the alien geometry.
                  </p>
                  <p className="text-xs text-neutral-300">
                    Four dormant floral beacons must be discovered, charged with a focused laser beam, and bloomed into resonant blossoms.
                    Blooming flowers emit ultrasonic mating calls across the cosmos—attracting both the player&apos;s distant counterpart and hostile viral spores that must be defended against.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OUR PROCESS & HARDWARE */}
          {activeTab === "tech" && (
            <div className="space-y-4">
              <div className="border-l-4 border-white pl-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Our Process: Hardware Choices &amp; Technical Architecture
                </h3>
                <p className="text-xs text-neutral-400">
                  Why We Chose 15kHz CRT, Raspberry Pi 400, 8BitDo &amp; Next.js + Three.js
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-neutral-900 border-l-2 border-white">
                  <div className="font-bold text-white text-xs uppercase mb-1">Why 14&quot; Analog RGB CRT TV (15kHz SCART)?</div>
                  <p className="text-xs text-neutral-300">
                    True CRT phosphors emit light organically with zero digital latency and authentic natural scanlines.
                    It provides physical weight, warmth, and retro-futuristic realism to ground our speculative alien universe.
                  </p>
                </div>

                <div className="p-3 bg-neutral-900 border-l-2 border-white">
                  <div className="font-bold text-white text-xs uppercase mb-1">Why Raspberry Pi 400 &amp; 8BitDo Arcade Stick?</div>
                  <p className="text-xs text-neutral-300">
                    An exhibition cabinet must be an uncrashable standalone appliance. The Pi 400 auto-boots directly into fullscreen kiosk mode.
                    The heavy arcade stick with sanwa-style switches gives visitors immediate, tactile, intuitive play without needing instructions.
                  </p>
                </div>

                <div className="p-3 bg-neutral-900 border-l-2 border-white">
                  <div className="font-bold text-white text-xs uppercase mb-1">Why Next.js, Three.js 3D &amp; Procedural Web Audio?</div>
                  <p className="text-xs text-neutral-300">
                    Universal portability: the same codebase powers the physical arcade machine offline AND the public web exhibition on Vercel.
                    Three.js provides high-performance 220,000-point dynamic buffer geometries, while procedural Web Audio guarantees 100% offline audio with zero audio file load lag.
                  </p>
                </div>

                <div className="p-3 bg-neutral-900 border-l-2 border-white">
                  <div className="font-bold text-white text-xs uppercase mb-1">Universal Arcade &amp; Keyboard Controls</div>
                  <p className="text-xs text-neutral-300">
                    Dual input architecture: physical arcade stick mapped via Gamepad API (`useArcadeInput`), alongside standard keyboard WASD and mouse PointerLock for desktop visitors.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SCENOGRAPHY */}
          {activeTab === "scenography" && (
            <div className="space-y-4">
              <div className="border-l-4 border-white pl-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Physical Scenography: Building the Scene Around the CRT
                </h3>
                <p className="text-xs text-neutral-400">
                  Gallery Booth Setup at Hyper Island Week 51
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-neutral-300">
                  The physical installation bridges the gap between digital screen and reality:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-neutral-950 border border-white/20">
                    <div className="font-bold text-white mb-1 uppercase">1. Black Bedrock &amp; Preserved Moss Base</div>
                    <p className="text-neutral-400">
                      The wooden podium supporting the 14&quot; CRT monitor is wrapped in textured matte black fabric, covered with volcanic rock fragments and preserved moss echoing the subterranean bedrock layer.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-white/20">
                    <div className="font-bold text-white mb-1 uppercase">2. Alien Umbilical Conduits</div>
                    <p className="text-neutral-400">
                      Power and SCART cables are encased in ribbed industrial conduit tubing, dressed like organic bio-technological umbilicals linking the arcade cabinet to the planet&apos;s mantle.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-white/20">
                    <div className="font-bold text-white mb-1 uppercase">3. Cold UV vs Warm Thermal Lighting</div>
                    <p className="text-neutral-400">
                      A hidden cold ultraviolet backlight casts an abyssal glow behind the CRT monitor, while a warm amber downlight focuses on the 8BitDo Arcade Stick, physically embodying the thermal guidance theme.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-white/20">
                    <div className="font-bold text-white mb-1 uppercase">4. Gallery Wall Poster Hangings</div>
                    <p className="text-neutral-400">
                      The official collaborative exhibition poster is printed and mounted directly beside the cabinet, acting as the speculative beacon for the shared world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: THE COMBINED STORY */}
          {activeTab === "story" && (
            <div className="space-y-4">
              <div className="border-l-4 border-white pl-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  The Combined Story: Four Worlds, One Journey
                </h3>
                <p className="text-xs text-neutral-400">
                  Narrative Fusion of Maxime, Martin, Aisah &amp; Mana
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 flex flex-col items-center">
                  <div className="relative w-full aspect-square border-2 border-white overflow-hidden shadow-[6px_6px_0px_#ffffff] mb-2 bg-black p-3 font-mono flex flex-col justify-between select-none">
                    <div className="flex justify-between items-start border-b border-white/40 pb-1">
                      <span className="text-[8px] font-bold text-neutral-400">EXO-CULTURES 2026</span>
                      <span className="text-[8px] bg-white text-black px-1 font-bold">SCHEMATIC</span>
                    </div>
                    <div className="text-center py-2 space-y-1">
                      <div className="text-[11px] font-black tracking-widest text-white uppercase">ECHOES IN THE DARK</div>
                      <div className="text-[7px] text-neutral-400">3D LIDAR • RAYCASTING ENGINE</div>
                      <div className="text-[9px] text-white/80 tracking-widest pt-1 font-bold">☲ 0x45 ⋔ ⎎ ▲</div>
                    </div>
                    <div className="border-t border-white/40 pt-1 text-[7px] text-neutral-400 flex justify-between">
                      <span>RIGEL-VII SUB-ABYSS</span>
                      <span>4 CREATORS • 1 WORLD</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400 uppercase font-bold text-center">
                    Typographic Exhibition Diagram
                  </span>
                </div>

                <div className="md:col-span-2 space-y-3 bg-neutral-950 p-4 border border-white/30 text-xs">
                  <div className="font-bold text-white uppercase border-b border-white/20 pb-1">
                    How We Merged Our Four Narratives
                  </div>
                  <p className="text-neutral-300">
                    <strong>1. The Sub-Ice Oceanic Abyss (Maxime):</strong> The environmental foundation—a subterranean cavern deprived of star-light where acoustic and light frequencies replace conventional speech.
                  </p>
                  <p className="text-neutral-300">
                    <strong>2. The 3D LiDAR &amp; Floral Resonance (Martin):</strong> The core interaction mechanic—photonic echolocation scans that carve out the physical room, and dormant floral beacons that catalyze energy when bloomed.
                  </p>
                  <p className="text-neutral-300">
                    <strong>3. Acoustic Harmony &amp; Calling Chambers (Aisah):</strong> The resonant chamber ecology—where bloomed flowers project acoustic frequencies across celestial distances to summon a distant mate.
                  </p>
                  <p className="text-neutral-300">
                    <strong>4. Atmospheric Vectors &amp; Spore Threats (Mana):</strong> The dynamic exospheric hazards—airborne viral spore colonies carried through geothermal vents that threaten to infect the resonant blooms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: TEAM ROLES */}
          {activeTab === "team" && (
            <div className="space-y-4">
              <div className="border-l-4 border-white pl-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Team Members &amp; Collaborative Contributions
                </h3>
                <p className="text-xs text-neutral-400">
                  Hyper Island Group Collaboration • Week 51, 2026
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-950 border-2 border-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Maxime Dewynter</span>
                    <span className="px-1.5 py-0.5 bg-white text-black text-[9px] font-bold">ARCADE LEAD</span>
                  </div>
                  <p className="text-neutral-400 mb-1">Role: <strong>Arcade Framework &amp; Narrative Integration</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Built the unified arcade launcher, 8BitDo gamepad input engine, CRT display architecture, and merged the collective story into a cohesive exhibition experience.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border-2 border-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Martin</span>
                    <span className="px-1.5 py-0.5 bg-purple-600 text-white text-[9px] font-bold">GAME LEAD</span>
                  </div>
                  <p className="text-neutral-400 mb-1">Role: <strong>3D Three.js Engine &amp; LiDAR Mechanics</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Designed and engineered the 3D LiDAR point-cloud raycasting engine, floral beacon charging and blooming systems, and viral spore defense mechanics.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border border-white/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Aisah</span>
                    <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[9px] font-bold">WORLD CREATOR</span>
                  </div>
                  <p className="text-neutral-400 mb-1">Role: <strong>Acoustic Lore &amp; World Ecology</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Contributed speculative acoustic chamber lore, floral resonance concepts, and visual telemetry for the extraterrestrial ecosystem.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border border-white/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Mana</span>
                    <span className="px-1.5 py-0.5 bg-amber-500 text-black text-[9px] font-bold">WORLD CREATOR</span>
                  </div>
                  <p className="text-neutral-400 mb-1">Role: <strong>Atmospheric Vectors &amp; Threat Design</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Contributed exospheric gas concepts, viral spore vector behaviors, and narrative worldbuilding for the hostile subterranean abyss.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t-2 border-white p-3 bg-neutral-950 flex items-center justify-between text-[10px] text-neutral-400">
          <span>THE INTERGALACTIC WORLDS EXPO • WEEK 51, 2026</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white text-black font-bold uppercase hover:bg-neutral-200 transition-colors"
          >
            [B / ESC] RETURN
          </button>
        </div>
      </div>
    </div>
  );
}
