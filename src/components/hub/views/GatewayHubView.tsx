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

const COLOR_MAP = {
  cyan: {
    border: "border-cyan-500",
    shadow: "shadow-[6px_6px_0px_#0891b2]",
    badge: "bg-cyan-600 text-white border-cyan-700",
    glow: "rgba(6, 182, 212, 0.4)",
    button: "bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-700 shadow-[2px_2px_0px_#0891b2]",
  },
  emerald: {
    border: "border-emerald-500",
    shadow: "shadow-[6px_6px_0px_#059669]",
    badge: "bg-emerald-600 text-white border-emerald-700",
    glow: "rgba(16, 185, 129, 0.4)",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-[2px_2px_0px_#059669]",
  },
  violet: {
    border: "border-violet-500",
    shadow: "shadow-[6px_6px_0px_#6d28d9]",
    badge: "bg-violet-600 text-white border-violet-700",
    glow: "rgba(139, 92, 246, 0.4)",
    button: "bg-violet-600 hover:bg-violet-700 text-white border-violet-700 shadow-[2px_2px_0px_#6d28d9]",
  },
  amber: {
    border: "border-amber-500",
    shadow: "shadow-[6px_6px_0px_#b45309]",
    badge: "bg-amber-500 text-black border-amber-600 font-bold",
    glow: "rgba(245, 158, 11, 0.4)",
    button: "bg-amber-500 hover:bg-amber-400 text-black border-amber-600 font-bold shadow-[2px_2px_0px_#b45309]",
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
      {/* 1. TOP HEADER: Intergalactic Portal Matrix */}
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
              <span>INTERGALACTIC PORTAL MATRIX</span>
              <span className="text-[10px] bg-black text-white px-1.5 py-0.2">UI: GATEWAY</span>
            </h1>
            <p className="text-[10px] text-neutral-600 tracking-widest">
              EARTH GATEWAY 04 • 4 TOWERING DIMENSIONAL UPLINKS • 15kHz ANALOG BEAM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDesign}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer bg-neutral-100 shadow-sm"
            title="Switch Alien Hub Design (or press T)"
          >
            [UI: GATEWAY ➔]
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

      {/* 2. THE 4 TOWERING VERTICAL MONOLITH PORTALS (Full Height 4-Pillar Layout) */}
      <div className="grid grid-cols-4 gap-2.5 flex-1 min-h-0 select-none mb-2">
        {cultures.map((culture, index) => {
          const isSel = index === selectedIndex;
          const cardAlien = ALIEN_CULTURE_METADATA[culture.id] || ALIEN_CULTURE_METADATA["chromatic-symbiosis"];
          const cardColor = COLOR_MAP[culture.themeColor];
          const isPlayable = culture.status === "READY TO PLAY";

          return (
            <div
              key={culture.id}
              onClick={() => {
                onSelect(index);
                if (isSel) onLaunch(index);
              }}
              className={`relative flex flex-col justify-between border-2 transition-all duration-200 cursor-pointer overflow-hidden rounded ${
                isSel
                  ? `border-2 ${cardColor.border} bg-white text-black ${cardColor.shadow} scale-[1.015] z-20`
                  : "border-neutral-300 bg-neutral-50 text-neutral-800 opacity-85 hover:opacity-100 hover:border-black"
              }`}
            >
              {/* Monolith Top Cap */}
              <div
                className={`p-2 border-b flex items-center justify-between z-10 ${
                  isSel ? "border-neutral-900 bg-neutral-100" : "border-neutral-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-1 min-w-0">
                  {getIcon(culture.themeColor)}
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider truncate">
                    {cardAlien.sectorId.split(":")[0]}
                  </span>
                </div>
                <span
                  className={`text-[8px] font-mono px-1 py-0.2 border uppercase font-bold tracking-widest ${
                    isSel ? cardColor.badge : "bg-neutral-200 text-neutral-700 border-neutral-300"
                  }`}
                >
                  {isSel ? "LOCKED" : "STANDBY"}
                </span>
              </div>

              {/* Monolith Center Portal Aperture */}
              <div className="relative flex-1 min-h-[160px] m-1.5 rounded border border-neutral-300 overflow-hidden bg-neutral-950 flex flex-col items-center justify-center">
                {culture.imageSrc ? (
                  <Image
                    src={culture.imageSrc}
                    alt={culture.title}
                    fill
                    className={`object-cover transition-all duration-300 ${
                      isSel ? "opacity-100 scale-105" : "opacity-40 grayscale"
                    }`}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    <Radio className={`w-8 h-8 text-neutral-400 mb-1.5 ${isSel ? "animate-pulse" : ""}`} />
                    <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase">
                      CHAMBER PENDING
                    </span>
                  </div>
                )}

                {/* Stargate Target Reticle when Selected */}
                {isSel && (
                  <div className="absolute top-2 right-2 text-cyan-400 z-10 pointer-events-none">
                    <Crosshair className="w-5 h-5 animate-spin" style={{ animationDuration: "10s" }} />
                  </div>
                )}

                {/* Vertical Native Alien Runes Spine */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 text-[11px] font-bold tracking-widest text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none font-mono">
                  {cardAlien.alienGlyphs.split("").slice(0, 5).map((glyph, i) => (
                    <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>
                      {glyph}
                    </span>
                  ))}
                </div>

                {/* Bottom Dimension Distance Badge */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 z-10 pointer-events-none bg-black/85 backdrop-blur-sm border border-white/20 px-1.5 py-0.5 rounded text-white flex items-center justify-between text-[8px] font-mono">
                  <span className="text-cyan-300 font-bold">{cardAlien.planetCoords.split("•")[0]}</span>
                  <span className="text-neutral-300 hidden sm:inline">{cardAlien.beamLock}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              </div>

              {/* Monolith Base Pedestal */}
              <div className="p-2 border-t border-neutral-200 bg-white z-10 flex flex-col justify-between gap-1">
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
                    className={`w-full mt-1 py-1 px-2 font-mono font-bold text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${cardColor.button}`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isPlayable ? "ENGAGE [A]" : "PROBE [A]"}</span>
                  </button>
                ) : (
                  <div className="text-[9px] font-mono text-neutral-400 text-center font-bold py-0.5">
                    SELECT PORTAL →
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. ACTIVE SECTOR RADAR BAR */}
      <div className="w-full bg-black text-white px-3 py-1.5 rounded flex items-center justify-between text-[10px] font-mono mb-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span className="font-bold text-cyan-300 uppercase">
            SECTOR RADAR LOCK: {alien.sectorId}
          </span>
          <span className="text-neutral-400 hidden sm:inline">
            // {alien.environmentalTelemetry}
          </span>
        </div>
        <div className="text-neutral-300 font-bold">
          CARRIER: 1420.405 MHz [HYDROGEN LINE]
        </div>
      </div>

      {/* 4. FOOTER CONTROLS */}
      <footer className="w-full pt-1 border-t-2 border-black text-[10px] text-neutral-700 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="text-black font-bold">JOYSTICK:</span>
          <span>Left / Right Pillar</span>
          <span className="text-neutral-400">|</span>
          <span className="text-black font-bold">[A]</span>
          <span>Engage Portal</span>
          <span className="text-neutral-400">|</span>
          <span className="text-black font-bold">[T]</span>
          <span>Switch Hub Design</span>
        </div>
        <div className="text-neutral-600 font-bold">
          MONOLITH 0{selectedIndex + 1} OF 04
        </div>
      </footer>
    </div>
  );
}
