import React from "react";

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
    <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-6 text-center select-none font-mono">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-black border-2 border-white p-6 shadow-[10px_10px_0px_#ffffff] text-center"
      >
        {gameOver === "win" ? (
          <>
            <div className="inline-block px-4 py-1.5 bg-white text-black font-bold text-xs tracking-widest uppercase mb-3 border-2 border-white">
              [RESONANCE ESTABLISHED]
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-widest">
              YOUR MATE ARRIVES
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed mb-5">
              The harmonic pulse carried across the cosmic dark. The blooms burned away the shadow. You are not alone anymore.
            </p>
          </>
        ) : (
          <>
            <div className="inline-block px-4 py-1.5 bg-red-600 text-white font-bold text-xs tracking-widest uppercase mb-3 border-2 border-white">
              [BEACONS EXTINGUISHED]
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-widest">
              THE FLOWERS WITHERED
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed mb-5">
              The viral spores took every bloom. Nothing is left to summon your mate through the abyss.
            </p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-4">
          <button
            onClick={onReturnToHub}
            className="flex-1 py-2.5 px-4 bg-black hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider border-2 border-white shadow-[4px_4px_0px_#ffffff] cursor-pointer transition-all"
          >
            [B / ESC] CLOSE
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-2.5 px-4 bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider border-2 border-white shadow-[4px_4px_0px_#ffffff] cursor-pointer transition-all"
          >
            PLAY AGAIN [A] ▶
          </button>
        </div>
      </div>
    </div>
  );
}
