"use client";

import React from "react";
import Image from "next/image";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/components/hub/CultureCard";
import { Play, Cpu, Radio, ArrowLeft, BookOpen, Sparkles, Crosshair } from "lucide-react";

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

export function TranslatorHubView({
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
    <div className="flex-1 flex flex-col justify-between font-mono bg-[#060713] text-white select-none relative overflow-hidden p-2 md:p-4">
      {/* Background Cyber-Grid Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* 1. TOP HEADER: Neon Arcade Marquee */}
      <header className="w-full flex items-center justify-between border-b-2 border-cyan-500/40 pb-2 mb-2 select-none z-10 bg-[#060713]/90 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onReturnToIntro}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-black hover:bg-neutral-900 text-cyan-400 font-bold text-xs border border-cyan-400/60 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.3)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[B] INTRO</span>
          </button>
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-wider text-cyan-300 uppercase flex items-center gap-2 drop-shadow-[0_0_8px_#00f0ff]">
              <span>RECALBOX EXO-ARCADE</span>
              <span className="text-[9px] bg-cyan-950/80 text-cyan-400 border border-cyan-500/50 px-1.5 py-0.2 rounded">
                THEME: ARCADE
              </span>
            </h1>
            <p className="text-[10px] text-pink-400 tracking-widest drop-shadow-[0_0_6px_#ff007f]">
              NEON MATRIX // 1420.405 MHz FREE PLAY • ONE UNIFIED GAME
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDesign}
            className="text-[10px] text-cyan-300 border border-cyan-400 px-2 py-0.5 font-bold hover:bg-cyan-400 hover:text-black transition-all cursor-pointer bg-black/80 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
            title="Switch Recalbox Theme (or press T)"
          >
            [THEME: ARCADE ➔]
          </button>
          <button
            onClick={onOpenDossier}
            className="text-[10px] text-white border border-neutral-700 px-2 py-0.5 font-bold hover:border-white transition-colors cursor-pointer flex items-center gap-1 bg-black/60"
          >
            <BookOpen className="w-3 h-3" />
            <span>[Y] DOSSIER</span>
          </button>
          <button
            onClick={onOpenAttract}
            className="text-[10px] text-white border border-neutral-700 px-2 py-0.5 font-bold hover:border-white transition-colors cursor-pointer bg-black/60"
          >
            [X] PREVIEW
          </button>
        </div>
      </header>

      {/* 2. CYBER-CHAMFERED HERO SPOTLIGHT VIEWPORT */}
      <div className="w-full flex-1 min-h-0 bg-[#090b1a]/90 border-2 border-purple-400 shadow-[0_0_25px_rgba(192,132,252,0.4),inset_0_0_15px_rgba(192,132,252,0.15)] p-3 flex flex-col md:flex-row gap-4 overflow-hidden relative mb-2.5 z-10">
        {/* Left Side: Glowing Holographic Artwork */}
        <div className="relative w-full md:w-5/12 h-48 md:h-full border border-purple-500/50 overflow-hidden bg-black flex items-center justify-center">
          <Image
            src={current.imageSrc || "/assets/martin/echoes-in-the-dark.svg"}
            alt={current.title}
            fill
            priority
            className="object-cover"
          />

          {/* Crosshair Overlay */}
          <div className="absolute top-2 right-2 text-white z-10 pointer-events-none drop-shadow-[0_0_8px_#c084fc]">
            <Crosshair className="w-5 h-5 animate-spin" style={{ animationDuration: "10s" }} />
          </div>

          {/* Neon Marquee Hologram Watermark */}
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
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span className="text-xs font-bold tracking-wider uppercase text-white drop-shadow-[0_0_6px_#ffffff]">
                  COLLABORATIVE EXPEDITION • {current.author}
                </span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 border bg-purple-500/20 text-purple-300 border-purple-400">
                {alien.fragmentCode} • {current.status}
              </span>
            </div>

            <div className="mb-2">
              <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase drop-shadow-[0_0_5px_#ff007f]">
                {alien.fragmentTitle}
              </div>
              <h2 className="text-lg md:text-xl font-bold tracking-wide text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                {current.title}
              </h2>
              <p className="text-xs font-bold tracking-tight text-cyan-300 mt-0.5">
                Sensory Matrix: {alien.alienAudience}
              </p>
            </div>

            <p className="text-[11px] leading-relaxed text-neutral-200 bg-black/70 p-2.5 border border-purple-900/60 rounded line-clamp-3">
              {current.description}
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

          {/* Glowing Neon Coin-Op Launch Bar */}
          <div className="mt-2 pt-2 border-t border-purple-500/30 flex items-center justify-between gap-3">
            <div className="text-[10px] text-neutral-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold text-white">CARRIER:</span> {alien.alienName}
            </div>

            <button
              onClick={() => onLaunch(selectedIndex)}
              className="flex items-center gap-2 px-6 py-2.5 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono bg-purple-500 hover:bg-purple-400 text-black border-purple-300 shadow-[0_0_15px_#c084fc]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>▶ PRESS [A] PLAY GAME</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. LOWER TELEMETRY BAR */}
      <footer className="w-full pt-1.5 border-t border-cyan-500/30 text-[10px] text-cyan-400/90 flex items-center justify-between select-none z-10">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">[A]</span>
          <span>Engage Simulator</span>
          <span className="text-cyan-600">|</span>
          <span className="text-white font-bold">[Y]</span>
          <span>Dossier</span>
          <span className="text-cyan-600">|</span>
          <span className="text-white font-bold">[T]</span>
          <span>Switch Recalbox Theme</span>
        </div>
        <div className="text-pink-400 font-bold drop-shadow-[0_0_5px_#ff007f]">
          HYPER ISLAND WEEK 51, 2026 • 8BITDO ARCADE READY
        </div>
      </footer>
    </div>
  );
}
