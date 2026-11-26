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
  theme?: "black" | "white" | "phosphor";
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
  const isPhosphor = theme === "phosphor";

  return (
    <div className="crt-viewport bg-black">
      {/* Full-Screen Responsive Display Box */}
      <div
        className={`crt-aspect-box relative transition-colors duration-200 ${
          isWhite
            ? "bg-white text-black"
            : isPhosphor
            ? "phosphor-crt-screen text-[#4ade80]"
            : "bg-black text-white"
        } ${activeFXType === "flash" ? "fx-phosphor-flash" : ""} ${
          activeFXType === "glitch" ? "fx-cryo-glitch" : ""
        }`}
      >
        <CRTEffects activeFXType={activeFXType} />

        {/* Phosphor CRT Scanlines & Vignette Overlay */}
        {isPhosphor && (
          <div className="absolute inset-0 phosphor-crt-scanlines pointer-events-none z-[150]" />
        )}

        {/* Main Content inside 6% CRT Safe-Zone */}
        <div
          className={`crt-safe-zone ${
            isWhite
              ? "bg-white text-black"
              : isPhosphor
              ? "bg-transparent text-[#4ade80]"
              : "bg-black text-white"
          }`}
        >
          {children}
        </div>

        {/* Universal Exit Progress Countdown Bar */}
        <ExitHoldProgress progress={exitHoldProgress} theme={theme} />

        {/* Top-Left: Close Button (mirrors Top-Right: theme, dual, sound) */}
        {onClose && (
          <div className="absolute top-2 left-2 z-[300] flex items-center gap-1.5 font-mono select-none">
            <button
              onClick={onClose}
              className={`px-2 py-0.5 text-[9px] font-bold border transition-all cursor-pointer ${
                isWhite
                  ? "bg-white hover:bg-neutral-100 text-black border-black shadow-[2px_2px_0px_#000000]"
                  : isPhosphor
                  ? "bg-[#021509]/85 hover:bg-[#4ade80] hover:text-[#021206] text-[#4ade80] border-[#22c55e]/60 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                  : "bg-black hover:bg-white hover:text-black text-white border-white shadow-[2px_2px_0px_#ffffff]"
              }`}
              title="Close"
            >
              <span>[✕ CLOSE]</span>
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
