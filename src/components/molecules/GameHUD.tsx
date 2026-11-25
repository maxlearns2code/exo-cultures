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
    topBar: isBrutalist
      ? "border-b-2 border-white/40"
      : isPhosphor
      ? "border-b-2 border-emerald-500/60"
      : "border-b-2 border-purple-500/40",
    titleColor: isBrutalist
      ? "text-white"
      : isPhosphor
      ? "text-emerald-300 drop-shadow-[0_0_6px_#10b981]"
      : "text-purple-200 drop-shadow-[0_0_6px_#c084fc]",
    badgeColor: isBrutalist
      ? "bg-neutral-800 text-white border-neutral-500"
      : isPhosphor
      ? "bg-emerald-950 text-emerald-300 border-emerald-500"
      : "bg-purple-900/60 text-purple-300 border-purple-400",
    subColor: isBrutalist
      ? "text-neutral-400"
      : isPhosphor
      ? "text-emerald-500"
      : "text-purple-400",
    meterBorder: isBrutalist
      ? "border-white/60"
      : isPhosphor
      ? "border-emerald-500/60"
      : "border-purple-500/60",
    meterGradient: isBrutalist
      ? "bg-gradient-to-r from-neutral-500 via-neutral-300 to-white"
      : isPhosphor
      ? "bg-gradient-to-r from-emerald-600 via-emerald-400 to-amber-300"
      : "bg-gradient-to-r from-purple-500 via-pink-500 to-amber-300",
    meterText: isBrutalist
      ? "text-white"
      : isPhosphor
      ? "text-emerald-300"
      : "text-purple-300",
    reticleDot: isBrutalist
      ? "bg-white shadow-[0_0_8px_#ffffff]"
      : isPhosphor
      ? "bg-emerald-400 shadow-[0_0_8px_#10b981]"
      : "bg-cyan-400 shadow-[0_0_8px_#00f0ff]",
    reticleLine: isBrutalist
      ? "bg-white/50"
      : isPhosphor
      ? "bg-emerald-400/50"
      : "bg-cyan-400/40",
    systemBanner: isBrutalist
      ? "bg-black/90 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      : isPhosphor
      ? "bg-black/90 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
      : "bg-black/90 border-purple-400/80 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    bottomBar: isBrutalist
      ? "border-t border-white/30"
      : isPhosphor
      ? "border-t border-emerald-500/50"
      : "border-t border-purple-500/40",
    mappedColor: isBrutalist
      ? "text-white"
      : isPhosphor
      ? "text-emerald-400"
      : "text-cyan-300",
  };

  return (
    <>
      {/* TOP HUD: Echolocation & Mate Summoning Telemetry */}
      <div className={`relative z-50 flex items-center justify-between p-2.5 md:p-3 bg-black/85 backdrop-blur-sm select-none ${themeStyles.topBar}`}>
        <div className="flex items-center gap-2.5 pl-24 sm:pl-28">
          <div>
            <h1 className={`text-xs md:text-sm font-bold tracking-wider uppercase flex items-center gap-1.5 ${themeStyles.titleColor}`}>
              <span>ECHOLOCATION ARCHIVE // 3D LIDAR</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded border ${themeStyles.badgeColor}`}>
                {isBrutalist ? "BRUTALIST" : isPhosphor ? "PHOSPHOR" : "CHAMBER III"}
              </span>
            </h1>
            <p className={`text-[9px] tracking-widest hidden sm:block ${themeStyles.subColor}`}>
              3D PHOTONIC LIDAR • 220,000 SCAN POINTS MAX
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pr-36 sm:pr-48">
          {/* Lure / Mate Summon Progress Meter */}
          <div className="flex flex-col items-end gap-1 min-w-[120px] md:min-w-[180px]">
            <div className="flex items-center justify-between w-full text-[9px] font-bold">
              <span className={themeStyles.meterText}>
                <span>MATE SUMMON:</span>
              </span>
              <span className="text-amber-300">{lureProgress}%</span>
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
        <div className="absolute top-16 left-0 right-0 z-30 pointer-events-none flex justify-center px-4">
          <div className={`px-4 py-1.5 rounded text-xs font-bold border animate-pulse ${themeStyles.systemBanner}`}>
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
      <div className={`relative z-20 p-2.5 bg-black/75 backdrop-blur-sm select-none flex flex-wrap items-center justify-between text-[10px] ${themeStyles.bottomBar}`}>
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

            let badgeColor = "bg-neutral-900 text-neutral-400 border-neutral-700";
            if (fl.state === 2) {
              badgeColor = isBrutalist
                ? "bg-white text-black border-white"
                : isPhosphor
                ? "bg-emerald-950/90 text-emerald-200 border-emerald-400"
                : "bg-pink-950/80 text-pink-300 border-pink-500";
            } else if (fl.state === 1) {
              badgeColor = isBrutalist
                ? "bg-neutral-800 text-white border-white animate-pulse"
                : isPhosphor
                ? "bg-amber-950/80 text-amber-300 border-amber-500 animate-pulse"
                : "bg-amber-950/80 text-amber-300 border-amber-500 animate-pulse";
            } else if (fl.state === 3) {
              badgeColor = "bg-neutral-900 text-neutral-500 border-neutral-700";
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
          <span className={`font-bold ${themeStyles.mappedColor}`}>
            {mappedPoints.toLocaleString()} PTS MAPPED
          </span>
        </div>
      </div>
    </>
  );
}
