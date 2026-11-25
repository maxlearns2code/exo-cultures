import React, { useState } from "react";
import { Volume2, VolumeX, Gamepad2 } from "lucide-react";
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
    <div className="absolute top-2 right-2 z-[150] flex items-center gap-1.5 font-mono select-none">
      {/* 8BitDo Gamepad indicator */}
      {hasGamepad && (
        <div
          className={`hidden sm:flex items-center gap-1 px-2 py-0.5 text-[9px] border font-bold uppercase ${
            isWhite ? "bg-white border-black text-black" : "bg-black/80 border-green-500 text-green-400"
          }`}
        >
          <Gamepad2 className="w-3 h-3 text-green-400 animate-pulse" />
          <span>ARCADE STICK ACTIVE</span>
        </div>
      )}

      {/* Recalbox Theme Quick Switcher Button */}
      {onToggleHubDesign && hubDesign && (
        <button
          onClick={onToggleHubDesign}
          className={`px-2 py-0.5 text-[9px] font-bold border transition-all cursor-pointer ${
            isWhite
              ? "bg-white hover:bg-neutral-100 text-black border-black shadow-[2px_2px_0px_#000000]"
              : "bg-black/80 hover:bg-neutral-900 text-cyan-300 border-cyan-400/80 shadow-[0_0_8px_rgba(0,240,255,0.4)]"
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
              : "bg-black/80 hover:bg-neutral-900 text-yellow-300 border-yellow-400/80 shadow-[0_0_8px_rgba(250,204,21,0.4)]"
          }`}
          title="Toggle Screen Attraction FX"
        >
          <span>FX: {fxMode.toUpperCase()}</span>
        </button>
      )}

      {/* Mute/Sound Button */}
      <button
        onClick={handleToggleSound}
        className={`p-1 border transition-colors cursor-pointer ${
          isWhite
            ? "bg-white hover:bg-neutral-100 text-black border-black shadow-[2px_2px_0px_#000000]"
            : "bg-black/80 hover:bg-neutral-900 text-white border-white/40 hover:border-white"
        }`}
        title={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-red-400" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-white" />
        )}
      </button>
    </div>
  );
}
