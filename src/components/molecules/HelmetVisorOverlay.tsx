import React from "react";
import { PaintMode } from "@/lib/lidar3d/viewmodel";

export interface HelmetVisorOverlayProps {
  mode: PaintMode;
  isLocked: boolean;
  bloomProgress: number;
}

export function HelmetVisorOverlay({
  mode,
  isLocked,
  bloomProgress,
}: HelmetVisorOverlayProps) {
  const modeLabel =
    mode === "focus"
      ? "FOCUSED BEAM"
      : mode === "wide"
      ? "WIDE LIGHT PAINT"
      : mode === "bloom"
      ? `RESONATING ${Math.round(bloomProgress * 100)}%`
      : "STANDBY";

  const modeColor =
    mode === "focus"
      ? "text-[#fbbf24] border-[#f59e0b]/60"
      : mode === "bloom"
      ? "text-[#f472b6] border-[#f472b6]/60"
      : mode === "wide"
      ? "text-[#38bdf8] border-[#38bdf8]/60"
      : "text-[#4ade80]/80 border-[#22c55e]/40";

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] select-none overflow-hidden">
      {/* Curved Amber-Tinted Helmet Visor Edge Vignette (keeps center clear) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 78% 72% at 50% 48%, transparent 58%, rgba(245, 158, 11, 0.045) 78%, rgba(12, 18, 22, 0.55) 94%, rgba(4, 7, 10, 0.88) 100%)",
        }}
      />

      {/* Top Visor Glint Arc */}
      <div
        className="absolute top-12 left-[14%] right-[14%] h-10 rounded-[100%] opacity-25"
        style={{
          borderTop: "1.5px solid rgba(251, 191, 36, 0.45)",
          boxShadow: "inset 0 6px 14px rgba(251, 191, 36, 0.08)",
        }}
      />

      {/* Inside-Visor Corner AR Micro-Telemetry */}
      <div className="hidden sm:flex absolute top-16 left-5 flex-col gap-1 text-[8px] font-mono tracking-widest text-[#fbbf24]/70">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
          <span>HELMET SEAL: NOMINAL</span>
        </div>
        <span className="text-[#4ade80]/60">VISOR: PHOTONIC AR-04</span>
      </div>

      <div className="hidden sm:flex absolute top-16 right-5 flex-col items-end gap-1 text-[8px] font-mono tracking-widest">
        <div className={`px-2 py-0.5 rounded border bg-[#020c06]/65 ${modeColor}`}>
          BRUSH: {modeLabel}
        </div>
        {!isLocked && (
          <span className="text-[#fbbf24]/80">CLICK VIEWPORT TO ENGAGE HELMET AIM</span>
        )}
      </div>

      {/* Subtle Bottom-Right Tool Action Legend near the Hand Tool */}
      <div className="hidden md:flex absolute bottom-12 right-5 flex-col items-end gap-0.5 text-[8px] font-mono tracking-wider text-[#86efac]/65">
        <span>[LMB / SPACE] PAINT WIDE LIGHT</span>
        <span>[RMB / Q] FOCUSED BURN BEAM</span>
      </div>
    </div>
  );
}
