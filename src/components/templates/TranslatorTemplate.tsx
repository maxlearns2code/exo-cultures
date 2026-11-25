"use client";

import React from "react";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/types";
import { ControlsHintBar } from "@/components/molecules/ControlsHintBar";
import { ExhibitionHeader } from "@/components/molecules/ExhibitionHeader";
import { ArcadeButton } from "@/components/atoms/Button";

interface TemplateProps {
  culture: CultureInfo;
  onLaunch: () => void;
  onOpenDossier: () => void;
  onOpenAttract: () => void;
  onReturnToIntro: () => void;
  onToggleDesign: () => void;
}

export function TranslatorTemplate({
  culture,
  onLaunch,
  onOpenDossier,
  onOpenAttract,
  onReturnToIntro,
  onToggleDesign,
}: TemplateProps) {
  const alien = ALIEN_CULTURE_METADATA[culture.id] || ALIEN_CULTURE_METADATA["game"];

  return (
    <div className="flex-1 flex flex-col justify-between font-mono bg-[#060713] text-white select-none relative overflow-hidden p-2 md:p-4">
      {/* Background Cyber-Grid Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* 1. TOP HEADER: Neon Arcade Marquee */}
      <ExhibitionHeader
        theme="translator"
        onReturnToIntro={onReturnToIntro}
        onToggleDesign={onToggleDesign}
        onOpenDossier={onOpenDossier}
        onOpenAttract={onOpenAttract}
      />

      {/* 2. CYBER-CHAMFERED HERO SPOTLIGHT VIEWPORT */}
      <div className="w-full flex-1 min-h-0 bg-[#090b1a]/90 border-2 border-purple-400 shadow-[0_0_25px_rgba(192,132,252,0.4),inset_0_0_15px_rgba(192,132,252,0.15)] p-3 flex flex-col md:flex-row gap-4 overflow-hidden relative mb-2.5 z-10">
        {/* Left Side: Holographic Telemetry Viewport (Typographic Wireframe) */}
        <div className="relative w-full md:w-5/12 h-48 md:h-full border border-purple-500/50 overflow-hidden bg-black flex flex-col items-center justify-center p-3 select-none">
          {/* Cybernetic grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b0764_1px,transparent_1px),linear-gradient(to_bottom,#3b0764_1px,transparent_1px)] bg-[size:16px_16px] opacity-50 pointer-events-none" />

          {/* Central Hologram Target Wireframe */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <svg className="w-24 h-24 text-purple-400/60 mb-2 drop-shadow-[0_0_8px_#c084fc]" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="50" y1="4" x2="50" y2="96" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="4" y1="50" x2="96" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="3" fill="#00f0ff" className="animate-pulse" />
            </svg>
            <span className="text-xs font-black tracking-widest text-cyan-300 uppercase drop-shadow-[0_0_8px_#00f0ff]">
              LiDAR RADAR BUFFER
            </span>
            <span className="text-[9px] text-purple-300 font-bold tracking-wider mt-0.5">
              SECTOR 01: SUBTERRANEAN VOID
            </span>
            <span className="text-[8px] text-neutral-400 mt-1 font-mono">
              AZ: 312° • ELEV: +14° • 0 LUX
            </span>
          </div>

          <div className="absolute top-2 right-2 text-white z-10 pointer-events-none drop-shadow-[0_0_8px_#c084fc] font-mono text-xs font-bold">
            [+]
          </div>

          <div className="absolute top-2 left-2 z-10 bg-black/90 text-cyan-300 border border-cyan-400/80 text-[10px] px-2 py-0.5 font-mono font-bold tracking-widest shadow-[0_0_10px_#00f0ff]">
            GLYPH: {alien.alienGlyphs}
          </div>

          <div className="absolute bottom-2 right-2 z-10 bg-black/90 text-pink-300 border border-pink-400/80 text-[9px] px-2 py-0.5 font-mono font-bold tracking-wider shadow-[0_0_8px_#ff007f]">
            220K PTS BUFFER
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Side: Neon Cyber Lore & Arcade Launcher */}
        <div className="w-full md:w-7/12 flex flex-col justify-between p-1">
          <div>
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold tracking-wider uppercase text-white drop-shadow-[0_0_6px_#ffffff]">
                  COLLABORATIVE EXPEDITION • {culture.author}
                </span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 border bg-purple-500/20 text-purple-300 border-purple-400">
                {alien.fragmentCode} • {culture.status}
              </span>
            </div>

            <div className="mb-2">
              <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase drop-shadow-[0_0_5px_#ff007f]">
                {alien.fragmentTitle}
              </div>
              <h2 className="text-lg md:text-xl font-bold tracking-wide text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                {culture.title}
              </h2>
              <p className="text-xs font-bold tracking-tight text-cyan-300 mt-0.5">
                Sensory Matrix: {alien.alienAudience}
              </p>
            </div>

            <p className="text-[11px] leading-relaxed text-neutral-200 bg-black/70 p-2.5 border border-purple-900/60 rounded line-clamp-3">
              {culture.description}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-2 text-[10px]">
              <div className="bg-black/60 p-2 border border-cyan-500/30">
                <span className="text-cyan-400 font-bold block">CONTROLS:</span>
                <span className="text-neutral-300">Left-Click / [X] Scan • Right-Click / [Y] Focus Beam</span>
              </div>
              <div className="bg-black/60 p-2 border border-purple-500/30">
                <span className="text-purple-300 font-bold block">OBJECTIVE:</span>
                <span className="text-neutral-300">Charge 4 beacons, hold [A] / [E] to bloom, summon mate</span>
              </div>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-purple-500/30 flex items-center justify-between gap-3">
            <div className="text-[10px] text-neutral-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold text-white">CARRIER:</span> {alien.alienName}
            </div>

            <ArcadeButton
              variant="neon"
              size="md"
              onClick={onLaunch}
              className="px-6 py-2.5"
            >
              <span>PRESS [A] PLAY GAME</span>
            </ArcadeButton>
          </div>
        </div>
      </div>

      {/* 3. LOWER TELEMETRY BAR */}
      <ControlsHintBar theme="neon" />
    </div>
  );
}
