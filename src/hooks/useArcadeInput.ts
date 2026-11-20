"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface ArcadeInputs {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  action1: boolean; // Button A / Space / Z
  action2: boolean; // Button B / Enter / X
  action3: boolean; // Button X / Shift / C
  action4: boolean; // Button Y / KeyQ / V
  start: boolean;   // START / Escape / P
  select: boolean;  // SELECT / Tab
  exitCombo: boolean; // SELECT + START held together
}

const DEFAULT_INPUTS: ArcadeInputs = {
  up: false,
  down: false,
  left: false,
  right: false,
  action1: false,
  action2: false,
  action3: false,
  action4: false,
  start: false,
  select: false,
  exitCombo: false,
};

export function useArcadeInput(
  onInputStateChange?: (inputs: ArcadeInputs) => void,
  onExitCombo?: () => void
) {
  const [inputs, setInputs] = useState<ArcadeInputs>(DEFAULT_INPUTS);
  const [hasGamepad, setHasGamepad] = useState<boolean>(false);
  const [exitHoldProgress, setExitHoldProgress] = useState<number>(0);

  const inputsRef = useRef<ArcadeInputs>(DEFAULT_INPUTS);
  const keysDown = useRef<Set<string>>(new Set());
  const exitHoldStartRef = useRef<number | null>(null);
  const callbackRef = useRef(onInputStateChange);
  const exitCallbackRef = useRef(onExitCombo);

  useEffect(() => {
    callbackRef.current = onInputStateChange;
  }, [onInputStateChange]);

  useEffect(() => {
    exitCallbackRef.current = onExitCombo;
  }, [onExitCombo]);

  useEffect(() => {
    // 1. Keyboard Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid scrolling on arrow keys or space when playing
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }
      keysDown.current.add(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDown.current.delete(e.code);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // 2. Gamepad Polling Loop (60Hz)
    let animationId: number;
    const EXIT_HOLD_DURATION_MS = 2000;

    const poll = (timestamp: number) => {
      const gamepads = typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads() : [];
      let pad: Gamepad | null = null;
      for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
          pad = gamepads[i];
          break;
        }
      }

      setHasGamepad(Boolean(pad));

      const keys = keysDown.current;

      // Stick / D-Pad
      const padUp = pad ? pad.axes[1] < -0.4 || pad.buttons[12]?.pressed : false;
      const padDown = pad ? pad.axes[1] > 0.4 || pad.buttons[13]?.pressed : false;
      const padLeft = pad ? pad.axes[0] < -0.4 || pad.buttons[14]?.pressed : false;
      const padRight = pad ? pad.axes[0] > 0.4 || pad.buttons[15]?.pressed : false;

      // Buttons (8BitDo mapping standard)
      const btnA = pad?.buttons[0]?.pressed ?? false;
      const btnB = pad?.buttons[1]?.pressed ?? false;
      const btnX = pad?.buttons[2]?.pressed ?? false;
      const btnY = pad?.buttons[3]?.pressed ?? false;
      const btnSelect = pad?.buttons[8]?.pressed ?? false;
      const btnStart = pad?.buttons[9]?.pressed ?? false;

      // Exit combo detection:
      // Physical: SELECT + START held together
      // Keyboard: Escape held, or Backspace held, or Escape+Backspace
      const isExitPressed =
        (btnSelect && btnStart) ||
        (keys.has("Escape") && keys.has("Backspace")) ||
        keys.has("Backspace") ||
        keys.has("Escape");

      if (isExitPressed) {
        if (exitHoldStartRef.current === null) {
          exitHoldStartRef.current = timestamp;
        }
        const elapsed = timestamp - exitHoldStartRef.current;
        const progress = Math.min(1, elapsed / EXIT_HOLD_DURATION_MS);
        setExitHoldProgress(progress);

        if (progress >= 1) {
          if (exitCallbackRef.current) {
            exitCallbackRef.current();
          }
          exitHoldStartRef.current = null;
          setExitHoldProgress(0);
        }
      } else {
        exitHoldStartRef.current = null;
        setExitHoldProgress(0);
      }

      const state: ArcadeInputs = {
        up: padUp || keys.has("ArrowUp") || keys.has("KeyW"),
        down: padDown || keys.has("ArrowDown") || keys.has("KeyS"),
        left: padLeft || keys.has("ArrowLeft") || keys.has("KeyA"),
        right: padRight || keys.has("ArrowRight") || keys.has("KeyD"),
        action1: btnA || keys.has("Space") || keys.has("KeyZ"),
        action2: btnB || keys.has("Enter") || keys.has("KeyX"),
        action3: btnX || keys.has("ShiftLeft") || keys.has("KeyC"),
        action4: btnY || keys.has("KeyQ") || keys.has("KeyV"),
        start: btnStart || keys.has("Escape") || keys.has("KeyP"),
        select: btnSelect || keys.has("Tab"),
        exitCombo: isExitPressed,
      };

      inputsRef.current = state;
      setInputs(state);

      if (callbackRef.current) {
        callbackRef.current(state);
      }

      animationId = requestAnimationFrame(poll);
    };

    animationId = requestAnimationFrame(poll);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return { inputs, inputsRef, hasGamepad, exitHoldProgress };
}
