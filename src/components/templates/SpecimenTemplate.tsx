"use client";

import React from "react";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/types";
import { ExhibitionHeader } from "@/components/molecules";
import { ControlsHintBar } from "@/components/molecules/ControlsHintBar";
import { ArcadeButton } from "@/components/atoms/Button";

interface TemplateProps {
  culture: CultureInfo;
  onLaunch: () => void;
  onOpenDossier: () => void;
  onOpenAttract: () => void;
  onReturnToIntro: () => void;
  onToggleDesign: () => void;
}

export function SpecimenTemplate({
  culture,
  onLaunch,
  onOpenDossier,
  onOpenAttract,
  onReturnToIntro,
  onToggleDesign,
}: TemplateProps) {
  const alien = ALIEN_CULTURE_METADATA[culture.id] || ALIEN_CULTURE_METADATA["game"];

  return (
    <div className="flex-1 flex flex-col justify-between font-mono bg-[#030d07] text-[#34d399] select-none relative overflow-hidden p-2 md:p-4">
      {/* Background Oscilloscope CRT Line Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

      {/* 1. TOP BIO-SECURITY TERMINAL HEADER */}
      <ExhibitionHeader
        theme="specimen"
        onReturnToIntro={onReturnToIntro}
        onToggleDesign={onToggleDesign}
        onOpenDossier={onOpenDossier}
        onOpenAttract={onOpenAttract}
      />

      {/* 2. SPLIT-SCREEN PHOSPHOR LABORATORY CONSOLE */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-4 select-none mb-2 z-10">
        {/* LEFT PANE: Bio-Containment Tank Viewport */}
        <div className="flex-1 md:flex-[1.2] relative flex flex-col justify-between border-2 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-black/90 rounded p-3 overflow-hidden">
          <div className="flex items-center justify-between border-b border-emerald-700/60 pb-1.5 mb-2 z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500">
                {alien.specimenCode}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 drop-shadow-[0_0_6px_#22c55e]">
                {culture.title}
              </span>
            </div>
            <div className="flex items-center text-[9px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 border border-amber-500">
              <span>[HAZARD: {alien.hazardClass}]</span>
            </div>
          </div>

          <div className="relative flex-1 min-h-[190px] rounded border border-emerald-500/60 overflow-hidden bg-black flex flex-col items-center justify-center p-3 select-none">
            {/* Phosphor matrix grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b_1px,transparent_1px),linear-gradient(to_bottom,#064e3b_1px,transparent_1px)] bg-[size:14px_14px] opacity-40 pointer-events-none" />

            <div className="absolute left-1.5 top-2 bottom-2 z-20 flex flex-col justify-between text-[7px] font-mono text-emerald-600 select-none pointer-events-none">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            {/* Central Bio-Radar Schematic */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <svg className="w-24 h-24 text-emerald-400/50 mb-1 drop-shadow-[0_0_6px_#10b981]" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.8" />
                <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="50" cy="50" r="3" fill="#10b981" className="animate-pulse" />
              </svg>
              <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase drop-shadow-[0_0_6px_#22c55e]">
                BIOLUMINESCENT CHAMBER
              </span>
              <span className="text-[8px] text-emerald-500 font-mono mt-0.5">
                RAYCAST MATRIX: 220,000 NODES
              </span>
            </div>

            <div className="absolute top-2 right-2 text-emerald-400 z-10 pointer-events-none font-mono text-xs font-bold">
              [+]
            </div>

            <div className="absolute bottom-2 left-4 right-2 z-10 bg-black/90 text-emerald-300 border border-emerald-500/50 p-1 flex items-center justify-between text-[8px]">
              <span>SAMPLE: {alien.sampleType}</span>
              <span className="text-amber-400 font-bold">{alien.beamLock}</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Diagnostic Telemetry & Launch Terminal */}
        <div className="flex-1 relative flex flex-col justify-between border-2 border-emerald-500/60 bg-[#020a05] rounded p-3 text-xs leading-relaxed">
          <div>
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-1 mb-2">
              <span className="font-bold text-emerald-300 uppercase tracking-widest text-[10px]">
                [ECOSYSTEM TELEMETRY]
              </span>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-950 border border-emerald-600 text-emerald-200 font-bold">
                COLLABORATIVE DEMO
              </span>
            </div>

            <p className="text-[11px] text-emerald-200/90 leading-snug mb-3">
              Subterranean containment zone engineered by Aisah, Mana, Martin, and Maxime. Raycasting sensors track 220,000 photonic LiDAR reflections in real-time.
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
              AUTH: AISAH • MANA • MARTIN • MAXIME
            </span>

            <ArcadeButton
              variant="neon"
              size="md"
              onClick={onLaunch}
              className="py-2 px-5 bg-emerald-500 hover:bg-emerald-400 text-black border-emerald-300 shadow-[0_0_15px_#10b981]"
            >
              <span>ENGAGE [A]</span>
            </ArcadeButton>
          </div>
        </div>
      </div>

      {/* 3. LOWER BIO-TELEMETRY STATUS BAR */}
      <ControlsHintBar theme="phosphor" />
    </div>
  );
}
