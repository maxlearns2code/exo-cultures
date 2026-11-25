import React from "react";

export type BadgeVariant =
  | "default"
  | "active"
  | "standby"
  | "playable"
  | "hazard"
  | "cyan"
  | "purple"
  | "emerald"
  | "amber";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: "bg-black text-white border-white",
  active: "bg-white text-black border-white font-bold",
  standby: "bg-black text-neutral-300 border-neutral-700",
  playable: "bg-purple-600 text-white border-purple-400 font-bold",
  hazard: "bg-amber-950/80 text-amber-300 border-amber-500 font-bold",
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-400",
  purple: "bg-purple-500/20 text-purple-300 border-purple-400",
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-400",
  amber: "bg-amber-500/20 text-amber-300 border-amber-400",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded-sm ${VARIANT_STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
