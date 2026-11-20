"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CultureCard, CultureInfo } from "@/components/hub/CultureCard";
import { AttractMode } from "@/components/hub/AttractMode";
import { CRTOverlay } from "@/components/arcade/CRTOverlay";
import { ArcadeHUD, ArcadeControlsFooter } from "@/components/arcade/ArcadeHUD";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";
import { Sparkles, Gamepad2, Play, Users, Tv, Compass, Info } from "lucide-react";

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
      "Deep in Saturn's ocean abyss, guide twin brothers running, jumping, and shooting light fireballs to gather warm autumn leaves and awaken the Living Portal Tree.",
    mechanics: ["Playable Platformer", "Mario-Style Physics", "Layered Artwork"],
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

const IDLE_ATTRACT_TIMEOUT_MS = 90000;

export default function ArcadeLauncherHub() {
  const router = useRouter();

  // Navigation mode: "welcome" (Exhibition Presentation) vs "hub" (Cabinet Selection)
  const [viewMode, setViewMode] = useState<"welcome" | "hub">("welcome");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isAttractMode, setIsAttractMode] = useState<boolean>(false);
  const lastInteractionRef = useRef<number>(Date.now());
  const prevInputsRef = useRef<ArcadeInputs | null>(null);

  const enterHub = useCallback(() => {
    ArcadeAudio.playSelect();
    setViewMode("hub");
  }, []);

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

  const registerActivity = useCallback(() => {
    lastInteractionRef.current = Date.now();
    if (isAttractMode) {
      setIsAttractMode(false);
      ArcadeAudio.playSelect();
    }
  }, [isAttractMode]);

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

      if (isAttractMode) return;

      // In Welcome Screen: Pressing [A] or START opens the Arcade Hub
      if (viewMode === "welcome") {
        if ((currentInputs.action1 && (!prev || !prev.action1)) || (currentInputs.start && (!prev || !prev.start))) {
          enterHub();
        }
        return;
      }

      // In Hub View: Navigation between culture cards
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

      // Action 1: Launch game
      if (currentInputs.action1 && (!prev || !prev.action1)) {
        launchGame(selectedIndex);
      }

      // Action 2: Return to Welcome Screen
      if (currentInputs.action2 && (!prev || !prev.action2)) {
        ArcadeAudio.playCancel();
        setViewMode("welcome");
      }

      // Action 3: Trigger Attract Mode
      if (currentInputs.action3 && (!prev || !prev.action3)) {
        setIsAttractMode(true);
      }
    },
    [enterHub, isAttractMode, launchGame, registerActivity, selectedIndex, viewMode]
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs);

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

      {/* =================================================================== */}
      {/* 1. EXHIBITION PRESENTATION WELCOME SCREEN                          */}
      {/* =================================================================== */}
      {viewMode === "welcome" ? (
        <div className="flex-1 flex flex-col justify-between p-4 md:p-6 text-center select-none font-mono relative">
          {/* Header Marquee */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/60 border-2 border-cyan-400/70 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
              <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-widest">
                EXHIBITION ARCADE CABINET • GALLERY SHOWCASE
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-magenta-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.7)]">
              EXO-CULTURES
            </h1>
            <p className="text-xs text-neutral-400 tracking-wider mt-1">
              4 SPECULATIVE ALIEN CIVILIZATIONS • 14&quot; CRT INSTALLATION
            </p>
          </div>

          {/* Exhibition Experience Statement Card */}
          <div className="w-full max-w-lg mx-auto bg-neutral-950/80 border-2 border-neutral-700 rounded-xl p-5 shadow-2xl flex flex-col items-center text-center my-auto">
            <div className="w-full flex items-center justify-between border-b-2 border-neutral-800 pb-2 mb-3 text-[11px] text-neutral-400">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Users className="w-4 h-4" />
                <span>TEAM CREATORS</span>
              </div>
              <span className="text-neutral-300 font-bold">
                Maxime • Aisah • Martin • Mana
              </span>
            </div>

            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-4">
              Welcome to our interactive exhibition experience! Powered by a <strong>Raspberry Pi 400</strong>, custom <strong>8BitDo arcade sticks</strong>, and authentic <strong>15kHz analog RGB CRT output</strong>, this installation lets visitors step into four extraordinary extraterrestrial worlds.
            </p>

            {/* Hardware & Spec Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 bg-neutral-900 border border-neutral-700 text-cyan-300 rounded font-bold">
                <Tv className="w-3 h-3 text-cyan-400" />
                14&quot; CRT TV (4:3 Native)
              </span>
              <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 bg-neutral-900 border border-neutral-700 text-amber-300 rounded font-bold">
                <Gamepad2 className="w-3 h-3 text-amber-400" />
                8BitDo Arcade Stick
              </span>
              <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 bg-neutral-900 border border-neutral-700 text-emerald-300 rounded font-bold">
                <Compass className="w-3 h-3 text-emerald-400" />
                Locked 60 FPS
              </span>
            </div>

            {/* PROMINENT CALL TO ACTION BUTTON */}
            <button
              onClick={enterHub}
              className="w-full max-w-sm flex items-center justify-center gap-2.5 py-3 px-6 bg-gradient-to-r from-cyan-400 via-amber-300 to-cyan-400 hover:brightness-110 text-black font-bold text-sm tracking-wider uppercase rounded-lg shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all animate-bounce cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>ENTER THE ARCADE CABINET</span>
            </button>
            <span className="text-[10px] text-neutral-500 mt-2 font-mono">
              Press [A] Button, Spacebar, or Click to Start
            </span>
          </div>

          {/* Exhibition Footer */}
          <div className="text-[10px] text-neutral-500 border-t-2 border-neutral-800 pt-2 flex items-center justify-between">
            <span>EXHIBITION INSTALLATION BUILD</span>
            <span>NEXT.JS APP ROUTER • VERCEL</span>
          </div>
        </div>
      ) : (
        /* =================================================================== */
        /* 2. ARCADE CABINET 4-CULTURES SELECTION HUB                          */
        /* =================================================================== */
        <>
          <ArcadeHUD
            title="EXO-CULTURES ARCADE"
            subtitle="4 ALIEN CIVILIZATIONS • SELECT YOUR WORLD"
          />

          {/* Subtitle Bar with Back to Exhibition Intro Button */}
          <div className="flex items-center justify-between mb-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400">
                [0{selectedIndex + 1}/04]
              </span>
              <span className="text-xs text-neutral-300 uppercase tracking-wider">
                {CULTURES[selectedIndex].name} — {CULTURES[selectedIndex].title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("welcome")}
                className="text-[10px] text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 px-2 py-0.5 rounded transition-colors flex items-center gap-1"
              >
                <Info className="w-3 h-3 text-cyan-400" />
                <span>EXHIBITION INTRO [B]</span>
              </button>
              <button
                onClick={() => setIsAttractMode(true)}
                className="text-[10px] text-cyan-400/80 hover:text-cyan-300 border border-cyan-800/80 hover:border-cyan-400 px-2 py-0.5 rounded transition-colors"
              >
                [X] PREVIEW REEL
              </button>
            </div>
          </div>

          {/* 2x2 Grid of 4 Alien Civilizations */}
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

          <ArcadeControlsFooter />
        </>
      )}
    </CRTOverlay>
  );
}
