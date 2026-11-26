import React from "react";
import { AlienHubDesign } from "./CalibrationBar";

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
  theme?: AlienHubDesign;
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
  theme = "translator",
}: GameHUDProps) {
  const isBrutalist = theme === "gateway";
  const isPhosphor = theme === "specimen";

  // Dynamic Theme Palette
  const themeStyles = {
    topBarBg: isPhosphor ? "bg-[#021207]/90" : "bg-black/85",
    topBar: isBrutalist
      ? "border-b-2 border-white/40"
      : isPhosphor
      ? "border-b-2 border-[#22c55e]/60"
      : "border-b-2 border-purple-500/40",
    titleColor: isBrutalist
      ? "text-white"
      : isPhosphor
      ? "arcade-text phosphor-text-glow"
      : "text-purple-200 drop-shadow-[0_0_6px_#c084fc]",
    badgeColor: isBrutalist
      ? "bg-neutral-800 text-white border-neutral-500"
      : isPhosphor
      ? "bg-[#031f0d] text-[#4ade80] border-[#4ade80]/70"
      : "bg-purple-900/60 text-purple-300 border-purple-400",
    subColor: isBrutalist
      ? "text-neutral-400"
      : isPhosphor
      ? "text-[#22c55e]/80"
      : "text-purple-400",
    meterBorder: isBrutalist
      ? "border-white/60"
      : isPhosphor
      ? "border-[#22c55e]/60 bg-[#010a04]"
      : "border-purple-500/60",
    meterGradient: isBrutalist
      ? "bg-gradient-to-r from-neutral-500 via-neutral-300 to-white"
      : isPhosphor
      ? "bg-gradient-to-r from-[#15803d] via-[#22c55e] to-[#86efac] shadow-[0_0_10px_rgba(74,222,128,0.6)]"
      : "bg-gradient-to-r from-purple-500 via-pink-500 to-amber-300",
    meterText: isBrutalist
      ? "text-white"
      : isPhosphor
      ? "text-[#4ade80]"
      : "text-purple-300",
    meterPct: isPhosphor ? "text-[#86efac]" : "text-amber-300",
    reticleDot: isBrutalist
      ? "bg-white shadow-[0_0_8px_#ffffff]"
      : isPhosphor
      ? "bg-[#4ade80] shadow-[0_0_8px_#4ade80]"
      : "bg-cyan-400 shadow-[0_0_8px_#00f0ff]",
    reticleLine: isBrutalist
      ? "bg-white/50"
      : isPhosphor
      ? "bg-[#4ade80]/50"
      : "bg-cyan-400/40",
    systemBanner: isBrutalist
      ? "bg-black/90 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      : isPhosphor
      ? "bg-[#021509]/95 border-[#4ade80] text-[#86efac] shadow-[0_0_18px_rgba(74,222,128,0.35)]"
      : "bg-black/90 border-purple-400/80 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    bloomPrompt: isPhosphor
      ? "bg-[#031d0c]/95 border-2 border-[#4ade80] text-[#86efac] shadow-[0_0_20px_rgba(74,222,128,0.45)]"
      : "bg-pink-950/90 border-2 border-pink-400 text-white shadow-[0_0_20px_#ff5fa8]",
    bottomBar: isBrutalist
      ? "bg-black/75 border-t border-white/30"
      : isPhosphor
      ? "bg-[#021207]/85 border-t border-[#22c55e]/50"
      : "bg-black/75 border-t border-purple-500/40",
    mappedColor: isBrutalist
      ? "text-white"
      : isPhosphor
      ? "text-[#4ade80] phosphor-text-glow"
      : "text-cyan-300",
  };

  return (
    <>
      {/* TOP HUD: Echolocation & Mate Summoning Telemetry */}
      <div className={`relative z-50 flex flex-wrap items-center justify-between gap-2 pt-8 sm:pt-2.5 p-2.5 md:p-3 backdrop-blur-sm select-none ${themeStyles.topBarBg} ${themeStyles.topBar}`}>
        <div className="flex items-center gap-2.5 sm:pl-24">
          <div>
            <h1 className={`text-[10px] md:text-xs font-bold tracking-wider uppercase flex items-center gap-2 ${themeStyles.titleColor}`}>
              <span>ECHOLOCATION ARCHIVE // 3D LIDAR</span>
              <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${themeStyles.badgeColor}`}>
                {isBrutalist ? "BRUTALIST" : isPhosphor ? "PHOSPHOR" : "CHAMBER III"}
              </span>
            </h1>
            <p className={`text-[9px] tracking-widest hidden sm:block mt-0.5 ${themeStyles.subColor}`}>
              3D PHOTONIC LIDAR • 220,000 SCAN POINTS MAX
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:pr-44">
          {/* Lure / Mate Summon Progress Meter */}
          <div className="flex flex-col items-end gap-1 min-w-[120px] md:min-w-[180px]">
            <div className="flex items-center justify-between w-full text-[9px] font-bold">
              <span className={themeStyles.meterText}>
                <span>MATE SUMMON:</span>
              </span>
              <span className={themeStyles.meterPct}>{lureProgress}%</span>
            </div>
            <div className={`w-full h-2 rounded bg-black/80 border overflow-hidden ${themeStyles.meterBorder}`}>
              <div
                className={`h-full transition-all duration-150 ${themeStyles.meterGradient}`}
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
            <div className={`w-1.5 h-1.5 rounded-full ${themeStyles.reticleDot}`} />
            <div className={`absolute w-6 h-[1px] ${themeStyles.reticleLine}`} />
            <div className={`absolute h-6 w-[1px] ${themeStyles.reticleLine}`} />
          </div>
        </div>
      )}

      {/* SYSTEM ANNOUNCEMENT BANNER */}
      {systemMessage && (
        <div className="absolute top-20 sm:top-16 left-0 right-0 z-30 pointer-events-none flex justify-center px-4">
          <div className={`px-4 py-1.5 rounded text-xs font-bold border animate-pulse ${themeStyles.systemBanner}`}>
            {systemMessage}
          </div>
        </div>
      )}

      {/* HOLD [E] / [A] TO BLOOM PROMPT */}
      {promptVisible && (
        <div className="absolute bottom-28 left-0 right-0 z-30 pointer-events-none flex justify-center px-4">
          <div className={`px-4 py-2 rounded text-xs font-bold animate-bounce ${themeStyles.bloomPrompt}`}>
            <span>STAND CLOSE &amp; HOLD [E] OR ARCADE [A] TO BLOOM FLOWER</span>
          </div>
        </div>
      )}

      {/* BOTTOM HUD: Flower & Spore Status + Diagnostic Counter */}
      <div className={`relative z-20 p-2.5 backdrop-blur-sm select-none flex flex-wrap items-center justify-between gap-2 text-[10px] ${themeStyles.bottomBar}`}>
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

            let badgeColor = isPhosphor
              ? "bg-[#010b04] text-[#22c55e]/75 border-[#14532d]"
              : "bg-neutral-900 text-neutral-400 border-neutral-700";
            if (fl.state === 2) {
              badgeColor = isBrutalist
                ? "bg-white text-black border-white"
                : isPhosphor
                ? "bg-[#22c55e] text-[#021206] border-[#86efac] shadow-[0_0_10px_rgba(74,222,128,0.4)]"
                : "bg-pink-950/80 text-pink-300 border-pink-500";
            } else if (fl.state === 1) {
              badgeColor = isBrutalist
                ? "bg-neutral-800 text-white border-white animate-pulse"
                : isPhosphor
                ? "bg-[#052e16] text-[#86efac] border-[#4ade80] animate-pulse"
                : "bg-amber-950/80 text-amber-300 border-amber-500 animate-pulse";
            } else if (fl.state === 3) {
              badgeColor = isPhosphor
                ? "bg-[#010903] text-[#166534] border-[#14532d]/60"
                : "bg-neutral-900 text-neutral-500 border-neutral-700";
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
        <div className={`flex items-center gap-3 text-[9px] ${isPhosphor ? "text-[#22c55e]/80" : "text-neutral-400"}`}>
          <span className={`hidden sm:inline font-bold ${isPhosphor ? "text-[#86efac]/90" : "text-neutral-300"}`}>
            [ESC]: UNLOCK • [B]: MENU • [WASD / SCROLL]: MOVE
          </span>
          <span className={`hidden sm:inline ${isPhosphor ? "text-[#14532d]" : "text-neutral-600"}`}>|</span>
          <span>
            VIRAL SPORES:{" "}
            <strong
              className={
                activeSporesCount > 0
                  ? isPhosphor
                    ? "text-[#86efac] animate-pulse"
                    : "text-red-400 animate-pulse"
                  : isPhosphor
                  ? "text-[#4ade80]"
                  : "text-neutral-300"
              }
            >
              {activeSporesCount} ACTIVE
            </strong>
          </span>
          <span>|</span>
          <span className={`font-bold ${themeStyles.mappedColor}`}>
            {mappedPoints.toLocaleString()} PTS MAPPED
          </span>
        </div>
      </div>
    </>
  );
}
