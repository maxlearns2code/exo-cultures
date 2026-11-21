"use client";

import React from "react";
import Image from "next/image";
import { Layers, Play, Cpu, Wind, Radio, Crosshair } from "lucide-react";
import { AlienHubDesign } from "@/components/arcade/CRTOverlay";

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

export interface CultureAlienData {
  alienGlyphs: string;
  alienName: string;
  // Design 1: Translator
  fragmentCode: string;
  fragmentTitle: string;
  alienAudience: string;
  // Design 2: Gateway
  sectorId: string;
  planetCoords: string;
  environmentalTelemetry: string;
  beamLock: string;
  // Design 3: Specimen
  specimenCode: string;
  hazardClass: string;
  sampleType: string;
  containmentProtocol: string;
}

export const ALIEN_CULTURE_METADATA: Record<string, CultureAlienData> = {
  "chromatic-symbiosis": {
    alienGlyphs: "⍙⟒⌰☊⍜⋔⎎",
    alienName: "SYM-KROMA // 0x43",
    fragmentCode: "FRAGMENT 01",
    fragmentTitle: "SUB-ICE SENSORY PIGMENTS",
    alienAudience: "Perceives ultrasonic sound as bioluminescent pigment",
    sectorId: "SECTOR 01: SATURN TRENCH",
    planetCoords: "84°S 112°W • 9.8 AU",
    environmentalTelemetry: "GRAV: 0.82G • 120MPa • HYDRO-AMMONIAC",
    beamLock: "15kHz RGB LOCKED",
    specimenCode: "SPECIMEN EX-01",
    hazardClass: "CLASS 0 [BIO-STABLE]",
    sampleType: "CHROMATIC LIGHT REFRACTION SPORES",
    containmentProtocol: "ISOLATION CELL: SUB-ZERO TANK",
  },
  aisah: {
    alienGlyphs: "◈⬡☵⏁⊑⌇",
    alienName: "RESONA-II // 0x41",
    fragmentCode: "FRAGMENT 02",
    fragmentTitle: "BIOLUMINESCENT ACOUSTIC CHAMBER",
    alienAudience: "Visual acoustics for beings with 7 faceted eyes",
    sectorId: "SECTOR 02: GLIESE-667C",
    planetCoords: "17h 19m • 23.6 LY",
    environmentalTelemetry: "GRAV: 1.15G • 0.98 atm • NITRO-METHANE",
    beamLock: "SIGNAL STANDBY",
    specimenCode: "SPECIMEN EX-02",
    hazardClass: "CLASS 1 [OPTICAL HARMONIC]",
    sampleType: "PHOTONIC RESONANCE SPORES",
    containmentProtocol: "ISOLATION CELL: CHAMBER CALIBRATING",
  },
  martin: {
    alienGlyphs: "☲0x45⋔⎎▲",
    alienName: "SYNAP-III // 0x4D",
    fragmentCode: "FRAGMENT 03",
    fragmentTitle: "CYBERNETIC SYNAPSE RELIC",
    alienAudience: "Collective neural prayers of techno-evangelist hive",
    sectorId: "SECTOR 03: RIGEL-VII ORBIT",
    planetCoords: "05h 14m • 860 LY",
    environmentalTelemetry: "GRAV: 0.00G (ZERO-G) • SYNTHETIC LOGIC",
    beamLock: "QUANTUM UPLINK",
    specimenCode: "SPECIMEN EX-03",
    hazardClass: "CLASS 2 [SYNAPTIC INTERFACE]",
    sampleType: "SYNTHETIC NEURAL BUS ARCHIVE",
    containmentProtocol: "ISOLATION CELL: HARDWARE DOCKED",
  },
  mana: {
    alienGlyphs: "☊⍜0x58⬡0x4F",
    alienName: "AEROS-IV // 0x4E",
    fragmentCode: "FRAGMENT 04",
    fragmentTitle: "GASEOUS CANOPY CONDENSER",
    alienAudience: "Thermal streetfood vapors for gaseous non-corporeal entities",
    sectorId: "SECTOR 04: WASP-12B CANOPY",
    planetCoords: "06h 30m • EXOSPHERE",
    environmentalTelemetry: "GRAV: 0.38G • SUPERHEATED GAS VAPORS",
    beamLock: "SIGNAL STANDBY",
    specimenCode: "SPECIMEN EX-04",
    hazardClass: "CLASS 1 [AEROSOL DIFFUSION]",
    sampleType: "VAPOROUS NUTRIENT CONDENSATE",
    containmentProtocol: "ISOLATION CELL: HERMETIC HOOD 04",
  },
};

interface CultureCardProps {
  culture: CultureInfo;
  isSelected: boolean;
  onSelect: () => void;
  onLaunch: () => void;
  inverted?: boolean;
  hubDesign?: AlienHubDesign;
}

const COLOR_CONFIG = {
  cyan: {
    border: "border-cyan-400",
    borderSelected: "border-cyan-500 ring-2 ring-cyan-400",
    shadow: "shadow-[3px_3px_0px_#06b6d4]",
    shadowSelected: "shadow-[6px_6px_0px_#0891b2]",
    badgePlayable: "bg-cyan-600 text-white border-cyan-400",
    badgeUpcoming: "bg-black/75 text-cyan-300 border-cyan-400/50",
    icon: "text-cyan-400",
    subtitle: "text-cyan-700",
    buttonSelected: "bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-700 shadow-[2px_2px_0px_#0891b2]",
    buttonIdle: "bg-cyan-50 text-cyan-800 border-cyan-300 hover:bg-cyan-100",
    previewBg: "from-cyan-950 via-slate-950 to-sky-950 border-cyan-500/40",
    previewText: "text-cyan-300",
    previewSub: "text-cyan-400",
    previewIcon: "text-cyan-400",
    accentDot: "bg-cyan-400",
    accentPing: "bg-cyan-400",
    specimenBorder: "border-cyan-600",
  },
  emerald: {
    border: "border-emerald-400",
    borderSelected: "border-emerald-500 ring-2 ring-emerald-400",
    shadow: "shadow-[3px_3px_0px_#10b981]",
    shadowSelected: "shadow-[6px_6px_0px_#059669]",
    badgePlayable: "bg-emerald-600 text-white border-emerald-400",
    badgeUpcoming: "bg-black/75 text-emerald-300 border-emerald-400/50",
    icon: "text-emerald-400",
    subtitle: "text-emerald-700",
    buttonSelected: "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-[2px_2px_0px_#047857]",
    buttonIdle: "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100",
    previewBg: "from-emerald-950 via-slate-950 to-green-950 border-emerald-500/40",
    previewText: "text-emerald-300",
    previewSub: "text-emerald-400",
    previewIcon: "text-emerald-400",
    accentDot: "bg-emerald-400",
    accentPing: "bg-emerald-400",
    specimenBorder: "border-emerald-600",
  },
  violet: {
    border: "border-violet-400",
    borderSelected: "border-violet-500 ring-2 ring-violet-400",
    shadow: "shadow-[3px_3px_0px_#8b5cf6]",
    shadowSelected: "shadow-[6px_6px_0px_#6d28d9]",
    badgePlayable: "bg-violet-600 text-white border-violet-400",
    badgeUpcoming: "bg-black/75 text-violet-300 border-violet-400/50",
    icon: "text-violet-400",
    subtitle: "text-violet-700",
    buttonSelected: "bg-violet-600 hover:bg-violet-700 text-white border-violet-700 shadow-[2px_2px_0px_#6d28d9]",
    buttonIdle: "bg-violet-50 text-violet-800 border-violet-300 hover:bg-violet-100",
    previewBg: "from-violet-950 via-slate-950 to-purple-950 border-violet-500/40",
    previewText: "text-violet-300",
    previewSub: "text-violet-400",
    previewIcon: "text-violet-400",
    accentDot: "bg-violet-400",
    accentPing: "bg-violet-400",
    specimenBorder: "border-violet-600",
  },
  amber: {
    border: "border-amber-400",
    borderSelected: "border-amber-500 ring-2 ring-amber-400",
    shadow: "shadow-[3px_3px_0px_#f59e0b]",
    shadowSelected: "shadow-[6px_6px_0px_#b45309]",
    badgePlayable: "bg-amber-500 text-black border-amber-600 font-bold",
    badgeUpcoming: "bg-black/75 text-amber-300 border-amber-400/50",
    icon: "text-amber-400",
    subtitle: "text-amber-700",
    buttonSelected: "bg-amber-500 hover:bg-amber-400 text-black border-amber-600 font-bold shadow-[2px_2px_0px_#b45309]",
    buttonIdle: "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100",
    previewBg: "from-amber-950 via-slate-950 to-orange-950 border-amber-500/40",
    previewText: "text-amber-300",
    previewSub: "text-amber-400",
    previewIcon: "text-amber-400",
    accentDot: "bg-amber-400",
    accentPing: "bg-amber-400",
    specimenBorder: "border-amber-600",
  },
};

export function CultureCard({
  culture,
  isSelected,
  onSelect,
  onLaunch,
  inverted = false,
  hubDesign = "translator",
}: CultureCardProps) {
  const config = COLOR_CONFIG[culture.themeColor];
  const isPlayable = culture.status === "READY TO PLAY";
  const alien =
    ALIEN_CULTURE_METADATA[culture.id] || ALIEN_CULTURE_METADATA["chromatic-symbiosis"];

  const getIcon = () => {
    switch (culture.themeColor) {
      case "cyan":
        return <Layers className="w-3.5 h-3.5 text-cyan-400" />;
      case "emerald":
        return <Radio className="w-3.5 h-3.5 text-emerald-400" />;
      case "violet":
        return <Cpu className="w-3.5 h-3.5 text-violet-400" />;
      case "amber":
        return <Wind className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  // Card container: compact platform shape with vibrant arcade theme styling
  const containerClasses = inverted
    ? isSelected
      ? `border-2 ${config.borderSelected} bg-white text-black ${config.shadowSelected} scale-[1.015] z-20`
      : `border-2 ${config.border} bg-white text-black ${config.shadow} opacity-95 hover:opacity-100 hover:scale-[1.006]`
    : isSelected
    ? "border-white bg-white text-black shadow-[6px_6px_0px_#ffffff] scale-[1.01] z-20"
    : "border-neutral-800 bg-black text-white opacity-85 hover:opacity-100 hover:border-neutral-500";

  return (
    <div
      onClick={() => {
        onSelect();
        onLaunch();
      }}
      className={`group relative flex flex-col justify-between p-2 md:p-2.5 border-2 transition-all duration-150 cursor-pointer overflow-hidden rounded ${containerClasses}`}
    >
      {/* Design 3: Laboratory Specimen Measurement Corner Brackets */}
      {hubDesign === "specimen" && (
        <>
          <span className="absolute top-0.5 left-1 text-[10px] font-mono font-bold text-neutral-400 pointer-events-none">
            ⌈
          </span>
          <span className="absolute top-0.5 right-1 text-[10px] font-mono font-bold text-neutral-400 pointer-events-none">
            ⌉
          </span>
          <span className="absolute bottom-0.5 left-1 text-[10px] font-mono font-bold text-neutral-400 pointer-events-none">
            ⌊
          </span>
          <span className="absolute bottom-0.5 right-1 text-[10px] font-mono font-bold text-neutral-400 pointer-events-none">
            ⌋
          </span>
        </>
      )}

      {/* 1. HERO GAME / SPECIMEN IMAGE (Takes ~75% of card space, platform style) */}
      <div
        className={`relative w-full flex-1 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] rounded overflow-hidden border transition-all ${
          inverted
            ? isSelected
              ? "border-neutral-900 shadow-inner"
              : "border-neutral-300"
            : isSelected
            ? "border-black"
            : "border-neutral-800"
        }`}
      >
        {culture.imageSrc ? (
          <Image
            src={culture.imageSrc}
            alt={culture.title}
            fill
            sizes="(max-width: 768px) 50vw, 400px"
            className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-300"
            priority={culture.id === "chromatic-symbiosis"}
          />
        ) : (
          <div
            className={`w-full h-full flex flex-col items-center justify-center text-center p-3 bg-gradient-to-br ${config.previewBg}`}
          >
            <div className="relative mb-1.5">
              <Radio className={`w-7 h-7 ${config.previewIcon} animate-pulse`} />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.accentPing}`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${config.accentDot}`}
                />
              </span>
            </div>
            <span
              className={`text-[10px] md:text-[11px] font-mono uppercase font-bold tracking-wider ${config.previewText}`}
            >
              {hubDesign === "gateway"
                ? "PORTAL MATRIX STANDBY"
                : hubDesign === "specimen"
                ? "CONTAINMENT CHAMBER"
                : "CHAMBER TRANSMISSION"}
            </span>
            <span className={`text-[8px] md:text-[9px] font-mono ${config.previewSub} mt-0.5`}>
              {hubDesign === "gateway"
                ? "Calibrating Beam Frequency"
                : hubDesign === "specimen"
                ? "Hermetic Seal Calibrated"
                : "Signal Calibration Pending"}
            </span>
          </div>
        )}

        {/* Cinematic gradient vignette on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

        {/* Specimen Mode Active Laser Scanline */}
        {hubDesign === "specimen" && isSelected && (
          <div className="animate-specimen-scan" />
        )}

        {/* =================================================================== */}
        {/* FLOATING TOP BADGES (Adapts per Alien Hub Design)                    */}
        {/* =================================================================== */}
        <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between z-10 pointer-events-none">
          {hubDesign === "translator" && (
            <>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm border border-white/20 text-white shadow-sm">
                <span>{getIcon()}</span>
                <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-wider uppercase truncate max-w-[130px]">
                  {culture.author} // {alien.alienGlyphs}
                </span>
              </div>
              <span
                className={`text-[8px] md:text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-bold tracking-wider shadow-sm ${
                  isPlayable ? config.badgePlayable : config.badgeUpcoming
                }`}
              >
                {alien.fragmentCode}
              </span>
            </>
          )}

          {hubDesign === "gateway" && (
            <>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm border border-cyan-400/40 text-cyan-300 shadow-sm font-mono text-[9px] font-bold">
                <Crosshair className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
                <span>{alien.sectorId}</span>
              </div>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-black/85 text-emerald-400 border border-emerald-500/40 font-bold uppercase">
                {alien.beamLock}
              </span>
            </>
          )}

          {hubDesign === "specimen" && (
            <>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/90 border border-white/30 text-white shadow-sm font-mono text-[9px] font-bold">
                <span className="text-neutral-400">⌈</span>
                <span>{alien.specimenCode}</span>
                <span className="text-neutral-400">⌉</span>
              </div>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-black/90 text-amber-300 border border-amber-400/40 font-bold uppercase">
                {alien.hazardClass}
              </span>
            </>
          )}
        </div>

        {/* =================================================================== */}
        {/* FLOATING BOTTOM OVERLAYS ON IMAGE                                   */}
        {/* =================================================================== */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between z-10 pointer-events-none">
          {hubDesign === "translator" && (
            <>
              <span className="text-[8px] md:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/85 text-cyan-300 border border-cyan-400/30 tracking-wider truncate max-w-[200px]">
                TRANSLATED: {alien.fragmentTitle}
              </span>
              <span className="text-[8px] md:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/85 text-white/90 border border-white/20 tracking-wider">
                {culture.mechanics[0]}
              </span>
            </>
          )}

          {hubDesign === "gateway" && (
            <div className="w-full flex items-center justify-between text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/85 text-neutral-200 border border-white/20">
              <span className="text-cyan-300 truncate">{alien.planetCoords}</span>
              <span className="text-emerald-300 hidden sm:inline">{alien.environmentalTelemetry}</span>
            </div>
          )}

          {hubDesign === "specimen" && (
            <div className="w-full flex items-center justify-between text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/90 text-neutral-300 border border-white/30">
              <span className="text-amber-300 truncate">SAMPLE: {alien.sampleType}</span>
              <span className="text-neutral-400 hidden sm:inline">{alien.containmentProtocol}</span>
            </div>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. COMPACT STOREFRONT / SPECIMEN INFO ROW                           */}
      {/* =================================================================== */}
      <div className="mt-2 pt-0.5 z-10 flex items-center justify-between gap-2 select-none">
        <div className="min-w-0 flex-1">
          <h2 className="text-xs md:text-sm font-bold font-mono tracking-wide text-slate-900 group-hover:text-black truncate">
            {hubDesign === "gateway"
              ? `${culture.title} // ${alien.alienName}`
              : hubDesign === "specimen"
              ? `${culture.title} [CELL 0${culture.themeColor === "cyan" ? "1" : culture.themeColor === "emerald" ? "2" : culture.themeColor === "violet" ? "3" : "4"}]`
              : culture.title}
          </h2>
          <p
            className={`text-[9px] md:text-[10px] font-mono tracking-tight truncate font-semibold ${config.subtitle}`}
          >
            {hubDesign === "translator"
              ? alien.alienAudience
              : hubDesign === "gateway"
              ? `GATEWAY BEAM STABLE • 60 FPS • ${culture.author}`
              : alien.containmentProtocol}
          </p>
        </div>

        {/* Action Prompt */}
        <div className="shrink-0">
          {isSelected ? (
            <div
              className={`flex items-center gap-1 font-mono font-bold text-[9px] md:text-[10px] px-2.5 py-1 rounded border transition-colors ${config.buttonSelected}`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>
                {hubDesign === "gateway"
                  ? isPlayable
                    ? "ENGAGE [A]"
                    : "PROBE [A]"
                  : hubDesign === "specimen"
                  ? isPlayable
                    ? "ANALYZE [A]"
                    : "INSPECT [A]"
                  : isPlayable
                  ? "ENTER [A]"
                  : "VIEW [A]"}
              </span>
            </div>
          ) : (
            <span
              className={`text-[9px] md:text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                inverted ? config.buttonIdle : "text-neutral-500 border-neutral-700"
              }`}
            >
              SELECT →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
