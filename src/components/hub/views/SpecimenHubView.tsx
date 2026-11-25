"use client";

import React from "react";
import Image from "next/image";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/components/hub/CultureCard";
import { Play, ArrowLeft, BookOpen, AlertTriangle, Shield, Activity, Crosshair } from "lucide-react";

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

export function SpecimenHubView({
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
    <div className="flex-1 flex flex-col justify-between font-mono bg-[#030d07] text-[#34d399] select-none relative overflow-hidden p-2 md:p-4">
      {/* Background Oscilloscope CRT Line Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

      {/* 1. TOP BIO-SECURITY TERMINAL HEADER */}
      <header className="w-full flex items-center justify-between border-b-2 border-emerald-500/70 pb-2 mb-2 select-none z-10 bg-[#030d07]/95">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onReturnToIntro}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-black hover:bg-emerald-950 text-emerald-400 font-bold text-xs border border-emerald-500 transition-all cursor-pointer shadow-[0_0_8px_rgba(16,185,129,0.4)]"
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
              HYPER ISLAND LAB 04 • COLLABORATIVE GAME SPECIMEN ACTIVE █
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
            <span>[Y] DOSSIER</span>
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
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-4 select-none mb-2 z-10">
        {/* LEFT PANE: Bio-Containment Tank Viewport */}
        <div className="flex-1 md:flex-[1.2] relative flex flex-col justify-between border-2 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-black/90 rounded p-3 overflow-hidden">
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
          <div className="relative flex-1 min-h-[190px] rounded border border-emerald-500/60 overflow-hidden bg-black flex items-center justify-center">
            <div className="absolute left-1.5 top-2 bottom-2 z-20 flex flex-col justify-between text-[7px] font-mono text-emerald-600 select-none pointer-events-none">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <Image
              src={current.imageSrc || "/assets/martin/echoes-in-the-dark.svg"}
              alt={current.title}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute top-2 right-2 text-emerald-400 z-10 pointer-events-none">
              <Crosshair className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
            </div>

            <div className="absolute bottom-2 left-4 right-2 z-10 bg-black/80 text-emerald-300 border border-emerald-500/50 p-1 flex items-center justify-between text-[8px]">
              <span>SAMPLE: {alien.sampleType}</span>
              <span className="text-amber-400 font-bold">{alien.beamLock}</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Diagnostic Telemetry & Launch Terminal */}
        <div className="flex-1 relative flex flex-col justify-between border-2 border-emerald-500/60 bg-[#020a05] rounded p-3 text-xs leading-relaxed">
          <div>
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-1 mb-2">
              <span className="font-bold text-emerald-300 uppercase tracking-widest text-[10px] flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" />
                ECOSYSTEM TELEMETRY
              </span>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-950 border border-emerald-600 text-emerald-200 font-bold">
                COLLABORATIVE DEMO
              </span>
            </div>

            <p className="text-[11px] text-emerald-200/90 leading-snug mb-3">
              Subterranean containment zone engineered by Maxime, Martin, Aisah, and Mana. Raycasting sensors track 220,000 photonic LiDAR reflections in real-time.
            </p>

            <div className="space-y-1.5 text-[10px] bg-black/60 p-2.5 border border-emerald-900 rounded mb-3">
              <div className="flex justify-between border-b border-emerald-900/60 pb-1">
                <span className="text-emerald-500 font-bold">ENVIRONMENT:</span>
                <span className="text-emerald-200">{alien.environmentalTelemetry}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-900/60 pb-1">
                <span className="text-emerald-500 font-bold">CONTAINMENT:</span>
                <span className="text-emerald-200">{alien.containmentProtocol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-500 font-bold">COGNITION:</span>
                <span className="text-emerald-200 truncate">{alien.alienAudience}</span>
              </div>
            </div>

            <div className="bg-emerald-950/40 p-2 border border-emerald-500/40 text-[9px] text-emerald-300">
              <span className="font-bold block text-white mb-0.5">MISSION DIRECTIVE:</span>
              <span>Illuminate terrain with LiDAR pulses. Charge and bloom the 4 resonant flowers. Burn incoming viral spores before they infect the colony.</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-emerald-800 flex items-center justify-between">
            <span className="text-[9px] text-emerald-600 font-bold">
              AUTH: MAXIME • MARTIN • AISAH • MANA
            </span>

            <button
              onClick={() => onLaunch(selectedIndex)}
              className="py-2 px-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_#10b981] transition-all cursor-pointer font-mono"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>ENGAGE [A]</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. LOWER BIO-TELEMETRY STATUS BAR */}
      <footer className="w-full pt-1.5 border-t border-emerald-500/40 text-[10px] text-emerald-600 flex items-center justify-between select-none z-10">
        <div className="flex items-center gap-2">
          <span className="text-emerald-300 font-bold">[A]</span>
          <span className="text-emerald-400">Launch Game</span>
          <span className="text-emerald-700">|</span>
          <span className="text-emerald-300 font-bold">[Y]</span>
          <span className="text-emerald-400">Process Dossier</span>
          <span className="text-emerald-700">|</span>
          <span className="text-emerald-300 font-bold">[T]</span>
          <span className="text-emerald-400">Switch Theme</span>
        </div>
        <div className="text-emerald-400 font-bold">
          BIO-CONTAINMENT PROTOCOL ACTIVE • WEEK 51, 2026
        </div>
      </footer>
    </div>
  );
}
