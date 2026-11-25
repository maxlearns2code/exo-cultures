"use client";

import React from "react";
import Image from "next/image";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/components/hub/CultureCard";
import { Layers, Play, Cpu, Radio, ArrowLeft, BookOpen, Crosshair, Sparkles } from "lucide-react";

interface ViewProps {
  cultures: CultureInfo[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onLaunch: (index: number) => void;
  onOpenDossier: () => void;
  onOpenAttract: () => void;
  onReturnToIntro: () => void;
  onToggleDesign: () => void;
}

export function GatewayHubView({
  cultures,
  selectedIndex,
  onLaunch,
  onOpenDossier,
  onOpenAttract,
  onReturnToIntro,
  onToggleDesign,
}: ViewProps) {
  const current = cultures[selectedIndex] || cultures[0];
  const alien = ALIEN_CULTURE_METADATA[current.id] || ALIEN_CULTURE_METADATA["martin"];

  return (
    <div className="flex-1 flex flex-col justify-between font-mono bg-white text-black select-none relative overflow-hidden p-3 md:p-5">
      {/* 1. TOP BRUTALIST ARCHITECTURAL HEADER */}
      <header className="w-full border-b-4 border-black pb-2 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={onReturnToIntro}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-black text-white hover:bg-neutral-800 font-bold text-xs uppercase border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_#000000]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[B] INTRO</span>
          </button>
          <div>
            <h1 className="text-sm md:text-base font-black tracking-wider uppercase">
              EXO-CULTURES // THE COLLABORATIVE EXHIBITION
            </h1>
            <p className="text-[9px] text-neutral-600 font-bold uppercase">
              RECALBOX THEME: BRUTALIST GALLERY • ONE SHARED ALIEN GAME
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleDesign}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer bg-neutral-100 shadow-[2px_2px_0px_#000000]"
            title="Switch Recalbox Theme (or press T)"
          >
            [THEME: GALLERY ➔]
          </button>
          <button
            onClick={onOpenDossier}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <BookOpen className="w-3 h-3" />
            <span>[Y] DOSSIER</span>
          </button>
          <button
            onClick={onOpenAttract}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            [X] PREVIEW
          </button>
        </div>
      </header>

      {/* 2. CENTER STAGE: THE SINGLE COLLABORATIVE GAME SHOWCASE */}
      <div className="flex-1 min-h-0 flex items-center justify-center py-2 my-auto">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Left Panel: Narrative Fusion */}
          <div className="md:col-span-4 bg-neutral-100 border-2 border-black p-3.5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between h-full max-h-[340px]">
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-black text-white text-[9px] font-bold uppercase mb-2">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>COMBINED SPECULATIVE LORE</span>
              </div>
              <h2 className="text-xs md:text-sm font-black uppercase mb-1.5">
                FOUR STORIES IN ONE
              </h2>
              <p className="text-[10px] text-neutral-700 leading-relaxed mb-3">
                Maxime, Martin, Aisah, and Mana combined their four individual speculative worlds into a single extraterrestrial journey through the subterranean void.
              </p>
              <div className="space-y-1.5 text-[9px] border-t border-black/20 pt-2">
                <div className="flex items-center gap-1 text-black font-bold">
                  <span>• Maxime:</span> <span className="font-normal text-neutral-600">Sub-ice oceanic abyss &amp; light</span>
                </div>
                <div className="flex items-center gap-1 text-black font-bold">
                  <span>• Martin:</span> <span className="font-normal text-neutral-600">3D LiDAR point-cloud echolocation</span>
                </div>
                <div className="flex items-center gap-1 text-black font-bold">
                  <span>• Aisah:</span> <span className="font-normal text-neutral-600">Acoustic resonance &amp; floral calling</span>
                </div>
                <div className="flex items-center gap-1 text-black font-bold">
                  <span>• Mana:</span> <span className="font-normal text-neutral-600">Exospheric vapors &amp; viral spores</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-black text-[9px] text-neutral-500 font-bold">
              TEAM: MAXIME • MARTIN • AISAH • MANA
            </div>
          </div>

          {/* Center Column: Square Exhibition Card (The Game Poster & Target) */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div
              onClick={() => onLaunch(selectedIndex)}
              className="relative aspect-square w-full max-w-[260px] border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden cursor-pointer group transition-transform hover:scale-[1.02]"
            >
              {/* Top Cap */}
              <div className="p-1.5 bg-black text-white flex items-center justify-between text-[9px] font-bold z-10 relative">
                <span className="flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse text-purple-400" />
                  SECTOR 01: SUB-ABYSS
                </span>
                <span className="bg-white text-black px-1.5 py-0.2 uppercase">ONLINE</span>
              </div>

              {/* Artwork */}
              <div className="relative flex-1 w-full min-h-[190px] bg-black">
                <Image
                  src={current.imageSrc || "/assets/martin/echoes-in-the-dark.svg"}
                  alt={current.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-1.5 right-1.5 text-white z-10 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <Crosshair className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} />
                </div>

                {/* Glyphs */}
                <div className="absolute top-1.5 left-1.5 z-10 flex flex-col gap-0.5 text-[10px] font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none">
                  {alien.alienGlyphs.split("").slice(0, 4).map((g, i) => (
                    <span key={i}>{g}</span>
                  ))}
                </div>

                {/* Bottom telemetry strip */}
                <div className="absolute bottom-1 left-1.5 right-1.5 z-10 pointer-events-none bg-black/90 text-white border border-white/40 px-1.5 py-0.5 flex items-center justify-between text-[8px] font-mono">
                  <span className="font-bold truncate">{alien.planetCoords.split("•")[0]}</span>
                  <span className="text-neutral-300 text-[7px]">{alien.beamLock}</span>
                </div>
              </div>

              {/* Card Footer Plinth */}
              <div className="p-2 bg-white border-t-2 border-black flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase text-black">{current.title}</h3>
                  <p className="text-[8px] text-neutral-600 font-bold">PROTOTYPE: 3D THREE.JS</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLaunch(selectedIndex);
                  }}
                  className="py-1 px-3 bg-black hover:bg-neutral-800 text-white font-bold text-[9px] uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0px_#8b5cf6]"
                >
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>PLAY [A]</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Mechanics & Controls */}
          <div className="md:col-span-4 bg-neutral-100 border-2 border-black p-3.5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between h-full max-h-[340px]">
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-black text-white text-[9px] font-bold uppercase mb-2">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>EXPEDITION CONTROLS</span>
              </div>
              <h2 className="text-xs md:text-sm font-black uppercase mb-1.5">
                HOW TO PLAY
              </h2>
              <div className="space-y-1.5 text-[9px] text-neutral-800 leading-snug">
                <div>• <strong>LiDAR Scan:</strong> Click Left or Arcade [X] to map walls</div>
                <div>• <strong>Focus Beam:</strong> Click Right or Arcade [Y] to burn spores</div>
                <div>• <strong>Move:</strong> WASD or 8BitDo Joystick</div>
                <div>• <strong>Bloom Flower:</strong> Hold [E] or Arcade [A] near beacons</div>
              </div>
              <div className="mt-3 pt-2 border-t border-black/20 text-[9px] text-neutral-600">
                <span>GOAL: Discover all 4 floral beacons, bloom them to summon your mate, and defend the petals from infection.</span>
              </div>
            </div>

            <button
              onClick={() => onLaunch(selectedIndex)}
              className="w-full mt-3 py-2 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_#000000] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>LAUNCH GAME [ENTER / A]</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. SOLID BLACK BRUTALIST STATUS BAR */}
      <footer className="w-full pt-1.5 border-t-4 border-black text-[10px] text-neutral-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="text-black font-bold">[A]</span>
          <span>Launch Game</span>
          <span className="text-neutral-400">|</span>
          <span className="text-black font-bold">[Y]</span>
          <span>Expo Dossier</span>
          <span className="text-neutral-400">|</span>
          <span className="text-black font-bold">[T]</span>
          <span>Switch Recalbox Theme</span>
        </div>
        <div className="text-black font-bold">
          COLLABORATIVE SPECULATIVE EXHIBITION • HYPER ISLAND WEEK 51, 2026
        </div>
      </footer>
    </div>
  );
}
