"use client";

import React, { useState } from "react";

interface ExpoDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DossierTab = "vision" | "story" | "prototype" | "tech" | "team";

export function ExpoDossierModal({
  isOpen,
  onClose,
}: ExpoDossierModalProps) {
  const [activeTab, setActiveTab] = useState<DossierTab>("vision");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[250] bg-[#010803]/92 flex items-center justify-center pt-12 pb-4 px-3 md:pt-14 md:pb-6 md:px-6 font-mono text-[#bbf7d0] select-none backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[82vh] phosphor-crt-screen border-2 border-[#4ade80] shadow-[0_0_36px_rgba(34,197,94,0.3)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative z-10 p-3 md:p-4 border-b-2 border-[#22c55e]/60 bg-[#031b0b]/95">
          <h2 className="arcade-text phosphor-text-glow text-[11px] md:text-xs font-bold uppercase tracking-wider leading-relaxed">
            EXPO DOSSIER • HYPER ISLAND WEEK 51, 2026
          </h2>
          <p className="text-[10px] text-[#86efac]/80 mt-1">
            The Intergalactic Worlds Expo — Unified Group Pavilion &amp; Collaborative Game
          </p>
        </div>

        {/* Tab Navigation: 5 Distinct Focused Tabs */}
        <div className="relative z-10 flex flex-wrap text-[10px] md:text-xs border-b-2 border-[#22c55e]/40 bg-[#010c05]">
          {[
            { id: "vision", label: "01. EXPO & VISION" },
            { id: "story", label: "02. COMBINED STORY" },
            { id: "prototype", label: "03. OUR PROTOTYPE" },
            { id: "tech", label: "04. HARDWARE & SCENOGRAPHY" },
            { id: "team", label: "05. TEAM ROLES" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DossierTab)}
              className={`flex-auto text-center whitespace-nowrap px-3 py-2 font-bold uppercase transition-colors cursor-pointer border-r border-[#22c55e]/25 last:border-r-0 ${
                activeTab === tab.id
                  ? "bg-[#4ade80] text-[#021206] font-bold shadow-[0_0_12px_rgba(74,222,128,0.45)]"
                  : "text-[#4ade80]/70 hover:text-[#86efac] hover:bg-[#052912]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body (Scrollable, hidden scrollbar) */}
        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 md:p-6 space-y-6 text-xs md:text-sm leading-relaxed text-[#bbf7d0]/90">
          {/* TAB 1: EXPO & SPECULATIVE VISION */}
          {activeTab === "vision" && (
            <div className="space-y-4">
              <div className="border-l-4 border-[#4ade80] pl-3">
                <h3 className="text-base font-bold phosphor-text-glow uppercase tracking-wider">
                  The Intergalactic Worlds Expo — Earth Pavilion
                </h3>
                <p className="text-xs text-[#4ade80]/75">
                  Location: Hyper Island Campus • Timing: Week 51, December 2026
                </p>
              </div>

              <div className="p-4 bg-[#021409]/85 border border-[#22c55e]/45">
                <h4 className="text-xs font-bold text-[#4ade80] uppercase mb-2">
                  [OFFICIAL BRIEFING CONTEXT]
                </h4>
                <p className="italic text-[#bbf7d0]/85 text-xs">
                  &ldquo;The Intergalactic Worlds Expo is taking place on Earth, Hyper Island campus, Week 51, 2026.
                  Due to the limited space, neighbouring worlds will join together to present in group pavilions;
                  however, each culture should advertise themselves and the expo ahead of time.&rdquo;
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#4ade80] uppercase text-xs">Our Unified Group Pavilion Strategy</h4>
                <p>
                  Rather than fragmenting the pavilion into disconnected, isolated mini-demos, our team (Aisah, Mana, Martin, and Maxime Dewynter) decided to
                  <strong className="text-[#86efac]"> combine our speculative fiction into one common collaborative game</strong>.
                </p>
                <p>
                  We built a <strong className="text-[#86efac]">hybrid physical and digital arcade installation</strong> centered on an authentic
                  14&quot; CRT retro-futuristic arcade cabinet powered by a Raspberry Pi 400 and custom 8BitDo arcade stick,
                  enveloped by tactile alien scenography. Visitors step up to the physical controls to navigate an alien subterranean abyss
                  using real-time 3D photonic LiDAR echolocation.
                </p>
              </div>

              <div className="border-t border-[#22c55e]/30 pt-4 space-y-3">
                <div className="border-l-2 border-[#4ade80] pl-2">
                  <h4 className="text-xs font-bold text-[#4ade80] uppercase">
                    Speculative Vision: With Unlimited Time &amp; Resources, What Would We Have Built?
                  </h4>
                  <p className="text-[11px] text-[#4ade80]/75">
                    The unconstrained blueprint of our collaborative installation
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#021208]/90 border border-[#22c55e]/45 space-y-1">
                    <h5 className="font-bold text-[#4ade80] text-xs uppercase">
                      [1] Full-Scale Subterranean Immersion Pod
                    </h5>
                    <p className="text-xs text-[#bbf7d0]/85">
                      A physical zero-lux climate chamber with atmospheric mist, where visitors wear photonic haptic suits translating raycasted LiDAR points into gentle tactile vibrations across their skin.
                    </p>
                  </div>

                  <div className="p-3 bg-[#021208]/90 border border-[#22c55e]/45 space-y-1">
                    <h5 className="font-bold text-[#4ade80] text-xs uppercase">
                      [2] Physical Resonant Floral Beacons
                    </h5>
                    <p className="text-xs text-[#bbf7d0]/85">
                      Kinetic mechanical sculptures surrounding the cabinet that physically bloom in real time when charged by the focused beam, emitting ultrasonic acoustic pulses and warm amber light.
                    </p>
                  </div>

                  <div className="p-3 bg-[#021208]/90 border border-[#22c55e]/45 space-y-1">
                    <h5 className="font-bold text-[#4ade80] text-xs uppercase">
                      [3] Volumetric 3D Laser Echolocation Tank
                    </h5>
                    <p className="text-xs text-[#bbf7d0]/85">
                      A 360-degree holographic glass sphere projecting 220,000 real-time LiDAR particles floating in mid-air, allowing onlookers to watch the cavern illuminate from every angle.
                    </p>
                  </div>

                  <div className="p-3 bg-[#021208]/90 border border-[#22c55e]/45 space-y-1">
                    <h5 className="font-bold text-[#4ade80] text-xs uppercase">
                      [4] Bioluminescent Spore Defense Grid
                    </h5>
                    <p className="text-xs text-[#bbf7d0]/85">
                      Chilled nitrogen tubes venting aerosol vapors when viral spores approach, challenging players to defend the resonant ecosystem across physical and digital space.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THE COMBINED STORY */}
          {activeTab === "story" && (
            <div className="space-y-4">
              <div className="border-l-4 border-[#4ade80] pl-3">
                <h3 className="text-base font-bold phosphor-text-glow uppercase tracking-wider">
                  The Combined Story: Four Worlds, One Journey
                </h3>
                <p className="text-xs text-[#4ade80]/75">
                  Narrative Fusion of Aisah, Mana, Martin &amp; Maxime
                </p>
              </div>

              <div className="space-y-3 bg-[#021208]/90 p-4 border border-[#22c55e]/45 text-xs">
                <div className="font-bold text-[#4ade80] uppercase border-b border-[#22c55e]/30 pb-1">
                  How We Merged Our Four Real Concepts &amp; Letters of Intent
                </div>
                <p className="text-[#bbf7d0]/85">
                  <strong className="text-[#86efac]">1. The Mycelium Forest &amp; The Silent Hill (Aisah &mdash; &ldquo;Cutting Exchange&rdquo;):</strong>{" "}
                  A vast moss forest operating as one interconnected consciousness like fungal mycelium. An invasive virus weakens the network, severing senses (&ldquo;We used to hear the hill from here&rdquo;). Survival depends on passing rare virus-eating root cuttings hand-to-hand at the communal gathering.
                </p>
                <p className="text-[#bbf7d0]/85">
                  <strong className="text-[#86efac]">2. The Non-Digital Society (Mana &mdash; &ldquo;Wanna Go To A Better Planet? // NewLife&rdquo;):</strong>{" "}
                  A provocative satire questioning digital overload, artificial intelligence, and capitalist power. It envisions an organic existence stripped of screens, mirrors, and technology, proving that tactile, physical community and love prevail over darkness.
                </p>
                <p className="text-[#bbf7d0]/85">
                  <strong className="text-[#86efac]">3. 3D LiDAR, Astronomy &amp; Floral Mate-Summoning (Martin &mdash; &ldquo;Ørgäæ&rdquo;):</strong>{" "}
                  Orbiting a binary star system in the Andromeda Galaxy with 4D spatial perception. To reproduce and communicate across the void, beings interact with rare resonant flowers that pulse, sing, and dance, mapped through 3D photonic LiDAR echolocation scans.
                </p>
                <p className="text-[#bbf7d0]/85">
                  <strong className="text-[#86efac]">4. Life Beneath the Ice &amp; Light Wave Communication (Maxime &mdash; &ldquo;Chromatic Symbiosis&rdquo;):</strong>{" "}
                  Set on a rocky moon of Saturn where zero sunlight penetrates the thick frozen crust. Beings communicate and navigate by projecting colored light waves and heat energy. A father guides his twin sons to discover living warm forms that unlock a swirling portal to our collaborative world.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: OUR PROTOTYPE */}
          {activeTab === "prototype" && (
            <div className="space-y-4">
                <div className="border-l-4 border-[#4ade80] pl-3">
                  <h3 className="text-base font-bold phosphor-text-glow uppercase tracking-wider">
                    Question 2: What Did We Build? (Our Working Prototype)
                  </h3>
                  <p className="text-xs text-[#4ade80]/75">
                    The Physical Kiosk + 2D Surface Intro &amp; First-Person 3D Helmet Light-Painting Engine
                  </p>
                </div>

              <div className="space-y-3">
                <p>
                  To bring this vision to life within exhibition constraints, we engineered an authentic <strong className="text-[#86efac]">retro-futuristic arcade installation</strong>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#021409]/85 border border-[#22c55e]/40">
                    <div className="font-bold text-[#4ade80] mb-1 uppercase">1. Physical Scenography</div>
                    <p className="text-[#bbf7d0]/80">
                      A physical booth surrounding the CRT monitor decorated with alien bedrock soil, preserved moss, cold UV lighting, and umbilical cable conduits.
                    </p>
                  </div>
                  <div className="p-3 bg-[#021409]/85 border border-[#22c55e]/40">
                    <div className="font-bold text-[#4ade80] mb-1 uppercase">2. Hardware Engine</div>
                    <p className="text-[#bbf7d0]/80">
                      Raspberry Pi 400 + Recalbox RGB Dual feeding native 15kHz analog RGB via SCART to a 14&quot; CRT TV, controlled with an 8BitDo Arcade Stick.
                    </p>
                  </div>
                  <div className="p-3 bg-[#021409]/85 border border-[#22c55e]/40">
                    <div className="font-bold text-[#4ade80] mb-1 uppercase">3. Digital Game Software</div>
                    <p className="text-[#bbf7d0]/80">
                      Custom Next.js 15, HTML5 Canvas 2D, and Three.js 3D WebGL experience running at 60 FPS with first-person light-painted point clouds and procedural Web Audio.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#021208]/90 border-2 border-[#4ade80]/80">
                  <h4 className="font-bold text-[#4ade80] text-xs uppercase mb-2">Our Playable Game: Echoes in the Dark (2D Intro → 3D Building)</h4>
                  <p className="text-xs text-[#bbf7d0]/85 mb-2">
                    <strong className="text-[#86efac]">Act I — Surface Expedition (2D):</strong> The human explorer disembarks the lander across pixel-art alien ridges, passing bioluminescent flora before entering the monolith doorway.
                  </p>
                  <p className="text-xs text-[#bbf7d0]/85 mb-2">
                    <strong className="text-[#86efac]">Act II — Inside the Helmet (3D):</strong> Viewed from inside the explorer&apos;s amber-rimmed visor, you see his gloved hand wielding a photonic light-painting tool. Sweeping beams paint up to 220,000 luminous points onto pitch-black arches, ceiling trusses, pilasters, and vents.
                  </p>
                  <p className="text-xs text-[#bbf7d0]/85">
                    Four dormant floral beacons must be uncovered, charged with a focused beam, and bloomed into resonant blossoms—calling your distant counterpart while burning away incoming viral spores.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HARDWARE & SCENOGRAPHY */}
          {activeTab === "tech" && (
            <div className="space-y-4">
              <div className="border-l-4 border-[#4ade80] pl-3">
                <h3 className="text-base font-bold phosphor-text-glow uppercase tracking-wider">
                  Hardware Choices, Technical Architecture &amp; Scenography
                </h3>
                <p className="text-xs text-[#4ade80]/75">
                  Engineering the 15kHz CRT Machine &amp; Gallery Booth Installation
                </p>
              </div>

              {/* Technical Rationale */}
              <div className="space-y-3">
                <div className="p-3 bg-[#021409]/85 border-l-2 border-[#4ade80]">
                  <div className="font-bold text-[#4ade80] text-xs uppercase mb-1">Why 14&quot; Analog RGB CRT TV (15kHz SCART)?</div>
                  <p className="text-xs text-[#bbf7d0]/85">
                    True CRT phosphors emit light organically with zero digital latency and authentic natural scanlines.
                    It provides physical weight, warmth, and retro-futuristic realism to ground our speculative alien universe.
                  </p>
                </div>

                <div className="p-3 bg-[#021409]/85 border-l-2 border-[#4ade80]">
                  <div className="font-bold text-[#4ade80] text-xs uppercase mb-1">Why Raspberry Pi 400 &amp; 8BitDo Arcade Stick?</div>
                  <p className="text-xs text-[#bbf7d0]/85">
                    An exhibition cabinet must be an uncrashable standalone appliance. The Pi 400 auto-boots directly into fullscreen kiosk mode.
                    The heavy arcade stick with sanwa-style switches gives visitors immediate, tactile, intuitive play without needing instructions.
                  </p>
                </div>

                <div className="p-3 bg-[#021409]/85 border-l-2 border-[#4ade80]">
                  <div className="font-bold text-[#4ade80] text-xs uppercase mb-1">Why Next.js, Three.js 3D &amp; Procedural Web Audio?</div>
                  <p className="text-xs text-[#bbf7d0]/85">
                    Universal portability: the same codebase powers the physical arcade machine offline AND the public web exhibition on Vercel.
                    Three.js provides high-performance 220,000-point dynamic buffer geometries, while procedural Web Audio guarantees 100% offline audio with zero audio file load lag.
                  </p>
                </div>
              </div>

              {/* Physical Scenography */}
              <div className="border-t border-[#22c55e]/30 pt-4 space-y-3">
                <div className="border-l-2 border-[#4ade80] pl-2">
                  <h4 className="text-xs font-bold text-[#4ade80] uppercase">
                    Physical Scenography: Building the Scene Around the CRT
                  </h4>
                  <p className="text-[11px] text-[#4ade80]/75">
                    Bridging the physical gallery space and the digital void
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#021208]/90 border border-[#22c55e]/40">
                    <div className="font-bold text-[#4ade80] mb-1 uppercase">1. Black Bedrock &amp; Preserved Moss Base</div>
                    <p className="text-[#bbf7d0]/80">
                      The podium supporting the 14&quot; CRT monitor is wrapped in textured matte black fabric, covered with volcanic rock fragments and preserved moss echoing the subterranean layer.
                    </p>
                  </div>

                  <div className="p-3 bg-[#021208]/90 border border-[#22c55e]/40">
                    <div className="font-bold text-[#4ade80] mb-1 uppercase">2. Alien Umbilical Conduits</div>
                    <p className="text-[#bbf7d0]/80">
                      Power and SCART cables are encased in ribbed industrial conduit tubing, dressed like organic bio-technological umbilicals linking the arcade cabinet to the planet&apos;s mantle.
                    </p>
                  </div>

                  <div className="p-3 bg-[#021208]/90 border border-[#22c55e]/40">
                    <div className="font-bold text-[#4ade80] mb-1 uppercase">3. Cold UV vs Warm Thermal Lighting</div>
                    <p className="text-[#bbf7d0]/80">
                      A hidden cold ultraviolet backlight casts an abyssal glow behind the CRT monitor, while a warm amber downlight focuses on the 8BitDo Arcade Stick, physically embodying the thermal guidance theme.
                    </p>
                  </div>

                  <div className="p-3 bg-[#021208]/90 border border-[#22c55e]/40">
                    <div className="font-bold text-[#4ade80] mb-1 uppercase">4. Gallery Wall Poster Hangings</div>
                    <p className="text-[#bbf7d0]/80">
                      The official collaborative exhibition poster is printed and mounted directly beside the cabinet, acting as the speculative beacon for the shared world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TEAM ROLES */}
          {activeTab === "team" && (
            <div className="space-y-4">
              <div className="border-l-4 border-[#4ade80] pl-3">
                <h3 className="text-base font-bold phosphor-text-glow uppercase tracking-wider">
                  Team Members &amp; Collaborative Contributions
                </h3>
                <p className="text-xs text-[#4ade80]/75">
                  Hyper Island Group Collaboration • Week 51, 2026
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#021208]/90 border border-[#22c55e]/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#4ade80] uppercase">Aisah</span>
                    <span className="px-1.5 py-0.5 bg-[#052e16] text-[#86efac] border border-[#4ade80]/60 text-[9px] font-bold">MYCELIUM &amp; THREAT</span>
                  </div>
                  <p className="text-[#4ade80]/75 mb-1">Concept: <strong className="text-[#86efac]">We used to hear the hill from here</strong></p>
                  <p className="text-[#bbf7d0]/85 text-[11px]">
                    Moss forest collective mycelium consciousness, invasive viral disruption, and communal cutting exchanges. Co-constructed alien skeletal anatomy and inspired the in-game viral spore hazard.
                  </p>
                </div>

                <div className="p-3 bg-[#021208]/90 border border-[#22c55e]/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#4ade80] uppercase">Mana</span>
                    <span className="px-1.5 py-0.5 bg-[#052e16] text-[#86efac] border border-[#4ade80]/60 text-[9px] font-bold">SPECULATIVE SATIRE</span>
                  </div>
                  <p className="text-[#4ade80]/75 mb-1">Concept: <strong className="text-[#86efac]">NewLife // Anti-Digital Society</strong></p>
                  <p className="text-[#bbf7d0]/85 text-[11px]">
                    Satirical critique of digital alienation, AI marketing, and cosmetic pressure vs pure organic existence. Established the physical, hands-on arcade philosophy of our installation.
                  </p>
                </div>

                <div className="p-3 bg-[#021208]/90 border-2 border-[#4ade80]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#4ade80] uppercase">Martin</span>
                    <span className="px-1.5 py-0.5 bg-[#4ade80] text-[#021206] text-[9px] font-bold">3D ENGINE &amp; BOTANY</span>
                  </div>
                  <p className="text-[#4ade80]/75 mb-1">Concept: <strong className="text-[#86efac]">Ørgäæ</strong></p>
                  <p className="text-[#bbf7d0]/85 text-[11px]">
                    Binary star astronomy, 4D perception, and pulsing floral mate-summoning mechanics. Designed the 3D Three.js LiDAR raycasting engine (220,000 point-cloud reflections) and flower blooming physics.
                  </p>
                </div>

                <div className="p-3 bg-[#021208]/90 border-2 border-[#4ade80]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#4ade80] uppercase">Maxime Dewynter</span>
                    <span className="px-1.5 py-0.5 bg-[#4ade80] text-[#021206] text-[9px] font-bold">ARCADE &amp; NARRATIVE</span>
                  </div>
                  <p className="text-[#4ade80]/75 mb-1">Concept: <strong className="text-[#86efac]">Chromatic Symbiosis</strong></p>
                  <p className="text-[#bbf7d0]/85 text-[11px]">
                    Sub-ice moon ecology, light-wave &amp; heat sensory communication, father-and-twins portal journey. Engineered the CRT arcade cabinet architecture, 8BitDo gamepad input engine, and unified exhibition launcher.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="relative z-10 p-3 flex items-center justify-between text-[10px] border-t-2 border-[#22c55e]/40 bg-[#010c05] text-[#4ade80]/75">
          <span>THE INTERGALACTIC WORLDS EXPO • WEEK 51, 2026</span>
          <span className="opacity-80">EARTH PAVILION // HYPER ISLAND</span>
        </div>
      </div>
    </div>
  );
}
