"use client";

import React from "react";
import { ArcadeButton } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";

interface WelcomeHeroProps {
  displayTitle: string;
  onStartGame: () => void;
  onExplain: () => void;
}

export function WelcomeHero({
  displayTitle,
  onStartGame,
  onExplain,
}: WelcomeHeroProps) {
  return (
    <div className="flex-1 flex flex-col justify-between p-4 md:p-6 text-center select-none font-mono bg-black text-white relative">
      {/* Header Marquee */}
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center px-3 py-1 bg-white text-black border-2 border-white mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest">
            INTERGALACTIC WORLDS EXPO • WEEK 51, 2026 • HYPER ISLAND
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.25em] text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
          {displayTitle}
        </h1>
        <p className="text-xs text-neutral-300 tracking-wider mt-1">
          ECHOES IN THE DARK • COLLABORATIVE 3D PHOTONIC EXPEDITION
        </p>
      </div>

      {/* Exhibition Statement Card */}
      <div className="w-full max-w-lg mx-auto bg-black border-2 border-white p-5 md:p-6 shadow-[8px_8px_0px_#ffffff] flex flex-col items-center text-center my-auto">
        <div className="w-full flex items-center justify-between border-b-2 border-white/20 pb-2 mb-3 text-[11px]">
          <span className="text-white font-bold uppercase tracking-wider">
            [COLLABORATIVE CREATORS]
          </span>
          <span className="text-white font-bold tracking-wide">
            Maxime • Martin • Aisah • Mana
          </span>
        </div>

        <p className="text-xs md:text-sm text-neutral-200 leading-relaxed mb-4">
          Welcome to the Earth pavilion of the <strong>Intergalactic Worlds Expo</strong>.
          Four creators joined forces to fuse their speculative worlds into <strong>one common extraterrestrial journey</strong>.
          Step forward to explore the subterranean abyss, awaken dormant resonance blooms, and experience a unified alien reality.
        </p>

        {/* Concept & Experience Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge variant="default">One Shared Story</Badge>
          <Badge variant="default">Joint Group Pavilion</Badge>
          <Badge variant="default">Interactive Installation</Badge>
        </div>

        {/* Exactly 2 CTA Action Buttons */}
        <div className="w-full max-w-sm flex flex-col gap-3">
          <ArcadeButton
            variant="primary"
            size="lg"
            onClick={onStartGame}
            className="w-full py-3"
          >
            <span>▶ PLAY GAME</span>
          </ArcadeButton>

          <ArcadeButton
            variant="secondary"
            size="lg"
            onClick={onExplain}
            className="w-full py-3"
          >
            <span>WHAT WE DID</span>
          </ArcadeButton>
        </div>
      </div>

      {/* Exhibition Footer */}
      <div className="text-[10px] text-neutral-400 border-t-2 border-white/20 pt-2 flex items-center justify-between">
        <span>HYPER ISLAND CAMPUS • WEEK 51, 2026</span>
        <span>EXHIBITION PAVILION</span>
      </div>
    </div>
  );
}
