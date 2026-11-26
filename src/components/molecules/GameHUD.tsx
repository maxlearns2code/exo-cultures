import React from "react";

export interface FlowerStatusItem {
  name: string;
  state: number; // 0: uncharged, 1: charged, 2: blooming, 3: withered
  hp: number;
}

export interface GameHUDProps {
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
      <div className="relative z-50 flex flex-wrap items-center justify-between gap-2 pt-8 sm:pt-2.5 p-2.5 md:p-3 backdrop-blur-sm select-none bg-[#021207]/90 border-b-2 border-[#22c55e]/60">
        <div className="flex items-center gap-2.5 sm:pl-24">
          <div>
            <h1 className="text-[10px] md:text-xs font-bold tracking-wider uppercase flex items-center gap-2 arcade-text phosphor-text-glow">
              <span>ECHOLOCATION ARCHIVE // 3D LIDAR</span>
            </h1>
            <p className="text-[9px] tracking-widest hidden sm:block mt-0.5 text-[#22c55e]/80">
              3D PHOTONIC LIDAR • 220,000 SCAN POINTS MAX
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:pr-44">
          {/* Lure / Mate Summon Progress Meter */}
          <div className="flex flex-col items-end gap-1 min-w-[120px] md:min-w-[180px]">
            <div className="flex items-center justify-between w-full text-[9px] font-bold">
              <span className="text-[#4ade80]">
                <span>MATE SUMMON:</span>
              </span>
              <span className="text-[#86efac]">{lureProgress}%</span>
            </div>
            <div className="w-full h-2 rounded border overflow-hidden border-[#22c55e]/60 bg-[#010a04]">
              <div
                className="h-full transition-all duration-150 bg-gradient-to-r from-[#15803d] via-[#22c55e] to-[#86efac] shadow-[0_0_10px_rgba(74,222,128,0.6)]"
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
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
            <div className="absolute w-6 h-[1px] bg-[#4ade80]/50" />
            <div className="absolute h-6 w-[1px] bg-[#4ade80]/50" />
          </div>
        </div>
      )}

      {/* SYSTEM ANNOUNCEMENT BANNER */}
      {systemMessage && (
        <div className="absolute top-20 sm:top-16 left-0 right-0 z-30 pointer-events-none flex justify-center px-4">
          <div className="px-4 py-1.5 rounded text-xs font-bold border animate-pulse bg-[#021509]/95 border-[#4ade80] text-[#86efac] shadow-[0_0_18px_rgba(74,222,128,0.35)]">
            {systemMessage}
          </div>
        </div>
      )}

      {/* HOLD [E] / [A] TO BLOOM PROMPT */}
      {promptVisible && (
        <div className="absolute bottom-28 left-0 right-0 z-30 pointer-events-none flex justify-center px-4">
          <div className="px-4 py-2 rounded text-xs font-bold animate-bounce bg-[#031d0c]/95 border-2 border-[#4ade80] text-[#86efac] shadow-[0_0_20px_rgba(74,222,128,0.45)]">
            <span>STAND CLOSE &amp; HOLD [E] OR ARCADE [A] TO BLOOM FLOWER</span>
          </div>
        </div>
      )}

      {/* BOTTOM HUD: Flower & Spore Status + Diagnostic Counter */}
      <div className="relative z-20 p-2.5 backdrop-blur-sm select-none flex flex-wrap items-center justify-between gap-2 text-[10px] bg-[#021207]/85 border-t border-[#22c55e]/50">
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

            let badgeColor = "bg-[#010b04] text-[#22c55e]/75 border-[#14532d]";
            if (fl.state === 2) {
              badgeColor =
                "bg-[#22c55e] text-[#021206] border-[#86efac] shadow-[0_0_10px_rgba(74,222,128,0.4)]";
            } else if (fl.state === 1) {
              badgeColor = "bg-[#052e16] text-[#86efac] border-[#4ade80] animate-pulse";
            } else if (fl.state === 3) {
              badgeColor = "bg-[#010903] text-[#166534] border-[#14532d]/60";
            }

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
        <div className="flex items-center gap-3 text-[9px] text-[#22c55e]/80">
          <span className="hidden sm:inline font-bold text-[#86efac]/90">
            [ESC]: UNLOCK • [B]: MENU • [WASD / SCROLL]: MOVE
          </span>
          <span className="hidden sm:inline text-[#14532d]">|</span>
          <span>
            VIRAL SPORES:{" "}
            <strong
              className={
                activeSporesCount > 0 ? "text-[#86efac] animate-pulse" : "text-[#4ade80]"
              }
            >
              {activeSporesCount} ACTIVE
            </strong>
          </span>
          <span>|</span>
          <span className="font-bold text-[#4ade80] phosphor-text-glow">
            {mappedPoints.toLocaleString()} PTS MAPPED
          </span>
        </div>
      </div>
    </>
  );
}
