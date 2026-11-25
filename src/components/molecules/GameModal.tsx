import React from "react";

export interface GameModalProps {
  isLocked: boolean;
  gameOver: "win" | "lose" | null;
  onReturnToHub: () => void;
  onResume: () => void;
  onRestart: () => void;
}

export function GameModal({
  isLocked,
  gameOver,
  onReturnToHub,
  onResume,
  onRestart,
}: GameModalProps) {
  // PAUSED / ENGAGE SCANNER OVERLAY
  if (!isLocked && !gameOver) {
    return (
      <div className="absolute inset-0 z-40 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-6 text-center select-none font-mono">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-black border-2 border-white p-5 md:p-6 shadow-[8px_8px_0px_#ffffff] text-left"
        >
          <div className="flex items-center justify-between border-b-2 border-white/30 pb-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
              [PAUSED // SCANNER DISENGAGED]
            </span>
            <button
              onClick={onReturnToHub}
              className="px-2.5 py-1 bg-white text-black hover:bg-neutral-200 font-bold text-[10px] uppercase border border-white cursor-pointer shadow-[2px_2px_0px_#ffffff]"
            >
              [ESC / B] QUIT TO MENU
            </button>
          </div>

          <h2 className="text-lg md:text-xl font-black text-white mb-1.5 uppercase tracking-wider">
            ECHOES IN THE DARK
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed mb-4">
            Your mouse is unlocked. Explore the subterranean void with LiDAR echolocation, charge floral beacons, and summon your mate. You can return to the main menu at any time.
          </p>

          <div className="bg-neutral-900 border border-white/20 p-3 mb-4 text-[11px] space-y-1.5 text-neutral-200 font-mono">
            <div className="text-white font-bold mb-1 border-b border-white/10 pb-0.5">CONTROLS REFERENCE:</div>
            <div>• <strong>Left Click / Arcade [X]:</strong> Wide LiDAR Scan (map dark room)</div>
            <div>• <strong>Right Click / Arcade [Y]:</strong> Focused Beam (charge beacons / burn spores)</div>
            <div>• <strong>WASD / 8BitDo Stick:</strong> Move through subterranean cavern</div>
            <div>• <strong>Hold [E] / Arcade [A]:</strong> Bloom floral resonance beacons</div>
            <div className="text-amber-300 font-bold pt-1">• <strong>Escape / [B] Button:</strong> Unlock Cursor / Return to Main Menu</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full">
            <button
              onClick={onReturnToHub}
              className="flex-1 py-2.5 px-4 bg-black hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider border-2 border-white shadow-[4px_4px_0px_#ffffff] cursor-pointer transition-all text-center"
            >
              ◀ BACK TO MAIN MENU [B]
            </button>

            <button
              onClick={onResume}
              className="flex-1 py-2.5 px-4 bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider border-2 border-white shadow-[4px_4px_0px_#ffffff] cursor-pointer transition-all text-center animate-pulse"
            >
              RESUME GAME [A / CLICK] ▶
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GAME OVER / VICTORY OVERLAY
  if (gameOver) {
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
              ◀ BACK TO MAIN MENU [B]
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

  return null;
}
