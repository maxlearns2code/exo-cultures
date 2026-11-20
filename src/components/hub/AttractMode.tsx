"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CultureInfo } from "./CultureCard";
import { Sparkles, Gamepad2 } from "lucide-react";

interface AttractModeProps {
  cultures: CultureInfo[];
  onDismiss: () => void;
}

export function AttractMode({ cultures, onDismiss }: AttractModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cultures.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [cultures.length]);

  const activeCulture = cultures[currentIndex];

  return (
    <div
      onClick={onDismiss}
      className="absolute inset-0 z-[180] bg-black/95 flex flex-col items-center justify-between p-6 select-none cursor-pointer"
    >
      {/* Top Arcade Marquee */}
      <div className="flex flex-col items-center text-center mt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/80 border-2 border-cyan-400/80 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span className="text-[10px] font-mono tracking-widest text-cyan-300 font-bold uppercase">
            ATTRACT MODE • EXHIBITION PREVIEW
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-magenta-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]">
          EXO-CULTURES
        </h1>
        <p className="text-xs font-mono text-neutral-400 tracking-wider">
          4 UNIQUE ALIEN CIVILIZATIONS • 8BITDO ARCADE HUB
        </p>
      </div>

      {/* Featured Culture Spotlight */}
      <div className="w-full max-w-lg bg-neutral-950/80 border-2 border-cyan-500/60 rounded-xl p-5 shadow-[0_0_40px_rgba(0,240,255,0.25)] flex flex-col items-center text-center">
        <div className="w-full flex items-center justify-between border-b-2 border-neutral-800 pb-2 mb-3">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            CIVILIZATION {currentIndex + 1} OF {cultures.length}
          </span>
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
            CREATOR: {activeCulture.author}
          </span>
        </div>

        <div className="relative w-full h-40 bg-black/80 rounded-lg border-2 border-neutral-800 overflow-hidden mb-3">
          {activeCulture.imageSrc ? (
            <Image
              src={activeCulture.imageSrc}
              alt={activeCulture.title}
              fill
              className="object-cover transition-transform duration-1000 scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-900 to-black">
              <span className="text-sm font-mono text-cyan-400 font-bold uppercase">
                {activeCulture.title}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <h2 className="text-lg font-bold font-mono text-white mb-1">
          {activeCulture.title}
        </h2>
        <p className="text-xs font-mono text-cyan-400 mb-2">
          {activeCulture.subtitle}
        </p>
        <p className="text-xs text-neutral-300 leading-relaxed max-w-md">
          {activeCulture.description}
        </p>

        {/* Mechanics Chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {activeCulture.mechanics.map((mech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-300 rounded"
            >
              • {mech}
            </span>
          ))}
        </div>
      </div>

      {/* Blinking Arcade Call To Action */}
      <div className="flex flex-col items-center gap-2 mb-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border-2 border-amber-400 rounded-lg animate-bounce">
          <Gamepad2 className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
            INSERT COIN • PRESS ANY BUTTON TO PLAY
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500">
          8BitDo Arcade Stick Joystick + [A] Button to Choose
        </span>
      </div>
    </div>
  );
}
