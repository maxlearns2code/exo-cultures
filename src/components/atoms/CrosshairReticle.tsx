import React from "react";

interface CrosshairReticleProps {
  className?: string;
  size?: number;
}

export function CrosshairReticle({ className = "", size = 18 }: CrosshairReticleProps) {
  return (
    <div className={`pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-spin"
        style={{ animationDuration: "12s" }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
      </svg>
    </div>
  );
}
