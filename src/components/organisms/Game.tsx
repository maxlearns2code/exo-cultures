"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GameHUD, GameModal, HelmetVisorOverlay } from "@/components/molecules";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { buildLidarWorld, FLOWER_NAMES } from "@/lib/lidar3d/level";
import {
  animateLidarWorld,
  emitLidarScan,
  LidarCallbacks,
  resolvePlayerCollision,
  updateLidarSimulation,
} from "@/lib/lidar3d/simulation";
import {
  createExplorerViewmodel,
  PaintMode,
  updateExplorerViewmodel,
} from "@/lib/lidar3d/viewmodel";
import { ArcadeAudio } from "@/utils/audio";

interface GameProps {
  onReturnToHub: () => void;
}

export function Game({ onReturnToHub }: GameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<"win" | "lose" | null>(null);
  const [mappedPoints, setMappedPoints] = useState<number>(0);
  const [lureProgress, setLureProgress] = useState<number>(0);
  const [paintMode, setPaintMode] = useState<PaintMode>("idle");
  const [bloomProgress, setBloomProgress] = useState<number>(0);
  const [systemMessage, setSystemMessage] = useState<string>("Click viewport to look around & paint lights with your tool");
  const [promptVisible, setPromptVisible] = useState<boolean>(false);
  const [activeSporesCount, setActiveSporesCount] = useState<number>(0);
  const [flowerStatus, setFlowerStatus] = useState<{ name: string; state: number; hp: number }[]>([
    { name: "Flower A", state: 0, hp: 100 },
    { name: "Flower B", state: 0, hp: 100 },
    { name: "Flower C", state: 0, hp: 100 },
    { name: "Flower D", state: 0, hp: 100 },
  ]);

  const arcadeInputsRef = useRef<ArcadeInputs | null>(null);

  const safeReturnToHub = useCallback(() => {
    if (typeof document !== "undefined" && document.exitPointerLock) {
      document.exitPointerLock();
    }
    ArcadeAudio.playCancel();
    onReturnToHub();
  }, [onReturnToHub]);

  const safeReturnToHubRef = useRef(safeReturnToHub);
  useEffect(() => {
    safeReturnToHubRef.current = safeReturnToHub;
  }, [safeReturnToHub]);

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
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current || undefined,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.05, 120);
    camera.rotation.order = "YXZ";
    scene.add(camera);

    const world = buildLidarWorld(scene);
    const viewmodel = createExplorerViewmodel(camera);
    const muzzleWorldPos = new THREE.Vector3();

    let sayTimeout: ReturnType<typeof setTimeout> | null = null;
    let latestBloomProgress = 0;
    let lastUiMode: PaintMode = "idle";
    let lastUiBloom = 0;

    const callbacks: LidarCallbacks = {
      onMessage: (text) => {
        setSystemMessage(text);
        if (sayTimeout) clearTimeout(sayTimeout);
        sayTimeout = setTimeout(() => setSystemMessage(""), 3500);
      },
      onSelectCue: () => ArcadeAudio.playSelect(),
      onPowerupCue: () => ArcadeAudio.playPowerup(),
      onSporeBurnCue: () => ArcadeAudio.playEnemyDefeat(),
      onPromptVisible: setPromptVisible,
      onLureProgress: setLureProgress,
      onBloomProgress: (progress) => {
        latestBloomProgress = progress;
      },
      onFinish: (win) => {
        setGameOver(win ? "win" : "lose");
        if (document.exitPointerLock) {
          document.exitPointerLock();
        }
      },
    };

    let px = 0;
    let pz = 9;
    let yaw = Math.PI;
    let pitch = 0;
    let scrollImpulse = 0;
    const keys: Record<string, boolean> = {};
    const mouse: boolean[] = [false, false, false];
    let isPointerLocked = false;

    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === renderer.domElement;
      isPointerLocked = locked;
      setIsLocked(locked);
      if (!locked) {
        mouse[0] = false;
        mouse[1] = false;
        mouse[2] = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPointerLocked) return;
      yaw -= e.movementX * 0.0022;
      pitch = Math.max(-1.45, Math.min(1.45, pitch - e.movementY * 0.0022));
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isPointerLocked) mouse[e.button] = true;
    };

    const handleMouseUp = (e: MouseEvent) => {
      mouse[e.button] = false;
    };

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    const handleWheel = (e: WheelEvent) => {
      const isTarget = isPointerLocked || (container && container.contains(e.target as Node));
      if (!isTarget || world.ended) return;
      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 30;
      else if (e.deltaMode === 2) delta *= 300;

      const clampedDelta = Math.max(-180, Math.min(180, delta));
      scrollImpulse = Math.max(-3.5, Math.min(3.5, scrollImpulse - clampedDelta * 0.007));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.code] = true;
      if (
        e.key === "Escape" ||
        e.code === "Escape" ||
        e.key === "b" ||
        e.key === "B" ||
        e.code === "KeyB" ||
        e.key === "Backspace" ||
        e.code === "Backspace"
      ) {
        safeReturnToHubRef.current();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.code] = false;
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("resize", handleResize);

    let animId: number;
    let lastTime = performance.now();
    let prevYaw = yaw;
    let prevPitch = pitch;

    function frame(ts: number) {
      animId = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (ts - lastTime) / 1000);
      lastTime = ts;
      world.now = ts;

      const prevPx = px;
      const prevPz = pz;
      let frameMode: PaintMode = "idle";

      const arc = arcadeInputsRef.current;
      if (arc && !world.ended) {
        const f = (arc.up ? 1 : 0) - (arc.down ? 1 : 0);
        const s = (arc.right ? 1 : 0) - (arc.left ? 1 : 0);
        if (f !== 0 || s !== 0) {
          const sp = 3.2 * dt;
          [px, pz] = resolvePlayerCollision(
            world.boxes,
            px + (-Math.sin(yaw) * f + Math.cos(yaw) * s) * sp,
            pz + (-Math.cos(yaw) * f - Math.sin(yaw) * s) * sp
          );
        }

        if (arc.action4) {
          frameMode = "focus";
        } else if (arc.action1 || arc.action3) {
          frameMode = "wide";
        }
      }

      if (isPointerLocked && !world.ended) {
        const f = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
        const s = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
        const sp = 3.2 * dt;

        px += (-Math.sin(yaw) * f + Math.cos(yaw) * s) * sp;
        pz += (-Math.cos(yaw) * f - Math.sin(yaw) * s) * sp;

        if (Math.abs(scrollImpulse) > 0.0001) {
          const step = scrollImpulse * Math.min(1, dt * 12);
          scrollImpulse -= step;
          px += -Math.sin(yaw) * step;
          pz += -Math.cos(yaw) * step;
        }

        [px, pz] = resolvePlayerCollision(world.boxes, px, pz);

        if (mouse[2] || keys.KeyQ) {
          frameMode = "focus";
        } else if (mouse[0] || keys.Space) {
          frameMode = "wide";
        }
      } else if (!world.ended && Math.abs(scrollImpulse) > 0.0001) {
        const step = scrollImpulse * Math.min(1, dt * 12);
        scrollImpulse -= step;
        [px, pz] = resolvePlayerCollision(
          world.boxes,
          px + -Math.sin(yaw) * step,
          pz + -Math.cos(yaw) * step
        );
      }

      camera.position.set(px, 1.6, pz);
      camera.rotation.set(pitch, yaw, 0);

      const isHoldingBloom = Boolean(
        isPointerLocked &&
          !world.ended &&
          (keys.KeyE || mouse[1] || (arc && (arc.action1 || arc.action3)))
      );
      if (isPointerLocked && !world.ended) {
        updateLidarSimulation(world, px, pz, dt, isHoldingBloom, callbacks);
      }
      if (latestBloomProgress > 0.01) {
        frameMode = "bloom";
      }

      const moveDist = Math.hypot(px - prevPx, pz - prevPz);
      const moveSpeed = dt > 0 ? moveDist / dt : 0;
      const yawVel = yaw - prevYaw;
      const pitchVel = pitch - prevPitch;
      prevYaw = yaw;
      prevPitch = pitch;

      updateExplorerViewmodel(viewmodel, {
        moveSpeed,
        yawVel,
        pitchVel,
        mode: frameMode,
        aspect: width / Math.max(1, height),
        bloomProgress: latestBloomProgress,
        time: ts / 1000,
        dt,
      });

      camera.updateMatrixWorld(true);
      viewmodel.muzzleAnchor.getWorldPosition(muzzleWorldPos);

      if (frameMode === "focus") {
        emitLidarScan(world, camera, Math.ceil(4500 * dt), 0.05, 1, callbacks, muzzleWorldPos);
      } else if (frameMode === "wide") {
        emitLidarScan(world, camera, Math.ceil(11000 * dt), 0.24, 0.12, callbacks, muzzleWorldPos);
      }

      if (frameMode !== lastUiMode) {
        lastUiMode = frameMode;
        setPaintMode(frameMode);
      }
      const roundedBloom = Math.round(latestBloomProgress * 20) / 20;
      if (roundedBloom !== lastUiBloom) {
        lastUiBloom = roundedBloom;
        setBloomProgress(roundedBloom);
      }

      setMappedPoints(world.totalCount);
      setActiveSporesCount(world.viruses.length);
      setFlowerStatus(
        world.flowers.map((f) => ({
          name: FLOWER_NAMES[f.i],
          state: f.state,
          hp: Math.max(0, Math.round(f.hp)),
        }))
      );

      animateLidarWorld(world, dt);
      renderer.render(scene, camera);
    }

    camera.position.set(px, 1.6, pz);
    camera.rotation.set(pitch, yaw, 0);
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      if (sayTimeout) clearTimeout(sayTimeout);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);

      viewmodel.dispose();
      world.geo.dispose();
      world.vgeo.dispose();
      world.beamFX.lineGeo.dispose();
      world.beamFX.lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleCanvasClick = () => {
    if (gameOver) {
      window.location.reload();
      return;
    }
    if (containerRef.current && canvasRef.current) {
      canvasRef.current.requestPointerLock?.();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden font-mono flex flex-col justify-between bg-[#010803] text-[#4ade80]"
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full cursor-crosshair z-0"
      />

      <HelmetVisorOverlay
        mode={paintMode}
        isLocked={isLocked}
        bloomProgress={bloomProgress}
      />

      <GameHUD
        lureProgress={lureProgress}
        isLocked={isLocked}
        gameOver={gameOver}
        systemMessage={systemMessage}
        promptVisible={promptVisible}
        flowerStatus={flowerStatus}
        activeSporesCount={activeSporesCount}
        mappedPoints={mappedPoints}
      />

      <GameModal
        gameOver={gameOver}
        onReturnToHub={safeReturnToHub}
        onRestart={() => window.location.reload()}
      />
    </div>
  );
}
