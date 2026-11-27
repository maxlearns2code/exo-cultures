import React from "react";

export interface Intro2DHUDProps {
  distanceMeters: number;
  signalStrength: number;
  statusBanner: string;
  nearDoorway: boolean;
  transitioning: boolean;
  onSkipTo3D: () => void;
}

export function Intro2DHUD({
  distanceMeters,
  signalStrength,
  statusBanner,
  nearDoorway,
  transitioning,
  onSkipTo3D,
}: Intro2DHUDProps) {
  return (
    <>
      {/* TOP HUD: Surface Telemetry & Beacon Distance */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 pt-8 sm:pt-2.5 p-2.5 md:p-3 backdrop-blur-sm bg-[#021207]/85 border-b-2 border-[#22c55e]/60">
        <div className="flex items-center gap-2.5 sm:pl-24">
          <div>
            <h1 className="text-[10px] md:text-xs font-bold tracking-wider uppercase arcade-text phosphor-text-glow">
              PART 1 // SURFACE EXPEDITION: ØRGÄÆ
            </h1>
            <p className="text-[9px] tracking-widest hidden sm:block mt-0.5 text-[#22c55e]/80">
              ANDROMEDA GAMAE CLUSTER • FOLLOW THE DISTANT LIGHT
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:pr-44">
          <div className="flex flex-col items-end gap-1 min-w-[130px] md:min-w-[180px]">
            <div className="flex items-center justify-between w-full text-[9px] font-bold">
              <span className="text-[#4ade80]">BEACON SIGNAL:</span>
              <span className="text-[#86efac]">{distanceMeters}m</span>
            </div>
            <div className="w-full h-2 rounded border overflow-hidden border-[#22c55e]/60 bg-[#010a04]">
              <div
                className="h-full transition-all duration-150 bg-gradient-to-r from-[#15803d] via-[#22c55e] to-[#86efac] shadow-[0_0_10px_rgba(74,222,128,0.6)]"
                style={{ width: `${signalStrength}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SYSTEM STATUS BANNER */}
      <div className="absolute top-20 sm:top-16 left-0 right-0 z-20 pointer-events-none flex justify-center px-4">
        <div className="px-4 py-1.5 rounded text-[10px] md:text-xs font-bold border bg-[#021509]/90 border-[#4ade80]/70 text-[#86efac] shadow-[0_0_16px_rgba(74,222,128,0.28)]">
          {statusBanner}
        </div>
      </div>

      {/* NEAR DOORWAY PROMPT */}
      {nearDoorway && !transitioning && (
        <div className="absolute bottom-20 left-0 right-0 z-20 pointer-events-none flex justify-center px-4">
          <div className="px-4 py-2 rounded text-xs font-bold animate-bounce bg-[#031d0c]/95 border-2 border-[#4ade80] text-[#86efac] shadow-[0_0_20px_rgba(74,222,128,0.45)]">
            WALK INTO THE PORTAL OR PRESS [E] / [A] TO ENTER
          </div>
        </div>
      )}

      {/* TRANSITION WASH INTO 3D GAME */}
      {transitioning && (
        <div className="absolute inset-0 z-40 bg-[#4ade80]/25 backdrop-blur-[2px] flex items-center justify-center animate-pulse">
          <div className="px-6 py-4 bg-[#021207]/95 border-2 border-[#86efac] text-center shadow-[0_0_40px_rgba(74,222,128,0.65)]">
            <p className="arcade-text text-xs md:text-sm text-[#86efac] phosphor-text-glow">
              ENTERING SUBTERRANEAN STRUCTURE
            </p>
            <p className="text-[10px] text-[#4ade80] mt-2 tracking-widest">
              CALIBRATING 3D PHOTONIC LIDAR...
            </p>
          </div>
        </div>
      )}

      {/* BOTTOM HUD */}
      <div className="relative z-20 p-2.5 backdrop-blur-sm flex flex-wrap items-center justify-between gap-2 text-[9px] md:text-[10px] bg-[#021207]/85 border-t border-[#22c55e]/50">
        <span className="font-bold text-[#86efac]/90">
          [A/D / ←→]: RUN • [SPACE / W]: JUMP • [SHIFT]: SPRINT • [B / ESC]: MENU
        </span>

        <button
          onClick={onSkipTo3D}
          className="px-2.5 py-1 border border-[#22c55e]/70 bg-[#031d0c] hover:bg-[#4ade80] hover:text-[#021206] text-[#86efac] font-bold transition-colors cursor-pointer"
        >
          [SKIP TO 3D LIDAR →]
        </button>
      </div>
    </>
  );
}
