"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Play, Compass, Cpu, Wind, Radio } from "lucide-react";

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
}

export function CultureCard({ culture, isSelected, onSelect, onLaunch }: CultureCardProps) {
  const getIcon = () => {
    switch (culture.themeColor) {
      case "cyan":
        return <Sparkles className="w-4 h-4 text-white" />;
      case "emerald":
        return <Compass className="w-4 h-4 text-white" />;
      case "violet":
        return <Cpu className="w-4 h-4 text-white" />;
      case "amber":
        return <Wind className="w-4 h-4 text-white" />;
    }
  };

  const isPlayable = culture.status === "READY TO PLAY";

  return (
    <div
      onClick={() => {
        onSelect();
        onLaunch();
      }}
      className={`relative flex flex-col justify-between p-3.5 border-2 transition-all duration-150 cursor-pointer overflow-hidden ${
        isSelected
          ? "border-white bg-white text-black shadow-[6px_6px_0px_#ffffff] scale-[1.01] z-20"
          : "border-neutral-800 bg-black text-white opacity-85 hover:opacity-100 hover:border-neutral-500"
      }`}
    >
      {/* Header with Author and Status Badge */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        <div className="flex items-center gap-1.5">
          <span className={isSelected ? "text-black" : "text-white"}>{getIcon()}</span>
          <span
            className={`text-[11px] font-mono font-bold tracking-widest uppercase ${
              isSelected ? "text-black" : "text-neutral-300"
            }`}
          >
            {culture.author}
          </span>
        </div>
        <span
          className={`text-[9px] font-mono px-2 py-0.5 border uppercase font-bold tracking-wider ${
            isSelected
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
        <h2 className={`text-base md:text-lg font-bold font-mono tracking-wide ${isSelected ? "text-black" : "text-white"}`}>
          {culture.title}
        </h2>
        <p
          className={`text-[11px] font-mono tracking-tight leading-snug ${
            isSelected ? "text-neutral-800" : "text-neutral-400"
          }`}
        >
          {culture.subtitle}
        </p>
      </div>

      {/* Visual Preview Box (Black & White Negative Grayscale) */}
      <div
        className={`relative w-full h-24 md:h-28 rounded border-2 overflow-hidden mb-2 z-10 flex items-center justify-center ${
          isSelected ? "bg-black border-black" : "bg-neutral-950 border-neutral-800"
        }`}
      >
        {culture.imageSrc ? (
          <Image
            src={culture.imageSrc}
            alt={culture.title}
            fill
            className="object-cover grayscale contrast-150 opacity-90 hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-2">
            <Radio className="w-6 h-6 text-neutral-500 mb-1.5 animate-pulse" />
            <span className="text-[10px] font-mono text-neutral-300 uppercase font-bold tracking-wider">
              AWAITING TRANSMISSION
            </span>
            <span className="text-[8px] font-mono text-neutral-500 mt-0.5">
              Portal Chamber Primed
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      {/* Description */}
      <p
        className={`text-[10px] leading-relaxed mb-3 line-clamp-2 z-10 ${
          isSelected ? "text-neutral-900 font-medium" : "text-neutral-300/90"
        }`}
      >
        {culture.description}
      </p>

      {/* Footer launch prompt */}
      <div
        className={`mt-auto pt-2 border-t-2 flex items-center justify-between z-10 ${
          isSelected ? "border-black/30" : "border-neutral-800/80"
        }`}
      >
        <div className="flex items-center gap-1 text-[10px] font-mono">
          <span className={isSelected ? "text-neutral-700 font-bold" : "text-neutral-500 font-bold"}>
            STATUS:
          </span>
          <span className={isSelected ? "text-black font-bold" : "text-neutral-300"}>
            {culture.mechanics[0]}
          </span>
        </div>
        {isSelected ? (
          <div className="flex items-center gap-1 bg-black text-white font-mono font-bold text-[10px] px-2.5 py-0.5 shadow">
            <Play className="w-3 h-3 fill-current" />
            <span>{isPlayable ? "PRESS [A] PLAY" : "PRESS [A] VIEW"}</span>
          </div>
        ) : (
          <span className="text-[10px] font-mono text-neutral-500">SELECT</span>
        )}
      </div>
    </div>
  );
}
