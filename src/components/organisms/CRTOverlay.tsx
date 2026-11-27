"use client";

import React from "react";
import { CalibrationBar, AttractionFXMode } from "@/components/molecules/CalibrationBar";
import { ExitHoldProgress } from "@/components/molecules/ExitHoldProgress";
import { CRTEffects } from "@/components/atoms/CRTEffects";

export type { AttractionFXMode };

interface CRTOverlayProps {
  exitHoldProgress?: number;
  hasGamepad?: boolean;
  fxMode?: AttractionFXMode;
  onToggleFX?: () => void;
  activeFXType?: "flash" | "glitch" | null;
  onClose?: () => void;
  children: React.ReactNode;
}

export function CRTOverlay({
  exitHoldProgress = 0,
  hasGamepad = false,
  fxMode,
  onToggleFX,
  activeFXType = null,
  onClose,
  children,
}: CRTOverlayProps) {
  return (
    <div className="crt-viewport bg-black">
      {/* Full-Screen Responsive Green Phosphor CRT Display Box */}
      <div
        className={`crt-aspect-box relative transition-colors duration-200 phosphor-crt-screen text-[#4ade80] ${
          activeFXType === "flash" ? "fx-phosphor-flash" : ""
        } ${activeFXType === "glitch" ? "fx-cryo-glitch" : ""}`}
      >
        <CRTEffects activeFXType={activeFXType} />

        {/* Subtle CRT Edge Vignette Overlay (no horizontal scanlines) */}
        <div className="absolute inset-0 phosphor-crt-scanlines pointer-events-none z-[150]" />

        {/* Main Content inside Safe-Zone */}
        <div className="crt-safe-zone bg-transparent text-[#4ade80]">
          {children}
        </div>

        {/* Universal Exit Progress Countdown Bar */}
        <ExitHoldProgress progress={exitHoldProgress} />

        {/* Top-Left: Close Button */}
        {onClose && (
          <div className="absolute top-2 left-2 z-[300] flex items-center gap-1.5 font-mono select-none">
            <button
              onClick={onClose}
              className="px-2 py-0.5 text-[9px] font-bold border transition-all cursor-pointer bg-[#021509]/85 hover:bg-[#4ade80] hover:text-[#021206] text-[#4ade80] border-[#22c55e]/60 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
              title="Close"
            >
              <span>[✕ CLOSE]</span>
            </button>
          </div>
        )}

        {/* Top-Right Quick Calibration: Attraction FX + Sound */}
        <CalibrationBar
          hasGamepad={hasGamepad}
          fxMode={fxMode}
          onToggleFX={onToggleFX}
        />
      </div>
    </div>
  );
}
