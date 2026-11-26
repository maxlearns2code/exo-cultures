import React from "react";
import { ArcadeButton } from "@/components/atoms/Button";

export interface GameModalProps {
  gameOver: "win" | "lose" | null;
  onReturnToHub: () => void;
  onRestart: () => void;
}

export function GameModal({
  gameOver,
  onReturnToHub,
  onRestart,
}: GameModalProps) {
  // Only display modal when the game finishes (Victory or Defeat)
  if (!gameOver) return null;

  return (
    <div className="absolute inset-0 z-50 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-6 text-center select-none font-mono bg-[#010803]/90">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-6 text-center overflow-hidden phosphor-crt-screen border-2 border-[#4ade80] shadow-[0_0_32px_rgba(74,222,128,0.3)]"
      >
        <div className="absolute inset-0 phosphor-crt-scanlines pointer-events-none opacity-45" />

        <div className="relative z-10">
          {gameOver === "win" ? (
            <>
              <div className="inline-block px-4 py-1.5 font-bold text-xs tracking-widest uppercase mb-4 border-2 bg-[#4ade80] text-[#021206] border-[#86efac]">
                [RESONANCE ESTABLISHED]
              </div>
              <h2 className="text-lg md:text-xl font-bold mb-3 uppercase tracking-wider leading-relaxed arcade-text phosphor-text-glow">
                YOUR MATE ARRIVES
              </h2>
              <p className="text-xs leading-relaxed mb-6 text-[#bbf7d0]/90">
                The harmonic pulse carried across the cosmic dark. The blooms burned away the shadow. You are not alone anymore.
              </p>
            </>
          ) : (
            <>
              <div className="inline-block px-4 py-1.5 font-bold text-xs tracking-widest uppercase mb-4 border-2 bg-[#052e16] text-[#86efac] border-[#4ade80]">
                [BEACONS EXTINGUISHED]
              </div>
              <h2 className="text-lg md:text-xl font-bold mb-3 uppercase tracking-wider leading-relaxed arcade-text phosphor-text-glow">
                THE FLOWERS WITHERED
              </h2>
              <p className="text-xs leading-relaxed mb-6 text-[#bbf7d0]/90">
                The viral spores took every bloom. Nothing is left to summon your mate through the abyss.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
            <ArcadeButton
              variant="phosphor-secondary"
              size="md"
              onClick={onReturnToHub}
              className="flex-1 py-2.5 arcade-text text-[10px]"
            >
              <span>[✕ CLOSE]</span>
            </ArcadeButton>
            <ArcadeButton
              variant="phosphor-primary"
              size="md"
              onClick={onRestart}
              className="flex-1 py-2.5 arcade-text text-[10px]"
            >
              <span>PLAY AGAIN ▶</span>
            </ArcadeButton>
          </div>
        </div>
      </div>
    </div>
  );
}
