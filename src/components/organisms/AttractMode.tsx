"use client";

import React from "react";
import Image from "next/image";

interface AttractModeProps {
  onDismiss: () => void;
}

export function AttractMode({ onDismiss }: AttractModeProps) {
  return (
    <div
      onClick={onDismiss}
      className="absolute inset-0 z-[180] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-between p-4 md:p-6 select-none cursor-pointer font-mono text-white"
    >
      {/* Top Arcade Marquee */}
      <div className="flex flex-col items-center text-center mt-1">
        <div className="inline-flex items-center px-3 py-1 bg-white text-black border-2 border-white mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest">
            ATTRACT MODE • COLLABORATIVE EXHIBITION PREVIEW
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-[0.25em] text-white uppercase drop-shadow-[0_0_12px_rgba(192,132,252,0.6)]">
          EXO-CULTURES
        </h1>
        <p className="text-xs text-purple-300 tracking-wider mt-0.5">
          ECHOES IN THE DARK • 3D PHOTONIC LIDAR EXPEDITION
        </p>
      </div>

      {/* Center Spotlight: The Single Collaborative Game */}
      <div className="w-full max-w-xl bg-black border-2 border-purple-400 p-4 md:p-5 shadow-[8px_8px_0px_#8b5cf6] flex flex-col items-center text-center my-auto">
        <div className="w-full flex items-center justify-between border-b-2 border-purple-500/40 pb-2 mb-3">
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">
            [UNIFIED SPECULATIVE EXPEDITION]
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
            MAXIME • MARTIN • AISAH • MANA
          </span>
        </div>

        {/* Artwork Display */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-black border-2 border-purple-400 overflow-hidden mb-3 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          <Image
            src="/assets/martin/echoes-in-the-dark.svg"
            alt="Echoes in the Dark"
            fill
            className="object-cover scale-105"
            priority
          />
        </div>

        <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wider mb-1">
          ONE SHARED ALIEN JOURNEY
        </h3>
        <p className="text-[11px] md:text-xs text-neutral-300 leading-relaxed max-w-md mb-3">
          Combining the sub-ice abyssal bioluminescence, photonic LiDAR echolocation, floral acoustic resonance, and atmospheric exosphere drift of four creators into one immersive experience.
        </p>

        {/* Mechanics Chips */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-3">
          {["3D LiDAR Point Cloud", "Floral Resonance", "Spore Defense", "Mate Summoning"].map((mech) => (
            <span
              key={mech}
              className="px-2 py-0.5 bg-purple-950/80 border border-purple-400/60 text-[9px] text-purple-200 font-bold uppercase"
            >
              {mech}
            </span>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="w-full max-w-xs py-2 bg-white text-black font-bold text-xs uppercase tracking-widest border-2 border-white shadow-[4px_4px_0px_#8b5cf6] flex items-center justify-center animate-pulse">
          <span>PRESS [A] OR CLICK TO PLAY</span>
        </div>
      </div>

      {/* Footer Arcade Instruction */}
      <div className="text-[10px] text-neutral-400 border-t border-neutral-800 pt-2 flex items-center justify-between w-full max-w-xl">
        <span>
          8BitDo Arcade Stick &amp; Mouse/Keyboard Compatible
        </span>
        <span className="text-white font-bold">HYPER ISLAND • WEEK 51, 2026</span>
      </div>
    </div>
  );
}
