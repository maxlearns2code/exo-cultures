"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Play, ShieldAlert, Cpu, Wind, Compass } from "lucide-react";

export interface CultureInfo {
  id: string;
  name: string;
  author: string;
  title: string;
  subtitle: string;
  route: string;
  themeColor: "cyan" | "emerald" | "violet" | "amber";
  status: "READY TO PLAY" | "SHOWCASE PORTAL";
  description: string;
  mechanics: string[];
  imageSrc?: string;
}

interface CultureCardProps {
  culture: CultureInfo;
  isSelected: boolean;
  onSelect: () => void;
  onLaunch: () => void;
}

export function CultureCard({ culture, isSelected, onSelect, onLaunch }: CultureCardProps) {
  const colorMap = {
    cyan: {
      border: "border-cyan-400",
      borderInactive: "border-cyan-900/40",
      glow: "shadow-[0_0_24px_rgba(0,240,255,0.45)]",
      text: "text-cyan-400",
      bg: "bg-cyan-950/30",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400/50",
      accent: "#00f0ff",
    },
    emerald: {
      border: "border-emerald-400",
      borderInactive: "border-emerald-900/40",
      glow: "shadow-[0_0_24px_rgba(16,185,129,0.45)]",
      text: "text-emerald-400",
      bg: "bg-emerald-950/30",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50",
      accent: "#10b981",
    },
    violet: {
      border: "border-violet-400",
      borderInactive: "border-violet-900/40",
      glow: "shadow-[0_0_24px_rgba(168,85,247,0.45)]",
      text: "text-violet-400",
      bg: "bg-violet-950/30",
      badge: "bg-violet-500/20 text-violet-300 border-violet-400/50",
      accent: "#a855f7",
    },
    amber: {
      border: "border-amber-400",
      borderInactive: "border-amber-900/40",
      glow: "shadow-[0_0_24px_rgba(255,183,3,0.45)]",
      text: "text-amber-400",
      bg: "bg-amber-950/30",
      badge: "bg-amber-500/20 text-amber-300 border-amber-400/50",
      accent: "#ffb703",
    },
  }[culture.themeColor];

  const getIcon = () => {
    switch (culture.themeColor) {
      case "cyan":
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case "emerald":
        return <Compass className="w-4 h-4 text-emerald-400" />;
      case "violet":
        return <Cpu className="w-4 h-4 text-violet-400" />;
      case "amber":
        return <Wind className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div
      onClick={() => {
        onSelect();
        onLaunch();
      }}
      className={`relative flex flex-col justify-between p-3.5 rounded-lg border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
        isSelected
          ? `${colorMap.border} ${colorMap.glow} ${colorMap.bg} scale-[1.02] z-20`
          : `${colorMap.borderInactive} bg-neutral-950/60 opacity-80 hover:opacity-100 hover:border-neutral-700`
      }`}
    >
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ backgroundColor: colorMap.accent }}
      />

      {/* Header with Author and Status Badge */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        <div className="flex items-center gap-1.5">
          {getIcon()}
          <span className="text-[11px] font-mono font-bold tracking-widest text-neutral-300 uppercase">
            {culture.author}
          </span>
        </div>
        <span
          className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${colorMap.badge}`}
        >
          {culture.status}
        </span>
      </div>

      {/* Main Culture Title */}
      <div className="z-10 mb-2">
        <h2 className={`text-base md:text-lg font-bold font-mono tracking-wide ${colorMap.text}`}>
          {culture.title}
        </h2>
        <p className="text-[11px] text-neutral-400 font-mono tracking-tight leading-snug">
          {culture.subtitle}
        </p>
      </div>

      {/* Visual Preview Box */}
      <div className="relative w-full h-24 md:h-28 bg-black/60 rounded border-2 border-neutral-800 overflow-hidden mb-2 z-10 flex items-center justify-center">
        {culture.imageSrc ? (
          <Image
            src={culture.imageSrc}
            alt={culture.title}
            fill
            className="object-cover opacity-75 hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-2">
            <div className="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center mb-1 animate-spin" style={{ borderColor: colorMap.accent }}>
              {getIcon()}
            </div>
            <span className="text-[9px] font-mono text-neutral-400 uppercase">
              {culture.name}
            </span>
          </div>
        )}

        {/* Scanline texture over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      {/* Description */}
      <p className="text-[10px] text-neutral-300/90 leading-relaxed mb-3 line-clamp-2 z-10">
        {culture.description}
      </p>

      {/* Footer launch prompt */}
      <div className="mt-auto pt-2 border-t-2 border-neutral-800/80 flex items-center justify-between z-10">
        <div className="flex items-center gap-1 text-[10px] font-mono">
          <span className="text-neutral-500 font-bold">TECH:</span>
          <span className="text-neutral-400">{culture.mechanics[0]}</span>
        </div>
        {isSelected ? (
          <div className="flex items-center gap-1 bg-white text-black font-mono font-bold text-[10px] px-2 py-0.5 rounded animate-pulse shadow-md">
            <Play className="w-3 h-3 fill-current" />
            <span>PRESS [A]</span>
          </div>
        ) : (
          <span className="text-[10px] font-mono text-neutral-500">SELECT</span>
        )}
      </div>
    </div>
  );
}
