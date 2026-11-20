"use client";

import React from "react";
import { CRTOverlay } from "@/components/arcade/CRTOverlay";
import { ArcadeHUD, ArcadeControlsFooter } from "@/components/arcade/ArcadeHUD";
import { useArcadeInput } from "@/hooks/useArcadeInput";
import { Radio, ArrowLeft, Terminal, Sparkles } from "lucide-react";

interface EmptyPortalViewProps {
  author: string;
  themeColor: "emerald" | "violet" | "amber" | "cyan";
  route: string;
  onReturnToHub: () => void;
}

export function EmptyPortalView({
  author,
  themeColor,
  route,
  onReturnToHub,
}: EmptyPortalViewProps) {
  const { exitHoldProgress, hasGamepad } = useArcadeInput(undefined, onReturnToHub);

  const colors = {
    emerald: {
      text: "text-emerald-400",
      border: "border-emerald-500/50",
      bgBadge: "bg-emerald-950/60 text-emerald-300 border-emerald-500/40",
      glow: "rgba(16, 185, 129, 0.25)",
      accent: "#10b981",
    },
    violet: {
      text: "text-violet-400",
      border: "border-violet-500/50",
      bgBadge: "bg-violet-950/60 text-violet-300 border-violet-500/40",
      glow: "rgba(168, 85, 247, 0.25)",
      accent: "#a855f7",
    },
    amber: {
      text: "text-amber-400",
      border: "border-amber-500/50",
      bgBadge: "bg-amber-950/60 text-amber-300 border-amber-500/40",
      glow: "rgba(255, 183, 3, 0.25)",
      accent: "#ffb703",
    },
    cyan: {
      text: "text-cyan-400",
      border: "border-cyan-500/50",
      bgBadge: "bg-cyan-950/60 text-cyan-300 border-cyan-500/40",
      glow: "rgba(0, 240, 255, 0.25)",
      accent: "#00f0ff",
    },
  }[themeColor];

  return (
    <CRTOverlay exitHoldProgress={exitHoldProgress} hasGamepad={hasGamepad}>
      <ArcadeHUD
        title={`PORTAL: ${author.toUpperCase()}`}
        subtitle="EXO-CULTURES EXHIBITION CABINET"
        showBackButton
      />

      {/* Main Empty Portal Chamber */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none bg-neutral-950/60 rounded-lg border-2 border-neutral-800 relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at center, ${colors.accent} 0%, transparent 70%)`,
          }}
        />

        {/* Pulsing Dormant Portal Pedestal */}
        <div className="relative mb-5 z-10">
          <div
            className="w-24 h-24 rounded-full border-4 border-dashed animate-spin flex items-center justify-center"
            style={{ borderColor: colors.accent, animationDuration: "16s" }}
          >
            <div className="w-16 h-16 rounded-full border-2 border-neutral-700 flex items-center justify-center bg-black/80">
              <Radio className={`w-8 h-8 ${colors.text} animate-pulse`} />
            </div>
          </div>
          <div
            className="absolute -inset-4 rounded-full blur-xl opacity-40 pointer-events-none"
            style={{ backgroundColor: colors.accent }}
          />
        </div>

        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono font-bold uppercase tracking-wider mb-3 z-10 ${colors.bgBadge}`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
          <span>PORTAL DORMANT • AWAITING TRANSMISSION</span>
        </div>

        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2 z-10">
          CIVILIZATION OF {author.toUpperCase()}
        </h2>

        <p className="text-xs font-mono text-neutral-400 max-w-md leading-relaxed mb-6 z-10">
          This portal chamber is primed and calibrated for {author}&apos;s alien culture. The dimensional uplink will activate as soon as the design assets and game module are delivered.
        </p>

        {/* Developer Integration Drop-in Note */}
        <div className="w-full max-w-md bg-black/70 border-2 border-neutral-800 rounded p-3 text-left font-mono text-[10px] text-neutral-400 space-y-1.5 z-10">
          <div className="flex items-center gap-1.5 text-neutral-300 font-bold border-b border-neutral-800 pb-1">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTEGRATION SPEC FOR {author.toUpperCase()}</span>
          </div>
          <div className="text-neutral-400">
            • <strong className="text-neutral-300">File target:</strong> <code className="text-cyan-300">src/app/games/{author.toLowerCase()}/page.tsx</code>
          </div>
          <div className="text-neutral-400">
            • <strong className="text-neutral-300">Accepted formats:</strong> Vanilla Canvas, PixiJS, Phaser, React, or Godot 4 Web
          </div>
          <div className="text-neutral-400">
            • <strong className="text-neutral-300">Target display:</strong> 4:3 Aspect Ratio (640×480 CRT safe-zone)
          </div>
        </div>

        {/* Return Button */}
        <button
          onClick={onReturnToHub}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-neutral-900 border-2 border-neutral-700 hover:border-cyan-400 text-neutral-200 hover:text-white font-mono font-bold text-xs rounded transition-colors z-10"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>RETURN TO ARCADE HUB [B]</span>
        </button>
      </div>

      <ArcadeControlsFooter />
    </CRTOverlay>
  );
}
