"use client";

import React from "react";
import Image from "next/image";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/components/hub/CultureCard";
import { Layers, Play, Cpu, Wind, Radio, ArrowLeft, BookOpen, Volume2 } from "lucide-react";

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

const COLOR_MAP = {
  cyan: {
    accent: "#06b6d4",
    border: "border-cyan-500",
    shadow: "shadow-[6px_6px_0px_#0891b2]",
    badge: "bg-cyan-600 text-white border-cyan-700",
    text: "text-cyan-800",
    bgLight: "bg-cyan-50",
    button: "bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-700 shadow-[3px_3px_0px_#0891b2]",
  },
  emerald: {
    accent: "#10b981",
    border: "border-emerald-500",
    shadow: "shadow-[6px_6px_0px_#059669]",
    badge: "bg-emerald-600 text-white border-emerald-700",
    text: "text-emerald-800",
    bgLight: "bg-emerald-50",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-[3px_3px_0px_#059669]",
  },
  violet: {
    accent: "#8b5cf6",
    border: "border-violet-500",
    shadow: "shadow-[6px_6px_0px_#6d28d9]",
    badge: "bg-violet-600 text-white border-violet-700",
    text: "text-violet-800",
    bgLight: "bg-violet-50",
    button: "bg-violet-600 hover:bg-violet-700 text-white border-violet-700 shadow-[3px_3px_0px_#6d28d9]",
  },
  amber: {
    accent: "#f59e0b",
    border: "border-amber-500",
    shadow: "shadow-[6px_6px_0px_#b45309]",
    badge: "bg-amber-500 text-black border-amber-600 font-bold",
    text: "text-amber-800",
    bgLight: "bg-amber-50",
    button: "bg-amber-500 hover:bg-amber-400 text-black border-amber-600 font-bold shadow-[3px_3px_0px_#b45309]",
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
  const color = COLOR_MAP[current.themeColor];
  const isPlayable = current.status === "READY TO PLAY";

  const getIcon = (themeColor: string) => {
    switch (themeColor) {
      case "cyan":
        return <Layers className="w-3.5 h-3.5 text-cyan-600" />;
      case "emerald":
        return <Radio className="w-3.5 h-3.5 text-emerald-600" />;
      case "violet":
        return <Cpu className="w-3.5 h-3.5 text-violet-600" />;
      case "amber":
        return <Wind className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between font-mono bg-white text-black select-none">
      {/* 1. TOP HEADER: Universal Translator Terminal */}
      <header className="w-full flex items-center justify-between border-b-2 border-black pb-2 mb-2 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToIntro}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-black hover:bg-neutral-800 text-white font-bold text-xs border-2 border-black transition-colors cursor-pointer shadow-[2px_2px_0px_#888888]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[B] INTRO</span>
          </button>
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-wider text-black uppercase flex items-center gap-2">
              <span>UNIVERSAL TRANSLATOR MATRIX</span>
              <span className="text-[10px] bg-black text-white px-1.5 py-0.2">UI: TRANSLATOR</span>
            </h1>
            <p className="text-[10px] text-neutral-600 tracking-widest">
              HYPER ISLAND CAMPUS WEEK 51, 2026 • 1420.405 MHz [HYDROGEN LINE]
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDesign}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer bg-neutral-100 shadow-sm"
            title="Switch Alien Hub Design (or press T)"
          >
            [UI: TRANSLATOR ➔]
          </button>
          <button
            onClick={onOpenDossier}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <BookOpen className="w-3 h-3" />
            <span>[Y] PROCESS</span>
          </button>
          <button
            onClick={onOpenAttract}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            [X] PREVIEW
          </button>
        </div>
      </header>

      {/* 2. CINEMATIC HERO SPOTLIGHT VIEWPORT (65% of screen) */}
      <div
        className={`w-full flex-1 min-h-0 bg-white border-2 ${color.border} ${color.shadow} p-3 rounded flex flex-col md:flex-row gap-3 overflow-hidden relative mb-2.5 transition-all`}
      >
        {/* Left Side: Big Widescreen Artwork Container */}
        <div className="relative w-full md:w-1/2 h-44 md:h-full rounded border-2 border-black overflow-hidden bg-neutral-950 flex items-center justify-center">
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
              <Radio className="w-10 h-10 text-neutral-400 mb-2 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                CHAMBER DORMANT
              </span>
              <span className="text-[10px] text-neutral-400 mt-1">
                Awaiting incoming culture transmission from {current.author}
              </span>
            </div>
          )}

          {/* Floating Live Decoder Watermark */}
          <div className="absolute top-2 left-2 z-10 bg-black/85 backdrop-blur-sm text-cyan-300 border border-cyan-400/40 text-[9px] px-2 py-0.5 font-mono font-bold tracking-widest">
            DECODED: {alien.alienGlyphs}
          </div>

          <div className="absolute bottom-2 right-2 z-10 bg-black/85 text-white border border-white/30 text-[9px] px-2 py-0.5 font-mono font-bold tracking-wider">
            {current.mechanics[0]}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Side: Alien Cultural Lore & Specimen Data */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-1">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-300 pb-1 mb-2">
              <div className="flex items-center gap-1.5">
                {getIcon(current.themeColor)}
                <span className="text-xs font-bold tracking-wider uppercase text-neutral-800">
                  {current.author}
                </span>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 border ${color.badge}`}>
                {alien.fragmentCode} • {current.status}
              </span>
            </div>

            <div className="mb-2">
              <div className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                {alien.fragmentTitle}
              </div>
              <h2 className="text-lg md:text-xl font-bold tracking-wide text-black uppercase">
                {current.title}
              </h2>
              <p className={`text-xs font-bold tracking-tight ${color.text} mt-0.5`}>
                Target Audience: {alien.alienAudience}
              </p>
            </div>

            <p className="text-[11px] leading-relaxed text-neutral-700 bg-neutral-50 p-2 border border-neutral-200 rounded line-clamp-3 md:line-clamp-4">
              {current.description}
            </p>
          </div>

          {/* Big Action Launch Pedestal */}
          <div className="mt-2 pt-2 border-t border-neutral-300 flex items-center justify-between gap-3">
            <div className="text-[10px] text-neutral-600">
              <span className="font-bold text-black">DIAL:</span> {alien.alienName}
            </div>

            <button
              onClick={() => onLaunch(selectedIndex)}
              className={`flex items-center gap-2 px-5 py-2 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${color.button}`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPlayable ? "ENTER FRAGMENT [A]" : "VIEW ARTIFACT [A]"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. LOWER PLANETARY TRANSMISSION RIBBON (4 Horizontal Cards) */}
      <div className="grid grid-cols-4 gap-2 h-18 select-none">
        {cultures.map((culture, idx) => {
          const isSel = idx === selectedIndex;
          const cardColor = COLOR_MAP[culture.themeColor];
          const cardAlien = ALIEN_CULTURE_METADATA[culture.id] || ALIEN_CULTURE_METADATA["chromatic-symbiosis"];

          return (
            <div
              key={culture.id}
              onClick={() => onSelect(idx)}
              className={`relative flex items-center gap-2 p-1.5 border-2 transition-all cursor-pointer rounded ${
                isSel
                  ? `border-black bg-white ${cardColor.shadow} scale-[1.02] z-10`
                  : "border-neutral-300 bg-neutral-50 opacity-80 hover:opacity-100 hover:border-black"
              }`}
            >
              <div className="relative w-10 h-10 rounded border border-neutral-400 overflow-hidden shrink-0 bg-neutral-900">
                {culture.imageSrc ? (
                  <Image src={culture.imageSrc} alt={culture.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Radio className="w-4 h-4 text-neutral-400" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold text-black truncate uppercase">
                    {culture.title}
                  </span>
                </div>
                <div className="text-[8px] text-neutral-500 font-bold truncate">
                  {cardAlien.alienGlyphs}
                </div>
                <div className="text-[8px] text-neutral-700 truncate">
                  {culture.author}
                </div>
              </div>

              {isSel && (
                <div
                  className="w-1.5 h-full rounded-r absolute right-0 top-0 bottom-0"
                  style={{ backgroundColor: cardColor.accent }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 4. FOOTER CONTROLS */}
      <footer className="w-full mt-2 pt-1 border-t-2 border-black text-[10px] text-neutral-700 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="text-black font-bold">JOYSTICK:</span>
          <span>Left / Right Select</span>
          <span className="text-neutral-400">|</span>
          <span className="text-black font-bold">[A]</span>
          <span>Enter Fragment</span>
          <span className="text-neutral-400">|</span>
          <span className="text-black font-bold">[T]</span>
          <span>Switch Hub Design</span>
        </div>
        <div className="text-neutral-600 font-bold">
          [0{selectedIndex + 1}/04] READY
        </div>
      </footer>
    </div>
  );
}
