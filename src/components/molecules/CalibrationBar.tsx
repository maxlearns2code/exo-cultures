import React, { useState } from "react";
import { ArcadeAudio } from "@/utils/audio";

export type AttractionFXMode = "dual" | "flash" | "glitch" | "off";

interface CalibrationBarProps {
  hasGamepad?: boolean;
  fxMode?: AttractionFXMode;
  onToggleFX?: () => void;
}

export function CalibrationBar({
  hasGamepad = false,
  fxMode,
  onToggleFX,
}: CalibrationBarProps) {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = ArcadeAudio.toggleMute();
    setIsMuted(muted);
  };

  const buttonClass =
    "bg-[#021509]/85 hover:bg-[#4ade80] hover:text-[#021206] text-[#4ade80] border-[#22c55e]/60 shadow-[0_0_10px_rgba(34,197,94,0.2)]";

  return (
    <div className="absolute top-2 right-2 z-[300] flex items-center gap-1.5 font-mono select-none">
      {/* Gamepad status indicator */}
      {hasGamepad && (
        <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 text-[9px] border font-bold uppercase bg-[#021509]/85 border-[#22c55e]/60 text-[#4ade80]">
          <span>[STICK ACTIVE]</span>
        </div>
      )}

      {/* Attraction FX Button */}
      {onToggleFX && fxMode && (
        <button
          onClick={onToggleFX}
          className={`px-2 py-0.5 text-[9px] font-bold border transition-all cursor-pointer ${buttonClass}`}
          title="Toggle Screen Attraction FX"
        >
          <span>FX: {fxMode.toUpperCase()}</span>
        </button>
      )}

      {/* Mute/Sound Button */}
      <button
        onClick={handleToggleSound}
        className={`px-2 py-0.5 text-[9px] font-bold border transition-colors cursor-pointer ${buttonClass}`}
        title={isMuted ? "Unmute audio" : "Mute audio"}
      >
        <span>{isMuted ? "[MUTED]" : "[AUDIO ON]"}</span>
      </button>
    </div>
  );
}
