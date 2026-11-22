"use client";

import React from "react";
import Image from "next/image";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/components/hub/CultureCard";
import { Layers, Play, Cpu, Wind, Radio, ArrowLeft, BookOpen, AlertTriangle, Terminal } from "lucide-react";

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

const PHOSPHOR_THEME = {
  cyan: {
    text: "text-emerald-400",
    border: "border-emerald-500",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    badge: "bg-emerald-950 text-emerald-300 border-emerald-500",
    meter: "w-[88%]",
  },
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-500",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    badge: "bg-emerald-950 text-emerald-300 border-emerald-500",
    meter: "w-[64%]",
  },
  violet: {
    text: "text-emerald-400",
    border: "border-emerald-500",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    badge: "bg-emerald-950 text-emerald-300 border-emerald-500",
    meter: "w-[72%]",
  },
  amber: {
    text: "text-amber-400",
    border: "border-amber-500",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    badge: "bg-amber-950 text-amber-300 border-amber-500",
    meter: "w-[55%]",
  },
};

export function SpecimenHubView({
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
  const theme = PHOSPHOR_THEME[current.themeColor];
  const isPlayable = current.status === "READY TO PLAY";

  const getIcon = (themeColor: string) => {
    switch (themeColor) {
      case "cyan":
        return <Layers className="w-3.5 h-3.5 text-emerald-400" />;
      case "emerald":
        return <Radio className="w-3.5 h-3.5 text-emerald-400" />;
      case "violet":
        return <Cpu className="w-3.5 h-3.5 text-emerald-400" />;
      case "amber":
        return <Wind className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between font-mono bg-[#020e06] text-emerald-400 select-none phosphor-screen p-0.5">
      {/* 1. TOP HEADER: Sci-Fi Command BIOS Header */}
      <header className="w-full flex items-center justify-between border-b-2 border-emerald-600/60 pb-2 mb-2 select-none z-10 bg-[#020e06]/90">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToIntro}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-black hover:bg-neutral-900 text-emerald-400 font-bold text-xs border border-emerald-500 transition-colors cursor-pointer shadow-[0_0_8px_rgba(34,197,94,0.3)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[B] INTRO</span>
          </button>
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-wider text-emerald-300 uppercase flex items-center gap-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
              <span>RECALBOX BIOS v4.2 // BIO-TERMINAL</span>
              <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-500 px-1.5 py-0.2">
                THEME: PHOSPHOR
              </span>
            </h1>
            <p className="text-[10px] text-emerald-500/80 tracking-widest">
              HYPER ISLAND LAB 04 • CONTAINMENT STATUS: ACTIVE █
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDesign}
            className="text-[10px] text-emerald-300 border border-emerald-500 px-2 py-0.5 font-bold hover:bg-emerald-500 hover:text-black transition-all cursor-pointer bg-black/80 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
            title="Switch Recalbox Theme (or press T)"
          >
            [THEME: PHOSPHOR ➔]
          </button>
          <button
            onClick={onOpenDossier}
            className="text-[10px] text-emerald-400 border border-emerald-800 px-2 py-0.5 font-bold hover:border-emerald-500 transition-colors cursor-pointer flex items-center gap-1 bg-black/60"
          >
            <BookOpen className="w-3 h-3" />
            <span>[Y] PROCESS</span>
          </button>
          <button
            onClick={onOpenAttract}
            className="text-[10px] text-emerald-400 border border-emerald-800 px-2 py-0.5 font-bold hover:border-emerald-500 transition-colors cursor-pointer bg-black/60"
          >
            [X] PREVIEW
          </button>
        </div>
      </header>

      {/* 2. SPLIT-SCREEN PHOSPHOR LABORATORY CONSOLE */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-3 select-none mb-2 z-10">
        {/* LEFT PANE (58%): Bio-Containment Chamber with Hazard Stripes */}
        <div
          className={`flex-[1.4] relative flex flex-col justify-between border-2 border-emerald-500/80 ${theme.glow} bg-black/90 rounded p-2.5 overflow-hidden`}
        >
          {/* Top Yellow/Black Hazard Stripes Warning Bar */}
          <div className="w-full h-2 hazard-stripes border-b border-black mb-2" />

          {/* Chamber Header Readout */}
          <div className="flex items-center justify-between border-b border-emerald-700/60 pb-1.5 mb-2 z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500">
                {alien.specimenCode}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 drop-shadow-[0_0_6px_#22c55e]">
                {current.title}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 border border-amber-500">
              <AlertTriangle className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>{alien.hazardClass}</span>
            </div>
          </div>

          {/* Main Containment Tank Viewport */}
          <div className="relative flex-1 min-h-[170px] rounded border border-emerald-500/60 overflow-hidden bg-black flex items-center justify-center">
            {/* Millimeter Measurement Scale Markings on Tank Edges */}
            <div className="absolute left-1 top-2 bottom-2 z-20 flex flex-col justify-between text-[7px] font-mono text-emerald-600 select-none pointer-events-none">
              <span>100mm</span>
              <span>75mm</span>
              <span>50mm</span>
              <span>25mm</span>
              <span>0mm</span>
            </div>

            {/* Specimen Artwork */}
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
                <Radio className="w-10 h-10 text-emerald-500 mb-2 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                  HERMETIC CELL PRIMED
                </span>
                <span className="text-[10px] text-emerald-600 mt-0.5">
                  Sample awaiting dimensional intake
                </span>
              </div>
            )}

            {/* Glowing Cyan/Green Laser Scanline Sweeping Across Specimen */}
            <div className="animate-specimen-scan" />

            {/* Corner Observation Reticles */}
            <span className="absolute top-2 left-8 text-emerald-400 font-mono text-xs pointer-events-none">⌈</span>
            <span className="absolute top-2 right-3 text-emerald-400 font-mono text-xs pointer-events-none">⌉</span>
            <span className="absolute bottom-6 left-8 text-emerald-400 font-mono text-xs pointer-events-none">⌊</span>
            <span className="absolute bottom-6 right-3 text-emerald-400 font-mono text-xs pointer-events-none">⌋</span>

            {/* Live Telemetry Overlay at Tank Base */}
            <div className="absolute bottom-1 left-2 right-2 z-10 bg-black/90 backdrop-blur-sm border border-emerald-500/50 px-2 py-1 rounded text-emerald-300 flex items-center justify-between text-[8px] font-mono">
              <span className="font-bold text-emerald-200">SAMPLE: {alien.sampleType}</span>
              <span className="text-emerald-500 hidden sm:inline">{alien.containmentProtocol}</span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* Bottom Yellow/Black Hazard Stripes Warning Bar */}
          <div className="w-full h-2 hazard-stripes border-t border-black mt-2" />

          {/* Chamber Bottom Action Bar */}
          <div className="mt-2 pt-2 border-t border-emerald-800 flex items-center justify-between z-10">
            <div className="text-[10px] font-mono text-emerald-500">
              <span className="font-bold text-emerald-300">TELEMETRY:</span> {alien.environmentalTelemetry}
            </div>

            <button
              onClick={() => onLaunch(selectedIndex)}
              className="flex items-center gap-2 px-4 py-2 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black border border-emerald-300 shadow-[0_0_12px_#22c55e]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPlayable ? "[!] ENGAGE LINK [A]" : "[!] PROBE CELL [A]"}</span>
            </button>
          </div>
        </div>

        {/* RIGHT PANE (42%): 4 Swappable Data Blade Cartridges */}
        <div className="flex-1 flex flex-col justify-between gap-1.5 select-none">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 border-b border-emerald-600/60 pb-1 flex items-center justify-between">
            <span>DATA BLADE RACK</span>
            <span className="text-[8px] text-emerald-600">4 CHANNELS</span>
          </div>

          <div className="flex-1 flex flex-col justify-between gap-2">
            {cultures.map((culture, idx) => {
              const isSel = idx === selectedIndex;
              const cardAlien = ALIEN_CULTURE_METADATA[culture.id] || ALIEN_CULTURE_METADATA["chromatic-symbiosis"];

              return (
                <div
                  key={culture.id}
                  onClick={() => onSelect(idx)}
                  className={`flex-1 flex items-center justify-between p-2 rounded transition-all cursor-pointer font-mono ${
                    isSel
                      ? "border-2 border-emerald-400 bg-[#061d0f] shadow-[0_0_15px_rgba(34,197,94,0.5)] scale-[1.015] z-10"
                      : "border border-emerald-900/80 bg-[#03140a]/70 hover:bg-[#061d0f] hover:border-emerald-700 opacity-75"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-7 h-7 rounded border flex items-center justify-center shrink-0 ${isSel ? "border-emerald-400 bg-emerald-950" : "border-emerald-900 bg-black"}`}>
                      {getIcon(culture.themeColor)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold truncate uppercase ${isSel ? "text-emerald-200 drop-shadow-[0_0_4px_#22c55e]" : "text-emerald-500"}`}>
                          {culture.title}
                        </span>
                        <span className="text-[8px] text-emerald-600 font-bold">
                          [{cardAlien.specimenCode.split(" ")[1]}]
                        </span>
                      </div>
                      <div className="text-[8px] text-emerald-600 truncate">
                        Curator: {culture.author}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded border font-bold uppercase ${
                        isSel
                          ? "bg-emerald-500 text-black border-emerald-300 font-bold shadow-[0_0_8px_#22c55e]"
                          : "bg-emerald-950 text-emerald-600 border-emerald-900"
                      }`}
                    >
                      {isSel ? "● LOCKED" : "STANDBY"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Segmented LED Diagnostic Bar Readout */}
          <div className="p-2 border border-emerald-700/80 bg-black/80 rounded text-[9px] font-mono">
            <div className="flex items-center justify-between font-bold text-emerald-300 mb-1">
              <span>CARTRIDGE BUS TELEMETRY</span>
              <span className="text-emerald-400">NOMINAL</span>
            </div>
            <div className="w-full bg-emerald-950 h-2 rounded overflow-hidden mb-1.5 border border-emerald-800">
              <div className="bg-emerald-400 h-full w-[84%] shadow-[0_0_6px_#22c55e]" />
            </div>
            <div className="text-emerald-600 truncate text-[8px]">
              {alien.containmentProtocol}
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOOTER CONTROLS */}
      <footer className="w-full pt-1 border-t border-emerald-600/60 text-[10px] text-emerald-500 flex items-center justify-between select-none z-10 bg-[#020e06]/90">
        <div className="flex items-center gap-2">
          <span className="text-emerald-300 font-bold">JOYSTICK:</span>
          <span>Up / Down Blade</span>
          <span className="text-emerald-800">|</span>
          <span className="text-emerald-300 font-bold">[A]</span>
          <span>Engage Bio-Link</span>
          <span className="text-emerald-800">|</span>
          <span className="text-emerald-300 font-bold">[T]</span>
          <span>Switch Recalbox Theme</span>
        </div>
        <div className="text-emerald-400 font-bold drop-shadow-[0_0_4px_#22c55e]">
          ● SYSTEM READY █
        </div>
      </footer>
    </div>
  );
}
