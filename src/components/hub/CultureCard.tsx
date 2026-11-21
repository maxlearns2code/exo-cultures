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

export function CultureCard({
  culture,
  isSelected,
  onSelect,
  onLaunch,
  inverted = false,
}: CultureCardProps) {
  const getIcon = () => {
    const iconClass = inverted
      ? isSelected
        ? "w-4 h-4 text-white"
        : "w-4 h-4 text-black"
      : isSelected
      ? "w-4 h-4 text-black"
      : "w-4 h-4 text-white";

    switch (culture.themeColor) {
      case "cyan":
        return <Layers className={iconClass} />;
      case "emerald":
        return <Radio className={iconClass} />;
      case "violet":
        return <Cpu className={iconClass} />;
      case "amber":
        return <Wind className={iconClass} />;
    }
  };

  const isPlayable = culture.status === "READY TO PLAY";

  // Card container styles
  const containerClasses = inverted
    ? isSelected
      ? "border-2 border-black bg-black text-white shadow-[6px_6px_0px_#000000] scale-[1.01] z-20"
      : "border-2 border-neutral-300 bg-white text-black opacity-95 hover:opacity-100 hover:border-black shadow-[3px_3px_0px_#d4d4d4]"
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
                ? isSelected
                  ? "text-white"
                  : "text-neutral-800"
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
              ? isSelected
                ? "bg-white text-black border-white"
                : isPlayable
                ? "bg-black text-white border-black"
                : "bg-neutral-100 border-neutral-300 text-neutral-600"
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
              ? isSelected
                ? "text-white"
                : "text-black"
              : isSelected
              ? "text-black"
              : "text-white"
          }`}
        >
          {culture.title}
        </h2>
        <p
          className={`text-[11px] font-mono tracking-tight leading-snug ${
            inverted
              ? isSelected
                ? "text-neutral-300"
                : "text-neutral-600"
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
              ? "bg-neutral-900 border-neutral-700"
              : "bg-neutral-100 border-neutral-300"
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
            className="object-cover grayscale contrast-150 opacity-90 hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-2">
            <Radio className="w-6 h-6 text-neutral-500 mb-1.5 animate-pulse" />
            <span
              className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                inverted && !isSelected ? "text-neutral-700" : "text-neutral-300"
              }`}
            >
              AWAITING TRANSMISSION
            </span>
            <span className="text-[8px] font-mono text-neutral-500 mt-0.5">
              Portal Chamber Primed
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      {/* Description */}
      <p
        className={`text-[10px] leading-relaxed mb-3 line-clamp-2 z-10 ${
          inverted
            ? isSelected
              ? "text-neutral-200"
              : "text-neutral-700 font-medium"
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
              ? "border-neutral-700"
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
                ? isSelected
                  ? "text-neutral-400"
                  : "text-neutral-500"
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
                ? isSelected
                  ? "text-white font-bold"
                  : "text-neutral-800 font-bold"
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
            className={`flex items-center gap-1 font-mono font-bold text-[10px] px-2.5 py-0.5 shadow ${
              inverted ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isPlayable ? "PRESS [A] PLAY" : "PRESS [A] VIEW"}</span>
          </div>
        ) : (
          <span className="text-[10px] font-mono text-neutral-500 font-bold">SELECT</span>
        )}
      </div>
    </div>
  );
}
