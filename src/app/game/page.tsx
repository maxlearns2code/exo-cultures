"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CRTOverlay, Game } from "@/components";
import { AlienHubDesign } from "@/components/molecules/CalibrationBar";
import { useArcadeInput } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";

export default function GamePage() {
  const router = useRouter();
  const [hubDesign, setHubDesign] = useState<AlienHubDesign>("translator");

  const handleToggleHubDesign = useCallback(() => {
    ArcadeAudio.playAlienGlitch();
    setHubDesign((prev) => {
      const designs: AlienHubDesign[] = ["translator", "gateway", "specimen"];
      return designs[(designs.indexOf(prev) + 1) % designs.length];
    });
  }, []);

  // Keyboard shortcut [T] or [U] toggles theme in game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "t" || e.key === "T" || e.key === "u" || e.key === "U") {
        handleToggleHubDesign();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleToggleHubDesign]);

  const handleReturnToHub = () => {
    router.push("/");
  };

  const { exitHoldProgress, hasGamepad } = useArcadeInput(undefined, handleReturnToHub);

  return (
    <CRTOverlay
      exitHoldProgress={exitHoldProgress}
      hasGamepad={hasGamepad}
      hubDesign={hubDesign}
      onToggleHubDesign={handleToggleHubDesign}
      theme={hubDesign === "gateway" ? "white" : "black"}
    >
      <Game onReturnToHub={handleReturnToHub} theme={hubDesign} />
    </CRTOverlay>
  );
}
