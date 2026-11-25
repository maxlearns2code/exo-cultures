"use client";

import React from "react";
import Image from "next/image";
import { Play, Radio } from "lucide-react";
import { AlienGlyphs } from "@/components/atoms/AlienGlyphs";
import { CrosshairReticle } from "@/components/atoms/CrosshairReticle";
import { ArcadeButton } from "@/components/atoms/Button";

interface ExhibitCardProps {
  title: string;
  imageSrc?: string;
  alienGlyphs?: string;
  planetCoords?: string;
  beamLock?: string;
  onLaunch: () => void;
  className?: string;
}

export function ExhibitCard({
  title,
  imageSrc = "/assets/martin/echoes-in-the-dark.svg",
  alienGlyphs = "☲0x45⋔⎎▲",
  planetCoords = "05h 14m • RIGEL-VII",
  beamLock = "15kHz RGB LOCKED",
  onLaunch,
  className = "",
}: ExhibitCardProps) {
  return (
    <div
      onClick={onLaunch}
      className={`relative aspect-square w-full max-w-[260px] border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden cursor-pointer group transition-transform hover:scale-[1.02] font-mono select-none ${className}`}
    >
      {/* Top Cap */}
      <div className="p-1.5 bg-black text-white flex items-center justify-between text-[9px] font-bold z-10 relative">
        <span className="flex items-center gap-1">
          <Radio className="w-3 h-3 animate-pulse text-purple-400" />
          SECTOR 01: SUB-ABYSS
        </span>
        <span className="bg-white text-black px-1.5 py-0.2 uppercase">ONLINE</span>
      </div>

      {/* Artwork Area */}
      <div className="relative flex-1 w-full min-h-[190px] bg-black">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Crosshair Overlay */}
        <div className="absolute top-1.5 right-1.5 text-white z-10 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <CrosshairReticle size={16} />
        </div>

        {/* Native Alien Glyphs */}
        <div className="absolute top-1.5 left-1.5 z-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none">
          <AlienGlyphs glyphs={alienGlyphs} count={4} vertical />
        </div>

        {/* Bottom Telemetry Strip */}
        <div className="absolute bottom-1 left-1.5 right-1.5 z-10 pointer-events-none bg-black/90 text-white border border-white/40 px-1.5 py-0.5 flex items-center justify-between text-[8px]">
          <span className="font-bold truncate">{planetCoords.split("•")[0]}</span>
          <span className="text-neutral-300 text-[7px]">{beamLock}</span>
        </div>
      </div>

      {/* Card Footer Plinth */}
      <div className="p-2 bg-white border-t-2 border-black flex items-center justify-between">
        <div>
          <h3 className="text-xs font-black uppercase text-black">{title}</h3>
          <p className="text-[8px] text-neutral-600 font-bold">PROTOTYPE: 3D THREE.JS</p>
        </div>
        <ArcadeButton
          variant="brutalist"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onLaunch();
          }}
          className="py-1 px-3"
        >
          <Play className="w-2.5 h-2.5 fill-current" />
          <span>PLAY [A]</span>
        </ArcadeButton>
      </div>
    </div>
  );
}
