"use client";

import React from "react";
import Image from "next/image";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/components/hub/CultureCard";
import { Layers, Play, Cpu, Wind, Radio, ArrowLeft, BookOpen, AlertTriangle } from "lucide-react";

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
    shadow: "shadow-[5px_5px_0px_#0891b2]",
    badge: "bg-cyan-600 text-white border-cyan-700",
    text: "text-cyan-700",
    bgActive: "bg-cyan-50 border-cyan-400",
    button: "bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-700 shadow-[3px_3px_0px_#0891b2]",
  },
  emerald: {
    accent: "#10b981",
    border: "border-emerald-500",
    shadow: "shadow-[5px_5px_0px_#059669]",
    badge: "bg-emerald-600 text-white border-emerald-700",
    text: "text-emerald-700",
    bgActive: "bg-emerald-50 border-emerald-400",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-[3px_3px_0px_#059669]",
  },
  violet: {
    accent: "#8b5cf6",
    border: "border-violet-500",
    shadow: "shadow-[5px_5px_0px_#6d28d9]",
    badge: "bg-violet-600 text-white border-violet-700",
    text: "text-violet-700",
    bgActive: "bg-violet-50 border-violet-400",
    button: "bg-violet-600 hover:bg-violet-700 text-white border-violet-700 shadow-[3px_3px_0px_#6d28d9]",
  },
  amber: {
    accent: "#f59e0b",
    border: "border-amber-500",
    shadow: "shadow-[5px_5px_0px_#b45309]",
    badge: "bg-amber-500 text-black border-amber-600 font-bold",
    text: "text-amber-700",
    bgActive: "bg-amber-50 border-amber-400",
    button: "bg-amber-500 hover:bg-amber-400 text-black border-amber-600 font-bold shadow-[3px_3px_0px_#b45309]",
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
      {/* 1. TOP HEADER: Clinical Extraterrestrial Specimen Scanner */}
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
              <span>EXTRATERRESTRIAL ARTIFACT SCANNER</span>
              <span className="text-[10px] bg-black text-white px-1.5 py-0.2">UI: SPECIMEN</span>
            </h1>
            <p className="text-[10px] text-neutral-600 tracking-widest">
              CONTAINMENT FACILITY // HYPER ISLAND OBSERVATION LIGHT-TABLE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDesign}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer bg-neutral-100 shadow-sm"
            title="Switch Alien Hub Design (or press T)"
          >
            [UI: SPECIMEN ➔]
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

      {/* 2. SPLIT-SCREEN CLINICAL LABORATORY CONSOLE */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-3 select-none mb-2">
        {/* LEFT PANE (58%): Large Bio-Containment Observation Chamber */}
        <div
          className={`flex-[1.4] relative flex flex-col justify-between border-2 ${color.border} ${color.shadow} bg-white rounded p-3 overflow-hidden`}
        >
          {/* Chamber Header Readout */}
          <div className="flex items-center justify-between border-b-2 border-black pb-1.5 mb-2 z-10 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 bg-black text-white">
                {alien.specimenCode}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-black">
                {current.title}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-300">
              <AlertTriangle className="w-3 h-3" />
              <span>{alien.hazardClass}</span>
            </div>
          </div>

          {/* Main Containment Tank Viewport */}
          <div className="relative flex-1 min-h-[170px] rounded border-2 border-black overflow-hidden bg-neutral-950 flex items-center justify-center">
            {/* Millimeter Measurement Scale Markings on Tank Edges */}
            <div className="absolute left-1 top-2 bottom-2 z-20 flex flex-col justify-between text-[7px] font-mono text-neutral-400 select-none pointer-events-none">
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
                <Radio className="w-10 h-10 text-neutral-400 mb-2 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">
                  HERMETIC CELL PRIMED
                </span>
                <span className="text-[10px] text-neutral-500 mt-0.5">
                  Sample awaiting dimensional intake
                </span>
              </div>
            )}

            {/* Active Cyan Laser Scanline Sweeping Across the Specimen */}
            <div className="animate-specimen-scan" />

            {/* Corner Observation Reticles */}
            <span className="absolute top-2 left-8 text-neutral-400 font-mono text-xs pointer-events-none">⌈</span>
            <span className="absolute top-2 right-3 text-neutral-400 font-mono text-xs pointer-events-none">⌉</span>
            <span className="absolute bottom-6 left-8 text-neutral-400 font-mono text-xs pointer-events-none">⌊</span>
            <span className="absolute bottom-6 right-3 text-neutral-400 font-mono text-xs pointer-events-none">⌋</span>

            {/* Live Telemetry Overlay at Tank Base */}
            <div className="absolute bottom-1 left-2 right-2 z-10 bg-black/85 backdrop-blur-sm border border-white/20 px-2 py-1 rounded text-white flex items-center justify-between text-[8px] font-mono">
              <span className="text-cyan-300 font-bold">SAMPLE: {alien.sampleType}</span>
              <span className="text-neutral-300 hidden sm:inline">{alien.containmentProtocol}</span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* Chamber Bottom Action Bar */}
          <div className="mt-2 pt-2 border-t-2 border-black flex items-center justify-between z-10 bg-white">
            <div className="text-[10px] font-mono text-neutral-700">
              <span className="font-bold text-black">ENVIRONMENT:</span> {alien.environmentalTelemetry}
            </div>

            <button
              onClick={() => onLaunch(selectedIndex)}
              className={`flex items-center gap-2 px-4 py-2 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${color.button}`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPlayable ? "ANALYZE SPECIMEN [A]" : "INSPECT CELL [A]"}</span>
            </button>
          </div>
        </div>

        {/* RIGHT PANE (42%): Specimen Cartridge Diagnostic Rack */}
        <div className="flex-1 flex flex-col justify-between gap-1.5 select-none">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600 border-b-2 border-black pb-1">
            SPECIMEN CARTRIDGE INDEX [4 SAMPLES]
          </div>

          <div className="flex-1 flex flex-col justify-between gap-2">
            {cultures.map((culture, idx) => {
              const isSel = idx === selectedIndex;
              const cardColor = COLOR_MAP[culture.themeColor];
              const cardAlien = ALIEN_CULTURE_METADATA[culture.id] || ALIEN_CULTURE_METADATA["chromatic-symbiosis"];

              return (
                <div
                  key={culture.id}
                  onClick={() => onSelect(idx)}
                  className={`flex-1 flex items-center justify-between p-2 rounded border-2 transition-all cursor-pointer font-mono ${
                    isSel
                      ? `${cardColor.border} bg-white ${cardColor.shadow} scale-[1.015] z-10`
                      : "border-neutral-300 bg-neutral-50 hover:bg-white hover:border-black opacity-85"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded border border-neutral-400 bg-neutral-900 flex items-center justify-center shrink-0">
                      {getIcon(culture.themeColor)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-black truncate uppercase">
                          {culture.title}
                        </span>
                        <span className="text-[8px] text-neutral-500 font-bold">
                          [{cardAlien.specimenCode.split(" ")[1]}]
                        </span>
                      </div>
                      <div className="text-[8px] text-neutral-600 truncate">
                        Curator: {culture.author}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded border font-bold uppercase ${
                        isSel ? cardColor.badge : "bg-neutral-200 text-neutral-700 border-neutral-300"
                      }`}
                    >
                      {culture.status === "READY TO PLAY" ? "ACTIVE" : "STANDBY"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diagnostic Telemetry Readout Box */}
          <div className="p-2 border-2 border-neutral-300 bg-neutral-50 rounded text-[9px] font-mono">
            <div className="flex items-center justify-between font-bold text-black mb-1">
              <span>ACTIVE DIAGNOSTIC LINK</span>
              <span className="text-cyan-700">99.8% NOMINAL</span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded overflow-hidden mb-1.5 border border-neutral-300">
              <div className="bg-black h-full w-[88%]" />
            </div>
            <div className="text-neutral-600 truncate">
              {alien.containmentProtocol}
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOOTER CONTROLS */}
      <footer className="w-full pt-1 border-t-2 border-black text-[10px] text-neutral-700 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="text-black font-bold">JOYSTICK:</span>
          <span>Up / Down Cartridge</span>
          <span className="text-neutral-400">|</span>
          <span className="text-black font-bold">[A]</span>
          <span>Analyze Specimen</span>
          <span className="text-neutral-400">|</span>
          <span className="text-black font-bold">[T]</span>
          <span>Switch Hub Design</span>
        </div>
        <div className="text-neutral-600 font-bold">
          BIO-CONTAINMENT LAB // HYPER ISLAND 2026
        </div>
      </footer>
    </div>
  );
}
