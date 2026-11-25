"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CRTOverlay,
  AttractMode,
  ExpoDossierModal,
  WelcomeHero,
  MartinGame,
  GatewayTemplate,
  TranslatorTemplate,
  SpecimenTemplate,
  AttractionFXMode,
  AlienHubDesign,
} from "@/components";
import { CultureInfo, COLLABORATIVE_GAME } from "@/types";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";

// Single collaborative game combining all 4 members' narratives
const CULTURES: CultureInfo[] = [COLLABORATIVE_GAME];

const IDLE_RETURN_TO_WELCOME_MS = 60000;
const ALIEN_GLYPHS = ["⍙", "⟒", "⌰", "☊", "⍜", "⋔", "⎎", "⏁", "⊑", "⌇", "▲", "◈", "⬡", "☵", "☲", "0x45", "0x58", "0x4F"];

export default function ArcadeLauncherHub() {
  const router = useRouter();

  // Navigation state: "welcome" (Title Hero) | "hub" (Themed Showcase) | "game" (Active 3D Engine)
  const [viewMode, setViewMode] = useState<"welcome" | "hub" | "game">("welcome");
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

  // Keyboard shortcut [T] or [U] toggles between the 3 Recalbox themes
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

  // Top Calibration Button: Switch between Flash, Glitch, Dual, and Off modes
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

      // In active game: universal hold handles exit
      if (viewMode === "game") return;

      // Action 4 [Y Button] opens the Expo Dossier
      if (currentInputs.action4 && (!prev || !prev.action4)) {
        ArcadeAudio.playSelect();
        setIsDossierOpen(true);
        return;
      }

      // In Welcome Screen:
      if (viewMode === "welcome") {
        if ((currentInputs.action1 && (!prev || !prev.action1)) || (currentInputs.start && (!prev || !prev.start))) {
          launchGame();
        }
        if (currentInputs.action3 && (!prev || !prev.action3)) {
          triggerFX(fxMode);
        }
        return;
      }

      // In Themed Hub Showcase:
      if (viewMode === "hub") {
        if (currentInputs.action1 && (!prev || !prev.action1)) {
          launchGame();
        }
        if (currentInputs.action2 && (!prev || !prev.action2)) {
          returnToWelcome();
        }
        if (currentInputs.action3 && (!prev || !prev.action3)) {
          setIsAttractMode(true);
        }
      }
    },
    [fxMode, isAttractMode, isDossierOpen, launchGame, registerActivity, returnToWelcome, triggerFX, viewMode]
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs, returnToWelcome);

  // Periodic Eye-Catcher
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

  // Idle timeout: Return to welcome after 60s
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
      {/* Dossier Modal Overlay (Organism) */}
      <ExpoDossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />

      {/* Attract Mode Screensaver Overlay (Organism) */}
      {isAttractMode && (
        <AttractMode
          onDismiss={() => {
            setIsAttractMode(false);
            registerActivity();
          }}
        />
      )}

      {/* 1. ACTIVE 3D GAME (Organism) */}
      {viewMode === "game" && (
        <MartinGame onReturnToHub={returnToWelcome} />
      )}

      {/* 2. EXHIBITION PRESENTATION WELCOME HERO (Organism) */}
      {viewMode === "welcome" && (
        <WelcomeHero
          displayTitle={displayTitle}
          onStartGame={launchGame}
          onEnterHub={enterHub}
          onOpenDossier={() => setIsDossierOpen(true)}
        />
      )}

      {/* 3. RECALBOX THEMED SHOWCASES (Templates) */}
      {viewMode === "hub" && (
        <>
          {hubDesign === "gateway" && (
            <GatewayTemplate
              culture={CULTURES[0]}
              onLaunch={launchGame}
              onOpenDossier={() => setIsDossierOpen(true)}
              onOpenAttract={() => setIsAttractMode(true)}
              onReturnToIntro={returnToWelcome}
              onToggleDesign={handleToggleHubDesign}
            />
          )}

          {hubDesign === "translator" && (
            <TranslatorTemplate
              culture={CULTURES[0]}
              onLaunch={launchGame}
              onOpenDossier={() => setIsDossierOpen(true)}
              onOpenAttract={() => setIsAttractMode(true)}
              onReturnToIntro={returnToWelcome}
              onToggleDesign={handleToggleHubDesign}
            />
          )}

          {hubDesign === "specimen" && (
            <SpecimenTemplate
              culture={CULTURES[0]}
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
