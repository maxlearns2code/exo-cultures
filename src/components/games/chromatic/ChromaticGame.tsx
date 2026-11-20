"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { LEVELS } from "./levels";
import { LevelData, WavelengthColor, BeamSegment, Shrine, Crystal } from "./types";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";
import { Sparkles, Trophy, RotateCcw, ArrowRight } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface ChromaticGameProps {
  onReturnToHub: () => void;
}

export function ChromaticGame({ onReturnToHub }: ChromaticGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [thermalWarmth, setThermalWarmth] = useState(100);
  const [activeWavelength, setActiveWavelength] = useState<WavelengthColor>("cyan");
  const [isMerged, setIsMerged] = useState(false);
  const [levelCleared, setLevelCleared] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Entities state
  const levelDataRef = useRef<LevelData>(JSON.parse(JSON.stringify(LEVELS[0])));
  const playerPosRef = useRef({ x: 260, y: 320, vx: 0, vy: 0, angle: -Math.PI / 2 });
  const twinPosRef = useRef({ x: 380, y: 320, vx: 0, vy: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const isEmittingBeamRef = useRef(false);
  const activeWavelengthRef = useRef<WavelengthColor>("cyan");
  const isMergedRef = useRef(false);
  const thermalWarmthRef = useRef(100);
  const prevInputsRef = useRef<ArcadeInputs | null>(null);

  // Reset or load level
  const loadLevel = useCallback((levelIdx: number) => {
    const base = LEVELS[levelIdx];
    if (!base) return;
    const freshLevel: LevelData = JSON.parse(JSON.stringify(base));
    levelDataRef.current = freshLevel;
    playerPosRef.current = {
      x: freshLevel.playerStart.x,
      y: freshLevel.playerStart.y,
      vx: 0,
      vy: 0,
      angle: -Math.PI / 2,
    };
    twinPosRef.current = {
      x: freshLevel.twinStart.x,
      y: freshLevel.twinStart.y,
      vx: 0,
      vy: 0,
    };
    setLevelCleared(false);
    thermalWarmthRef.current = 100;
    setThermalWarmth(100);
    isMergedRef.current = false;
    setIsMerged(false);
    particlesRef.current = [];
  }, []);

  // Initialize first level
  useEffect(() => {
    loadLevel(0);
  }, [loadLevel]);

  // Handle inputs
  const handleInputs = useCallback(
    (inputs: ArcadeInputs) => {
      const prev = prevInputsRef.current;
      prevInputsRef.current = inputs;

      // When level is cleared, pressing [A] advances to next level
      if (levelCleared) {
        if (inputs.action1 && (!prev || !prev.action1)) {
          if (currentLevelIndex < LEVELS.length - 1) {
            const nextIdx = currentLevelIndex + 1;
            setCurrentLevelIndex(nextIdx);
            loadLevel(nextIdx);
          } else {
            setGameCompleted(true);
          }
        }
        return;
      }

      // Movement: Joystick or WASD / Arrows
      const speed = 2.8;
      let vx = 0;
      let vy = 0;

      if (inputs.left) vx -= speed;
      if (inputs.right) vx += speed;
      if (inputs.up) vy -= speed;
      if (inputs.down) vy += speed;

      playerPosRef.current.vx = vx;
      playerPosRef.current.vy = vy;

      if (vx !== 0 || vy !== 0) {
        playerPosRef.current.angle = Math.atan2(vy, vx);
      }

      // Action 1: Button A -> Emit beam
      isEmittingBeamRef.current = inputs.action1;
      if (inputs.action1 && (!prev || !prev.action1)) {
        ArcadeAudio.playBeamShoot(isMergedRef.current ? "violet" : activeWavelengthRef.current);
      }

      // Action 2: Button B -> Cycle wavelength
      if (inputs.action2 && (!prev || !prev.action2)) {
        ArcadeAudio.playNavMove();
        const colors: WavelengthColor[] = ["cyan", "magenta", "amber"];
        const currentIdx = colors.indexOf(activeWavelengthRef.current);
        const nextColor = colors[(currentIdx + 1) % colors.length];
        activeWavelengthRef.current = nextColor;
        setActiveWavelength(nextColor);
      }

      // Action 3: Button X -> Harmonize with Twin / Hold hands
      if (inputs.action3 && (!prev || !prev.action3)) {
        const nextMerged = !isMergedRef.current;
        isMergedRef.current = nextMerged;
        setIsMerged(nextMerged);
        ArcadeAudio.playHarmonizePulse();
      }

      // Action 4: Button Y -> Quick Reset current level
      if (inputs.action4 && (!prev || !prev.action4)) {
        ArcadeAudio.playCancel();
        loadLevel(currentLevelIndex);
      }
    },
    [currentLevelIndex, levelCleared, loadLevel]
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs, onReturnToHub);

  // Main 60 FPS Game Loop
  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
      lastTime = timestamp;

      const level = levelDataRef.current;
      const player = playerPosRef.current;
      const twin = twinPosRef.current;

      // 1. Update Player position with boundary checks
      player.x += player.vx;
      player.y += player.vy;
      player.x = Math.max(30, Math.min(610, player.x));
      player.y = Math.max(30, Math.min(450, player.y));

      // 2. Update Twin Brother position
      if (isMergedRef.current) {
        // Holding hands: Follow tightly next to player
        const targetX = player.x + Math.cos(player.angle + Math.PI / 2) * 22;
        const targetY = player.y + Math.sin(player.angle + Math.PI / 2) * 22;
        twin.x += (targetX - twin.x) * 0.2;
        twin.y += (targetY - twin.y) * 0.2;
      } else {
        // Unmerged: Follow player with smooth spring damping
        const dx = player.x - twin.x;
        const dy = player.y - twin.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 50) {
          twin.x += dx * 0.04;
          twin.y += dy * 0.04;
        }
      }

      // 3. Thermal Warmth Logic
      // Check distance to Father
      const distToFather = Math.hypot(player.x - level.fatherPos.x, player.y - level.fatherPos.y);
      if (distToFather < 85) {
        // Inside father's warm aura
        thermalWarmthRef.current = Math.min(100, thermalWarmthRef.current + 35 * dt);
      } else if (isMergedRef.current) {
        // Brothers holding hands generates body heat
        thermalWarmthRef.current = Math.min(100, thermalWarmthRef.current + 10 * dt);
      } else {
        // In the dark ocean: slowly losing warmth
        thermalWarmthRef.current = Math.max(0, thermalWarmthRef.current - 3.5 * dt);
      }
      setThermalWarmth(Math.round(thermalWarmthRef.current));

      // 4. Raycast Light Beams
      const beamSegments: BeamSegment[] = [];

      if (isEmittingBeamRef.current) {
        const effectiveColor = isMergedRef.current ? "violet" : activeWavelengthRef.current;
        let curX = player.x;
        let curY = player.y;
        let curAngle = player.angle;
        let curColor = effectiveColor;
        let bounces = 0;
        const maxBounces = 3;

        while (bounces <= maxBounces) {
          // Cast ray forward
          let rayLength = 350;
          let hitEntity: { type: "crystal" | "shrine" | "father"; entity: unknown; hitX: number; hitY: number } | null = null;

          // Check hit against Father (amplifier)
          const fDist = Math.hypot(curX - level.fatherPos.x, curY - level.fatherPos.y);
          if (bounces === 0 && fDist > 25) {
            // Check line intersection with father's circle
            const fx = level.fatherPos.x;
            const fy = level.fatherPos.y;
            const toFatherX = fx - curX;
            const toFatherY = fy - curY;
            const proj = toFatherX * Math.cos(curAngle) + toFatherY * Math.sin(curAngle);
            if (proj > 0 && proj < rayLength) {
              const perpDist = Math.abs(toFatherX * Math.sin(curAngle) - toFatherY * Math.cos(curAngle));
              if (perpDist < 25) {
                rayLength = proj;
                hitEntity = { type: "father", entity: level.fatherPos, hitX: curX + Math.cos(curAngle) * proj, hitY: curY + Math.sin(curAngle) * proj };
              }
            }
          }

          // Check hit against Crystals
          for (const crystal of level.crystals) {
            const toCX = crystal.x - curX;
            const toCY = crystal.y - curY;
            const proj = toCX * Math.cos(curAngle) + toCY * Math.sin(curAngle);
            if (proj > 10 && proj < rayLength) {
              const perpDist = Math.abs(toCX * Math.sin(curAngle) - toCY * Math.cos(curAngle));
              if (perpDist < crystal.radius) {
                rayLength = proj;
                hitEntity = { type: "crystal", entity: crystal, hitX: curX + Math.cos(curAngle) * proj, hitY: curY + Math.sin(curAngle) * proj };
              }
            }
          }

          // Check hit against Shrines
          for (const shrine of level.shrines) {
            const toSX = shrine.x - curX;
            const toSY = shrine.y - curY;
            const proj = toSX * Math.cos(curAngle) + toSY * Math.sin(curAngle);
            if (proj > 10 && proj < rayLength) {
              const perpDist = Math.abs(toSX * Math.sin(curAngle) - toSY * Math.cos(curAngle));
              if (perpDist < shrine.radius) {
                rayLength = proj;
                hitEntity = { type: "shrine", entity: shrine, hitX: curX + Math.cos(curAngle) * proj, hitY: curY + Math.sin(curAngle) * proj };
              }
            }
          }

          const endX = curX + Math.cos(curAngle) * rayLength;
          const endY = curY + Math.sin(curAngle) * rayLength;

          beamSegments.push({
            startX: curX,
            startY: curY,
            endX,
            endY,
            color: curColor,
            intensity: 1 - bounces * 0.15,
          });

          // Add beam impact particles
          if (hitEntity && Math.random() < 0.6) {
            particlesRef.current.push({
              x: endX,
              y: endY,
              vx: (Math.random() - 0.5) * 60,
              vy: (Math.random() - 0.5) * 60,
              life: 0.3,
              maxLife: 0.3,
              color: curColor === "cyan" ? "#00f0ff" : curColor === "magenta" ? "#ff007f" : curColor === "violet" ? "#a855f7" : "#ffb703",
              size: Math.random() * 3 + 1,
            });
          }

          if (hitEntity) {
            if (hitEntity.type === "shrine") {
              const shrine = hitEntity.entity as Shrine;
              if (shrine.requiredColor === curColor) {
                shrine.charged = Math.min(100, shrine.charged + 40 * dt);
                if (shrine.charged >= 100 && !shrine.awakened) {
                  shrine.awakened = true;
                  ArcadeAudio.playShrineAwaken();
                  setScore((prev) => prev + 250);

                  // Check if all shrines awakened
                  const allAwakened = level.shrines.every((s) => s.awakened || s === shrine);
                  if (allAwakened) {
                    setLevelCleared(true);
                    ArcadeAudio.playVictory();
                    confetti({
                      particleCount: 80,
                      spread: 70,
                      origin: { y: 0.4 },
                    });
                  }
                }
              }
              break; // Beam stops at shrine
            } else if (hitEntity.type === "crystal") {
              const crystal = hitEntity.entity as Crystal;
              // Mirror reflection or Prism frequency shift
              curX = endX;
              curY = endY;
              if (crystal.type === "mirror") {
                // Reflect angle
                curAngle = Math.PI - curAngle;
              } else if (crystal.type === "prism") {
                // Prism: Shifts color or combines
                curColor = curColor === "cyan" ? "violet" : curColor === "magenta" ? "amber" : "cyan";
                curAngle += Math.PI / 4;
              }
              bounces++;
            } else if (hitEntity.type === "father") {
              // Father amplifies beam distance and intensity
              curX = endX;
              curY = endY;
              curColor = "violet";
              bounces++;
            }
          } else {
            break;
          }
        }
      }

      // 5. Update Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      // 6. RENDER CANVAS (Native 640x480 4:3)
      ctx.clearRect(0, 0, 640, 480);

      // A. Ocean Deep Background
      const bgGrad = ctx.createRadialGradient(320, 240, 40, 320, 240, 380);
      bgGrad.addColorStop(0, "#08162f");
      bgGrad.addColorStop(0.6, "#040b18");
      bgGrad.addColorStop(1, "#020409");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 640, 480);

      // B. Draw Obstacles (Ice walls)
      ctx.fillStyle = "#162842";
      ctx.strokeStyle = "#254876";
      ctx.lineWidth = 2;
      for (const obs of level.obstacles) {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
      }

      // C. Draw Living Portal Tree at top
      const treeAwakened = level.shrines.every((s) => s.awakened);
      ctx.save();
      ctx.translate(level.treePos.x, level.treePos.y);
      const treeGlow = ctx.createRadialGradient(0, 0, 10, 0, 0, 60);
      treeGlow.addColorStop(0, treeAwakened ? "rgba(255, 183, 3, 0.8)" : "rgba(0, 240, 255, 0.3)");
      treeGlow.addColorStop(1, "transparent");
      ctx.fillStyle = treeGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI * 2);
      ctx.fill();

      // Tree trunk & crystal branches
      ctx.strokeStyle = treeAwakened ? "#ffb703" : "#00f0ff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(0, -15);
      ctx.lineTo(-25, -35);
      ctx.moveTo(0, -15);
      ctx.lineTo(25, -35);
      ctx.stroke();

      ctx.font = "bold 9px monospace";
      ctx.fillStyle = treeAwakened ? "#ffb703" : "#80d0ff";
      ctx.textAlign = "center";
      ctx.fillText(treeAwakened ? "PORTAL ACTIVE" : "DORMANT PORTAL", 0, -45);
      ctx.restore();

      // D. Draw Father (Warm Beacon Anchor)
      ctx.save();
      ctx.translate(level.fatherPos.x, level.fatherPos.y);

      // Father's Warm Thermal Aura
      const auraPulse = Math.sin(timestamp * 0.003) * 6;
      const fatherAura = ctx.createRadialGradient(0, 0, 15, 0, 0, 80 + auraPulse);
      fatherAura.addColorStop(0, "rgba(255, 183, 3, 0.45)");
      fatherAura.addColorStop(0.5, "rgba(255, 120, 0, 0.2)");
      fatherAura.addColorStop(1, "transparent");
      ctx.fillStyle = fatherAura;
      ctx.beginPath();
      ctx.arc(0, 0, 80 + auraPulse, 0, Math.PI * 2);
      ctx.fill();

      // Father Body
      ctx.fillStyle = "#ffb703";
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "bold 8px monospace";
      ctx.fillStyle = "#ffde7d";
      ctx.textAlign = "center";
      ctx.fillText("FATHER (THERMAL ANCHOR)", 0, 26);
      ctx.restore();

      // E. Draw Crystals
      for (const crystal of level.crystals) {
        ctx.save();
        ctx.translate(crystal.x, crystal.y);
        ctx.fillStyle = crystal.type === "mirror" ? "#50e3c2" : "#a855f7";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;

        ctx.beginPath();
        // Diamond shape
        ctx.moveTo(0, -crystal.radius);
        ctx.lineTo(crystal.radius, 0);
        ctx.lineTo(0, crystal.radius);
        ctx.lineTo(-crystal.radius, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.font = "8px monospace";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText(crystal.type.toUpperCase(), 0, crystal.radius + 10);
        ctx.restore();
      }

      // F. Draw Frozen Leaf Shrines
      for (const shrine of level.shrines) {
        ctx.save();
        ctx.translate(shrine.x, shrine.y);

        const colorHex = shrine.requiredColor === "cyan" ? "#00f0ff" : shrine.requiredColor === "magenta" ? "#ff007f" : shrine.requiredColor === "amber" ? "#ffb703" : "#a855f7";

        // Aura
        const sAura = ctx.createRadialGradient(0, 0, 5, 0, 0, shrine.radius * (shrine.awakened ? 2.2 : 1.4));
        sAura.addColorStop(0, colorHex);
        sAura.addColorStop(1, "transparent");
        ctx.fillStyle = sAura;
        ctx.beginPath();
        ctx.arc(0, 0, shrine.radius * (shrine.awakened ? 2.2 : 1.4), 0, Math.PI * 2);
        ctx.fill();

        // Base ring
        ctx.strokeStyle = colorHex;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, shrine.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner charge meter arc
        if (shrine.charged > 0) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, shrine.radius - 4, -Math.PI / 2, -Math.PI / 2 + (shrine.charged / 100) * Math.PI * 2);
          ctx.stroke();
        }

        ctx.font = "bold 8px monospace";
        ctx.fillStyle = colorHex;
        ctx.textAlign = "center";
        ctx.fillText(shrine.name, 0, shrine.radius + 12);
        ctx.fillText(shrine.awakened ? "AWAKENED" : `${Math.round(shrine.charged)}%`, 0, 3);
        ctx.restore();
      }

      // G. Draw Beam Segments
      for (const b of beamSegments) {
        ctx.save();
        const hex = b.color === "cyan" ? "#00f0ff" : b.color === "magenta" ? "#ff007f" : b.color === "amber" ? "#ffb703" : "#a855f7";

        // Outer glow
        ctx.strokeStyle = hex;
        ctx.lineWidth = 6 * b.intensity;
        ctx.lineCap = "round";
        ctx.shadowColor = hex;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(b.startX, b.startY);
        ctx.lineTo(b.endX, b.endY);
        ctx.stroke();

        // Core bright line
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2 * b.intensity;
        ctx.beginPath();
        ctx.moveTo(b.startX, b.startY);
        ctx.lineTo(b.endX, b.endY);
        ctx.stroke();
        ctx.restore();
      }

      // H. Draw Particles
      for (const p of particlesRef.current) {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // I. Draw Twin Brother (Magenta)
      ctx.save();
      ctx.translate(twin.x, twin.y);
      const twinGlow = ctx.createRadialGradient(0, 0, 4, 0, 0, 24);
      twinGlow.addColorStop(0, "rgba(255, 0, 127, 0.7)");
      twinGlow.addColorStop(1, "transparent");
      ctx.fillStyle = twinGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ff007f";
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "bold 8px monospace";
      ctx.fillStyle = "#ff80bf";
      ctx.textAlign = "center";
      ctx.fillText("TWIN (MAGENTA)", 0, -14);
      ctx.restore();

      // J. Draw Player (Cyan)
      ctx.save();
      ctx.translate(player.x, player.y);
      const playerGlow = ctx.createRadialGradient(0, 0, 4, 0, 0, 28);
      playerGlow.addColorStop(0, "rgba(0, 240, 255, 0.8)");
      playerGlow.addColorStop(1, "transparent");
      ctx.fillStyle = playerGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.fill();

      // Direction indicator arrow
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(player.angle) * 16, Math.sin(player.angle) * 16);
      ctx.stroke();

      ctx.fillStyle = activeWavelengthRef.current === "cyan" ? "#00f0ff" : activeWavelengthRef.current === "magenta" ? "#ff007f" : "#ffb703";
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "bold 8px monospace";
      ctx.fillStyle = "#80f0ff";
      ctx.textAlign = "center";
      ctx.fillText("YOU (BROTHER 1)", 0, -15);
      ctx.restore();

      // Merged link line
      if (isMergedRef.current) {
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(twin.x, twin.y);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const activeLevel = LEVELS[currentLevelIndex];

  return (
    <div className="w-full h-full flex flex-col justify-between select-none relative">
      {/* Top Arcade HUD */}
      <div className="flex items-center justify-between border-b-2 border-neutral-800 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onReturnToHub}
            className="px-2 py-0.5 bg-neutral-900 border-2 border-cyan-500/60 hover:border-cyan-400 text-cyan-300 text-xs font-mono font-bold rounded"
          >
            [ESC] HUB
          </button>
          <div>
            <h1 className="text-sm font-bold font-mono text-cyan-400">
              CHROMATIC SYMBIOSIS: {activeLevel.name}
            </h1>
            <p className="text-[10px] font-mono text-neutral-400">
              CHAMBER {currentLevelIndex + 1} OF {LEVELS.length} • {activeLevel.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-neutral-400 font-bold">THERMAL:</span>
            <div className="w-20 h-2.5 bg-neutral-900 border border-neutral-700 rounded overflow-hidden">
              <div
                className={`h-full transition-all duration-150 ${
                  thermalWarmth < 30 ? "bg-red-500 animate-pulse" : thermalWarmth < 60 ? "bg-amber-400" : "bg-cyan-400"
                }`}
                style={{ width: `${thermalWarmth}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-300">{thermalWarmth}%</span>
          </div>

          <div className="bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded text-cyan-300 font-bold">
            SCORE: {score.toString().padStart(5, "0")}
          </div>
        </div>
      </div>

      {/* Canvas Viewport (640x480 aspect container) */}
      <div className="relative flex-1 flex items-center justify-center bg-black/90 rounded border-2 border-neutral-800 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="w-full h-full object-contain"
        />

        {/* Level Cleared Overlay */}
        {levelCleared && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-6 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border-2 border-amber-400 rounded-full mb-3">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                CHAMBER HARMONIZED!
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
              THE PORTAL TREE AWAKENS
            </h2>
            <p className="text-xs font-mono text-cyan-300 max-w-md mb-4">
              All leaf shrines in this chamber have resonated. The ancient subterranean frequency is restored!
            </p>
            <button
              onClick={() => {
                if (currentLevelIndex < LEVELS.length - 1) {
                  const next = currentLevelIndex + 1;
                  setCurrentLevelIndex(next);
                  loadLevel(next);
                } else {
                  setGameCompleted(true);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs rounded shadow-lg animate-bounce"
            >
              <span>{currentLevelIndex < LEVELS.length - 1 ? "NEXT CHAMBER [A]" : "EXHIBITION VICTORY [A]"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Game Completed Victory Overlay */}
        {gameCompleted && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-6 text-center">
            <Sparkles className="w-10 h-10 text-amber-300 animate-spin mb-3" />
            <h2 className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-magenta-400 mb-2">
              PORTAL NEXUS FULLY RESTORED!
            </h2>
            <p className="text-xs font-mono text-neutral-300 max-w-md mb-4">
              Maxime&apos;s alien civilization has completed the chromocommunication ritual. All 4 alien cultures are now connected through the dimensional gateway.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setGameCompleted(false);
                  setCurrentLevelIndex(0);
                  loadLevel(0);
                }}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white font-mono text-xs rounded"
              >
                PLAY AGAIN
              </button>
              <button
                onClick={onReturnToHub}
                className="px-4 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs rounded shadow-md"
              >
                RETURN TO ARCADE HUB
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Arcade Stick Bottom Status / Hotkeys */}
      <div className="mt-2 pt-2 border-t-2 border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[A]</span>
            <span>Emit Beam</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[B]</span>
            <span>Cycle Color (Active: <span className="uppercase font-bold text-white">{activeWavelength}</span>)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[X]</span>
            <span>{isMerged ? "Twin Linked (Violet)" : "Call Twin"}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[Y]</span>
            <span>Reset Chamber</span>
          </div>
        </div>
        <div className="text-neutral-500">
          Hold [SEL+START] to return to Hub
        </div>
      </div>
    </div>
  );
}
