"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CultureInfo } from "./CultureCard";
import { Sparkles, Gamepad2, Radio } from "lucide-react";

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
      className="absolute inset-0 z-[180] bg-black flex flex-col items-center justify-between p-6 select-none cursor-pointer font-mono"
    >
      {/* Top Arcade Marquee */}
      <div className="flex flex-col items-center text-center mt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black border-2 border-white mb-2">
          <Sparkles className="w-3.5 h-3.5 text-black animate-spin" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            ATTRACT MODE • EXHIBITION PREVIEW
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-white uppercase">
          EXO-CULTURES
        </h1>
        <p className="text-xs text-neutral-400 tracking-wider">
          4 UNIQUE ALIEN CIVILIZATIONS • 8BITDO ARCADE HUB
        </p>
      </div>

      {/* Featured Culture Spotlight (Negative contrast card) */}
      <div className="w-full max-w-lg bg-black border-2 border-white p-5 shadow-[6px_6px_0px_#ffffff] flex flex-col items-center text-center">
        <div className="w-full flex items-center justify-between border-b-2 border-white/20 pb-2 mb-3">
          <span className="text-xs font-bold text-white uppercase tracking-widest">
            CIVILIZATION {currentIndex + 1} OF {cultures.length}
          </span>
          <span className="text-xs font-bold text-neutral-300 uppercase">
            CREATOR: {activeCulture.author}
          </span>
        </div>

        <div className="relative w-full h-40 bg-neutral-950 border-2 border-white/40 overflow-hidden mb-3 flex items-center justify-center">
          {activeCulture.imageSrc ? (
            <Image
              src={activeCulture.imageSrc}
              alt={activeCulture.title}
              fill
              className="object-cover grayscale contrast-150 transition-transform duration-1000 scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black p-4">
              <Radio className="w-8 h-8 text-neutral-400 mb-2 animate-pulse" />
              <span className="text-xs text-white font-bold uppercase tracking-wider">
                PORTAL DORMANT
              </span>
              <span className="text-[10px] text-neutral-400 mt-1">
                Awaiting incoming culture transmission from {activeCulture.author}
              </span>
            </div>
          )}
        </div>

        <h2 className="text-lg font-bold text-white mb-1 uppercase tracking-wider">
          {activeCulture.title}
        </h2>
        <p className="text-xs text-neutral-300 mb-2">
          {activeCulture.subtitle}
        </p>
        <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
          {activeCulture.description}
        </p>

        {/* Mechanics Chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {activeCulture.mechanics.map((mech, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 bg-black border border-white text-white font-bold"
            >
              • {mech}
            </span>
          ))}
        </div>
      </div>

      {/* Negative Inversion Arcade Prompt */}
      <div className="flex flex-col items-center gap-2 mb-3">
        <div className="flex items-center gap-2 px-5 py-2 bg-white text-black border-2 border-white animate-bounce shadow-[3px_3px_0px_#888888]">
          <Gamepad2 className="w-4 h-4 fill-current text-black" />
          <span className="text-xs font-bold uppercase tracking-widest">
            INSERT COIN • PRESS ANY BUTTON TO PLAY
          </span>
        </div>
        <span className="text-[10px] text-neutral-500">
          8BitDo Arcade Stick Joystick + [A] Button to Choose
        </span>
      </div>
    </div>
  );
}
