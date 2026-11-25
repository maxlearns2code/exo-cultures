import React from "react";

interface TelemetryValueProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  className?: string;
}

export function TelemetryValue({
  label,
  value,
  highlight = false,
  className = "",
}: TelemetryValueProps) {
  return (
    <div className={`font-mono text-[9px] flex items-center justify-between gap-2 ${className}`}>
      <span className="text-neutral-500 font-bold uppercase">{label}:</span>
      <span className={highlight ? "text-cyan-300 font-bold" : "text-neutral-200"}>
        {value}
      </span>
    </div>
  );
}
