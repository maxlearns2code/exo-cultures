import React from "react";

interface ExitHoldProgressProps {
  progress: number;
}

export function ExitHoldProgress({ progress }: ExitHoldProgressProps) {
  if (progress <= 0) return null;

  return (
    <div className="absolute inset-x-0 bottom-6 z-[200] flex flex-col items-center justify-center pointer-events-none">
      <div className="px-4 py-2 flex flex-col items-center gap-1 shadow-2xl border-2 bg-[#021509] border-[#4ade80] text-[#4ade80]">
        <span className="font-mono text-xs font-bold uppercase tracking-wider animate-pulse">
          HOLD TO RETURN TO HUB ({Math.ceil((1 - progress) * 2)}s)
        </span>
        <div className="w-48 h-3 rounded-full overflow-hidden border bg-[#010b04] border-[#4ade80]">
          <div
            className="h-full transition-all duration-75 bg-[#4ade80]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
