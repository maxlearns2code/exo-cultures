"use client";

import { useEffect, useRef, useCallback } from "react";

const DEFAULT_IDLE_TIMEOUT_MS = 5 * 60 * 1000;

interface UseIdleTimeoutOptions {
  enabled: boolean;
  timeoutMs?: number;
  onTimeout: () => void;
  onActivity?: () => void;
}

/**
 * Tracks user pointer, keyboard, touch, and wheel activity and invokes `onTimeout`
 * once inactivity exceeds `timeoutMs` while `enabled` is true.
 */
export function useIdleTimeout({
  enabled,
  timeoutMs = DEFAULT_IDLE_TIMEOUT_MS,
  onTimeout,
  onActivity,
}: UseIdleTimeoutOptions) {
  const lastInteractionRef = useRef<number>(Date.now());
  const onTimeoutRef = useRef(onTimeout);
  const onActivityRef = useRef(onActivity);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    onActivityRef.current = onActivity;
  }, [onActivity]);

  const registerActivity = useCallback(() => {
    lastInteractionRef.current = Date.now();
    onActivityRef.current?.();
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      registerActivity();
    };

    window.addEventListener("mousemove", handleActivity, { passive: true });
    window.addEventListener("mousedown", handleActivity, { passive: true });
    window.addEventListener("keydown", handleActivity, { passive: true });
    window.addEventListener("touchstart", handleActivity, { passive: true });
    window.addEventListener("wheel", handleActivity, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("wheel", handleActivity);
    };
  }, [registerActivity]);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (Date.now() - lastInteractionRef.current >= timeoutMs) {
        onTimeoutRef.current();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [enabled, timeoutMs]);

  return { registerActivity };
}
