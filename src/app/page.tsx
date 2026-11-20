"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CultureCard, CultureInfo } from "@/components/hub/CultureCard";
import { AttractMode } from "@/components/hub/AttractMode";
import { CRTOverlay } from "@/components/arcade/CRTOverlay";
import { ArcadeHUD, ArcadeControlsFooter } from "@/components/arcade/ArcadeHUD";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";

const CULTURES: CultureInfo[] = [
  {
    id: "chromatic-symbiosis",
    name: "Chromatic Symbiosis",
    author: "Maxime Dewynter",
    title: "Harmonic Waves",
    subtitle: "Sub-Ice Abyssal Light & Color Refraction",
    route: "/games/chromatic-symbiosis",
    themeColor: "cyan",
    status: "READY TO PLAY",
    description:
      "Deep in Saturn's ocean abyss, guide twin brothers projecting cyan & magenta light beams through optical ice crystals to awaken the Living Portal Tree.",
    mechanics: ["Playable (3 Chambers)", "Optical Refraction", "Thermal Survival"],
    imageSrc: "/assets/chromatic-symbiosis/ai-designs/ai-poster-01.png",
  },
  {
    id: "aisah",
    name: "Alien Culture II",
    author: "Aisah",
    title: "Portal Chamber II",
    subtitle: "Awaiting Alien Transmission",
    route: "/games/aisah",
    themeColor: "emerald",
    status: "COMING SOON",
    description:
      "Dimensional receiving bay reserved for Aisah's alien culture. The portal chamber is primed and calibrated for incoming design assets.",
    mechanics: ["Chamber Primed", "Signal Pending"],
  },
  {
    id: "martin",
    name: "Alien Culture III",
    author: "Martin",
    title: "Portal Chamber III",
    subtitle: "Awaiting Alien Transmission",
    route: "/games/martin",
    themeColor: "violet",
    status: "COMING SOON",
    description:
      "Dimensional receiving bay reserved for Martin's alien culture. The portal chamber is primed and calibrated for incoming design assets.",
    mechanics: ["Chamber Primed", "Signal Pending"],
  },
  {
    id: "mana",
    name: "Alien Culture IV",
    author: "Mana",
    title: "Portal Chamber IV",
    subtitle: "Awaiting Alien Transmission",
    route: "/games/mana",
    themeColor: "amber",
    status: "COMING SOON",
    description:
      "Dimensional receiving bay reserved for Mana's alien culture. The portal chamber is primed and calibrated for incoming design assets.",
    mechanics: ["Chamber Primed", "Signal Pending"],
  },
];

const IDLE_ATTRACT_TIMEOUT_MS = 90000; // 90 seconds inactivity triggers Attract Mode

export default function ArcadeLauncherHub() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isAttractMode, setIsAttractMode] = useState<boolean>(false);
  const lastInteractionRef = useRef<number>(Date.now());
  const prevInputsRef = useRef<ArcadeInputs | null>(null);

  // Navigate to selected culture
  const launchGame = useCallback(
    (index: number) => {
      const culture = CULTURES[index];
      if (culture) {
        ArcadeAudio.playSelect();
        router.push(culture.route);
      }
    },
    [router]
  );

  // Reset idle timer on any user activity
  const registerActivity = useCallback(() => {
    lastInteractionRef.current = Date.now();
    if (isAttractMode) {
      setIsAttractMode(false);
      ArcadeAudio.playSelect();
    }
  }, [isAttractMode]);

  // Unified Arcade Inputs Handler
  const handleInputs = useCallback(
    (currentInputs: ArcadeInputs) => {
      const prev = prevInputsRef.current;
      prevInputsRef.current = currentInputs;

      // Detect any active input to reset attract mode
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

      if (isAttractMode) return;

      // Edge-triggered navigation (only on press down, not hold)
      if (currentInputs.right && (!prev || !prev.right)) {
        ArcadeAudio.playNavMove();
        setSelectedIndex((prevIdx) => (prevIdx + 1) % CULTURES.length);
      } else if (currentInputs.left && (!prev || !prev.left)) {
        ArcadeAudio.playNavMove();
        setSelectedIndex((prevIdx) => (prevIdx - 1 + CULTURES.length) % CULTURES.length);
      } else if (currentInputs.down && (!prev || !prev.down)) {
        ArcadeAudio.playNavMove();
        setSelectedIndex((prevIdx) => (prevIdx + 2) % CULTURES.length);
      } else if (currentInputs.up && (!prev || !prev.up)) {
        ArcadeAudio.playNavMove();
        setSelectedIndex((prevIdx) => (prevIdx - 2 + CULTURES.length) % CULTURES.length);
      }

      // Action 1 (Button A): Launch
      if (currentInputs.action1 && (!prev || !prev.action1)) {
        launchGame(selectedIndex);
      }

      // Action 3 (Button X): Trigger Attract Mode manually
      if (currentInputs.action3 && (!prev || !prev.action3)) {
        setIsAttractMode(true);
      }
    },
    [isAttractMode, launchGame, registerActivity, selectedIndex]
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs);

  // Idle check timer for Attract Mode
  useEffect(() => {
    const interval = setInterval(() => {
      const idleTime = Date.now() - lastInteractionRef.current;
      if (idleTime >= IDLE_ATTRACT_TIMEOUT_MS && !isAttractMode) {
        setIsAttractMode(true);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isAttractMode]);

  return (
    <CRTOverlay exitHoldProgress={exitHoldProgress} hasGamepad={hasGamepad}>
      {/* Attract Mode Screensaver Overlay */}
      {isAttractMode && (
        <AttractMode
          cultures={CULTURES}
          onDismiss={() => {
            setIsAttractMode(false);
            registerActivity();
          }}
        />
      )}

      {/* Main Exhibition Hub Header */}
      <ArcadeHUD
        title="EXO-CULTURES ARCADE"
        subtitle="4 ALIEN CIVILIZATIONS • SELECT YOUR WORLD"
      />

      {/* Culture Selection Subtitle & Quick Hint */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-amber-400">
            [0{selectedIndex + 1}/04]
          </span>
          <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider">
            {CULTURES[selectedIndex].name} — {CULTURES[selectedIndex].title}
          </span>
        </div>
        <button
          onClick={() => setIsAttractMode(true)}
          className="text-[10px] font-mono text-cyan-400/80 hover:text-cyan-300 border border-cyan-800/80 hover:border-cyan-400 px-2 py-0.5 rounded transition-colors"
        >
          [X] PREVIEW REEL
        </button>
      </div>

      {/* 2x2 Grid of 4 Alien Civilizations (Optimized for 4:3 CRT Display) */}
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        {CULTURES.map((culture, index) => (
          <CultureCard
            key={culture.id}
            culture={culture}
            isSelected={index === selectedIndex}
            onSelect={() => setSelectedIndex(index)}
            onLaunch={() => launchGame(index)}
          />
        ))}
      </div>

      {/* Arcade Controls Footer (Joystick + Buttons Guide) */}
      <ArcadeControlsFooter />
    </CRTOverlay>
  );
}
