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
    <div className="crt-viewport bg-black">
      {/* 4:3 Aspect Ratio Display Box (Pure Black #000000) */}
      <div className="crt-aspect-box bg-black">
        {/* Main Content inside 6% CRT Safe-Zone */}
        <div className="crt-safe-zone bg-black">
          {children}
        </div>

        {/* Universal Exit Progress Indicator (SELECT + START held) */}
        {exitHoldProgress > 0 && (
          <div className="absolute inset-x-0 bottom-6 z-[200] flex flex-col items-center justify-center pointer-events-none">
            <div className="bg-black border-2 border-white px-4 py-2 flex flex-col items-center gap-1 shadow-2xl">
              <span className="text-white font-mono text-xs font-bold uppercase tracking-wider animate-pulse">
                HOLD TO RETURN TO HUB ({Math.ceil((1 - exitHoldProgress) * 2)}s)
              </span>
              <div className="w-48 h-3 bg-black border border-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{ width: `${exitHoldProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Top-Right Quick Calibration / Sound Button (Monochrome White/Black) */}
        <div className="absolute top-2 right-3 z-[150] flex items-center gap-2 text-[10px] text-white">
          {hasGamepad && (
            <div className="flex items-center gap-1 bg-black border border-white text-white px-2 py-0.5 font-mono">
              <Gamepad2 className="w-3 h-3 text-white" />
              <span>CONTROLLER READY</span>
            </div>
          )}
          <button
            onClick={handleToggleSound}
            aria-label="Toggle Sound"
            className="hover:bg-white hover:text-black text-white bg-black border border-neutral-700 hover:border-white p-1 rounded transition-colors"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-500" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
}
