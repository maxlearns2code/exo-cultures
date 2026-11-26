import React from "react";

export type ButtonVariant = "phosphor-primary" | "phosphor-secondary";

interface ArcadeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  "phosphor-primary":
    "bg-[#4ade80] hover:bg-[#86efac] text-[#021206] border-2 border-[#86efac] shadow-[0_0_20px_rgba(74,222,128,0.45)] font-bold active:translate-x-0.5 active:translate-y-0.5",
  "phosphor-secondary":
    "bg-[#021609]/80 hover:bg-[#22c55e]/20 text-[#4ade80] hover:text-[#86efac] border-2 border-[#22c55e]/70 hover:border-[#4ade80] shadow-[0_0_14px_rgba(34,197,94,0.2)] font-bold active:translate-x-0.5 active:translate-y-0.5",
};

const SIZE_CLASSES = {
  sm: "px-2 py-1 text-[10px]",
  md: "px-3.5 py-1.5 text-xs",
  lg: "px-6 py-3 text-xs md:text-sm tracking-wider",
};

export function ArcadeButton({
  variant = "phosphor-primary",
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
