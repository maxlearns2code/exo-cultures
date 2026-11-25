"use client";

import React from "react";
import { CalibrationBar, AttractionFXMode, AlienHubDesign } from "@/components/molecules/CalibrationBar";
import { ExitHoldProgress } from "@/components/molecules/ExitHoldProgress";
import { CRTEffects } from "@/components/atoms/CRTEffects";

export type { AttractionFXMode, AlienHubDesign };

interface CRTOverlayProps {
  exitHoldProgress?: number;
  hasGamepad?: boolean;
  fxMode?: AttractionFXMode;
  onToggleFX?: () => void;
  activeFXType?: "flash" | "glitch" | null;
  theme?: "black" | "white";
  hubDesign?: AlienHubDesign;
  onToggleHubDesign?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
}

export function CRTOverlay({
  exitHoldProgress = 0,
  hasGamepad = false,
  fxMode,
  onToggleFX,
  activeFXType = null,
  theme = "black",
  hubDesign,
  onToggleHubDesign,
  onClose,
  children,
}: CRTOverlayProps) {
  const isWhite = theme === "white";

  return (
    <div className="crt-viewport bg-black">
      {/* 4:3 Aspect Ratio Display Box */}
      <div
        className={`crt-aspect-box relative transition-colors duration-200 ${
          isWhite ? "bg-white text-black border-l border-r border-neutral-300" : "bg-black text-white"
        } ${activeFXType === "flash" ? "fx-phosphor-flash" : ""} ${
          activeFXType === "glitch" ? "fx-cryo-glitch" : ""
        }`}
      >
        <CRTEffects activeFXType={activeFXType} />

        {/* Main Content inside 6% CRT Safe-Zone */}
        <div className={`crt-safe-zone ${isWhite ? "bg-white text-black" : "bg-black text-white"}`}>
          {children}
        </div>

        {/* Universal Exit Progress Countdown Bar */}
        <ExitHoldProgress progress={exitHoldProgress} theme={theme} />

        {/* Top-Left: Close Button (mirrors Top-Right: theme, dual, sound) */}
        {onClose && (
          <div className="absolute top-2 left-2 z-[150] flex items-center gap-1.5 font-mono select-none">
            <button
              onClick={onClose}
              className={`px-2 py-0.5 text-[9px] font-bold border transition-all cursor-pointer ${
                isWhite
                  ? "bg-white hover:bg-neutral-100 text-black border-black shadow-[2px_2px_0px_#000000]"
                  : "bg-black hover:bg-white hover:text-black text-white border-white shadow-[2px_2px_0px_#ffffff]"
              }`}
              title="Close [B / ESC]"
            >
              <span>[B / ESC] CLOSE</span>
            </button>
          </div>
        )}

        {/* Top-Right Quick Calibration: Sound + Attraction FX + Theme Switcher */}
        <CalibrationBar
          hasGamepad={hasGamepad}
          fxMode={fxMode}
          onToggleFX={onToggleFX}
          hubDesign={hubDesign}
          onToggleHubDesign={onToggleHubDesign}
          theme={theme}
        />
      </div>
    </div>
  );
}
