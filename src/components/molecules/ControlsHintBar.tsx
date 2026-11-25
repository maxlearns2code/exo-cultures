import React from "react";

interface ControlsHintBarProps {
  theme?: "black" | "white" | "neon" | "phosphor";
  className?: string;
}

export function ControlsHintBar({ theme = "black", className = "" }: ControlsHintBarProps) {
  const isWhite = theme === "white";

  return (
    <footer
      className={`w-full pt-1.5 border-t-2 text-[10px] font-mono flex flex-wrap items-center justify-between select-none ${
        isWhite ? "border-black text-neutral-800" : "border-white/20 text-neutral-400"
      } ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className={isWhite ? "text-black font-bold" : "text-white font-bold"}>[A]</span>
        <span>Play Game</span>
        <span className="text-neutral-500">|</span>
        <span className={isWhite ? "text-black font-bold" : "text-white font-bold"}>[Y]</span>
        <span>Dossier</span>
        <span className="text-neutral-500">|</span>
        <span className={isWhite ? "text-black font-bold" : "text-white font-bold"}>[T]</span>
        <span>Switch Theme</span>
        <span className="text-neutral-500">|</span>
        <span className={isWhite ? "text-black font-bold" : "text-white font-bold"}>[X]</span>
        <span>Preview</span>
      </div>
      <div className={isWhite ? "text-black font-bold" : "text-neutral-300"}>
        HYPER ISLAND WEEK 51, 2026
      </div>
    </footer>
  );
}
