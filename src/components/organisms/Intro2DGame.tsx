"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Intro2DHUD } from "@/components/molecules";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { VIRTUAL_HEIGHT } from "@/lib/intro2d/constants";
import { loadIntro2DAssets, renderIntro2D } from "@/lib/intro2d/renderer";
import { createInitialIntro2DState, stepIntro2D } from "@/lib/intro2d/simulation";
import { ArcadeAudio } from "@/utils/audio";

interface Intro2DGameProps {
  onEnterBuilding: () => void;
  onReturnToHub: () => void;
}

export function Intro2DGame({ onEnterBuilding, onReturnToHub }: Intro2DGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const arcadeInputsRef = useRef<ArcadeInputs | null>(null);
  const enteredRef = useRef<boolean>(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [distanceMeters, setDistanceMeters] = useState<number>(115);
  const [signalStrength, setSignalStrength] = useState<number>(8);
  const [statusBanner, setStatusBanner] = useState<string>(
    "DISEMBARKING LANDER // UNKNOWN PHOSPHOR BEACON DETECTED EASTWARD"
  );
  const [nearDoorway, setNearDoorway] = useState<boolean>(false);
  const [transitioning, setTransitioning] = useState<boolean>(false);

  const safeReturnToHub = useCallback(() => {
    ArcadeAudio.playCancel();
    onReturnToHub();
  }, [onReturnToHub]);

  const triggerBuildingEntry = useCallback(() => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    setTransitioning(true);
    setStatusBanner("ENTERING MONOLITH // INITIALIZING 3D PHOTONIC LIDAR...");
    ArcadeAudio.playPhosphorFlash();
    ArcadeAudio.playPowerup();
    transitionTimerRef.current = setTimeout(() => {
      onEnterBuilding();
    }, 950);
  }, [onEnterBuilding]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const handleArcadeInput = useCallback(
    (inputs: ArcadeInputs) => {
      arcadeInputsRef.current = inputs;
      if (inputs.action2 || inputs.select) {
        safeReturnToHub();
      }
    },
    [safeReturnToHub]
  );

  useArcadeInput(handleArcadeInput, safeReturnToHub);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const assets = loadIntro2DAssets();
    const state = createInitialIntro2DState();
    const keys: Record<string, boolean> = {};

    const onKeyDown = (e: KeyboardEvent) => {
      keys[e.code] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys[e.code] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let viewW = 960;
    const resize = () => {
      const cw = container.clientWidth || 960;
      const ch = container.clientHeight || 540;
      viewW = Math.round(VIRTUAL_HEIGHT * (cw / Math.max(1, ch)));
      canvas.width = viewW;
      canvas.height = VIRTUAL_HEIGHT;
    };
    resize();
    window.addEventListener("resize", resize);

    let lastTime = performance.now();
    let animId = 0;
    let uiTick = 0;

    const frame = (now: number) => {
      animId = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const arc = arcadeInputsRef.current;
      const telemetry = stepIntro2D(
        state,
        assets,
        {
          moveLeft: Boolean(keys.KeyA || keys.ArrowLeft || arc?.left),
          moveRight: Boolean(keys.KeyD || keys.ArrowRight || arc?.right),
          jump: Boolean(keys.Space || keys.KeyW || keys.ArrowUp || arc?.action1),
          sprint: Boolean(keys.ShiftLeft || keys.ShiftRight || arc?.action3),
          interact: Boolean(keys.KeyE || keys.Enter || arc?.action1),
        },
        dt,
        viewW,
        enteredRef.current,
        {
          onFootstep: () => ArcadeAudio.playFootstep(),
          onFlowerChime: (idx) => ArcadeAudio.playFlowerChime(idx),
          onEnterDoor: triggerBuildingEntry,
        }
      );

      uiTick++;
      if (uiTick % 5 === 0) {
        setDistanceMeters(telemetry.distanceMeters);
        setSignalStrength(telemetry.signalStrength);
        setNearDoorway(telemetry.nearDoorway);
        if (telemetry.statusBanner) {
          setStatusBanner(telemetry.statusBanner);
        }
      }

      renderIntro2D(ctx, state, assets, viewW, enteredRef.current);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", resize);
    };
  }, [triggerBuildingEntry]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden font-mono flex flex-col justify-between bg-[#080a0d] text-[#4ade80]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ imageRendering: "pixelated" }}
      />

      <Intro2DHUD
        distanceMeters={distanceMeters}
        signalStrength={signalStrength}
        statusBanner={statusBanner}
        nearDoorway={nearDoorway}
        transitioning={transitioning}
        onSkipTo3D={triggerBuildingEntry}
      />
    </div>
  );
}
