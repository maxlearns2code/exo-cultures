"use client";

import React from "react";
import { ArcadeButton } from "@/components/atoms/Button";

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
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none relative">
      <div className="flex flex-col items-center gap-10 md:gap-12 w-full max-w-md">
        {/* Phosphor Green CRT Terminal Title */}
        <h1 className="arcade-text phosphor-text-glow text-xl sm:text-3xl md:text-4xl uppercase tracking-wider leading-relaxed">
          {displayTitle}
        </h1>

        {/* Just the 2 CTA Action Buttons */}
        <div className="w-full max-w-xs flex flex-col gap-4">
          <ArcadeButton
            variant="phosphor-primary"
            size="lg"
            onClick={onStartGame}
            className="w-full py-3.5 arcade-text text-[11px] sm:text-xs tracking-wider"
          >
            <span>▶ PLAY GAME</span>
          </ArcadeButton>

          <ArcadeButton
            variant="phosphor-secondary"
            size="lg"
            onClick={onExplain}
            className="w-full py-3.5 arcade-text text-[11px] sm:text-xs tracking-wider"
          >
            <span>THE CONCEPT</span>
          </ArcadeButton>
        </div>
      </div>
    </div>
  );
}
