import React from "react";

interface CRTEffectsProps {
  activeFXType?: "flash" | "glitch" | null;
}

export function CRTEffects({ activeFXType = null }: CRTEffectsProps) {
  return (
    <>
      {/* Glitch Scanline Sweep Beam */}
      {activeFXType === "glitch" && <div className="fx-scanline-bar" />}
    </>
  );
}
