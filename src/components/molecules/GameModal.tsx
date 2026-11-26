import React from "react";
import { AlienHubDesign } from "./CalibrationBar";
import { ArcadeButton } from "@/components/atoms/Button";

export interface GameModalProps {
  gameOver: "win" | "lose" | null;
  onReturnToHub: () => void;
  onRestart: () => void;
  theme?: AlienHubDesign;
}

export function GameModal({
  gameOver,
  onReturnToHub,
  onRestart,
  theme = "specimen",
}: GameModalProps) {
  // Only display modal when the game finishes (Victory or Defeat)
  if (!gameOver) return null;

  const isPhosphor = theme === "specimen";

  return (
    <div
      className={`absolute inset-0 z-50 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-6 text-center select-none font-mono ${
        isPhosphor ? "bg-[#010803]/90" : "bg-black/90"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md p-6 text-center overflow-hidden ${
          isPhosphor
            ? "phosphor-crt-screen border-2 border-[#4ade80] shadow-[0_0_32px_rgba(74,222,128,0.3)]"
            : "bg-black border-2 border-white shadow-[10px_10px_0px_#ffffff]"
        }`}
      >
        {isPhosphor && (
          <div className="absolute inset-0 phosphor-crt-scanlines pointer-events-none opacity-45" />
        )}

        <div className="relative z-10">
          {gameOver === "win" ? (
            <>
              <div
                className={`inline-block px-4 py-1.5 font-bold text-xs tracking-widest uppercase mb-4 border-2 ${
                  isPhosphor
                    ? "bg-[#4ade80] text-[#021206] border-[#86efac]"
                    : "bg-white text-black border-white"
                }`}
              >
                [RESONANCE ESTABLISHED]
              </div>
              <h2
                className={`text-lg md:text-xl font-bold mb-3 uppercase tracking-wider leading-relaxed ${
                  isPhosphor ? "arcade-text phosphor-text-glow" : "text-white"
                }`}
              >
                YOUR MATE ARRIVES
              </h2>
              <p
                className={`text-xs leading-relaxed mb-6 ${
                  isPhosphor ? "text-[#bbf7d0]/90" : "text-neutral-300"
                }`}
              >
                The harmonic pulse carried across the cosmic dark. The blooms burned away the shadow. You are not alone anymore.
              </p>
            </>
          ) : (
            <>
              <div
                className={`inline-block px-4 py-1.5 font-bold text-xs tracking-widest uppercase mb-4 border-2 ${
                  isPhosphor
                    ? "bg-[#052e16] text-[#86efac] border-[#4ade80]"
                    : "bg-red-600 text-white border-white"
                }`}
              >
                [BEACONS EXTINGUISHED]
              </div>
              <h2
                className={`text-lg md:text-xl font-bold mb-3 uppercase tracking-wider leading-relaxed ${
                  isPhosphor ? "arcade-text phosphor-text-glow" : "text-white"
                }`}
              >
                THE FLOWERS WITHERED
              </h2>
              <p
                className={`text-xs leading-relaxed mb-6 ${
                  isPhosphor ? "text-[#bbf7d0]/90" : "text-neutral-300"
                }`}
              >
                The viral spores took every bloom. Nothing is left to summon your mate through the abyss.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
            <ArcadeButton
              variant={isPhosphor ? "phosphor-secondary" : "secondary"}
              size="md"
              onClick={onReturnToHub}
              className="flex-1 py-2.5 arcade-text text-[10px]"
            >
              <span>[✕ CLOSE]</span>
            </ArcadeButton>
            <ArcadeButton
              variant={isPhosphor ? "phosphor-primary" : "primary"}
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
