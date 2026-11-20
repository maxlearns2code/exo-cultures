"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Gamepad2 } from "lucide-react";
import { ArcadeAudio } from "@/utils/audio";

interface CRTOverlayProps {
  exitHoldProgress?: number;
  hasGamepad?: boolean;
  children: React.ReactNode;
}

export function CRTOverlay({ exitHoldProgress = 0, hasGamepad = false, children }: CRTOverlayProps) {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = ArcadeAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="crt-viewport">
      {/* 4:3 Aspect Ratio Display Box (Centered on wide monitors, full on 4:3 CRT) */}
      <div className="crt-aspect-box">
        {/* Main Content inside 6% CRT Safe-Zone */}
        <div className="crt-safe-zone">
          {children}
        </div>

        {/* Universal Exit Progress Indicator (SELECT + START held) */}
        {exitHoldProgress > 0 && (
          <div className="absolute inset-x-0 bottom-6 z-[200] flex flex-col items-center justify-center pointer-events-none">
            <div className="bg-black/90 border-2 border-red-500 rounded px-4 py-2 flex flex-col items-center gap-1 shadow-2xl">
              <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-wider animate-pulse">
                HOLD TO RETURN TO HUB ({Math.ceil((1 - exitHoldProgress) * 2)}s)
              </span>
              <div className="w-48 h-3 bg-neutral-900 border border-red-500/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-75"
                  style={{ width: `${exitHoldProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Top-Right Quick Calibration / Toggle Controls */}
        <div className="absolute top-2 right-3 z-[150] flex items-center gap-2 text-[10px] text-neutral-400">
          {hasGamepad && (
            <div className="flex items-center gap-1 bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded">
              <Gamepad2 className="w-3 h-3 text-cyan-400" />
              <span>8BitDo READY</span>
            </div>
          )}
          <button
            onClick={handleToggleSound}
            aria-label="Toggle Sound"
            className="hover:text-cyan-300 bg-black/60 border border-neutral-700 hover:border-cyan-400 p-1 rounded transition-colors"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>
        </div>
      </div>
    </div>
  );
}
