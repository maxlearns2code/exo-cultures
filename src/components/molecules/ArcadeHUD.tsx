import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ArcadeHUDProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  score?: number;
  energy?: number;
}

export function ArcadeHUD({
  title = "EXO-CULTURES",
  subtitle = "ARCADE EXHIBITION",
  showBackButton = false,
  score,
  energy,
}: ArcadeHUDProps) {
  return (
    <header className="w-full flex items-center justify-between border-b-2 border-white/20 pb-2 mb-3 select-none font-mono">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-black border-2 border-white hover:bg-white hover:text-black text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[B] HUB</span>
          </Link>
        )}
        <div>
          <h1 className="text-sm md:text-base font-bold tracking-wider text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            {title}
          </h1>
          <p className="text-[10px] text-neutral-400 tracking-widest">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        {energy !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-400 font-bold uppercase">WARMTH:</span>
            <div className="w-24 h-3 bg-black border border-white overflow-hidden">
              <div
                className={`h-full transition-all duration-150 ${
                  energy < 25 ? "bg-red-500 animate-pulse" : energy < 50 ? "bg-amber-400" : "bg-white"
                }`}
                style={{ width: `${Math.max(0, Math.min(100, energy))}%` }}
              />
            </div>
          </div>
        )}

        {score !== undefined && (
          <div className="flex items-center gap-1.5 bg-neutral-950 px-2.5 py-1 border border-white">
            <span className="text-[10px] text-neutral-400 font-bold">SCORE:</span>
            <span className="text-white font-bold tracking-widest">
              {score.toString().padStart(5, "0")}
            </span>
          </div>
        )}

        <div className="hidden sm:flex items-center gap-1 text-[10px] text-white border border-white px-2 py-0.5 font-bold">
          <span className="w-1.5 h-1.5 bg-white animate-ping inline-block" />
          <span>FREE PLAY</span>
        </div>
      </div>
    </header>
  );
}
