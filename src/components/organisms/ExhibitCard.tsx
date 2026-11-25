"use client";

import React from "react";
import { AlienGlyphs } from "@/components/atoms/AlienGlyphs";
import { CrosshairReticle } from "@/components/atoms/CrosshairReticle";
import { ArcadeButton } from "@/components/atoms/Button";

interface ExhibitCardProps {
  title: string;
  alienGlyphs?: string;
  planetCoords?: string;
  beamLock?: string;
  onLaunch: () => void;
  className?: string;
}

export function ExhibitCard({
  title,
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
        <span className="tracking-wider uppercase">
          SECTOR 01: SUB-ABYSS
        </span>
        <span className="bg-white text-black px-1.5 py-0.2 uppercase font-bold">ONLINE</span>
      </div>

      {/* Visual Telemetry Radar Area (Pure Typographic & Wireframe) */}
      <div className="relative flex-1 w-full min-h-[190px] bg-black flex flex-col items-center justify-center p-3 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:16px_16px] opacity-60 pointer-events-none" />

        {/* Central Radar Wireframe */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <svg className="w-24 h-24 text-white/30 mb-1" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.75" />
            <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="50" cy="50" r="3" fill="white" className="animate-ping" style={{ transformOrigin: "center" }} />
            <circle cx="50" cy="50" r="2.5" fill="white" />
          </svg>
          <span className="text-[10px] font-black tracking-widest text-white uppercase">
            3D LiDAR POINT CLOUD
          </span>
          <span className="text-[8px] text-neutral-400 font-bold tracking-wider mt-0.5">
            220,000 SCAN REFLECTIONS
          </span>
        </div>

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
          <span>PLAY [A]</span>
        </ArcadeButton>
      </div>
    </div>
  );
}
