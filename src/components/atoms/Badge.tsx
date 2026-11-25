import React from "react";

export type BadgeVariant = "default" | "active" | "standby";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: "bg-black text-white border-white",
  active: "bg-white text-black border-white font-bold",
  standby: "bg-black text-neutral-300 border-neutral-700",
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
