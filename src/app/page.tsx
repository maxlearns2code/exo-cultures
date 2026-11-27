"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  CRTOverlay,
  ExpoDossierModal,
  WelcomeHero,
  Intro2DGame,
  Game,
  AttractionFXMode,
} from "@/components";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";

const IDLE_RETURN_TO_WELCOME_MS = 5 * 60 * 1000; // 5 minutes of inactivity
const ALIEN_GLYPHS = ["⍙", "⟒", "⌰", "☊", "⍜", "⋔", "⎎", "⏁", "⊑", "⌇", "▲", "◈", "⬡", "☵", "☲", "0x45", "0x58", "0x4F"];

export default function ArcadeLauncherHub() {
  // Navigation state: "welcome" (Title Hero) | "intro2d" (Part 1 Surface) | "game" (Active 3D Engine)
  const [viewMode, setViewMode] = useState<"welcome" | "intro2d" | "game">("welcome");
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  // Attraction Eye-Catcher FX Mode ("dual" | "flash" | "glitch" | "off")
  const [fxMode, setFxMode] = useState<AttractionFXMode>("dual");
  const [activeFXType, setActiveFXType] = useState<"flash" | "glitch" | null>(null);
  const [displayTitle, setDisplayTitle] = useState<string>("EXO-CULTURES");

  const lastInteractionRef = useRef<number>(Date.now());
  const lastEyeCatcherRef = useRef<number>(Date.now());
  const prevInputsRef = useRef<ArcadeInputs | null>(null);

  const returnToWelcome = useCallback(() => {
    ArcadeAudio.playCancel();
    setViewMode("welcome");
  }, []);

  const enterDossier = useCallback(() => {
    ArcadeAudio.playSelect();
    setIsDossierOpen(true);
  }, []);

  const launchGame = useCallback(() => {
    ArcadeAudio.playSelect();
    setViewMode("intro2d");
  }, []);

  const enter3DGame = useCallback(() => {
    setViewMode("game");
  }, []);

  // Keyboard shortcut [Escape] exits game or closes modal immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Escape") {
        if (isDossierOpen) {
          setIsDossierOpen(false);
          ArcadeAudio.playCancel();
        } else if (viewMode === "intro2d" || viewMode === "game") {
          returnToWelcome();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, isDossierOpen, returnToWelcome]);

  const registerActivity = useCallback(() => {
    lastInteractionRef.current = Date.now();
  }, []);

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
          (currentInputs.start && (!prev || !prev.start)) ||
          (currentInputs.select && (!prev || !prev.select))
        ) {
          setIsDossierOpen(false);
          ArcadeAudio.playCancel();
        }
        return;
      }

      // In active game (2D Part 1 or 3D Part 2): allow pressing Action 2 [B Button] or select to exit to welcome
      if (viewMode === "intro2d" || viewMode === "game") {
        if (
          (currentInputs.action2 && (!prev || !prev.action2)) ||
          (currentInputs.select && (!prev || !prev.select))
        ) {
          returnToWelcome();
        }
        return;
      }

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
      }
    },
    [fxMode, isDossierOpen, launchGame, registerActivity, returnToWelcome, triggerFX, viewMode]
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs, returnToWelcome);

  // Register all user activity (mouse movement, clicks, touches, wheel, keys) to reset idle timer
  useEffect(() => {
    const handleUserActivity = () => {
      lastInteractionRef.current = Date.now();
      lastEyeCatcherRef.current = Date.now();
    };

    window.addEventListener("mousemove", handleUserActivity, { passive: true });
    window.addEventListener("mousedown", handleUserActivity, { passive: true });
    window.addEventListener("keydown", handleUserActivity, { passive: true });
    window.addEventListener("touchstart", handleUserActivity, { passive: true });
    window.addEventListener("wheel", handleUserActivity, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("mousedown", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("wheel", handleUserActivity);
    };
  }, []);

  // Periodic Eye-Catcher
  useEffect(() => {
    if (viewMode !== "welcome" || isDossierOpen || fxMode === "off") return;

    const interval = setInterval(() => {
      const idleTime = Date.now() - lastEyeCatcherRef.current;
      if (idleTime >= 18000) {
        triggerFX(fxMode);
        lastEyeCatcherRef.current = Date.now();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [fxMode, isDossierOpen, triggerFX, viewMode]);

  // Idle timeout: Return to main page (welcome) after 5 minutes of inactivity
  useEffect(() => {
    if (viewMode === "welcome" && !isDossierOpen) return;

    const interval = setInterval(() => {
      const idleTime = Date.now() - lastInteractionRef.current;
      if (idleTime >= IDLE_RETURN_TO_WELCOME_MS) {
        if (typeof document !== "undefined" && document.exitPointerLock) {
          document.exitPointerLock();
        }
        setViewMode("welcome");
        setIsDossierOpen(false);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [viewMode, isDossierOpen]);

  return (
    <CRTOverlay
      exitHoldProgress={exitHoldProgress}
      hasGamepad={hasGamepad}
      fxMode={fxMode}
      onToggleFX={handleToggleFX}
      activeFXType={activeFXType}
      onClose={isDossierOpen ? () => setIsDossierOpen(false) : viewMode !== "welcome" ? returnToWelcome : undefined}
    >
      {/* Dossier Modal Overlay (Organism) */}
      <ExpoDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* 1. PART 1: 2D SURFACE EXPEDITION (Organism) */}
      {viewMode === "intro2d" && (
        <Intro2DGame
          onEnterBuilding={enter3DGame}
          onReturnToHub={returnToWelcome}
        />
      )}

      {/* 2. PART 2: ACTIVE 3D LIDAR GAME (Organism) */}
      {viewMode === "game" && (
        <Game onReturnToHub={returnToWelcome} />
      )}

      {/* 2. EXHIBITION PRESENTATION WELCOME HERO (Organism) */}
      {viewMode === "welcome" && (
        <WelcomeHero
          displayTitle={displayTitle}
          onStartGame={launchGame}
          onExplain={enterDossier}
        />
      )}
    </CRTOverlay>
  );
}
