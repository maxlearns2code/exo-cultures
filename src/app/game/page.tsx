"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { CRTOverlay, Game } from "@/components";
import { useArcadeInput } from "@/hooks/useArcadeInput";

const IDLE_RETURN_TO_MAIN_MS = 5 * 60 * 1000; // 5 minutes of inactivity

export default function GamePage() {
  const router = useRouter();
  const lastInteractionRef = useRef<number>(Date.now());

  const handleReturnToHub = useCallback(() => {
    if (typeof document !== "undefined" && document.exitPointerLock) {
      document.exitPointerLock();
    }
    router.push("/");
  }, [router]);

  // 5-minute idle timeout on /game: return to main page
  useEffect(() => {
    const handleUserActivity = () => {
      lastInteractionRef.current = Date.now();
    };

    window.addEventListener("mousemove", handleUserActivity, { passive: true });
    window.addEventListener("mousedown", handleUserActivity, { passive: true });
    window.addEventListener("keydown", handleUserActivity, { passive: true });
    window.addEventListener("touchstart", handleUserActivity, { passive: true });
    window.addEventListener("wheel", handleUserActivity, { passive: true });

    const interval = setInterval(() => {
      const idleTime = Date.now() - lastInteractionRef.current;
      if (idleTime >= IDLE_RETURN_TO_MAIN_MS) {
        handleReturnToHub();
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("mousedown", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("wheel", handleUserActivity);
    };
  }, [handleReturnToHub]);

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
      <Game onReturnToHub={handleReturnToHub} />
    </CRTOverlay>
  );
}
