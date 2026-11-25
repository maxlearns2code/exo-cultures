import React from "react";

export type ButtonVariant = "primary" | "secondary" | "brutalist" | "neon" | "ghost";

interface ArcadeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-white hover:bg-neutral-200 text-black border-2 border-white shadow-[4px_4px_0px_#888888] font-bold active:translate-x-0.5 active:translate-y-0.5",
  secondary:
    "bg-black hover:bg-neutral-900 text-white border-2 border-white/60 hover:border-white font-bold active:translate-x-0.5 active:translate-y-0.5",
  brutalist:
    "bg-black hover:bg-neutral-800 text-white border-2 border-black shadow-[3px_3px_0px_#000000] font-black active:translate-x-0.5 active:translate-y-0.5",
  neon:
    "bg-purple-600 hover:bg-purple-500 text-white border border-purple-300 shadow-[0_0_15px_#c084fc] font-bold",
  ghost:
    "bg-transparent hover:bg-white/10 text-neutral-300 hover:text-white border border-transparent font-medium",
};

const SIZE_CLASSES = {
  sm: "px-2 py-1 text-[10px]",
  md: "px-3.5 py-1.5 text-xs",
  lg: "px-6 py-3 text-xs md:text-sm tracking-wider",
};

export function ArcadeButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ArcadeButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider transition-all cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
