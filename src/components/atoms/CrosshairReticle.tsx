import React from "react";
import { Crosshair } from "lucide-react";

interface CrosshairReticleProps {
  className?: string;
  size?: number;
}

export function CrosshairReticle({ className = "", size = 18 }: CrosshairReticleProps) {
  return (
    <div className={`pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${className}`}>
      <Crosshair
        className="animate-spin"
        style={{
          width: size,
          height: size,
          animationDuration: "12s",
        }}
      />
    </div>
  );
}
