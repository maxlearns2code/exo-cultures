"use client";

import React from "react";
import { CultureInfo, ALIEN_CULTURE_METADATA } from "@/types";
import { ExhibitCard } from "@/components/organisms/ExhibitCard";
import { ExhibitionHeader } from "@/components/molecules";
import { ArcadeButton } from "@/components/atoms/Button";
import { ControlsHintBar } from "@/components/molecules/ControlsHintBar";

interface TemplateProps {
  culture: CultureInfo;
  onLaunch: () => void;
  onOpenDossier: () => void;
  onOpenAttract: () => void;
  onReturnToIntro: () => void;
  onToggleDesign: () => void;
}

export function GatewayTemplate({
  culture,
  onLaunch,
  onOpenDossier,
  onOpenAttract,
  onReturnToIntro,
  onToggleDesign,
}: TemplateProps) {
  const alien = ALIEN_CULTURE_METADATA[culture.id] || ALIEN_CULTURE_METADATA["martin"];

  return (
    <div className="flex-1 flex flex-col justify-between font-mono bg-white text-black select-none relative overflow-hidden p-3 md:p-5">
      {/* 1. TOP BRUTALIST ARCHITECTURAL HEADER */}
      <ExhibitionHeader
        theme="gateway"
        onReturnToIntro={onReturnToIntro}
        onToggleDesign={onToggleDesign}
        onOpenDossier={onOpenDossier}
        onOpenAttract={onOpenAttract}
      />

      {/* 2. CENTER STAGE: THE SINGLE COLLABORATIVE GAME SHOWCASE */}
      <div className="flex-1 min-h-0 flex items-center justify-center py-2 my-auto">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Left Panel: Narrative Fusion */}
          <div className="md:col-span-4 bg-neutral-100 border-2 border-black p-3.5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between h-full max-h-[340px]">
            <div>
              <div className="inline-flex items-center px-2 py-0.5 bg-black text-white text-[9px] font-bold uppercase mb-2">
                <span>COMBINED SPECULATIVE LORE</span>
              </div>
              <h2 className="text-xs md:text-sm font-black uppercase mb-1.5">
                FOUR STORIES IN ONE
              </h2>
              <p className="text-[10px] text-neutral-700 leading-relaxed mb-3">
                Maxime, Martin, Aisah, and Mana combined their four individual speculative worlds into a single extraterrestrial journey through the subterranean void.
              </p>
              <div className="space-y-1.5 text-[9px] border-t border-black/20 pt-2">
                <div className="flex items-center gap-1 text-black font-bold">
                  <span>• Maxime:</span> <span className="font-normal text-neutral-600">Sub-ice oceanic abyss &amp; light</span>
                </div>
                <div className="flex items-center gap-1 text-black font-bold">
                  <span>• Martin:</span> <span className="font-normal text-neutral-600">3D LiDAR point-cloud echolocation</span>
                </div>
                <div className="flex items-center gap-1 text-black font-bold">
                  <span>• Aisah:</span> <span className="font-normal text-neutral-600">Acoustic resonance &amp; floral calling</span>
                </div>
                <div className="flex items-center gap-1 text-black font-bold">
                  <span>• Mana:</span> <span className="font-normal text-neutral-600">Exospheric vapors &amp; viral spores</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-black text-[9px] text-neutral-500 font-bold">
              TEAM: MAXIME • MARTIN • AISAH • MANA
            </div>
          </div>

          {/* Center Column: Exhibit Card Organism */}
          <div className="md:col-span-4 flex flex-col items-center">
            <ExhibitCard
              title={culture.title}
              alienGlyphs={alien.alienGlyphs}
              planetCoords={alien.planetCoords}
              beamLock={alien.beamLock}
              onLaunch={onLaunch}
            />
          </div>

          {/* Right Panel: Mechanics & Controls */}
          <div className="md:col-span-4 bg-neutral-100 border-2 border-black p-3.5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between h-full max-h-[340px]">
            <div>
              <div className="inline-flex items-center px-2 py-0.5 bg-black text-white text-[9px] font-bold uppercase mb-2">
                <span>EXPEDITION CONTROLS</span>
              </div>
              <h2 className="text-xs md:text-sm font-black uppercase mb-1.5">
                HOW TO PLAY
              </h2>
              <div className="space-y-1.5 text-[9px] text-neutral-800 leading-snug">
                <div>• <strong>LiDAR Scan:</strong> Click Left or Arcade [X] to map walls</div>
                <div>• <strong>Focus Beam:</strong> Click Right or Arcade [Y] to burn spores</div>
                <div>• <strong>Move:</strong> WASD or 8BitDo Joystick</div>
                <div>• <strong>Bloom Flower:</strong> Hold [E] or Arcade [A] near beacons</div>
              </div>
              <div className="mt-3 pt-2 border-t border-black/20 text-[9px] text-neutral-600">
                <span>GOAL: Discover all 4 floral beacons, bloom them to summon your mate, and defend the petals from infection.</span>
              </div>
            </div>

            <ArcadeButton
              variant="brutalist"
              size="md"
              onClick={onLaunch}
              className="w-full mt-3 py-2 text-xs"
            >
              <span>LAUNCH GAME [ENTER / A]</span>
            </ArcadeButton>
          </div>
        </div>
      </div>

      {/* 3. SOLID BLACK BRUTALIST STATUS BAR */}
      <ControlsHintBar theme="white" />
    </div>
  );
}
