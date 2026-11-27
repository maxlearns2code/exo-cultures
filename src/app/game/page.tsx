"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { CRTOverlay, Intro2DGame, Game } from "@/components";
import { useArcadeInput } from "@/hooks/useArcadeInput";
import { useIdleTimeout } from "@/hooks/useIdleTimeout";

export default function GamePage() {
  const router = useRouter();
  const [stage, setStage] = useState<"intro2d" | "game">("intro2d");

  const handleReturnToHub = useCallback(() => {
    if (typeof document !== "undefined" && document.exitPointerLock) {
      document.exitPointerLock();
    }
    router.push("/");
  }, [router]);

  // 5-minute idle timeout on /game: return to main page
  useIdleTimeout({
    enabled: true,
    onTimeout: handleReturnToHub,
  });

  // Keyboard shortcut [Escape] exits immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Escape") {
        handleReturnToHub();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleReturnToHub]);

  const { exitHoldProgress, hasGamepad } = useArcadeInput(undefined, handleReturnToHub);

  return (
    <CRTOverlay
      exitHoldProgress={exitHoldProgress}
      hasGamepad={hasGamepad}
      onClose={handleReturnToHub}
    >
      {stage === "intro2d" ? (
        <Intro2DGame
          onEnterBuilding={() => setStage("game")}
          onReturnToHub={handleReturnToHub}
        />
      ) : (
        <Game onReturnToHub={handleReturnToHub} />
      )}
    </CRTOverlay>
  );
}
