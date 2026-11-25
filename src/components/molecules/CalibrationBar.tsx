import React, { useState } from "react";
import { ArcadeAudio } from "@/utils/audio";

export type AttractionFXMode = "dual" | "flash" | "glitch" | "off";
export type AlienHubDesign = "translator" | "gateway" | "specimen";

interface CalibrationBarProps {
  hasGamepad?: boolean;
  fxMode?: AttractionFXMode;
  onToggleFX?: () => void;
  hubDesign?: AlienHubDesign;
  onToggleHubDesign?: () => void;
  theme?: "black" | "white";
}

export function CalibrationBar({
  hasGamepad = false,
  fxMode,
  onToggleFX,
  hubDesign,
  onToggleHubDesign,
  theme = "black",
}: CalibrationBarProps) {
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
    <div className="absolute top-2 right-2 z-[300] flex items-center gap-1.5 font-mono select-none">
      {/* Gamepad status indicator */}
      {hasGamepad && (
        <div
          className={`hidden sm:flex items-center gap-1 px-2 py-0.5 text-[9px] border font-bold uppercase ${
            isWhite ? "bg-white border-black text-black" : "bg-black border-white text-white"
          }`}
        >
          <span>[STICK ACTIVE]</span>
        </div>
      )}

      {/* Recalbox Theme Quick Switcher Button */}
      {onToggleHubDesign && hubDesign && (
        <button
          onClick={onToggleHubDesign}
          className={`px-2 py-0.5 text-[9px] font-bold border transition-all cursor-pointer ${
            isWhite
              ? "bg-white hover:bg-neutral-100 text-black border-black shadow-[2px_2px_0px_#000000]"
              : "bg-black hover:bg-white hover:text-black text-white border-white shadow-[2px_2px_0px_#ffffff]"
          }`}
          title="Switch Recalbox Theme [T]"
        >
          <span>[{getThemeButtonText(hubDesign)}]</span>
        </button>
      )}

      {/* Attraction FX Button */}
      {onToggleFX && fxMode && (
        <button
          onClick={onToggleFX}
          className={`px-2 py-0.5 text-[9px] font-bold border transition-all cursor-pointer ${
            isWhite
              ? "bg-white hover:bg-neutral-100 text-black border-black shadow-[2px_2px_0px_#000000]"
              : "bg-black hover:bg-white hover:text-black text-white border-white shadow-[2px_2px_0px_#ffffff]"
          }`}
          title="Toggle Screen Attraction FX"
        >
          <span>FX: {fxMode.toUpperCase()}</span>
        </button>
      )}

      {/* Mute/Sound Button */}
      <button
        onClick={handleToggleSound}
        className={`px-2 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${
          isWhite
            ? "bg-white hover:bg-neutral-100 text-black border-black shadow-[2px_2px_0px_#000000]"
            : "bg-black hover:bg-white hover:text-black text-white border-white shadow-[2px_2px_0px_#ffffff]"
        }`}
        title={isMuted ? "Unmute audio" : "Mute audio"}
      >
        <span>{isMuted ? "[MUTED]" : "[AUDIO ON]"}</span>
      </button>
    </div>
  );
}
