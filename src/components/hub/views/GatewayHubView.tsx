"use client";

import React from "react";
import Image from "next/image";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/components/hub/CultureCard";
import { Layers, Play, Cpu, Wind, Radio, ArrowLeft, BookOpen, Crosshair } from "lucide-react";

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

const BRUTALIST_ACCENTS = {
  cyan: {
    color: "#0891b2",
    badge: "bg-cyan-600 text-white border-cyan-800",
    button: "bg-black hover:bg-neutral-800 text-white border-2 border-black shadow-[4px_4px_0px_#0891b2]",
    tag: "text-cyan-800",
  },
  emerald: {
    color: "#059669",
    badge: "bg-emerald-600 text-white border-emerald-800",
    button: "bg-black hover:bg-neutral-800 text-white border-2 border-black shadow-[4px_4px_0px_#059669]",
    tag: "text-emerald-800",
  },
  violet: {
    color: "#7c3aed",
    badge: "bg-purple-600 text-white border-purple-800",
    button: "bg-black hover:bg-neutral-800 text-white border-2 border-black shadow-[4px_4px_0px_#7c3aed]",
    tag: "text-purple-800",
  },
  amber: {
    color: "#d97706",
    badge: "bg-amber-500 text-black border-amber-700 font-bold",
    button: "bg-black hover:bg-neutral-800 text-white border-2 border-black shadow-[4px_4px_0px_#d97706]",
    tag: "text-amber-800",
  },
};

export function GatewayHubView({
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

  const getIcon = (themeColor: string) => {
    switch (themeColor) {
      case "cyan":
        return <Layers className="w-3.5 h-3.5 text-black" />;
      case "emerald":
        return <Radio className="w-3.5 h-3.5 text-black" />;
      case "violet":
        return <Cpu className="w-3.5 h-3.5 text-black" />;
      case "amber":
        return <Wind className="w-3.5 h-3.5 text-black" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between font-mono bg-white text-black select-none p-0.5">
      {/* 1. TOP HEADER: Swiss Brutalist Exhibition Header */}
      <header className="w-full flex items-center justify-between border-b-4 border-black pb-2 mb-2 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToIntro}
            className="flex items-center gap-1.5 px-3 py-1 bg-black text-white font-bold text-xs border-2 border-black transition-transform cursor-pointer shadow-[2px_2px_0px_#555555] active:translate-x-0.5 active:translate-y-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[B] INTRO</span>
          </button>
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-wider text-black uppercase flex items-center gap-2">
              <span>EXO-CULTURES EXHIBITION</span>
              <span className="text-[9px] bg-black text-white px-2 py-0.5 uppercase tracking-widest font-bold">
                THEME: GALLERY
              </span>
            </h1>
            <p className="text-[10px] text-neutral-600 tracking-widest font-semibold uppercase">
              PAVILION 04 • 4 TOWERING ARCHITECTURAL MONOLITHS • HYPER ISLAND WEEK 51
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
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

      {/* 2. THE 4 TOWERING VERTICAL MONOLITHS (Brutalist Architectural Pillars) */}
      <div className="grid grid-cols-4 gap-3 flex-1 min-h-0 select-none mb-2">
        {cultures.map((culture, index) => {
          const isSel = index === selectedIndex;
          const cardAlien = ALIEN_CULTURE_METADATA[culture.id] || ALIEN_CULTURE_METADATA["chromatic-symbiosis"];
          const cardAccent = BRUTALIST_ACCENTS[culture.themeColor];
          const isPlayable = culture.status === "READY TO PLAY";

          return (
            <div
              key={culture.id}
              onClick={() => {
                onSelect(index);
                if (isSel) onLaunch(index);
              }}
              className={`relative flex flex-col justify-between transition-all duration-200 cursor-pointer overflow-hidden ${
                isSel
                  ? `border-4 border-black bg-white text-black shadow-[10px_10px_0px_#000000] scale-[1.02] z-30`
                  : "border-2 border-neutral-400 bg-neutral-100 text-neutral-800 opacity-80 hover:opacity-100 hover:border-black shadow-[3px_3px_0px_#cccccc]"
              }`}
            >
              {/* Monolith Top Cap */}
              <div
                className={`p-2 border-b-2 border-black flex items-center justify-between z-10 ${
                  isSel ? "bg-black text-white" : "bg-neutral-200 text-black"
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={isSel ? "text-white" : "text-black"}>
                    {getIcon(culture.themeColor)}
                  </span>
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider truncate">
                    {cardAlien.sectorId.split(":")[0]}
                  </span>
                </div>
                <span
                  className={`text-[8px] font-mono px-1.5 py-0.2 border uppercase font-bold tracking-widest ${
                    isSel ? "bg-white text-black border-white" : "bg-black text-white border-black"
                  }`}
                >
                  {isSel ? "ACTIVE" : "STANDBY"}
                </span>
              </div>

              {/* Monolith Center Portal Aperture */}
              <div className="relative flex-1 min-h-[160px] m-1.5 border-2 border-black overflow-hidden bg-black flex flex-col items-center justify-center">
                {culture.imageSrc ? (
                  <Image
                    src={culture.imageSrc}
                    alt={culture.title}
                    fill
                    className={`object-cover transition-all duration-300 ${
                      isSel ? "opacity-100 scale-105" : "opacity-45 grayscale"
                    }`}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    <Radio className={`w-8 h-8 text-neutral-400 mb-1.5 ${isSel ? "animate-pulse" : ""}`} />
                    <span className="text-[9px] font-mono text-neutral-300 font-bold uppercase">
                      SIGNAL PENDING
                    </span>
                  </div>
                )}

                {/* Stargate Crosshair when Selected */}
                {isSel && (
                  <div className="absolute top-2 right-2 text-white z-10 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    <Crosshair className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
                  </div>
                )}

                {/* Vertical Native Alien Glyphs Stamp */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 text-[11px] font-bold tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none font-mono">
                  {cardAlien.alienGlyphs.split("").slice(0, 5).map((glyph, i) => (
                    <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 120}ms` }}>
                      {glyph}
                    </span>
                  ))}
                </div>

                {/* Bottom Dimension Telemetry Badge */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 z-10 pointer-events-none bg-black text-white border border-white/40 px-1.5 py-0.5 flex items-center justify-between text-[8px] font-mono">
                  <span className="font-bold text-white">{cardAlien.planetCoords.split("•")[0]}</span>
                  <span className="text-neutral-300 hidden sm:inline">{cardAlien.beamLock}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />
              </div>

              {/* Monolith Base Plinth */}
              <div className="p-2 border-t-2 border-black bg-white z-10 flex flex-col justify-between gap-1">
                <div className="min-w-0">
                  <h3 className="text-xs font-bold font-mono tracking-wide text-black uppercase truncate">
                    {culture.title}
                  </h3>
                  <p className="text-[9px] font-mono text-neutral-600 truncate">
                    Curator: {culture.author}
                  </p>
                </div>

                {isSel ? (
                  <button
                    onClick={() => onLaunch(index)}
                    className={`w-full mt-1 py-1 px-2 font-mono font-bold text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${cardAccent.button}`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isPlayable ? "ENTER [A]" : "VIEW [A]"}</span>
                  </button>
                ) : (
                  <div className="text-[9px] font-mono text-neutral-500 text-center font-bold py-0.5">
                    SELECT PORTAL →
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. SOLID BLACK BRUTALIST STATUS BAR */}
      <div className="w-full bg-black text-white px-3 py-1.5 flex items-center justify-between text-[10px] font-mono mb-1 border-2 border-black">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" />
          <span className="font-bold text-white uppercase tracking-wider">
            PORTAL LOCK: {alien.sectorId}
          </span>
          <span className="text-neutral-400 hidden sm:inline">
            // {alien.environmentalTelemetry}
          </span>
        </div>
        <div className="text-neutral-300 font-bold tracking-widest">
          STATUS: 15kHz ANALOG RGB
        </div>
      </div>

      {/* 4. FOOTER CONTROLS */}
      <footer className="w-full pt-1 border-t-4 border-black text-[10px] text-neutral-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="text-black font-bold">JOYSTICK:</span>
          <span>Left / Right Pillar</span>
          <span className="text-neutral-400">|</span>
          <span className="text-black font-bold">[A]</span>
          <span>Enter Portal</span>
          <span className="text-neutral-400">|</span>
          <span className="text-black font-bold">[T]</span>
          <span>Switch Recalbox Theme</span>
        </div>
        <div className="text-black font-bold">
          PILLAR 0{selectedIndex + 1} OF 04
        </div>
      </footer>
    </div>
  );
}
