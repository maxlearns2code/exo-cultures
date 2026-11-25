import React from "react";
import { TelemetryValue } from "@/components/atoms/TelemetryValue";

interface TelemetryCardProps {
  data: {
    sector?: string;
    coordinates?: string;
    grav?: string;
    beamLock?: string;
    hazardClass?: string;
    specimenCode?: string;
  };
  theme?: "black" | "white" | "emerald";
  className?: string;
}

export function TelemetryCard({ data, theme = "black", className = "" }: TelemetryCardProps) {
  const isWhite = theme === "white";
  const isEmerald = theme === "emerald";

  return (
    <div
      className={`p-2.5 border font-mono text-[9px] rounded-sm space-y-1 ${
        isWhite
          ? "bg-neutral-100 border-black text-black"
          : isEmerald
          ? "bg-black/80 border-emerald-500/50 text-emerald-300"
          : "bg-black/80 border-white/30 text-white"
      } ${className}`}
    >
      {data.sector && <TelemetryValue label="SECTOR" value={data.sector} highlight />}
      {data.coordinates && <TelemetryValue label="COORDS" value={data.coordinates} />}
      {data.grav && <TelemetryValue label="ENVIRONMENT" value={data.grav} />}
      {data.beamLock && <TelemetryValue label="CARRIER" value={data.beamLock} highlight />}
      {data.hazardClass && <TelemetryValue label="HAZARD" value={data.hazardClass} />}
    </div>
  );
}
