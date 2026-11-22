"use client";

import React from "react";
import Image from "next/image";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/components/hub/CultureCard";
import { Layers, Play, Cpu, Wind, Radio, ArrowLeft, BookOpen, Sparkles, Gamepad2 } from "lucide-react";

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

const NEON_THEME = {
  cyan: {
    accent: "#00f0ff",
    border: "border-cyan-400",
    glow: "shadow-[0_0_25px_rgba(0,240,255,0.5),inset_0_0_15px_rgba(0,240,255,0.15)]",
    cardGlow: "shadow-[0_0_20px_#00f0ff]",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400",
    tag: "text-cyan-300",
    button: "bg-cyan-500 hover:bg-cyan-400 text-black border-cyan-300 shadow-[0_0_15px_#00f0ff]",
  },
  emerald: {
    accent: "#10b981",
    border: "border-emerald-400",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.5),inset_0_0_15px_rgba(16,185,129,0.15)]",
    cardGlow: "shadow-[0_0_20px_#10b981]",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400",
    tag: "text-emerald-300",
    button: "bg-emerald-500 hover:bg-emerald-400 text-black border-emerald-300 shadow-[0_0_15px_#10b981]",
  },
  violet: {
    accent: "#c084fc",
    border: "border-purple-400",
    glow: "shadow-[0_0_25px_rgba(192,132,252,0.5),inset_0_0_15px_rgba(192,132,252,0.15)]",
    cardGlow: "shadow-[0_0_20px_#c084fc]",
    badge: "bg-purple-500/20 text-purple-300 border-purple-400",
    tag: "text-purple-300",
    button: "bg-purple-500 hover:bg-purple-400 text-black border-purple-300 shadow-[0_0_15px_#c084fc]",
  },
  amber: {
    accent: "#fbbf24",
    border: "border-amber-400",
    glow: "shadow-[0_0_25px_rgba(251,191,36,0.5),inset_0_0_15px_rgba(251,191,36,0.15)]",
    cardGlow: "shadow-[0_0_20px_#fbbf24]",
    badge: "bg-amber-500/20 text-amber-300 border-amber-400",
    tag: "text-amber-300",
    button: "bg-amber-400 hover:bg-amber-300 text-black border-amber-200 shadow-[0_0_15px_#fbbf24]",
  },
};

export function TranslatorHubView({
  cultures,
  selectedIndex,
  onSelect,
  onLaunch,
  onOpenDossier,
  onOpenAttract,
  onReturnToIntro,
  onToggleDesign,
}: ViewProps) {
  const current = cultures[selectedIndex];
  const alien = ALIEN_CULTURE_METADATA[current.id] || ALIEN_CULTURE_METADATA["chromatic-symbiosis"];
  const theme = NEON_THEME[current.themeColor];
  const isPlayable = current.status === "READY TO PLAY";

  const getIcon = (themeColor: string) => {
    switch (themeColor) {
      case "cyan":
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case "emerald":
        return <Radio className="w-4 h-4 text-emerald-400" />;
      case "violet":
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case "amber":
        return <Wind className="w-4 h-4 text-amber-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between font-mono bg-[#060713] text-white select-none relative overflow-hidden p-0.5">
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
              NEON MATRIX // 1420.405 MHz FREE PLAY CABINET
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
            <span>[Y] PROCESS</span>
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
      <div
        className={`w-full flex-1 min-h-0 bg-[#090b1a]/90 border-2 ${theme.border} ${theme.glow} p-3 flex flex-col md:flex-row gap-3 overflow-hidden relative mb-2.5 transition-all clip-cyber-chamfer z-10`}
      >
        {/* Left Side: Big Neon Widescreen Poster */}
        <div className="relative w-full md:w-1/2 h-44 md:h-full border border-cyan-500/40 overflow-hidden bg-black flex items-center justify-center">
          {current.imageSrc ? (
            <Image
              src={current.imageSrc}
              alt={current.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <Radio className="w-10 h-10 text-cyan-400 mb-2 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">
                PORTAL MATRIX READY
              </span>
              <span className="text-[10px] text-neutral-400 mt-1">
                Transmitting alien telemetry from {current.author}
              </span>
            </div>
          )}

          {/* Neon Marquee Hologram Watermark */}
          <div className="absolute top-2 left-2 z-10 bg-black/90 text-cyan-300 border border-cyan-400/80 text-[10px] px-2 py-0.5 font-mono font-bold tracking-widest shadow-[0_0_10px_#00f0ff]">
            GLYPH: {alien.alienGlyphs}
          </div>

          <div className="absolute bottom-2 right-2 z-10 bg-black/90 text-pink-300 border border-pink-400/80 text-[9px] px-2 py-0.5 font-mono font-bold tracking-wider shadow-[0_0_8px_#ff007f]">
            {current.mechanics[0]}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Side: Neon Cyber Lore & Arcade Launcher */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-1">
          <div>
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                {getIcon(current.themeColor)}
                <span className="text-xs font-bold tracking-wider uppercase text-white drop-shadow-[0_0_6px_#ffffff]">
                  {current.author}
                </span>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 border ${theme.badge}`}>
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
              <p className={`text-xs font-bold tracking-tight ${theme.tag} mt-0.5`}>
                Senses: {alien.alienAudience}
              </p>
            </div>

            <p className="text-[11px] leading-relaxed text-neutral-300 bg-black/60 p-2.5 border border-cyan-900/60 rounded line-clamp-3 md:line-clamp-4">
              {current.description}
            </p>
          </div>

          {/* Glowing Neon Coin-Op Launch Bar */}
          <div className="mt-2 pt-2 border-t border-cyan-500/30 flex items-center justify-between gap-3">
            <div className="text-[10px] text-neutral-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold text-white">CARRIER:</span> {alien.alienName}
            </div>

            <button
              onClick={() => onLaunch(selectedIndex)}
              className={`flex items-center gap-2 px-5 py-2 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono ${theme.button}`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPlayable ? "▶ PRESS [A] PLAY" : "▶ PRESS [A] VIEW"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. LOWER GAME SELECTION: 4 CYBER-CHAMFERED CARTRIDGES */}
      <div className="grid grid-cols-4 gap-2 h-18 select-none z-10">
        {cultures.map((culture, idx) => {
          const isSel = idx === selectedIndex;
          const cardTheme = NEON_THEME[culture.themeColor];
          const cardAlien = ALIEN_CULTURE_METADATA[culture.id] || ALIEN_CULTURE_METADATA["chromatic-symbiosis"];

          return (
            <div
              key={culture.id}
              onClick={() => onSelect(idx)}
              className={`relative flex items-center gap-2 p-1.5 border transition-all duration-150 cursor-pointer clip-cyber-card ${
                isSel
                  ? `border-2 ${cardTheme.border} bg-[#0e142e] ${cardTheme.cardGlow} -translate-y-1.5 z-20`
                  : "border-slate-800 bg-[#0a0d1d]/80 opacity-70 hover:opacity-100 hover:border-slate-500"
              }`}
            >
              <div className="relative w-10 h-10 border border-slate-700 overflow-hidden shrink-0 bg-black">
                {culture.imageSrc ? (
                  <Image src={culture.imageSrc} alt={culture.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Radio className="w-4 h-4 text-neutral-500" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className={`text-[9px] font-bold truncate uppercase ${isSel ? "text-white" : "text-neutral-300"}`}>
                    {culture.title}
                  </span>
                </div>
                <div className={`text-[8px] font-bold truncate ${isSel ? cardTheme.tag : "text-neutral-500"}`}>
                  {cardAlien.alienGlyphs}
                </div>
                <div className="text-[8px] text-neutral-400 truncate">
                  {culture.author}
                </div>
              </div>

              {/* Glowing Corner Tab on Selected Cartridge */}
              {isSel && (
                <div
                  className="w-1.5 h-full absolute right-0 top-0 bottom-0 shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: cardTheme.accent, color: cardTheme.accent }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 4. FOOTER CONTROLS */}
      <footer className="w-full mt-2 pt-1 border-t border-cyan-500/40 text-[10px] text-neutral-400 flex items-center justify-between select-none z-10 bg-[#060713]/90">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold">JOYSTICK:</span>
          <span>Left / Right Cartridge</span>
          <span className="text-neutral-600">|</span>
          <span className="text-cyan-400 font-bold">[A]</span>
          <span>Launch Game</span>
          <span className="text-neutral-600">|</span>
          <span className="text-cyan-400 font-bold">[T]</span>
          <span>Switch Recalbox Theme</span>
        </div>
        <div className="text-pink-400 font-bold drop-shadow-[0_0_6px_#ff007f]">
          ★ 1P READY ★
        </div>
      </footer>
    </div>
  );
}
