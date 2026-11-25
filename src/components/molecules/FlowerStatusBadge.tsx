import React from "react";

interface FlowerStatusBadgeProps {
  name: string;
  state: number; // 0: searching, 1: charged, 2: blooming, 3: withered
  hp: number;
}

export function FlowerStatusBadge({ name, state, hp }: FlowerStatusBadgeProps) {
  const statusLabel =
    state === 0
      ? "SEARCHING"
      : state === 1
      ? "CHARGED"
      : state === 2
      ? `BLOOM ${hp}%`
      : "WITHERED";

  const badgeColor =
    state === 2
      ? "bg-pink-950/80 text-pink-300 border-pink-500 shadow-[0_0_8px_#ff5fa8]"
      : state === 1
      ? "bg-amber-950/80 text-amber-300 border-amber-500 animate-pulse"
      : state === 3
      ? "bg-neutral-900 text-neutral-500 border-neutral-700"
      : "bg-neutral-900 text-neutral-400 border-neutral-700";

  return (
    <div className={`px-2 py-0.5 rounded border text-[9px] font-mono font-bold ${badgeColor}`}>
      <span>{name}: </span>
      <span>{statusLabel}</span>
    </div>
  );
}
