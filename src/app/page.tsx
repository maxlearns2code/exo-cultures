"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CultureInfo, ALIEN_CULTURE_METADATA, COLLABORATIVE_GAME } from "@/components/hub/CultureCard";
import { AttractMode } from "@/components/hub/AttractMode";
import { CRTOverlay, AttractionFXMode, AlienHubDesign } from "@/components/arcade/CRTOverlay";
import { ExpoDossierModal } from "@/components/hub/ExpoDossierModal";
import { TranslatorHubView } from "@/components/hub/views/TranslatorHubView";
import { GatewayHubView } from "@/components/hub/views/GatewayHubView";
import { SpecimenHubView } from "@/components/hub/views/SpecimenHubView";
import { MartinGame } from "@/components/games/martin/MartinGame";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";
import { Play, BookOpen, Sparkles, Radio } from "lucide-react";

// Single collaborative game on the website combining the stories of all 4 team members
const CULTURES: CultureInfo[] = [COLLABORATIVE_GAME];

const IDLE_RETURN_TO_WELCOME_MS = 60000;
const ALIEN_GLYPHS = ["⍙", "⟒", "⌰", "☊", "⍜", "⋔", "⎎", "⏁", "⊑", "⌇", "▲", "◈", "⬡", "☵", "☲", "0x45", "0x58", "0x4F"];

export default function ArcadeLauncherHub() {
  const router = useRouter();

  // Navigation mode: "welcome" (Exhibition Presentation) | "hub" (Themed Showcase) | "game" (Active 3D LiDAR Engine)
  const [viewMode, setViewMode] = useState<"welcome" | "hub" | "game">("welcome");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isAttractMode, setIsAttractMode] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  // Attraction Eye-Catcher FX Mode ("dual" | "flash" | "glitch" | "off")
  const [fxMode, setFxMode] = useState<AttractionFXMode>("dual");
  const [activeFXType, setActiveFXType] = useState<"flash" | "glitch" | null>(null);
  const [displayTitle, setDisplayTitle] = useState<string>("EXO-CULTURES");

  // Alien Hub Design Modes ("translator" | "gateway" | "specimen")
  const [hubDesign, setHubDesign] = useState<AlienHubDesign>("gateway");

  const lastInteractionRef = useRef<number>(Date.now());
  const prevInputsRef = useRef<ArcadeInputs | null>(null);

  const handleToggleHubDesign = useCallback(() => {
    ArcadeAudio.playAlienGlitch();
    setHubDesign((prev) => {
      const designs: AlienHubDesign[] = ["translator", "gateway", "specimen"];
      return designs[(designs.indexOf(prev) + 1) % designs.length];
    });
  }, []);

  // Keyboard shortcut [T] or [U] toggles between the 3 alien designs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "t" || e.key === "T" || e.key === "u" || e.key === "U") {
        handleToggleHubDesign();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleToggleHubDesign]);

  const enterHub = useCallback(() => {
    ArcadeAudio.playSelect();
    setViewMode("hub");
  }, []);

  const launchGame = useCallback(() => {
    ArcadeAudio.playSelect();
    setViewMode("game");
  }, []);

  const returnToWelcome = useCallback(() => {
    ArcadeAudio.playCancel();
    setViewMode("welcome");
  }, []);

  const registerActivity = useCallback(() => {
    lastInteractionRef.current = Date.now();
    if (isAttractMode) {
      setIsAttractMode(false);
      ArcadeAudio.playSelect();
    }
  }, [isAttractMode]);

  // Trigger Eye-Catcher Animation
  const triggerFX = useCallback((mode: AttractionFXMode) => {
    if (mode === "off") return;

    if (mode === "flash") {
      ArcadeAudio.playPhosphorFlash();
      setActiveFXType("flash");
      setTimeout(() => setActiveFXType(null), 380);
      return;
    }

    if (mode === "glitch") {
      ArcadeAudio.playAlienGlitch();
      setActiveFXType("glitch");

      let count = 0;
      const interval = setInterval(() => {
        count++;
        const scrambled = "EXO-CULTURES"
          .split("")
          .map((char) => (char === "-" ? "-" : ALIEN_GLYPHS[Math.floor(Math.random() * ALIEN_GLYPHS.length)]))
          .join("");
        setDisplayTitle(scrambled);

        if (count >= 10) {
          clearInterval(interval);
          setDisplayTitle("EXO-CULTURES");
          setActiveFXType(null);
        }
      }, 75);
      return;
    }

    if (mode === "dual") {
      ArcadeAudio.playAlienGlitch();
      setActiveFXType("glitch");

      let count = 0;
      const interval = setInterval(() => {
        count++;
        const scrambled = "EXO-CULTURES"
          .split("")
          .map((char) => (char === "-" ? "-" : ALIEN_GLYPHS[Math.floor(Math.random() * ALIEN_GLYPHS.length)]))
          .join("");
        setDisplayTitle(scrambled);

        if (count >= 8) {
          clearInterval(interval);
          setDisplayTitle("EXO-CULTURES");
          ArcadeAudio.playPhosphorFlash();
          setActiveFXType("flash");
          setTimeout(() => setActiveFXType(null), 380);
        }
      }, 75);
    }
  }, []);

  // Top-Right Button: Switch between Flash, Glitch, Dual, and Off modes
  const handleToggleFX = useCallback(() => {
    ArcadeAudio.playSelect();
    setFxMode((prev) => {
      const modes: AttractionFXMode[] = ["dual", "flash", "glitch", "off"];
      const nextMode = modes[(modes.indexOf(prev) + 1) % modes.length];
      setTimeout(() => triggerFX(nextMode), 60);
      return nextMode;
    });
  }, [triggerFX]);

  const handleInputs = useCallback(
    (currentInputs: ArcadeInputs) => {
      const prev = prevInputsRef.current;
      prevInputsRef.current = currentInputs;

      const hasAnyInput =
        currentInputs.up ||
        currentInputs.down ||
        currentInputs.left ||
        currentInputs.right ||
        currentInputs.action1 ||
        currentInputs.action2 ||
        currentInputs.action3 ||
        currentInputs.action4 ||
        currentInputs.start ||
        currentInputs.select;

      if (hasAnyInput) {
        registerActivity();
      }

      // If Dossier Modal is open: [B] or Start/Select closes it
      if (isDossierOpen) {
        if (
          (currentInputs.action2 && (!prev || !prev.action2)) ||
          (currentInputs.select && (!prev || !prev.select))
        ) {
          setIsDossierOpen(false);
          ArcadeAudio.playCancel();
        }
        return;
      }

      if (isAttractMode) return;

      // If in active 3D game: exit handled by universal hold
      if (viewMode === "game") return;

      // Action 4 [Y Button] opens the Expo Dossier from anywhere
      if (currentInputs.action4 && (!prev || !prev.action4)) {
        ArcadeAudio.playSelect();
        setIsDossierOpen(true);
        return;
      }

      // In Welcome Screen:
      if (viewMode === "welcome") {
        // [A] Button or START launches the game directly or opens hub
        if ((currentInputs.action1 && (!prev || !prev.action1)) || (currentInputs.start && (!prev || !prev.start))) {
          launchGame();
        }
        // [X] Button manually tests the active eye-catcher FX
        if (currentInputs.action3 && (!prev || !prev.action3)) {
          triggerFX(fxMode);
        }
        return;
      }

      // In Themed Hub View:
      if (viewMode === "hub") {
        // Action 1: Launch game
        if (currentInputs.action1 && (!prev || !prev.action1)) {
          launchGame();
        }

        // Action 2: Return to Welcome Screen
        if (currentInputs.action2 && (!prev || !prev.action2)) {
          returnToWelcome();
        }

        // Action 3: Trigger Attract Mode
        if (currentInputs.action3 && (!prev || !prev.action3)) {
          setIsAttractMode(true);
        }
      }
    },
    [fxMode, isAttractMode, isDossierOpen, launchGame, registerActivity, returnToWelcome, triggerFX, viewMode]
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs, returnToWelcome);

  // Periodic Eye-Catcher on Welcome Screen
  useEffect(() => {
    if (viewMode !== "welcome" || isDossierOpen || fxMode === "off") return;

    const interval = setInterval(() => {
      const idleTime = Date.now() - lastInteractionRef.current;
      if (idleTime >= 18000) {
        triggerFX(fxMode);
        lastInteractionRef.current = Date.now();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [fxMode, isDossierOpen, triggerFX, viewMode]);

  // Idle timeout: Return to welcome after 60s of inactivity if in hub
  useEffect(() => {
    if (viewMode === "welcome" && !isDossierOpen && !isAttractMode) return;

    const interval = setInterval(() => {
      const idleTime = Date.now() - lastInteractionRef.current;
      if (idleTime >= IDLE_RETURN_TO_WELCOME_MS) {
        setViewMode("welcome");
        setIsDossierOpen(false);
        setIsAttractMode(false);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [viewMode, isDossierOpen, isAttractMode]);

  return (
    <CRTOverlay
      exitHoldProgress={exitHoldProgress}
      hasGamepad={hasGamepad}
      fxMode={fxMode}
      onToggleFX={handleToggleFX}
      activeFXType={activeFXType}
      theme={viewMode === "welcome" || viewMode === "game" ? "black" : hubDesign === "gateway" ? "white" : "black"}
      hubDesign={hubDesign}
      onToggleHubDesign={handleToggleHubDesign}
    >
      {/* Dossier Modal Overlay */}
      <ExpoDossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />

      {/* Attract Mode Screensaver Overlay */}
      {isAttractMode && (
        <AttractMode
          onDismiss={() => {
            setIsAttractMode(false);
            registerActivity();
          }}
        />
      )}

      {/* =================================================================== */}
      {/* 1. ACTIVE 3D GAME MODE                                              */}
      {/* =================================================================== */}
      {viewMode === "game" && (
        <MartinGame onReturnToHub={returnToWelcome} />
      )}

      {/* =================================================================== */}
      {/* 2. EXHIBITION PRESENTATION WELCOME SCREEN (STARK NEGATIVE B&W)     */}
      {/* =================================================================== */}
      {viewMode === "welcome" && (
        <div className="flex-1 flex flex-col justify-between p-4 md:p-6 text-center select-none font-mono bg-black text-white relative">
          {/* Header Marquee */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-black border-2 border-white mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                INTERGALACTIC WORLDS EXPO • WEEK 51, 2026 • HYPER ISLAND
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-[0.25em] text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              {displayTitle}
            </h1>
            <p className="text-xs text-neutral-300 tracking-wider mt-1">
              ECHOES IN THE DARK • COLLABORATIVE 3D PHOTONIC EXPEDITION
            </p>
          </div>

          {/* Exhibition Statement Card */}
          <div className="w-full max-w-lg mx-auto bg-black border-2 border-white p-5 md:p-6 shadow-[8px_8px_0px_#ffffff] flex flex-col items-center text-center my-auto">
            <div className="w-full flex items-center justify-between border-b-2 border-white/20 pb-2 mb-3 text-[11px]">
              <span className="text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                COLLABORATIVE CREATORS
              </span>
              <span className="text-white font-bold tracking-wide">
                Maxime • Martin • Aisah • Mana
              </span>
            </div>

            <p className="text-xs md:text-sm text-neutral-200 leading-relaxed mb-4">
              Welcome to the Earth pavilion of the <strong>Intergalactic Worlds Expo</strong>.
              Four creators joined forces to fuse their speculative fiction into <strong>one common interactive game</strong>.
              Equipped with photonic LiDAR sensors, illuminate a pitch-black subterranean void, charge dormant floral beacons, and survive hostile viral spores.
            </p>

            {/* Concept & Experience Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="flex items-center text-[10px] px-2.5 py-1 bg-black border-2 border-white text-white font-bold uppercase">
                One Shared Story
              </span>
              <span className="flex items-center text-[10px] px-2.5 py-1 bg-black border-2 border-white text-white font-bold uppercase">
                3D LiDAR Point Cloud
              </span>
              <span className="flex items-center text-[10px] px-2.5 py-1 bg-black border-2 border-white text-white font-bold uppercase">
                Floral Resonance
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="w-full max-w-sm flex flex-col gap-2.5">
              <button
                onClick={launchGame}
                className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-white hover:bg-black text-black hover:text-white border-2 border-white font-bold text-xs md:text-sm tracking-[0.15em] uppercase shadow-[5px_5px_0px_#888888] transition-all cursor-pointer active:translate-x-1 active:translate-y-1"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>START COLLABORATIVE GAME [A]</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={enterHub}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-black hover:bg-neutral-900 text-white border-2 border-white/60 hover:border-white font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>EXHIBITION HUB</span>
                </button>

                <button
                  onClick={() => setIsDossierOpen(true)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-black hover:bg-neutral-900 text-white border-2 border-white/60 hover:border-white font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>DOSSIER [Y]</span>
                </button>
              </div>
            </div>

            <span className="text-[10px] text-neutral-400 mt-3 font-mono">
              Press [A] to Play • Press [Y] for Process • Press [X] to Test FX
            </span>
          </div>

          {/* Exhibition Footer */}
          <div className="text-[10px] text-neutral-400 border-t-2 border-white/20 pt-2 flex items-center justify-between">
            <span>HYPER ISLAND CAMPUS • WEEK 51, 2026</span>
            <span>8BITDO ARCADE &amp; KEYBOARD/MOUSE COMPATIBLE</span>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. ARCADE CABINET SHOWCASE HUB (3 RECALBOX THEMES)                  */}
      {/* =================================================================== */}
      {viewMode === "hub" && (
        <>
          {hubDesign === "translator" && (
            <TranslatorHubView
              cultures={CULTURES}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
              onLaunch={launchGame}
              onOpenDossier={() => setIsDossierOpen(true)}
              onOpenAttract={() => setIsAttractMode(true)}
              onReturnToIntro={returnToWelcome}
              onToggleDesign={handleToggleHubDesign}
            />
          )}

          {hubDesign === "gateway" && (
            <GatewayHubView
              cultures={CULTURES}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
              onLaunch={launchGame}
              onOpenDossier={() => setIsDossierOpen(true)}
              onOpenAttract={() => setIsAttractMode(true)}
              onReturnToIntro={returnToWelcome}
              onToggleDesign={handleToggleHubDesign}
            />
          )}

          {hubDesign === "specimen" && (
            <SpecimenHubView
              cultures={CULTURES}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
              onLaunch={launchGame}
              onOpenDossier={() => setIsDossierOpen(true)}
              onOpenAttract={() => setIsAttractMode(true)}
              onReturnToIntro={returnToWelcome}
              onToggleDesign={handleToggleHubDesign}
            />
          )}
        </>
      )}
    </CRTOverlay>
  );
}
