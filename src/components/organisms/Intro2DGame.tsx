"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArcadeAudio } from "@/utils/audio";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";

interface Intro2DGameProps {
  onEnterBuilding: () => void;
  onReturnToHub: () => void;
}

interface DustMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface FlowerSpot {
  x: number;
  phaseOffset: number;
  chimed: boolean;
}

const VIRTUAL_HEIGHT = 540;
const GROUND_Y = 426;
const WORLD_WIDTH = 1560;
const SHIP_X = 70;

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

    // Load 2D pixel-art assets
    const loadImg = (src: string) => {
      const img = new Image();
      img.src = src;
      return img;
    };

    const skyImg = loadImg("/assets/intro-2d/bg-sky.png");
    const ridgesImg = loadImg("/assets/intro-2d/bg-ridges.png");
    const groundImg = loadImg("/assets/intro-2d/fg-ground.png");
    const shipImg = loadImg("/assets/intro-2d/spaceship.png");
    const buildingImg = loadImg("/assets/intro-2d/alien-building.png");
    const flowerImg = loadImg("/assets/intro-2d/alien-flower.png");
    const explorerImg = loadImg("/assets/intro-2d/human-explorer.png");

    // Keyboard state
    const keys: Record<string, boolean> = {};
    const onKeyDown = (e: KeyboardEvent) => {
      keys[e.code] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys[e.code] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Resize handling keeping crisp pixel scaling
    let viewW = 960;
    const resize = () => {
      const cw = container.clientWidth || 960;
      const ch = container.clientHeight || 540;
      const aspect = cw / Math.max(1, ch);
      viewW = Math.round(VIRTUAL_HEIGHT * aspect);
      canvas.width = viewW;
      canvas.height = VIRTUAL_HEIGHT;
    };
    resize();
    window.addEventListener("resize", resize);

    // Player state: starts stepping down the ship's boarding ramp
    const rampStartX = 278;
    const rampEndX = 328;
    let px = rampStartX;
    let py = GROUND_Y - 26;
    let vx = 0;
    let vy = 0;
    let grounded = false;
    let introStepTimer = 0.75; // Brief guided step down the airlock ramp
    let facing: 1 | -1 = 1;
    let runDist = 0;
    let lastStepFrame = -1;
    let cameraX = 0;
    let time = 0;

    const flowers: FlowerSpot[] = [
      { x: 760, phaseOffset: 0.0, chimed: false },
    ];

    const motes: DustMote[] = Array.from({ length: 58 }, (_, i) => ({
      x: Math.random() * WORLD_WIDTH,
      y: 80 + Math.random() * (GROUND_Y - 90),
      vx: -12 - Math.random() * 18,
      vy: -4 + Math.random() * 8,
      size: i % 5 === 0 ? 3 : 2,
      alpha: 0.2 + Math.random() * 0.45,
      color: i % 9 === 0 ? "#86efac" : "#94a3b8",
    }));

    const spawnBurst = (x: number, y: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
        motes.push({
          x: x + (Math.random() - 0.5) * 18,
          y: y - Math.random() * 10,
          vx: (Math.random() - 0.5) * 42,
          vy: -16 - Math.random() * 32,
          size: 2,
          alpha: 0.75,
          color,
        });
      }
      if (motes.length > 95) {
        motes.splice(0, motes.length - 95);
      }
    };

    let lastTime = performance.now();
    let animId = 0;
    let uiTick = 0;

    const frame = (now: number) => {
      animId = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      time += dt;

      // Compute proportional landmark dimensions once loaded
      const shipH = 162;
      const shipW = shipImg.naturalWidth
        ? Math.round((shipImg.naturalWidth / shipImg.naturalHeight) * shipH)
        : 438;

      const bldgH = 408;
      const bldgW = buildingImg.naturalWidth
        ? Math.round((buildingImg.naturalWidth / buildingImg.naturalHeight) * bldgH)
        : 453;
      const buildingX = WORLD_WIDTH - bldgW;
      const doorCenterX = buildingX + bldgW * 0.62;
      const doorCenterY = GROUND_Y - 46;

      // Input & movement
      const arc = arcadeInputsRef.current;
      const moveLeft = Boolean(keys.KeyA || keys.ArrowLeft || arc?.left);
      const moveRight = Boolean(keys.KeyD || keys.ArrowRight || arc?.right);
      const jumpPressed = Boolean(
        keys.Space || keys.KeyW || keys.ArrowUp || arc?.action1
      );
      const sprint = Boolean(
        keys.ShiftLeft || keys.ShiftRight || arc?.action3
      );
      const interact = Boolean(keys.KeyE || keys.Enter || arc?.action1);

      if (introStepTimer > 0 && !enteredRef.current) {
        introStepTimer = Math.max(0, introStepTimer - dt);
        const progress = 1 - introStepTimer / 0.75;
        px = rampStartX + (rampEndX - rampStartX) * progress;
        py = GROUND_Y - 26 * (1 - progress);
        facing = 1;
        runDist += 140 * dt;
        if (introStepTimer === 0) {
          grounded = true;
          py = GROUND_Y;
        }
      } else if (!enteredRef.current) {
        const dir = (moveRight ? 1 : 0) - (moveLeft ? 1 : 0);
        const maxSpeed = sprint ? 310 : 225;
        const accel = grounded ? 1600 : 950;

        if (dir !== 0) {
          facing = dir > 0 ? 1 : -1;
          vx += dir * accel * dt;
          if (Math.abs(vx) > maxSpeed) vx = dir * maxSpeed;
        } else {
          const friction = grounded ? 1500 : 250;
          if (Math.abs(vx) <= friction * dt) vx = 0;
          else vx -= Math.sign(vx) * friction * dt;
        }

        if (jumpPressed && grounded) {
          vy = -420;
          grounded = false;
          spawnBurst(px, GROUND_Y, "#64748b", 5);
        }

        vy += 1180 * dt; // Gravity
        px += vx * dt;
        py += vy * dt;

        // Ramp / Ground collision
        const onRamp = px >= rampStartX - 10 && px <= rampEndX;
        const rampFloorY = onRamp
          ? GROUND_Y - 24 * (1 - Math.max(0, Math.min(1, (px - rampStartX) / (rampEndX - rampStartX))))
          : GROUND_Y;

        if (py >= rampFloorY) {
          if (!grounded && vy > 180) {
            spawnBurst(px, rampFloorY, "#64748b", 4);
            ArcadeAudio.playFootstep();
          }
          py = rampFloorY;
          vy = 0;
          grounded = true;
        } else {
          grounded = false;
        }

        // World bounds
        px = Math.max(120, Math.min(doorCenterX + 8, px));

        if (grounded && Math.abs(vx) > 20) {
          runDist += Math.abs(vx) * dt;
          const stepIdx = Math.floor(runDist / 56);
          if (stepIdx !== lastStepFrame) {
            lastStepFrame = stepIdx;
            ArcadeAudio.playFootstep();
            if (Math.random() < 0.65) {
              spawnBurst(px - facing * 8, py, "#475569", 2);
            }
          }
        }
      } else {
        // Fade/walk smoothly into the glowing doorway during transition
        px += (doorCenterX - px) * Math.min(1, dt * 6);
        py = GROUND_Y;
      }

      // Camera smooth follow
      const targetCamX = Math.max(
        0,
        Math.min(WORLD_WIDTH - viewW, px - viewW * 0.34)
      );
      cameraX += (targetCamX - cameraX) * Math.min(1, dt * 7.5);

      // Update flower chimes & story prompts
      for (let i = 0; i < flowers.length; i++) {
        const fl = flowers[i];
        const dist = Math.abs(px - fl.x);
        if (dist < 75 && !fl.chimed) {
          fl.chimed = true;
          ArcadeAudio.playFlowerChime(i);
          spawnBurst(fl.x, GROUND_Y - 38, "#f472b6", 6);
        }
      }

      const distToDoor = Math.max(0, doorCenterX - px);
      const isNear = distToDoor < 78;
      if (isNear && !enteredRef.current) {
        if (distToDoor < 24 || (interact && Math.abs(vx) < 250 && distToDoor < 64 && px > buildingX + 60)) {
          triggerBuildingEntry();
        }
      }

      uiTick++;
      if (uiTick % 5 === 0) {
        const meters = Math.max(0, Math.round(distToDoor / 9.5));
        setDistanceMeters(meters);
        setSignalStrength(
          Math.min(100, Math.max(6, Math.round(100 - (distToDoor / (doorCenterX - rampStartX)) * 94)))
        );
        setNearDoorway(isNear);
        if (!enteredRef.current) {
          if (px > 1050) {
            setStatusBanner("MONOLITH THRESHOLD AHEAD // ENTER PHOSPHOR PORTAL");
          } else if (px > 680) {
            setStatusBanner("RESONANT FLORA DETECTED // BUILDING AHEAD");
          } else if (px > 480) {
            setStatusBanner("ANOMALOUS SILHOUETTE IN VALLEY // KEEP MOVING EAST");
          }
        }
      }

      // Update ambient volcanic dust motes
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.x < 0) m.x = WORLD_WIDTH;
        if (m.x > WORLD_WIDTH) m.x = 0;
        if (m.y < 30 || m.y > GROUND_Y + 4) {
          m.y = 80 + Math.random() * (GROUND_Y - 100);
        }
      }

      // ======================== RENDER ========================
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = "#0a0d11";
      ctx.fillRect(0, 0, viewW, VIRTUAL_HEIGHT);

      // 1. Parallax Sky (0.08x scroll)
      if (skyImg.complete && skyImg.naturalWidth > 0) {
        const skyH = VIRTUAL_HEIGHT;
        const skyW = Math.round((skyImg.naturalWidth / skyImg.naturalHeight) * skyH);
        const scroll = ((cameraX * 0.08) % skyW + skyW) % skyW;
        for (let x = -scroll; x < viewW; x += skyW) {
          ctx.drawImage(skyImg, Math.round(x), 0, skyW, skyH);
        }
      }

      // 2. Parallax Volcanic Ridges + Integrated Ørgäæ Alien (0.30x scroll)
      if (ridgesImg.complete && ridgesImg.naturalWidth > 0) {
        const rScale = 0.72;
        const rW = Math.round(ridgesImg.naturalWidth * rScale);
        const rH = Math.round(ridgesImg.naturalHeight * rScale);
        const rY = GROUND_Y - Math.round(rH * 0.72);
        const scroll = ((cameraX * 0.30) % rW + rW) % rW;
        for (let x = -scroll; x < viewW; x += rW) {
          ctx.drawImage(ridgesImg, Math.round(x), rY, rW, rH);
        }
      }

      const pulseBeacon = 0.55 + 0.45 * Math.sin(time * 3.1);

      // 4. World Space Landmarks (1.0x scroll)
      ctx.save();
      ctx.translate(-Math.round(cameraX), 0);

      // 4a. Landed Spaceship
      if (shipImg.complete && shipImg.naturalWidth > 0) {
        const sy = GROUND_Y - shipH + 6;
        ctx.drawImage(shipImg, SHIP_X, sy, shipW, shipH);

        // Warm amber airlock light spill onto the ramp
        const hatchX = SHIP_X + shipW * 0.60;
        const hatchY = GROUND_Y - 38;
        const hatchPulse = 0.24 + 0.08 * Math.sin(time * 4.5);
        const hGrad = ctx.createRadialGradient(hatchX, hatchY, 4, hatchX + 20, GROUND_Y, 84);
        hGrad.addColorStop(0, `rgba(251, 191, 36, ${hatchPulse})`);
        hGrad.addColorStop(1, "rgba(217, 119, 6, 0)");
        ctx.fillStyle = hGrad;
        ctx.fillRect(hatchX - 60, hatchY - 40, 170, 120);

        // Blinking red telemetry beacon flush on roof pod
        if (Math.sin(time * 4.2) > 0.25) {
          ctx.fillStyle = "rgba(239, 68, 68, 0.85)";
          ctx.beginPath();
          ctx.arc(SHIP_X + shipW * 0.56, sy + 4, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4b. Jagged Spire Monolith Building + Radiant Phosphor Doorway (flush with right edge of world)
      if (buildingImg.complete && buildingImg.naturalWidth > 0) {
        const by = GROUND_Y - bldgH + 5;
        ctx.drawImage(buildingImg, buildingX, by, bldgW, bldgH);

        // Glowing phosphor-green doorway aura
        const portalGlow = ctx.createRadialGradient(
          doorCenterX,
          doorCenterY,
          8,
          doorCenterX,
          doorCenterY,
          175 + 25 * pulseBeacon
        );
        portalGlow.addColorStop(0, `rgba(187, 247, 208, ${0.42 + 0.18 * pulseBeacon})`);
        portalGlow.addColorStop(0.35, `rgba(74, 222, 128, ${0.24 + 0.1 * pulseBeacon})`);
        portalGlow.addColorStop(1, "rgba(34, 197, 94, 0)");
        ctx.fillStyle = portalGlow;
        ctx.fillRect(doorCenterX - 200, doorCenterY - 190, 400, 260);
      }

      // 4c. Foreground Walkable Ground Strip (tiled 1.0x)
      if (groundImg.complete && groundImg.naturalWidth > 0) {
        const gScale = 0.48;
        const gW = Math.round(groundImg.naturalWidth * gScale);
        const gH = Math.round(groundImg.naturalHeight * gScale);
        const gY = GROUND_Y - Math.round(32 * gScale);
        const startTile = Math.floor(cameraX / gW) * gW;
        for (let gx = startTile; gx < cameraX + viewW + gW; gx += gW) {
          ctx.drawImage(groundImg, gx, gY, gW, gH);
        }
      }

      // 4d. Pulsing Resonant Alien Flowers along the path
      if (flowerImg.complete && flowerImg.naturalWidth > 0) {
        const fw = flowerImg.naturalWidth / 4;
        const fh = flowerImg.naturalHeight;
        const drawFH = 66;
        const drawFW = Math.round((fw / fh) * drawFH);
        const seq = [0, 1, 2, 3, 2, 1];

        for (let i = 0; i < flowers.length; i++) {
          const fl = flowers[i];
          const nearBoost = Math.abs(px - fl.x) < 110 ? 1.8 : 1.0;
          const idx = seq[Math.floor((time * 4.5 * nearBoost + fl.phaseOffset) % seq.length)];
          const fx = Math.round(fl.x - drawFW / 2);
          const fy = GROUND_Y - drawFH + 5;

          // Subtle flower bioluminescence glow
          const glow = ctx.createRadialGradient(fl.x, fy + 22, 2, fl.x, fy + 22, 36);
          glow.addColorStop(0, "rgba(244, 114, 182, 0.22)");
          glow.addColorStop(1, "rgba(244, 114, 182, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(fl.x - 36, fy - 14, 72, 72);

          ctx.drawImage(flowerImg, idx * fw, 0, fw, fh, fx, fy, drawFW, drawFH);
        }
      }

      // 4e. Human Explorer Sprite
      if (explorerImg.complete && explorerImg.naturalWidth > 0) {
        const ew = explorerImg.naturalWidth / 5;
        const eh = explorerImg.naturalHeight;
        const drawEH = 92;
        const drawEW = Math.round((ew / eh) * drawEH);

        let frameIdx = 0;
        const isMoving = introStepTimer > 0 || (grounded && Math.abs(vx) > 25);
        if (!grounded && introStepTimer <= 0) {
          frameIdx = 1; // Stride pose mid-air
        } else if (isMoving) {
          frameIdx = 1 + (Math.floor(runDist / 28) % 4);
        }

        ctx.save();
        if (enteredRef.current) {
          ctx.globalAlpha = Math.max(0.15, 1 - (px - (doorCenterX - 35)) / 40);
        }
        ctx.translate(Math.round(px), Math.round(py));
        ctx.scale(facing, 1);

        // Ground shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.beginPath();
        ctx.ellipse(0, 1, 16, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.drawImage(
          explorerImg,
          frameIdx * ew,
          0,
          ew,
          eh,
          -Math.round(drawEW / 2),
          -drawEH + 4,
          drawEW,
          drawEH
        );
        ctx.restore();
      }

      // 4f. Atmospheric volcanic ash / spore motes
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        if (m.x < cameraX - 20 || m.x > cameraX + viewW + 20) continue;
        ctx.globalAlpha = m.alpha;
        ctx.fillStyle = m.color;
        ctx.fillRect(Math.round(m.x), Math.round(m.y), m.size, m.size);
      }
      ctx.globalAlpha = 1;

      ctx.restore();
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
      {/* 2D Pixel-Art Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ imageRendering: "pixelated" }}
      />

      {/* TOP HUD: Surface Telemetry & Beacon Distance */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 pt-8 sm:pt-2.5 p-2.5 md:p-3 backdrop-blur-sm bg-[#021207]/85 border-b-2 border-[#22c55e]/60">
        <div className="flex items-center gap-2.5 sm:pl-24">
          <div>
            <h1 className="text-[10px] md:text-xs font-bold tracking-wider uppercase arcade-text phosphor-text-glow">
              PART 1 // SURFACE EXPEDITION: ØRGÄÆ
            </h1>
            <p className="text-[9px] tracking-widest hidden sm:block mt-0.5 text-[#22c55e]/80">
              ANDROMEDA GAMAE CLUSTER • FOLLOW THE DISTANT LIGHT
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:pr-44">
          <div className="flex flex-col items-end gap-1 min-w-[130px] md:min-w-[180px]">
            <div className="flex items-center justify-between w-full text-[9px] font-bold">
              <span className="text-[#4ade80]">BEACON SIGNAL:</span>
              <span className="text-[#86efac]">{distanceMeters}m</span>
            </div>
            <div className="w-full h-2 rounded border overflow-hidden border-[#22c55e]/60 bg-[#010a04]">
              <div
                className="h-full transition-all duration-150 bg-gradient-to-r from-[#15803d] via-[#22c55e] to-[#86efac] shadow-[0_0_10px_rgba(74,222,128,0.6)]"
                style={{ width: `${signalStrength}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SYSTEM STATUS BANNER */}
      <div className="absolute top-20 sm:top-16 left-0 right-0 z-20 pointer-events-none flex justify-center px-4">
        <div className="px-4 py-1.5 rounded text-[10px] md:text-xs font-bold border bg-[#021509]/90 border-[#4ade80]/70 text-[#86efac] shadow-[0_0_16px_rgba(74,222,128,0.28)]">
          {statusBanner}
        </div>
      </div>

      {/* NEAR DOORWAY PROMPT */}
      {nearDoorway && !transitioning && (
        <div className="absolute bottom-20 left-0 right-0 z-20 pointer-events-none flex justify-center px-4">
          <div className="px-4 py-2 rounded text-xs font-bold animate-bounce bg-[#031d0c]/95 border-2 border-[#4ade80] text-[#86efac] shadow-[0_0_20px_rgba(74,222,128,0.45)]">
            WALK INTO THE PORTAL OR PRESS [E] / [A] TO ENTER
          </div>
        </div>
      )}

      {/* TRANSITION WASH INTO 3D GAME */}
      {transitioning && (
        <div className="absolute inset-0 z-40 bg-[#4ade80]/25 backdrop-blur-[2px] flex items-center justify-center animate-pulse">
          <div className="px-6 py-4 bg-[#021207]/95 border-2 border-[#86efac] text-center shadow-[0_0_40px_rgba(74,222,128,0.65)]">
            <p className="arcade-text text-xs md:text-sm text-[#86efac] phosphor-text-glow">
              ENTERING SUBTERRANEAN STRUCTURE
            </p>
            <p className="text-[10px] text-[#4ade80] mt-2 tracking-widest">
              CALIBRATING 3D PHOTONIC LIDAR...
            </p>
          </div>
        </div>
      )}

      {/* BOTTOM HUD */}
      <div className="relative z-20 p-2.5 backdrop-blur-sm flex flex-wrap items-center justify-between gap-2 text-[9px] md:text-[10px] bg-[#021207]/85 border-t border-[#22c55e]/50">
        <span className="font-bold text-[#86efac]/90">
          [A/D / ←→]: RUN • [SPACE / W]: JUMP • [SHIFT]: SPRINT • [B / ESC]: MENU
        </span>

        <button
          onClick={triggerBuildingEntry}
          className="px-2.5 py-1 border border-[#22c55e]/70 bg-[#031d0c] hover:bg-[#4ade80] hover:text-[#021206] text-[#86efac] font-bold transition-colors cursor-pointer"
        >
          [SKIP TO 3D LIDAR →]
        </button>
      </div>
    </div>
  );
}
