"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ArcadeHUDProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  score?: number;
  energy?: number;
}

export function ArcadeHUD({
  title = "EXO-CULTURES",
  subtitle = "ARCADE EXHIBITION",
  showBackButton = false,
  score,
  energy,
}: ArcadeHUDProps) {
  return (
    <header className="w-full flex items-center justify-between border-b-2 border-neutral-800 pb-2 mb-3 select-none">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 border-2 border-cyan-500/60 hover:border-cyan-400 text-cyan-300 text-xs font-mono font-bold rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[B] HUB</span>
          </Link>
        )}
        <div>
          <h1 className="text-sm md:text-base font-bold tracking-wider font-mono text-cyan-400 uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
            {title}
          </h1>
          <p className="text-[10px] text-neutral-400 tracking-widest font-mono">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-mono">
        {energy !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-400 font-bold uppercase">THERMAL:</span>
            <div className="w-24 h-3 bg-neutral-900 border-2 border-amber-500/60 rounded overflow-hidden">
              <div
                className={`h-full transition-all duration-150 ${
                  energy < 25 ? "bg-red-500 animate-pulse" : energy < 50 ? "bg-amber-400" : "bg-cyan-400"
                }`}
                style={{ width: `${Math.max(0, Math.min(100, energy))}%` }}
              />
            </div>
          </div>
        )}

        {score !== undefined && (
          <div className="flex items-center gap-1.5 bg-neutral-900/80 px-2.5 py-1 border-2 border-neutral-700 rounded">
            <span className="text-[10px] text-neutral-400 font-bold">SCORE:</span>
            <span className="text-cyan-300 font-bold tracking-widest">
              {score.toString().padStart(5, "0")}
            </span>
          </div>
        )}

        <div className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-400 border-2 border-emerald-500/40 px-2 py-0.5 rounded font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>FREE PLAY</span>
        </div>
      </div>
    </header>
  );
}

export function ArcadeControlsFooter() {
  return (
    <footer className="w-full mt-auto pt-2 border-t-2 border-neutral-800 text-[10px] font-mono text-neutral-400 flex flex-wrap items-center justify-between select-none">
      <div className="flex items-center gap-2">
        <span className="text-cyan-400 font-bold">JOYSTICK:</span>
        <span>Move / Aim</span>
        <span className="text-neutral-600">|</span>
        <span className="text-cyan-400 font-bold">[A]</span>
        <span>Confirm / Beam</span>
        <span className="text-neutral-600">|</span>
        <span className="text-cyan-400 font-bold">[B]</span>
        <span>Back / Wavelength</span>
        <span className="text-neutral-600">|</span>
        <span className="text-cyan-400 font-bold">[X]</span>
        <span>Harmonize Pulse</span>
      </div>
      <div className="text-neutral-500 flex items-center gap-1">
        <span className="text-amber-400 font-bold">[SEL+START]</span>
        <span>Hold 2s Hub</span>
      </div>
    </footer>
  );
}
