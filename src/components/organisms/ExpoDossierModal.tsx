"use client";

import React, { useState } from "react";
import { AlienHubDesign } from "@/components/molecules/CalibrationBar";

interface ExpoDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  hubDesign?: AlienHubDesign;
  onToggleHubDesign?: () => void;
}

type DossierTab = "vision" | "story" | "prototype" | "tech" | "team";

export function ExpoDossierModal({
  isOpen,
  onClose,
  hubDesign,
  onToggleHubDesign,
}: ExpoDossierModalProps) {
  const [activeTab, setActiveTab] = useState<DossierTab>("vision");

  if (!isOpen) return null;

  const isBrutalist = hubDesign === "gateway";
  const isPhosphor = hubDesign === "specimen";

  const getThemeLabel = (design?: AlienHubDesign) => {
    switch (design) {
      case "gateway":
        return "THEME: GALLERY ➔";
      case "translator":
        return "THEME: ARCADE ➔";
      case "specimen":
        return "THEME: PHOSPHOR ➔";
      default:
        return "THEME: GALLERY ➔";
    }
  };

  const themeStyles = {
    container: isBrutalist
      ? "border-2 border-white shadow-[10px_10px_0px_#ffffff]"
      : isPhosphor
      ? "border-2 border-emerald-500 shadow-[10px_10px_0px_#10b981]"
      : "border-2 border-purple-500 shadow-[10px_10px_0px_#9d00ff]",
    header: isBrutalist
      ? "border-b-2 border-white bg-white text-black"
      : isPhosphor
      ? "border-b-2 border-emerald-500 bg-[#00240d] text-emerald-200"
      : "border-b-2 border-purple-500 bg-[#18002e] text-purple-200",
    headerSub: isBrutalist
      ? "text-neutral-800"
      : isPhosphor
      ? "text-emerald-400/80"
      : "text-purple-300/80",
    themeButton: isBrutalist
      ? "bg-white hover:bg-neutral-200 text-black border-2 border-black text-xs font-bold shadow-[2px_2px_0px_#000000]"
      : isPhosphor
      ? "bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border-2 border-emerald-400 text-xs font-bold shadow-[2px_2px_0px_#10b981]"
      : "bg-purple-900 hover:bg-purple-800 text-purple-200 border-2 border-purple-400 text-xs font-bold shadow-[2px_2px_0px_#9d00ff]",
    closeButton: isBrutalist
      ? "bg-black text-white hover:bg-neutral-800 border-2 border-black text-xs font-bold"
      : isPhosphor
      ? "bg-black text-emerald-300 hover:bg-emerald-950 border-2 border-emerald-500 text-xs font-bold"
      : "bg-[#0a0014] text-purple-200 hover:bg-purple-950 border-2 border-purple-500 text-xs font-bold",
    tabBar: isBrutalist
      ? "border-b-2 border-white/30 bg-neutral-950"
      : isPhosphor
      ? "border-b-2 border-emerald-500/40 bg-black"
      : "border-b-2 border-purple-500/40 bg-[#0a0014]",
    activeTab: isBrutalist
      ? "bg-white text-black font-bold"
      : isPhosphor
      ? "bg-emerald-600 text-black font-bold shadow-[0_0_8px_rgba(16,185,129,0.5)]"
      : "bg-purple-600 text-white font-bold shadow-[0_0_8px_rgba(168,85,247,0.5)]",
    inactiveTab: isBrutalist
      ? "text-neutral-400 hover:text-white hover:bg-neutral-900 border-r border-white/20"
      : isPhosphor
      ? "text-emerald-500/60 hover:text-emerald-300 hover:bg-emerald-950/40 border-r border-emerald-500/20"
      : "text-purple-300/60 hover:text-purple-200 hover:bg-purple-950/40 border-r border-purple-500/20",
    contentBorder: isBrutalist
      ? "border-l-4 border-white"
      : isPhosphor
      ? "border-l-4 border-emerald-400"
      : "border-l-4 border-cyan-400",
    footer: isBrutalist
      ? "border-t-2 border-white bg-neutral-950 text-neutral-400"
      : isPhosphor
      ? "border-t-2 border-emerald-500/40 bg-black text-emerald-400/80"
      : "border-t-2 border-purple-500/40 bg-[#0a0014] text-purple-300/80",
  };

  return (
    <div
      className="fixed inset-0 z-[250] bg-black/95 flex items-center justify-center p-3 md:p-6 font-mono text-white select-none backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-4xl max-h-[92vh] bg-black flex flex-col overflow-hidden ${themeStyles.container}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-3 md:p-4 ${themeStyles.header}`}>
          <div className="flex items-center gap-2">
            <div>
              <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">
                EXPO DOSSIER • HYPER ISLAND WEEK 51, 2026
              </h2>
              <p className={`text-[10px] ${themeStyles.headerSub}`}>
                The Intergalactic Worlds Expo — Unified Group Pavilion &amp; Collaborative Game
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onToggleHubDesign && hubDesign && (
              <button
                onClick={onToggleHubDesign}
                className={`px-2.5 py-1 transition-all cursor-pointer ${themeStyles.themeButton}`}
                title="Switch Exhibition Theme [T]"
              >
                <span>[{getThemeLabel(hubDesign)}]</span>
              </button>
            )}
            <button
              onClick={onClose}
              className={`flex items-center gap-1 px-2.5 py-1 transition-all cursor-pointer ${themeStyles.closeButton}`}
              title="Close [B / ESC]"
            >
              <span>[B / ESC] CLOSE</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation: 5 Distinct Focused Tabs */}
        <div className={`flex flex-wrap text-[10px] md:text-xs ${themeStyles.tabBar}`}>
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
              className={`px-3 py-2 font-bold uppercase transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? themeStyles.activeTab
                  : themeStyles.inactiveTab
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 text-xs md:text-sm leading-relaxed text-neutral-200">
          {/* TAB 1: EXPO & SPECULATIVE VISION */}
          {activeTab === "vision" && (
            <div className="space-y-4">
              <div className={`${themeStyles.contentBorder} pl-3`}>
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
                  Rather than fragmenting the pavilion into disconnected, isolated mini-demos, our team (Aisah, Mana, Martin, and Maxime Dewynter) decided to
                  <strong> combine our speculative fiction into one common collaborative game</strong>.
                </p>
                <p>
                  We built a <strong>hybrid physical and digital arcade installation</strong> centered on an authentic
                  14&quot; CRT retro-futuristic arcade cabinet powered by a Raspberry Pi 400 and custom 8BitDo arcade stick,
                  enveloped by tactile alien scenography. Visitors step up to the physical controls to navigate an alien subterranean abyss
                  using real-time 3D photonic LiDAR echolocation.
                </p>
              </div>

              <div className="border-t border-white/20 pt-4 space-y-3">
                <div className="border-l-2 border-white pl-2">
                  <h4 className="text-xs font-bold text-white uppercase">
                    Speculative Vision: With Unlimited Time &amp; Resources, What Would We Have Built?
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    The unconstrained blueprint of our collaborative installation
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-neutral-950 border border-white/30 space-y-1">
                    <h5 className="font-bold text-white text-xs uppercase">
                      [1] Full-Scale Subterranean Immersion Pod
                    </h5>
                    <p className="text-xs text-neutral-300">
                      A physical zero-lux climate chamber with atmospheric mist, where visitors wear photonic haptic suits translating raycasted LiDAR points into gentle tactile vibrations across their skin.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-white/30 space-y-1">
                    <h5 className="font-bold text-white text-xs uppercase">
                      [2] Physical Resonant Floral Beacons
                    </h5>
                    <p className="text-xs text-neutral-300">
                      Kinetic mechanical sculptures surrounding the cabinet that physically bloom in real time when charged by the focused beam, emitting ultrasonic acoustic pulses and warm amber light.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-white/30 space-y-1">
                    <h5 className="font-bold text-white text-xs uppercase">
                      [3] Volumetric 3D Laser Echolocation Tank
                    </h5>
                    <p className="text-xs text-neutral-300">
                      A 360-degree holographic glass sphere projecting 220,000 real-time LiDAR particles floating in mid-air, allowing onlookers to watch the cavern illuminate from every angle.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-white/30 space-y-1">
                    <h5 className="font-bold text-white text-xs uppercase">
                      [4] Bioluminescent Spore Defense Grid
                    </h5>
                    <p className="text-xs text-neutral-300">
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
              <div className={`${themeStyles.contentBorder} pl-3`}>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  The Combined Story: Four Worlds, One Journey
                </h3>
                <p className="text-xs text-neutral-400">
                  Narrative Fusion of Aisah, Mana, Martin &amp; Maxime
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
                    How We Merged Our Four Real Concepts &amp; Letters of Intent
                  </div>
                  <p className="text-neutral-300">
                    <strong>1. The Mycelium Forest &amp; The Silent Hill (Aisah &mdash; &ldquo;Cutting Exchange&rdquo;):</strong>
                    A vast moss forest operating as one interconnected consciousness like fungal mycelium. An invasive virus weakens the network, severing senses (&ldquo;We used to hear the hill from here&rdquo;). Survival depends on passing rare virus-eating root cuttings hand-to-hand at the communal gathering.
                  </p>
                  <p className="text-neutral-300">
                    <strong>2. The Non-Digital Society (Mana &mdash; &ldquo;Wanna Go To A Better Planet? // NewLife&rdquo;):</strong>
                    A provocative satire questioning digital overload, artificial intelligence, and capitalist power. It envisions an organic existence stripped of screens, mirrors, and technology, proving that tactile, physical community and love prevail over darkness.
                  </p>
                  <p className="text-neutral-300">
                    <strong>3. 3D LiDAR, Astronomy &amp; Floral Mate-Summoning (Martin &mdash; &ldquo;Ørgäæ&rdquo;):</strong>
                    Orbiting a binary star system in the Andromeda Galaxy with 4D spatial perception. To reproduce and communicate across the void, beings interact with rare resonant flowers that pulse, sing, and dance, mapped through 3D photonic LiDAR echolocation scans.
                  </p>
                  <p className="text-neutral-300">
                    <strong>4. Life Beneath the Ice &amp; Light Wave Communication (Maxime &mdash; &ldquo;Chromatic Symbiosis&rdquo;):</strong>
                    Set on a rocky moon of Saturn where zero sunlight penetrates the thick frozen crust. Beings communicate and navigate by projecting colored light waves and heat energy. A father guides his twin sons to discover living warm forms that unlock a swirling portal to our collaborative world.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OUR PROTOTYPE */}
          {activeTab === "prototype" && (
            <div className="space-y-4">
              <div className={`${themeStyles.contentBorder} pl-3`}>
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

          {/* TAB 4: HARDWARE & SCENOGRAPHY */}
          {activeTab === "tech" && (
            <div className="space-y-4">
              <div className={`${themeStyles.contentBorder} pl-3`}>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Hardware Choices, Technical Architecture &amp; Scenography
                </h3>
                <p className="text-xs text-neutral-400">
                  Engineering the 15kHz CRT Machine &amp; Gallery Booth Installation
                </p>
              </div>

              {/* Technical Rationale */}
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
              </div>

              {/* Physical Scenography */}
              <div className="border-t border-white/20 pt-4 space-y-3">
                <div className="border-l-2 border-white pl-2">
                  <h4 className="text-xs font-bold text-white uppercase">
                    Physical Scenography: Building the Scene Around the CRT
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Bridging the physical gallery space and the digital void
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-neutral-950 border border-white/20">
                    <div className="font-bold text-white mb-1 uppercase">1. Black Bedrock &amp; Preserved Moss Base</div>
                    <p className="text-neutral-400">
                      The podium supporting the 14&quot; CRT monitor is wrapped in textured matte black fabric, covered with volcanic rock fragments and preserved moss echoing the subterranean layer.
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

          {/* TAB 5: TEAM ROLES */}
          {activeTab === "team" && (
            <div className="space-y-4">
              <div className={`${themeStyles.contentBorder} pl-3`}>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Team Members &amp; Collaborative Contributions
                </h3>
                <p className="text-xs text-neutral-400">
                  Hyper Island Group Collaboration • Week 51, 2026
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-950 border border-white/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Aisah</span>
                    <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[9px] font-bold">MYCELIUM &amp; THREAT</span>
                  </div>
                  <p className="text-neutral-400 mb-1">Concept: <strong>We used to hear the hill from here</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Moss forest collective mycelium consciousness, invasive viral disruption, and communal cutting exchanges. Co-constructed alien skeletal anatomy and inspired the in-game viral spore hazard.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border border-white/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Mana</span>
                    <span className="px-1.5 py-0.5 bg-amber-500 text-black text-[9px] font-bold">SPECULATIVE SATIRE</span>
                  </div>
                  <p className="text-neutral-400 mb-1">Concept: <strong>NewLife // Anti-Digital Society</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Satirical critique of digital alienation, AI marketing, and cosmetic pressure vs pure organic existence. Established the physical, hands-on arcade philosophy of our installation.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border-2 border-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Martin</span>
                    <span className="px-1.5 py-0.5 bg-purple-600 text-white text-[9px] font-bold">3D ENGINE &amp; BOTANY</span>
                  </div>
                  <p className="text-neutral-400 mb-1">Concept: <strong>Ørgäæ</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Binary star astronomy, 4D perception, and pulsing floral mate-summoning mechanics. Designed the 3D Three.js LiDAR raycasting engine (220,000 point-cloud reflections) and flower blooming physics.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border-2 border-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Maxime Dewynter</span>
                    <span className="px-1.5 py-0.5 bg-white text-black text-[9px] font-bold">ARCADE &amp; NARRATIVE</span>
                  </div>
                  <p className="text-neutral-400 mb-1">Concept: <strong>Chromatic Symbiosis</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Sub-ice moon ecology, light-wave &amp; heat sensory communication, father-and-twins portal journey. Engineered the CRT arcade cabinet architecture, 8BitDo gamepad input engine, and unified exhibition launcher.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`p-3 flex items-center justify-between text-[10px] ${themeStyles.footer}`}>
          <span>THE INTERGALACTIC WORLDS EXPO • WEEK 51, 2026</span>
          <span className="opacity-70">EARTH PAVILION // HYPER ISLAND</span>
        </div>
      </div>
    </div>
  );
}
