import React from "react";

export interface FlowerStatusItem {
  name: string;
  state: number; // 0: uncharged, 1: charged, 2: blooming, 3: withered
  hp: number;
}

export interface GameHUDProps {
  onReturnToHub: () => void;
  lureProgress: number;
  isLocked: boolean;
  gameOver: "win" | "lose" | null;
  systemMessage?: string;
  promptVisible?: boolean;
  flowerStatus: FlowerStatusItem[];
  activeSporesCount: number;
  mappedPoints: number;
}

export function GameHUD({
  onReturnToHub,
  lureProgress,
  isLocked,
  gameOver,
  systemMessage,
  promptVisible,
  flowerStatus,
  activeSporesCount,
  mappedPoints,
}: GameHUDProps) {
  return (
    <>
      {/* TOP HUD: Echolocation & Mate Summoning Telemetry */}
      <div className="relative z-50 flex items-center justify-between p-2.5 md:p-3 bg-black/85 backdrop-blur-sm border-b-2 border-white/20 select-none">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onReturnToHub}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase border-2 border-white transition-all cursor-pointer shadow-[3px_3px_0px_#ffffff] active:translate-y-0.5"
            title="Return to Main Menu (or press B / ESC)"
          >
            <span>◀ [B] BACK TO MAIN MENU</span>
          </button>
          <div>
            <h1 className="text-xs md:text-sm font-bold tracking-wider text-purple-200 uppercase flex items-center gap-1.5">
              <span>ECHOLOCATION ARCHIVE // MARTIN</span>
              <span className="text-[9px] bg-purple-900/60 text-purple-300 border border-purple-400 px-1.5 py-0.2 rounded">
                CHAMBER III
              </span>
            </h1>
            <p className="text-[9px] text-purple-400 tracking-widest hidden sm:block">
              3D PHOTONIC LIDAR • 220,000 SCAN POINTS MAX
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToHub}
            className="hidden sm:flex items-center px-2.5 py-1 bg-red-950/80 hover:bg-red-900 text-red-200 font-bold text-xs uppercase border border-red-500 transition-all cursor-pointer shadow-[2px_2px_0px_#ef4444]"
            title="Exit Game to Hub"
          >
            <span>[QUIT GAME ✕]</span>
          </button>

          {/* Lure / Mate Summon Progress Meter */}
          <div className="flex flex-col items-end gap-1 min-w-[120px] md:min-w-[180px]">
            <div className="flex items-center justify-between w-full text-[9px] font-bold">
              <span className="text-purple-300">
                <span>MATE SUMMON:</span>
              </span>
              <span className="text-amber-300">{lureProgress}%</span>
            </div>
            <div className="w-full h-2 rounded bg-black/80 border border-purple-500/60 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-300 transition-all duration-150"
                style={{ width: `${lureProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CROSSHAIR RETICLE IN CENTER OF SCREEN */}
      {isLocked && !gameOver && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
            <div className="absolute w-6 h-[1px] bg-cyan-400/40" />
            <div className="absolute h-6 w-[1px] bg-cyan-400/40" />
          </div>
        </div>
      )}

      {/* SYSTEM ANNOUNCEMENT BANNER */}
      {systemMessage && (
        <div className="absolute top-16 left-0 right-0 z-30 pointer-events-none flex justify-center px-4">
          <div className="bg-black/90 border border-purple-400/80 px-4 py-1.5 rounded text-xs text-purple-200 font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse">
            {systemMessage}
          </div>
        </div>
      )}

      {/* HOLD [E] / [A] TO BLOOM PROMPT */}
      {promptVisible && (
        <div className="absolute bottom-28 left-0 right-0 z-30 pointer-events-none flex justify-center">
          <div className="bg-pink-950/90 border-2 border-pink-400 px-4 py-2 rounded text-xs text-white font-bold shadow-[0_0_20px_#ff5fa8] animate-bounce">
            <span>STAND CLOSE & HOLD [E] OR ARCADE [A] TO BLOOM FLOWER</span>
          </div>
        </div>
      )}

      {/* BOTTOM HUD: Flower & Spore Status + Diagnostic Counter */}
      <div className="relative z-20 p-2.5 bg-black/75 backdrop-blur-sm border-t border-purple-500/40 select-none flex flex-wrap items-center justify-between text-[10px]">
        {/* 4 Flowers Status */}
        <div className="flex items-center gap-2 flex-wrap">
          {flowerStatus.map((fl) => {
            const statusLabel =
              fl.state === 0
                ? "SEARCHING"
                : fl.state === 1
                ? "CHARGED"
                : fl.state === 2
                ? `BLOOM ${fl.hp}%`
                : "WITHERED";

            const badgeColor =
              fl.state === 2
                ? "bg-pink-950/80 text-pink-300 border-pink-500"
                : fl.state === 1
                ? "bg-amber-950/80 text-amber-300 border-amber-500 animate-pulse"
                : fl.state === 3
                ? "bg-neutral-900 text-neutral-500 border-neutral-700"
                : "bg-neutral-900 text-neutral-400 border-neutral-700";

            return (
              <div
                key={fl.name}
                className={`px-2 py-0.5 rounded border text-[9px] font-bold ${badgeColor}`}
              >
                <span>{fl.name}: </span>
                <span>{statusLabel}</span>
              </div>
            );
          })}
        </div>

        {/* Diagnostic point cloud & active spores counter */}
        <div className="flex items-center gap-3 text-neutral-400 text-[9px]">
          <span className="hidden sm:inline text-neutral-300 font-bold">
            [ESC]: UNLOCK • [B]: MENU • [WASD]: MOVE
          </span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span>
            VIRAL SPORES:{" "}
            <strong className={activeSporesCount > 0 ? "text-red-400 animate-pulse" : "text-neutral-300"}>
              {activeSporesCount} ACTIVE
            </strong>
          </span>
          <span>|</span>
          <span className="text-cyan-300 font-bold">
            {mappedPoints.toLocaleString()} PTS MAPPED
          </span>
        </div>
      </div>
    </>
  );
}
