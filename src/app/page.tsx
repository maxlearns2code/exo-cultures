"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CultureCard, CultureInfo, ALIEN_CULTURE_METADATA } from "@/components/hub/CultureCard";
import { AttractMode } from "@/components/hub/AttractMode";
import { CRTOverlay, AttractionFXMode, AlienHubDesign } from "@/components/arcade/CRTOverlay";
import { ExpoDossierModal } from "@/components/hub/ExpoDossierModal";
import { TranslatorHubView } from "@/components/hub/views/TranslatorHubView";
import { GatewayHubView } from "@/components/hub/views/GatewayHubView";
import { SpecimenHubView } from "@/components/hub/views/SpecimenHubView";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";
import { Gamepad2, Play, Tv, Info, ArrowLeft, BookOpen } from "lucide-react";

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
    name: "Echoes in the Dark",
    author: "Martin",
    title: "Echoes in the Dark",
    subtitle: "3D Photonic LiDAR & Floral Resonance",
    route: "/games/martin",
    themeColor: "violet",
    status: "READY TO PLAY",
    description:
      "Navigate an extraterrestrial subterranean abyss using 3D photonic LiDAR echolocation. Charge floral beacons to bloom resonant flowers, defend them from viral spores, and summon your distant mate across the dark.",
    mechanics: ["3D LiDAR Echolocation", "Bloom Defense", "Photonic Scan"],
    imageSrc: "/assets/martin/echoes-in-the-dark.svg",
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

const IDLE_RETURN_TO_WELCOME_MS = 60000;
const ALIEN_GLYPHS = ["⍙", "⟒", "⌰", "☊", "⍜", "⋔", "⎎", "⏁", "⊑", "⌇", "▲", "◈", "⬡", "☵", "☲", "0x45", "0x58", "0x4F"];

export default function ArcadeLauncherHub() {
  const router = useRouter();

  // Navigation mode: "welcome" (Exhibition Presentation) vs "hub" (Cabinet Selection)
  const [viewMode, setViewMode] = useState<"welcome" | "hub">("welcome");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isAttractMode, setIsAttractMode] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  // Attraction Eye-Catcher FX Mode ("dual" | "flash" | "glitch" | "off")
  const [fxMode, setFxMode] = useState<AttractionFXMode>("dual");
  const [activeFXType, setActiveFXType] = useState<"flash" | "glitch" | null>(null);
  const [displayTitle, setDisplayTitle] = useState<string>("EXO-CULTURES");

  // Alien Hub Design Modes ("translator" | "gateway" | "specimen")
  const [hubDesign, setHubDesign] = useState<AlienHubDesign>("translator");

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

  // Trigger Eye-Catcher Animation: Phosphor Flash, Cryo-Glitch, or Dual Combo
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
      // First run cryo-glitch and text scramble, then burst with phosphor strobe flash!
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
      // Trigger instant live preview of the new mode
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

      // Action 4 [Y Button] opens the Expo Dossier from anywhere
      if (currentInputs.action4 && (!prev || !prev.action4)) {
        ArcadeAudio.playSelect();
        setIsDossierOpen(true);
        return;
      }

      // In Welcome Screen:
      if (viewMode === "welcome") {
        // [A] Button or START opens the Arcade Hub
        if ((currentInputs.action1 && (!prev || !prev.action1)) || (currentInputs.start && (!prev || !prev.start))) {
          enterHub();
        }
        // [X] Button manually tests the active eye-catcher FX
        if (currentInputs.action3 && (!prev || !prev.action3)) {
          triggerFX(fxMode);
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
    [enterHub, fxMode, isAttractMode, isDossierOpen, launchGame, registerActivity, selectedIndex, triggerFX, viewMode]
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs);

  // Periodic Eye-Catcher on Welcome Screen: Attracts visitors from across the exhibition room!
  useEffect(() => {
    if (viewMode !== "welcome" || isDossierOpen || fxMode === "off") return;

    const interval = setInterval(() => {
      const idleTime = Date.now() - lastInteractionRef.current;
      // Trigger flash/glitch pulse every 18 seconds of idle stillness
      if (idleTime >= 18000) {
        triggerFX(fxMode);
        // Refresh idle timer so it pulses periodically without accumulating
        lastInteractionRef.current = Date.now();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [fxMode, isDossierOpen, triggerFX, viewMode]);

  // Idle timeout: When away from the initial screen, return after 60s of inactivity
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
      theme={viewMode === "welcome" ? "black" : hubDesign === "gateway" ? "white" : "black"}
      hubDesign={hubDesign}
      onToggleHubDesign={handleToggleHubDesign}
    >
      {/* Dossier Modal Overlay */}
      <ExpoDossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />

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
      {/* 1. EXHIBITION PRESENTATION WELCOME SCREEN (STARK NEGATIVE B&W)     */}
      {/* =================================================================== */}
      {viewMode === "welcome" ? (
        <div className="flex-1 flex flex-col justify-between p-4 md:p-6 text-center select-none font-mono bg-black text-white relative">
          {/* Header Marquee */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center px-3 py-1 bg-white text-black border-2 border-white mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest">
                INTERGALACTIC WORLDS EXPO • WEEK 51, 2026 • HYPER ISLAND
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-[0.25em] text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              {displayTitle}
            </h1>
            <p className="text-xs text-neutral-300 tracking-wider mt-1">
              GROUP PAVILION: 4 SPECULATIVE ALIEN CIVILIZATIONS
            </p>
          </div>

          {/* Exhibition Statement Card (Negative Contrast Block) */}
          <div className="w-full max-w-lg mx-auto bg-black border-2 border-white p-5 md:p-6 shadow-[8px_8px_0px_#ffffff] flex flex-col items-center text-center my-auto">
            <div className="w-full flex items-center justify-between border-b-2 border-white/20 pb-2 mb-3 text-[11px]">
              <span className="text-white font-bold uppercase tracking-wider">
                TEAM CREATORS
              </span>
              <span className="text-white font-bold tracking-wide">
                Maxime • Aisah • Martin • Mana
              </span>
            </div>

            <p className="text-xs md:text-sm text-neutral-200 leading-relaxed mb-5">
              Welcome to the Earth pavilion of the <strong>Intergalactic Worlds Expo</strong>. Due to limited space, four neighbouring extraterrestrial civilizations have joined together to present their cultural fragments in a shared interactive installation. Step forward, choose an alien world, and explore their living environments, sensory languages, and dimensional gateways.
            </p>

            {/* Concept & Experience Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="flex items-center text-[10px] px-2.5 py-1 bg-black border-2 border-white text-white font-bold uppercase">
                4 Speculative Worlds
              </span>
              <span className="flex items-center text-[10px] px-2.5 py-1 bg-black border-2 border-white text-white font-bold uppercase">
                Joint Group Pavilion
              </span>
              <span className="flex items-center text-[10px] px-2.5 py-1 bg-black border-2 border-white text-white font-bold uppercase">
                Interactive Fragments
              </span>
            </div>

            {/* ACTION BUTTONS (Negative Black & White) */}
            <div className="w-full max-w-sm flex flex-col gap-2.5">
              <button
                onClick={enterHub}
                className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-white hover:bg-black text-black hover:text-white border-2 border-white font-bold text-xs md:text-sm tracking-[0.15em] uppercase shadow-[5px_5px_0px_#888888] transition-all cursor-pointer active:translate-x-1 active:translate-y-1"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>ENTER THE EXHIBITION [A]</span>
              </button>

              <button
                onClick={() => setIsDossierOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-black hover:bg-neutral-900 text-white border-2 border-white/60 hover:border-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>OUR PROCESS & EXPO DOSSIER [Y]</span>
              </button>
            </div>

            <span className="text-[10px] text-neutral-400 mt-2 font-mono">
              Press [A] to Enter • Press [Y] for Process • Press [X] to Test FX
            </span>
          </div>

          {/* Exhibition Footer */}
          <div className="text-[10px] text-neutral-400 border-t-2 border-white/20 pt-2 flex items-center justify-between">
            <span>HYPER ISLAND CAMPUS • WEEK 51, 2026</span>
            <span>EXHIBITION PAVILION</span>
          </div>
        </div>
      ) : (
        /* =================================================================== */
        /* 2. ARCADE CABINET 4-CULTURES SELECTION HUB (3 UNIQUE DESIGNS)      */
        /* =================================================================== */
        <>
          {hubDesign === "translator" && (
            <TranslatorHubView
              cultures={CULTURES}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
              onLaunch={launchGame}
              onOpenDossier={() => setIsDossierOpen(true)}
              onOpenAttract={() => setIsAttractMode(true)}
              onReturnToIntro={() => setViewMode("welcome")}
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
              onReturnToIntro={() => setViewMode("welcome")}
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
              onReturnToIntro={() => setViewMode("welcome")}
              onToggleDesign={handleToggleHubDesign}
            />
          )}
        </>
      )}
    </CRTOverlay>
  );
}
