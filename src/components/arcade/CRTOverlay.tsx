"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Gamepad2 } from "lucide-react";
import { ArcadeAudio } from "@/utils/audio";

export type AttractionFXMode = "dual" | "flash" | "glitch" | "off";
export type AlienHubDesign = "translator" | "gateway" | "specimen";

interface CRTOverlayProps {
  exitHoldProgress?: number;
  hasGamepad?: boolean;
  fxMode?: AttractionFXMode;
  onToggleFX?: () => void;
  activeFXType?: "flash" | "glitch" | null;
  theme?: "black" | "white";
  hubDesign?: AlienHubDesign;
  onToggleHubDesign?: () => void;
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
  children,
}: CRTOverlayProps) {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = ArcadeAudio.toggleMute();
    setIsMuted(muted);
  };

  const isWhite = theme === "white";

  const getThemeButtonText = (design?: AlienHubDesign) => {
    switch (design) {
      case "translator":
        return "THEME: ARCADE";
      case "gateway":
        return "THEME: GALLERY";
      case "specimen":
        return "THEME: PHOSPHOR";
      default:
        return "THEME: ARCADE";
    }
  };

  return (
    <div className="crt-viewport bg-black">
      {/* 4:3 Aspect Ratio Display Box (Inverts to Pure White when theme === "white") */}
      <div
        className={`crt-aspect-box relative transition-colors duration-200 ${
          isWhite ? "bg-white text-black border-l border-r border-neutral-300" : "bg-black text-white"
        } ${activeFXType === "flash" ? "fx-phosphor-flash" : ""} ${
          activeFXType === "glitch" ? "fx-cryo-glitch" : ""
        }`}
      >
        {/* Cryo Scanline Sweep Beam when glitching */}
        {activeFXType === "glitch" && <div className="fx-scanline-bar" />}

        {/* Main Content inside 6% CRT Safe-Zone */}
        <div className={`crt-safe-zone ${isWhite ? "bg-white text-black" : "bg-black text-white"}`}>
          {children}
        </div>

        {/* Universal Exit Progress Indicator (SELECT + START held) */}
        {exitHoldProgress > 0 && (
          <div className="absolute inset-x-0 bottom-6 z-[200] flex flex-col items-center justify-center pointer-events-none">
            <div
              className={`px-4 py-2 flex flex-col items-center gap-1 shadow-2xl border-2 ${
                isWhite ? "bg-white border-black text-black" : "bg-black border-white text-white"
              }`}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider animate-pulse">
                HOLD TO RETURN TO HUB ({Math.ceil((1 - exitHoldProgress) * 2)}s)
              </span>
              <div
                className={`w-48 h-3 rounded-full overflow-hidden border ${
                  isWhite ? "bg-neutral-100 border-black" : "bg-black border-white"
                }`}
              >
                <div
                  className={`h-full transition-all duration-75 ${isWhite ? "bg-black" : "bg-white"}`}
                  style={{ width: `${exitHoldProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Top-Right Quick Calibration: Sound + Attraction FX Button */}
        <div
          className={`absolute top-2 right-3 z-[150] flex items-center gap-2 text-[10px] ${
            isWhite ? "text-black" : "text-white"
          }`}
        >
          {hasGamepad && (
            <div
              className={`hidden sm:flex items-center gap-1 px-2 py-0.5 font-mono border ${
                isWhite ? "bg-white border-black text-black" : "bg-black border-white text-white"
              }`}
            >
              <Gamepad2 className={`w-3 h-3 ${isWhite ? "text-black" : "text-white"}`} />
              <span>CONTROLLER READY</span>
            </div>
          )}

          {/* Recalbox Theme Mode Switcher Button (Arcade / Gallery / Phosphor) */}
          {onToggleHubDesign && hubDesign && (
            <button
              onClick={onToggleHubDesign}
              aria-label="Switch Recalbox Theme"
              className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase transition-colors cursor-pointer border shadow-sm ${
                isWhite
                  ? "bg-white text-black border-neutral-400 hover:border-black hover:bg-neutral-100"
                  : "bg-black text-white border-neutral-700 hover:border-white hover:bg-white hover:text-black"
              }`}
              title={`Recalbox Emulator Theme: ${getThemeButtonText(hubDesign)} (Click to switch)`}
            >
              <span>{getThemeButtonText(hubDesign)}</span>
            </button>
          )}

          {/* Attraction Eye-Catcher FX Mode Switcher Button */}
          {onToggleFX && fxMode && (
            <button
              onClick={onToggleFX}
              aria-label="Toggle Attraction Mode"
              className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase transition-colors cursor-pointer border ${
                isWhite
                  ? "bg-white text-black border-neutral-400 hover:border-black hover:bg-neutral-100"
                  : "bg-black text-white border-neutral-700 hover:border-white hover:bg-white hover:text-black"
              }`}
              title={`Attraction FX Mode: ${fxMode.toUpperCase()} (Click to switch / test)`}
            >
              <span>FX: {fxMode}</span>
            </button>
          )}

          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            aria-label="Toggle Sound"
            className={`p-1 rounded transition-colors cursor-pointer border ${
              isWhite
                ? "bg-white text-black border-neutral-400 hover:border-black hover:bg-neutral-100"
                : "bg-black text-white border-neutral-700 hover:border-white hover:bg-white hover:text-black"
            }`}
            title="Toggle Sound"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <Volume2 className={`w-3.5 h-3.5 ${isWhite ? "text-black" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
