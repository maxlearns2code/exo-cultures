"use client";

import React from "react";
import Image from "next/image";
import { Layers, Play, Cpu, Wind, Radio } from "lucide-react";

export interface CultureInfo {
  id: string;
  name: string;
  author: string;
  title: string;
  subtitle: string;
  route: string;
  themeColor: "cyan" | "emerald" | "violet" | "amber";
  status: "READY TO PLAY" | "SHOWCASE PORTAL" | "COMING SOON";
  description: string;
  mechanics: string[];
  imageSrc?: string;
}

interface CultureCardProps {
  culture: CultureInfo;
  isSelected: boolean;
  onSelect: () => void;
  onLaunch: () => void;
  inverted?: boolean;
}

const COLOR_CONFIG = {
  cyan: {
    border: "border-cyan-400",
    borderSelected: "border-cyan-500 ring-2 ring-cyan-400/80",
    shadow: "shadow-[4px_4px_0px_#06b6d4]",
    shadowSelected: "shadow-[7px_7px_0px_#0891b2]",
    authorBg: "bg-cyan-50 text-cyan-900 border-cyan-300",
    badgePlayable: "bg-cyan-600 text-white border-cyan-700",
    badgeUpcoming: "bg-cyan-50 text-cyan-800 border-cyan-300",
    icon: "text-cyan-600",
    subtitle: "text-cyan-700",
    buttonSelected: "bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-700 shadow-[2px_2px_0px_#0891b2]",
    previewBg: "from-cyan-950 via-slate-950 to-sky-950 border-cyan-500/40",
    previewText: "text-cyan-300",
    previewSub: "text-cyan-400",
    previewIcon: "text-cyan-400",
    mechanicTag: "bg-cyan-50 text-cyan-800 border-cyan-200",
  },
  emerald: {
    border: "border-emerald-400",
    borderSelected: "border-emerald-500 ring-2 ring-emerald-400/80",
    shadow: "shadow-[4px_4px_0px_#10b981]",
    shadowSelected: "shadow-[7px_7px_0px_#059669]",
    authorBg: "bg-emerald-50 text-emerald-900 border-emerald-300",
    badgePlayable: "bg-emerald-600 text-white border-emerald-700",
    badgeUpcoming: "bg-emerald-50 text-emerald-800 border-emerald-300",
    icon: "text-emerald-600",
    subtitle: "text-emerald-700",
    buttonSelected: "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-[2px_2px_0px_#047857]",
    previewBg: "from-emerald-950 via-slate-950 to-green-950 border-emerald-500/40",
    previewText: "text-emerald-300",
    previewSub: "text-emerald-400",
    previewIcon: "text-emerald-400",
    mechanicTag: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  violet: {
    border: "border-violet-400",
    borderSelected: "border-violet-500 ring-2 ring-violet-400/80",
    shadow: "shadow-[4px_4px_0px_#8b5cf6]",
    shadowSelected: "shadow-[7px_7px_0px_#6d28d9]",
    authorBg: "bg-violet-50 text-violet-900 border-violet-300",
    badgePlayable: "bg-violet-600 text-white border-violet-700",
    badgeUpcoming: "bg-violet-50 text-violet-800 border-violet-300",
    icon: "text-violet-600",
    subtitle: "text-violet-700",
    buttonSelected: "bg-violet-600 hover:bg-violet-700 text-white border-violet-700 shadow-[2px_2px_0px_#6d28d9]",
    previewBg: "from-violet-950 via-slate-950 to-purple-950 border-violet-500/40",
    previewText: "text-violet-300",
    previewSub: "text-violet-400",
    previewIcon: "text-violet-400",
    mechanicTag: "bg-violet-50 text-violet-800 border-violet-200",
  },
  amber: {
    border: "border-amber-400",
    borderSelected: "border-amber-500 ring-2 ring-amber-400/80",
    shadow: "shadow-[4px_4px_0px_#f59e0b]",
    shadowSelected: "shadow-[7px_7px_0px_#b45309]",
    authorBg: "bg-amber-50 text-amber-900 border-amber-300",
    badgePlayable: "bg-amber-500 text-black border-amber-600 font-bold",
    badgeUpcoming: "bg-amber-50 text-amber-900 border-amber-300",
    icon: "text-amber-600",
    subtitle: "text-amber-700",
    buttonSelected: "bg-amber-500 hover:bg-amber-400 text-black border-amber-600 font-bold shadow-[2px_2px_0px_#b45309]",
    previewBg: "from-amber-950 via-slate-950 to-orange-950 border-amber-500/40",
    previewText: "text-amber-300",
    previewSub: "text-amber-400",
    previewIcon: "text-amber-400",
    mechanicTag: "bg-amber-50 text-amber-800 border-amber-200",
  },
};

export function CultureCard({
  culture,
  isSelected,
  onSelect,
  onLaunch,
  inverted = false,
}: CultureCardProps) {
  const config = COLOR_CONFIG[culture.themeColor];

  const getIcon = () => {
    const iconClass = inverted
      ? config.icon
      : isSelected
      ? "w-4 h-4 text-black"
      : "w-4 h-4 text-white";

    switch (culture.themeColor) {
      case "cyan":
        return <Layers className={`w-4 h-4 ${iconClass}`} />;
      case "emerald":
        return <Radio className={`w-4 h-4 ${iconClass}`} />;
      case "violet":
        return <Cpu className={`w-4 h-4 ${iconClass}`} />;
      case "amber":
        return <Wind className={`w-4 h-4 ${iconClass}`} />;
    }
  };

  const isPlayable = culture.status === "READY TO PLAY";

  // Card container styles
  const containerClasses = inverted
    ? isSelected
      ? `border-2 ${config.borderSelected} bg-white text-black ${config.shadowSelected} scale-[1.015] z-20`
      : `border-2 ${config.border} bg-white text-black ${config.shadow} opacity-95 hover:opacity-100 hover:scale-[1.008]`
    : isSelected
    ? "border-white bg-white text-black shadow-[6px_6px_0px_#ffffff] scale-[1.01] z-20"
    : "border-neutral-800 bg-black text-white opacity-85 hover:opacity-100 hover:border-neutral-500";

  return (
    <div
      onClick={() => {
        onSelect();
        onLaunch();
      }}
      className={`relative flex flex-col justify-between p-3.5 border-2 transition-all duration-150 cursor-pointer overflow-hidden ${containerClasses}`}
    >
      {/* Header with Author and Status Badge */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        <div className="flex items-center gap-1.5">
          <span>{getIcon()}</span>
          <span
            className={`text-[11px] font-mono font-bold tracking-widest uppercase ${
              inverted
                ? `px-1.5 py-0.5 rounded border ${config.authorBg}`
                : isSelected
                ? "text-black"
                : "text-neutral-300"
            }`}
          >
            {culture.author}
          </span>
        </div>
        <span
          className={`text-[9px] font-mono px-2 py-0.5 border uppercase font-bold tracking-wider ${
            inverted
              ? isPlayable
                ? config.badgePlayable
                : config.badgeUpcoming
              : isSelected
              ? "bg-black text-white border-black"
              : isPlayable
              ? "bg-white text-black border-white"
              : "bg-neutral-900 border-neutral-700 text-neutral-400"
          }`}
        >
          {culture.status}
        </span>
      </div>

      {/* Main Culture Title */}
      <div className="z-10 mb-2">
        <h2
          className={`text-base md:text-lg font-bold font-mono tracking-wide ${
            inverted
              ? "text-slate-900"
              : isSelected
              ? "text-black"
              : "text-white"
          }`}
        >
          {culture.title}
        </h2>
        <p
          className={`text-[11px] font-mono tracking-tight leading-snug font-semibold ${
            inverted
              ? config.subtitle
              : isSelected
              ? "text-neutral-800"
              : "text-neutral-400"
          }`}
        >
          {culture.subtitle}
        </p>
      </div>

      {/* Visual Preview Box */}
      <div
        className={`relative w-full h-24 md:h-28 rounded border-2 overflow-hidden mb-2 z-10 flex items-center justify-center ${
          inverted
            ? isSelected
              ? "border-neutral-800"
              : "border-neutral-300"
            : isSelected
            ? "bg-black border-black"
            : "bg-neutral-950 border-neutral-800"
        }`}
      >
        {culture.imageSrc ? (
          <Image
            src={culture.imageSrc}
            alt={culture.title}
            fill
            className="object-cover opacity-100 hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center text-center p-2 bg-gradient-to-br ${config.previewBg}`}>
            <Radio className={`w-6 h-6 ${config.previewIcon} mb-1.5 animate-pulse`} />
            <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${config.previewText}`}>
              AWAITING TRANSMISSION
            </span>
            <span className={`text-[8px] font-mono ${config.previewSub} mt-0.5`}>
              Portal Chamber Primed
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Description */}
      <p
        className={`text-[10px] leading-relaxed mb-3 line-clamp-2 z-10 ${
          inverted
            ? "text-neutral-700 font-medium"
            : isSelected
            ? "text-neutral-900 font-medium"
            : "text-neutral-300/90"
        }`}
      >
        {culture.description}
      </p>

      {/* Footer launch prompt */}
      <div
        className={`mt-auto pt-2 border-t-2 flex items-center justify-between z-10 ${
          inverted
            ? isSelected
              ? "border-neutral-400"
              : "border-neutral-200"
            : isSelected
            ? "border-black/30"
            : "border-neutral-800/80"
        }`}
      >
        <div className="flex items-center gap-1 text-[10px] font-mono">
          <span
            className={`font-bold ${
              inverted
                ? "text-neutral-600"
                : isSelected
                ? "text-neutral-700"
                : "text-neutral-500"
            }`}
          >
            STATUS:
          </span>
          <span
            className={
              inverted
                ? `font-bold px-1.5 py-0.5 border text-[9px] ${config.mechanicTag}`
                : isSelected
                ? "text-black font-bold"
                : "text-neutral-300"
            }
          >
            {culture.mechanics[0]}
          </span>
        </div>

        {isSelected ? (
          <div
            className={`flex items-center gap-1 font-mono font-bold text-[10px] px-2.5 py-1 border transition-colors ${
              inverted ? config.buttonSelected : "bg-black text-white"
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isPlayable ? "PRESS [A] PLAY" : "PRESS [A] VIEW"}</span>
          </div>
        ) : (
          <span className={`text-[10px] font-mono font-bold ${inverted ? config.subtitle : "text-neutral-500"}`}>
            SELECT →
          </span>
        )}
      </div>
    </div>
  );
}
