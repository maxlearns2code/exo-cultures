"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { X, BookOpen, Rocket, Tv, Cpu, Palette, CheckCircle2, Radio, Terminal } from "lucide-react";

interface ExpoDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DossierTab = "expo" | "unlimited" | "prototype" | "tech" | "team" | "scenography" | "brief1";

export function ExpoDossierModal({ isOpen, onClose }: ExpoDossierModalProps) {
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
            <BookOpen className="w-5 h-5 text-black" />
            <div>
              <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">
                EXPO DOSSIER • HYPER ISLAND WEEK 51, 2026
              </h2>
              <p className="text-[10px] text-neutral-800">
                The Intergalactic Worlds Expo — Group Pavilion Deliverable
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-1 bg-black text-white hover:bg-neutral-800 border-2 border-black text-xs font-bold transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>[B / ESC] CLOSE</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b-2 border-white/30 bg-neutral-950 text-[10px] md:text-xs">
          {[
            { id: "expo", label: "01. THE EXPO BRIEF" },
            { id: "unlimited", label: "02. UNLIMITED CONCEPT" },
            { id: "prototype", label: "03. OUR PROTOTYPE" },
            { id: "tech", label: "04. OUR PROCESS & HARDWARE" },
            { id: "scenography", label: "05. SCENOGRAPHY" },
            { id: "brief1", label: "06. BRIEF 1: POSTER & LETTER" },
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
                <h4 className="text-xs font-bold text-white uppercase mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-white" />
                  Official Briefing Context
                </h4>
                <p className="italic text-neutral-300 text-xs">
                  &ldquo;The Intergalactic Worlds Expo is taking place on Earth, Hyper Island campus, Week 51, 2026.
                  Due to the limited space, neighbouring worlds will join together to present in group pavilions;
                  however, each culture should advertise themselves and the expo with an individual poster ahead of time.&rdquo;
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase text-xs">Our Group Pavilion Strategy</h4>
                <p>
                  To externalize and &ldquo;alienate&rdquo; human sensory assumptions, four neighbouring exoplanetary cultures
                  co-habitate in a single shared exhibition pavilion. Rather than displaying passive static mockups,
                  our group built a <strong>hybrid physical and digital installation</strong> centered on an authentic
                  14&quot; CRT retro-futuristic arcade cabinet powered by a Raspberry Pi 400 and custom 8BitDo arcade sticks,
                  enveloped by tactile alien scenography.
                </p>
                <p>
                  Each visitor physically steps up to the arcade stick to explore interactive fragments of each alien world,
                  experiencing how alien beings interact with light, energy, and dimensional travel.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: UNLIMITED CONCEPT */}
          {activeTab === "unlimited" && (
            <div className="space-y-4">
              <div className="border-l-4 border-white pl-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Question 1: With Unlimited Time & Resources, What Would We Have Built?
                </h3>
                <p className="text-xs text-neutral-400">
                  The Speculative Vision of the Intergalactic Pavilion
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-950 border border-white/30 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-white" />
                    Full-Scale Cryo-Immersion Pod
                  </h4>
                  <p className="text-xs text-neutral-300">
                    A life-sized biometric immersion chamber maintaining a chilled sub-ice oceanic atmosphere,
                    where visitors wear optical neural feedback helmets that translate pure light wavelengths into tactile warmth
                    and synthetic bio-frequencies.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-white/30 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-white" />
                    Living Bioluminescent Algae Vats
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Physical translucent tubes surrounding the pavilion filled with genetically engineered bioluminescent algae
                    that dynamically pulse in sync with the player&apos;s actions, light fireballs, and portal activation.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-white/30 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5 text-white" />
                    4-Player Holographic Projection Ring
                  </h4>
                  <p className="text-xs text-neutral-300">
                    A central 360-degree volumetric glass prism displaying all four alien worlds simultaneously colliding and
                    trading cultural fragments across cosmic boundaries in real-time.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 border border-white/30 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-white" />
                    Sensory Translation Odor & Temperature Emitters
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Micro-climate vents dispensing geothermal mist and scent molecules representing sub-ice hydrothermal minerals,
                    bringing non-visual alien senses directly to the human visitor.
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
                  The Physical Cabinet + Digital Multi-World Suite
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
                    <div className="font-bold text-white mb-1 uppercase">3. Digital Software</div>
                    <p className="text-neutral-400">
                      Custom 4-in-1 Next.js 15 arcade launcher running locked at 60 FPS with offline procedural 8-bit sound synthesis and zero internet dependency.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-neutral-950 border-2 border-white">
                  <h4 className="font-bold text-white text-xs uppercase mb-2">Maxime&apos;s Playable World: Chromatic Symbiosis</h4>
                  <p className="text-xs text-neutral-300">
                    A side-scrolling platformer crafted from 8 individual Photoshop poster layers. Players control twin alien brothers running, jumping,
                    and launching light fireballs through sub-ice abyssal caverns to awaken the ancient Living Portal Tree.
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
                  Our Process: Hardware Choices & Technical Architecture
                </h3>
                <p className="text-xs text-neutral-400">
                  Why We Chose 15kHz CRT, Raspberry Pi 400, 8BitDo & Next.js
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-neutral-900 border-l-2 border-white">
                  <div className="font-bold text-white text-xs uppercase mb-1">Why 14&quot; Analog RGB CRT TV (15kHz SCART)?</div>
                  <p className="text-xs text-neutral-300">
                    True CRT phosphors emit light organically with zero digital latency and authentic natural scanlines.
                    It provides physical weight, warmth, and nostalgia to contrast with speculative futuristic alien lore.
                  </p>
                </div>

                <div className="p-3 bg-neutral-900 border-l-2 border-white">
                  <div className="font-bold text-white text-xs uppercase mb-1">Why Raspberry Pi 400 & 8BitDo Arcade Stick?</div>
                  <p className="text-xs text-neutral-300">
                    An arcade cabinet must be an uncrashable standalone appliance. The Pi 400 auto-boots directly into fullscreen kiosk mode.
                    The heavy arcade stick with sanwa-style switches gives visitors immediate, tactile, intuitive play without needing instructions.
                  </p>
                </div>

                <div className="p-3 bg-neutral-900 border-l-2 border-white">
                  <div className="font-bold text-white text-xs uppercase mb-1">Why Next.js, HTML5 Canvas 60 FPS & Web Audio?</div>
                  <p className="text-xs text-neutral-300">
                    Universal portability: the same codebase powers the physical arcade machine offline AND the public web exhibition on Vercel.
                    Procedural Web Audio guarantees 100% offline audio with zero audio file load lag.
                  </p>
                </div>

                <div className="p-3 bg-neutral-900 border-l-2 border-white">
                  <div className="font-bold text-white text-xs uppercase mb-1">AI Reflection & Academic Integrity</div>
                  <p className="text-xs text-neutral-300">
                    In strict accordance with Brief 1 rules, no prompt-based generative AI was used to produce the deliverable poster.
                    AI was utilized as a coding accelerator for scaffolding Next.js and canvas mathematics, demonstrating conscious, transparent tool adoption.
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
                    <div className="font-bold text-white mb-1 uppercase">1. Black Bedrock & Preserved Moss Base</div>
                    <p className="text-neutral-400">
                      The wooden podium supporting the 14&quot; CRT monitor is wrapped in textured matte black fabric, covered with volcanic rock fragments and preserved moss echoing the sub-ice bedrock layer.
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
                      The four individual posters (from Brief 1) are printed and mounted directly above and beside the cabinet, acting as the speculative advertisements for each world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BRIEF 1 DELIVERABLE */}
          {activeTab === "brief1" && (
            <div className="space-y-4">
              <div className="border-l-4 border-white pl-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Brief 1 Deliverable: Chromatic Symbiosis (Maxime Dewynter)
                </h3>
                <p className="text-xs text-neutral-400">
                  Individual Poster Deliverable + 1-Page Letter of Intent
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 flex flex-col items-center">
                  <div className="relative w-full aspect-[1043/1477] border-2 border-white overflow-hidden shadow-[6px_6px_0px_#ffffff] mb-2">
                    <NextImage
                      src="/assets/chromatic-symbiosis/ai-designs/ai-poster-01.png"
                      alt="Chromatic Symbiosis Poster"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[10px] text-neutral-400 uppercase font-bold">
                    Official Exhibition Poster
                  </span>
                </div>

                <div className="md:col-span-2 space-y-3 bg-neutral-950 p-4 border border-white/30 text-xs">
                  <div className="font-bold text-white uppercase border-b border-white/20 pb-1">
                    Letter of Intent (Out of Character Design Rationale)
                  </div>
                  <p className="text-neutral-300">
                    <strong>1. Concept:</strong> An abyssal culture inhabiting the subterranean oceans of Saturn&apos;s moon. Deprived of sunlight, evolution replaced linguistic and verbal interaction with chromocommunication—projecting harmonic light wavelengths and radiating thermal heat.
                  </p>
                  <p className="text-neutral-300">
                    <strong>2. Familial Guidelines:</strong> The central guiding father acts as a thermal anchor, emitting protective red/amber warmth. The twin sons project complementary cyan and magenta light frequencies, which combine to catalyze dormant leaves and activate the ancient Portal Tree.
                  </p>
                  <p className="text-neutral-300">
                    <strong>3. Workshop Skills Used:</strong> Photoshop layer composition, precise non-destructive raster masking, spatial depth mapping across 8 distinct planes, optical color harmony, and visual hierarchy.
                  </p>
                  <p className="text-neutral-300">
                    <strong>4. Alienation & Reflection:</strong> By stripping spoken language and replacing it with pure optical frequencies, the work encourages visitors to reflect on how deeply human communication relies on invisible conventions.
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
                  Team Members & Exhibition Roles
                </h3>
                <p className="text-xs text-neutral-400">
                  Hyper Island Group Collaboration
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-950 border-2 border-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Maxime Dewynter</span>
                    <span className="px-1.5 py-0.5 bg-white text-black text-[9px] font-bold">ARCADE LEAD</span>
                  </div>
                  <p className="text-neutral-400 mb-1">World: <strong>Chromatic Symbiosis</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Created the sub-ice platformer using 8 Photoshop layer assets, designed the unified 8BitDo arcade stick input engine, and assembled the CRT kiosk framework.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border border-white/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Aisah</span>
                    <span className="px-1.5 py-0.5 bg-neutral-800 text-neutral-300 text-[9px] font-bold">WORLD CREATOR</span>
                  </div>
                  <p className="text-neutral-400 mb-1">World: <strong>Alien Culture II</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Portal chamber primed and calibrated for incoming design assets, speculative artifacts, and individual exhibition deliverable.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border-2 border-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Martin</span>
                    <span className="px-1.5 py-0.5 bg-violet-600 text-white text-[9px] font-bold">GAME AUTHOR</span>
                  </div>
                  <p className="text-neutral-400 mb-1">World: <strong>Echoes in the Dark</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Created the 3D LiDAR echolocation WebGL simulator with raycasted point-cloud terrain mapping, floral beacon charging, bloom defense, and mate summoning.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border border-white/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase">Mana</span>
                    <span className="px-1.5 py-0.5 bg-neutral-800 text-neutral-300 text-[9px] font-bold">WORLD CREATOR</span>
                  </div>
                  <p className="text-neutral-400 mb-1">World: <strong>Alien Culture IV</strong></p>
                  <p className="text-neutral-300 text-[11px]">
                    Portal chamber primed and calibrated for incoming design assets, speculative artifacts, and individual exhibition deliverable.
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
            RETURN TO EXHIBITION [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
