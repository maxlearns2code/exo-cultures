"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";
import { Sparkles, Trophy, ArrowRight, Flame } from "lucide-react";

export type WavelengthColor = "cyan" | "magenta" | "amber" | "violet";

interface FloatingLeaf {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  va: number; // angular velocity
  color: WavelengthColor;
  awakened: boolean;
  absorbed: boolean;
  absorbProgress: number; // 0 to 1
  startX: number;
  startY: number;
  scale: number;
}

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

const WAVES = [
  {
    stage: 1,
    title: "Wave I: The Wavelength Awakening",
    subtitle: "Calm Sub-Ice Drift",
    targetResonance: 5,
    leafSpeed: 0.7,
    spawnInterval: 2800,
    colors: ["cyan", "magenta"] as WavelengthColor[],
  },
  {
    stage: 2,
    title: "Wave II: Hydrothermal Cryo-Drift",
    subtitle: "Rising Subterranean Currents",
    targetResonance: 7,
    leafSpeed: 1.1,
    spawnInterval: 2200,
    colors: ["cyan", "magenta", "amber"] as WavelengthColor[],
  },
  {
    stage: 3,
    title: "Wave III: The Abyssal Singularity",
    subtitle: "Dimensional Convergence",
    targetResonance: 9,
    leafSpeed: 1.4,
    spawnInterval: 1700,
    colors: ["cyan", "magenta", "amber", "violet"] as WavelengthColor[],
  },
];

export function ChromaticGame({ onReturnToHub }: ChromaticGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game Progress
  const [currentWave, setCurrentWave] = useState(0);
  const [score, setScore] = useState(0);
  const [portalResonance, setPortalResonance] = useState(0); // 0 to 100
  const [thermalWarmth, setThermalWarmth] = useState(100);
  const [activeWavelength, setActiveWavelength] = useState<WavelengthColor>("cyan");
  const [isMerged, setIsMerged] = useState(false);
  const [waveCleared, setWaveCleared] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Entities & Simulation Refs
  const imagesRef = useRef<{
    bg: HTMLImageElement | null;
    soil: HTMLImageElement | null;
    father: HTMLImageElement | null;
    tree: HTMLImageElement | null;
    smoke: HTMLImageElement | null;
    leftKid: HTMLImageElement | null;
    rightKid: HTMLImageElement | null;
    leaf: HTMLImageElement | null;
  }>({
    bg: null,
    soil: null,
    father: null,
    tree: null,
    smoke: null,
    leftKid: null,
    rightKid: null,
    leaf: null,
  });

  const playerPosRef = useRef({ x: 380, y: 380, vx: 0, vy: 0, angle: -Math.PI / 2 });
  const twinPosRef = useRef({ x: 440, y: 380, vx: 0, vy: 0 });
  const leavesRef = useRef<FloatingLeaf[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const activeWavelengthRef = useRef<WavelengthColor>("cyan");
  const isMergedRef = useRef(false);
  const thermalWarmthRef = useRef(100);
  const portalResonanceRef = useRef(0);
  const isEmittingBeamRef = useRef(false);
  const prevInputsRef = useRef<ArcadeInputs | null>(null);
  const lastSpawnTimeRef = useRef(0);
  const leavesAwakenedCountRef = useRef(0);

  // Preload all 8 Photoshop layers
  useEffect(() => {
    const layers = [
      { key: "bg", src: "/assets/chromatic-symbiosis/layers/background.png" },
      { key: "soil", src: "/assets/chromatic-symbiosis/layers/soil.png" },
      { key: "father", src: "/assets/chromatic-symbiosis/layers/father.png" },
      { key: "tree", src: "/assets/chromatic-symbiosis/layers/tree.png" },
      { key: "smoke", src: "/assets/chromatic-symbiosis/layers/smoke.png" },
      { key: "leftKid", src: "/assets/chromatic-symbiosis/layers/left-kid.png" },
      { key: "rightKid", src: "/assets/chromatic-symbiosis/layers/right-kid.png" },
      { key: "leaf", src: "/assets/chromatic-symbiosis/layers/leaf.png" },
    ];

    let loadedCount = 0;
    layers.forEach(({ key, src }) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        // @ts-expect-error dynamic assign
        imagesRef.current[key] = img;
        loadedCount++;
        if (loadedCount === layers.length) {
          setAssetsLoaded(true);
        }
      };
      img.onerror = () => {
        console.warn("Could not load image layer:", src);
        loadedCount++;
        if (loadedCount === layers.length) {
          setAssetsLoaded(true);
        }
      };
    });
  }, []);

  // Initialize or reset wave
  const startWave = useCallback((waveIndex: number) => {
    setCurrentWave(waveIndex);
    setPortalResonance(0);
    portalResonanceRef.current = 0;
    leavesAwakenedCountRef.current = 0;
    leavesRef.current = [];
    particlesRef.current = [];
    setWaveCleared(false);
    thermalWarmthRef.current = 100;
    setThermalWarmth(100);
    isMergedRef.current = false;
    setIsMerged(false);
    playerPosRef.current = { x: 380, y: 380, vx: 0, vy: 0, angle: -Math.PI / 2 };
    twinPosRef.current = { x: 440, y: 380, vx: 0, vy: 0 };
  }, []);

  // Handle Arcade Inputs
  const handleInputs = useCallback(
    (inputs: ArcadeInputs) => {
      const prev = prevInputsRef.current;
      prevInputsRef.current = inputs;

      // In victory/cleared screen: press [A] to advance
      if (waveCleared) {
        if (inputs.action1 && (!prev || !prev.action1)) {
          if (currentWave < WAVES.length - 1) {
            startWave(currentWave + 1);
          } else {
            setGameCompleted(true);
          }
        }
        return;
      }

      // Movement: Joystick or Arrows/WASD
      const speed = 3.2;
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

      // Action 2: Button B -> Cycle light frequency
      if (inputs.action2 && (!prev || !prev.action2)) {
        ArcadeAudio.playNavMove();
        const colors: WavelengthColor[] = ["cyan", "magenta", "amber"];
        const curIdx = colors.indexOf(activeWavelengthRef.current);
        const nextCol = colors[(curIdx + 1) % colors.length];
        activeWavelengthRef.current = nextCol;
        setActiveWavelength(nextCol);
      }

      // Action 3: Button X -> Whistle / Call twin brother to hold hands
      if (inputs.action3 && (!prev || !prev.action3)) {
        const nextMerged = !isMergedRef.current;
        isMergedRef.current = nextMerged;
        setIsMerged(nextMerged);
        ArcadeAudio.playHarmonizePulse();
      }

      // Action 4: Button Y -> Radial harmonic chime
      if (inputs.action4 && (!prev || !prev.action4)) {
        ArcadeAudio.playHarmonizePulse();
        // Awaken any close matching leaf
        leavesRef.current.forEach((leaf) => {
          const d = Math.hypot(leaf.x - playerPosRef.current.x, leaf.y - playerPosRef.current.y);
          if (d < 140) {
            leaf.awakened = true;
          }
        });
      }
    },
    [currentWave, startWave, waveCleared]
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs, onReturnToHub);

  // Main 60 FPS Game Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sprite Bounding Box Constants from layers
    const LEFT_KID_BOUNDS = { sx: 595, sy: 853, sw: 384, sh: 623 };
    const RIGHT_KID_BOUNDS = { sx: 371, sy: 852, sw: 384, sh: 623 };
    const LEAF_BOUNDS = { sx: 580, sy: 659, sw: 219, sh: 316 };

    // Portal tree center in 640x480 coordinate space
    const TREE_VORTEX_POS = { x: 490, y: 110 };
    // Father beacon center in 640x480 coordinate space
    const FATHER_BEACON_POS = { x: 190, y: 310 };

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
      lastTime = timestamp;

      const player = playerPosRef.current;
      const twin = twinPosRef.current;
      const imgs = imagesRef.current;
      const waveConfig = WAVES[currentWave];

      // 1. Update Player position (bounded to cavern floor & swimming space)
      player.x += player.vx;
      player.y += player.vy;
      player.x = Math.max(60, Math.min(580, player.x));
      player.y = Math.max(120, Math.min(440, player.y));

      // 2. Update Twin Brother Position
      if (isMergedRef.current) {
        // Holding hands: Locked beside player with glowing energy link
        const targetX = player.x + 36;
        const targetY = player.y;
        twin.x += (targetX - twin.x) * 0.25;
        twin.y += (targetY - twin.y) * 0.25;
      } else {
        // Unmerged: Smoothly follows player with soft inertia
        const dx = player.x - 45 - twin.x;
        const dy = player.y - twin.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 15) {
          twin.x += dx * 0.06;
          twin.y += dy * 0.06;
        }
      }

      // 3. Thermal Warmth Logic
      const distToFather = Math.hypot(player.x - FATHER_BEACON_POS.x, player.y - FATHER_BEACON_POS.y);
      if (distToFather < 110) {
        // Standing in Father's warm thermal aura: rapid recharge
        thermalWarmthRef.current = Math.min(100, thermalWarmthRef.current + 45 * dt);
      } else if (isMergedRef.current) {
        // Brothers holding hands generates familial warmth
        thermalWarmthRef.current = Math.min(100, thermalWarmthRef.current + 12 * dt);
      } else {
        // Cold ocean water slowly cools the player
        thermalWarmthRef.current = Math.max(0, thermalWarmthRef.current - 4 * dt);
      }
      setThermalWarmth(Math.round(thermalWarmthRef.current));

      // 4. Spawn Floating Autumn Leaves
      if (
        !waveCleared &&
        timestamp - lastSpawnTimeRef.current > waveConfig.spawnInterval &&
        leavesRef.current.length < 6
      ) {
        lastSpawnTimeRef.current = timestamp;
        const randomColor = waveConfig.colors[Math.floor(Math.random() * waveConfig.colors.length)];
        const startX = Math.random() * 380 + 160;
        const startY = 40;

        leavesRef.current.push({
          id: Math.random(),
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 15,
          vy: Math.random() * 20 + 25 * waveConfig.leafSpeed,
          angle: (Math.random() - 0.5) * 0.4,
          va: (Math.random() - 0.5) * 1.2,
          color: randomColor,
          awakened: false,
          absorbed: false,
          absorbProgress: 0,
          startX,
          startY,
          scale: 0.22,
        });
      }

      // 5. Update Leaves & Check Beam Collision
      const beamColor = isMergedRef.current ? "violet" : activeWavelengthRef.current;
      const isEmitting = isEmittingBeamRef.current;

      // Calculate beam vector
      const beamStartX = player.x;
      const beamStartY = player.y - 15;
      const beamAngle = player.angle;
      const beamEndX = beamStartX + Math.cos(beamAngle) * 280;
      const beamEndY = beamStartY + Math.sin(beamAngle) * 280;

      for (let i = leavesRef.current.length - 1; i >= 0; i--) {
        const leaf = leavesRef.current[i];

        if (!leaf.awakened) {
          // Drifting down on a gentle horizontal sine wave
          leaf.y += leaf.vy * dt;
          leaf.x += Math.sin(timestamp * 0.002 + leaf.id) * 35 * dt;
          leaf.angle += leaf.va * dt;

          // Check if beam intersects leaf
          if (isEmitting) {
            // Distance from point to line segment
            const toLX = leaf.x - beamStartX;
            const toLY = leaf.y - beamStartY;
            const proj = toLX * Math.cos(beamAngle) + toLY * Math.sin(beamAngle);

            if (proj > 0 && proj < 280) {
              const perpDist = Math.abs(toLX * Math.sin(beamAngle) - toLY * Math.cos(beamAngle));
              if (perpDist < 26) {
                // Check color match
                const match =
                  leaf.color === beamColor ||
                  (beamColor === "violet" && (leaf.color === "cyan" || leaf.color === "magenta"));

                if (match) {
                  leaf.awakened = true;
                  ArcadeAudio.playShrineAwaken();
                  setScore((prev) => prev + 200);

                  // Burst particles
                  for (let p = 0; p < 12; p++) {
                    const ang = Math.random() * Math.PI * 2;
                    const sp = Math.random() * 80 + 30;
                    particlesRef.current.push({
                      x: leaf.x,
                      y: leaf.y,
                      vx: Math.cos(ang) * sp,
                      vy: Math.sin(ang) * sp,
                      life: 0.5,
                      maxLife: 0.5,
                      color: leaf.color === "cyan" ? "#00f0ff" : leaf.color === "magenta" ? "#ff007f" : leaf.color === "amber" ? "#ffb703" : "#a855f7",
                      size: Math.random() * 3 + 2,
                    });
                  }
                }
              }
            }
          }

          // Despawn if fallen below bedrock
          if (leaf.y > 450) {
            leavesRef.current.splice(i, 1);
            continue;
          }
        } else {
          // AWAKENED LEAF: Flies straight towards the Living Portal Tree!
          leaf.absorbProgress += dt * 1.5;
          const targetX = TREE_VORTEX_POS.x;
          const targetY = TREE_VORTEX_POS.y;

          leaf.x += (targetX - leaf.x) * (dt * 4.5);
          leaf.y += (targetY - leaf.y) * (dt * 4.5);
          leaf.scale = Math.max(0.08, leaf.scale * (1 - dt * 0.8));
          leaf.angle += dt * 6;

          // Check if reached tree
          const distToTree = Math.hypot(leaf.x - targetX, leaf.y - targetY);
          if (distToTree < 25 || leaf.absorbProgress >= 1) {
            leavesRef.current.splice(i, 1);
            leavesAwakenedCountRef.current++;

            // Increase portal resonance
            const target = waveConfig.targetResonance;
            const progress = Math.min(100, Math.round((leavesAwakenedCountRef.current / target) * 100));
            portalResonanceRef.current = progress;
            setPortalResonance(progress);

            ArcadeAudio.playCrystalHit();

            // Check wave victory
            if (leavesAwakenedCountRef.current >= target && !waveCleared) {
              setWaveCleared(true);
              ArcadeAudio.playVictory();
              confetti({
                particleCount: 90,
                spread: 80,
                origin: { y: 0.35 },
              });
            }
          }
        }
      }

      // 6. Update Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      // =====================================================================
      // 7. RENDER ALL PHOTOSHOP LAYERS (Native 640x480 CRT Viewport)
      // =====================================================================
      ctx.clearRect(0, 0, 640, 480);

      // Layer 1: Background Cosmos & Ocean (`background.png`)
      if (imgs.bg) {
        ctx.drawImage(imgs.bg, 0, 0, 640, 480);
      } else {
        ctx.fillStyle = "#050914";
        ctx.fillRect(0, 0, 640, 480);
      }

      // Layer 2: Soil Bedrock (`soil.png`)
      if (imgs.soil) {
        ctx.drawImage(imgs.soil, 0, 0, 640, 480);
      }

      // Layer 3: The Living Portal Tree (`tree.png`)
      if (imgs.tree) {
        ctx.drawImage(imgs.tree, 0, 0, 640, 480);
      }

      // Dynamic Swirling Vortex Effect on Tree
      ctx.save();
      ctx.translate(TREE_VORTEX_POS.x, TREE_VORTEX_POS.y);
      const vortexPulse = Math.sin(timestamp * 0.005) * 5;
      const vortexGlow = ctx.createRadialGradient(0, 0, 5, 0, 0, 45 + vortexPulse);
      vortexGlow.addColorStop(0, "rgba(168, 85, 247, 0.85)");
      vortexGlow.addColorStop(0.5, "rgba(0, 240, 255, 0.4)");
      vortexGlow.addColorStop(1, "transparent");
      ctx.fillStyle = vortexGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 45 + vortexPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Layer 4: The Guiding Father (`father.png`)
      if (imgs.father) {
        ctx.drawImage(imgs.father, 0, 0, 640, 480);
      }

      // Father's Warm Thermal Aura (Pulsing Beacon)
      ctx.save();
      ctx.translate(FATHER_BEACON_POS.x, FATHER_BEACON_POS.y);
      const fPulse = Math.sin(timestamp * 0.003) * 8;
      const fAura = ctx.createRadialGradient(0, 0, 15, 0, 0, 95 + fPulse);
      fAura.addColorStop(0, "rgba(255, 183, 3, 0.4)");
      fAura.addColorStop(0.6, "rgba(255, 120, 0, 0.15)");
      fAura.addColorStop(1, "transparent");
      ctx.fillStyle = fAura;
      ctx.beginPath();
      ctx.arc(0, 0, 95 + fPulse, 0, Math.PI * 2);
      ctx.fill();

      // Core anchor icon & label
      ctx.font = "bold 8px monospace";
      ctx.fillStyle = "#ffb703";
      ctx.textAlign = "center";
      ctx.fillText("FATHER'S THERMAL CORE", 0, 45);
      ctx.restore();

      // Layer 5: Hydrothermal Mist / Smoke (`smoke.png` with screen blend mode)
      if (imgs.smoke) {
        ctx.save();
        ctx.globalAlpha = 0.55;
        ctx.globalCompositeOperation = "screen";
        // Gentle drift
        const smokeShift = Math.sin(timestamp * 0.0008) * 15;
        ctx.drawImage(imgs.smoke, smokeShift, 0, 640, 480);
        ctx.restore();
      }

      // Render Floating Autumn Leaves (`leaf.png`)
      for (const leaf of leavesRef.current) {
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);

        // Resonant frequency halo
        const colorHex =
          leaf.color === "cyan" ? "#00f0ff" : leaf.color === "magenta" ? "#ff007f" : leaf.color === "amber" ? "#ffb703" : "#a855f7";

        const leafGlow = ctx.createRadialGradient(0, 0, 4, 0, 0, 24);
        leafGlow.addColorStop(0, colorHex);
        leafGlow.addColorStop(1, "transparent");
        ctx.fillStyle = leafGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.fill();

        // Draw leaf sprite cropped from `leaf.png`
        if (imgs.leaf) {
          const dw = LEAF_BOUNDS.sw * leaf.scale;
          const dh = LEAF_BOUNDS.sh * leaf.scale;
          ctx.drawImage(
            imgs.leaf,
            LEAF_BOUNDS.sx,
            LEAF_BOUNDS.sy,
            LEAF_BOUNDS.sw,
            LEAF_BOUNDS.sh,
            -dw / 2,
            -dh / 2,
            dw,
            dh
          );
        }

        // Color frequency ring around leaf
        ctx.strokeStyle = colorHex;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      // Render Particles
      for (const p of particlesRef.current) {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render Light Beam from Player
      if (isEmitting) {
        ctx.save();
        const hex =
          beamColor === "cyan" ? "#00f0ff" : beamColor === "magenta" ? "#ff007f" : beamColor === "amber" ? "#ffb703" : "#a855f7";

        // Beam Outer Glow
        ctx.strokeStyle = hex;
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        ctx.shadowColor = hex;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(beamStartX, beamStartY);
        ctx.lineTo(beamEndX, beamEndY);
        ctx.stroke();

        // Beam Core Bright White
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(beamStartX, beamStartY);
        ctx.lineTo(beamEndX, beamEndY);
        ctx.stroke();
        ctx.restore();
      }

      // Render Twin Brother (Brother 2: `right-kid.png`)
      if (imgs.rightKid) {
        ctx.save();
        ctx.translate(twin.x, twin.y);
        const kidW = RIGHT_KID_BOUNDS.sw * 0.17;
        const kidH = RIGHT_KID_BOUNDS.sh * 0.17;

        // Magenta aura
        const tAura = ctx.createRadialGradient(0, -kidH / 2, 6, 0, -kidH / 2, 32);
        tAura.addColorStop(0, "rgba(255, 0, 127, 0.7)");
        tAura.addColorStop(1, "transparent");
        ctx.fillStyle = tAura;
        ctx.beginPath();
        ctx.arc(0, -kidH / 2, 32, 0, Math.PI * 2);
        ctx.fill();

        ctx.drawImage(
          imgs.rightKid,
          RIGHT_KID_BOUNDS.sx,
          RIGHT_KID_BOUNDS.sy,
          RIGHT_KID_BOUNDS.sw,
          RIGHT_KID_BOUNDS.sh,
          -kidW / 2,
          -kidH,
          kidW,
          kidH
        );
        ctx.restore();
      }

      // Render Player (Brother 1: `left-kid.png`)
      if (imgs.leftKid) {
        ctx.save();
        ctx.translate(player.x, player.y);
        const kidW = LEFT_KID_BOUNDS.sw * 0.17;
        const kidH = LEFT_KID_BOUNDS.sh * 0.17;

        // Active Wavelength Aura
        const pColor =
          activeWavelengthRef.current === "cyan" ? "#00f0ff" : activeWavelengthRef.current === "magenta" ? "#ff007f" : "#ffb703";

        const pAura = ctx.createRadialGradient(0, -kidH / 2, 6, 0, -kidH / 2, 36);
        pAura.addColorStop(0, pColor);
        pAura.addColorStop(1, "transparent");
        ctx.fillStyle = pAura;
        ctx.beginPath();
        ctx.arc(0, -kidH / 2, 36, 0, Math.PI * 2);
        ctx.fill();

        ctx.drawImage(
          imgs.leftKid,
          LEFT_KID_BOUNDS.sx,
          LEFT_KID_BOUNDS.sy,
          LEFT_KID_BOUNDS.sw,
          LEFT_KID_BOUNDS.sh,
          -kidW / 2,
          -kidH,
          kidW,
          kidH
        );

        // Aim Pointer
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -kidH / 2);
        ctx.lineTo(Math.cos(player.angle) * 22, -kidH / 2 + Math.sin(player.angle) * 22);
        ctx.stroke();

        ctx.restore();
      }

      // Resonance Arc when Brothers are Holding Hands
      if (isMergedRef.current) {
        ctx.save();
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 4;
        ctx.shadowColor = "#e879f9";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y - 25);
        ctx.lineTo(twin.x, twin.y - 25);
        ctx.stroke();

        ctx.font = "bold 8px monospace";
        ctx.fillStyle = "#e879f9";
        ctx.textAlign = "center";
        ctx.fillText("TWIN HARMONIZED (VIOLET)", (player.x + twin.x) / 2, player.y - 40);
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [currentWave, waveCleared]);

  const activeWaveConfig = WAVES[currentWave];

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
              CHROMATIC SYMBIOSIS
            </h1>
            <p className="text-[10px] font-mono text-neutral-400">
              {activeWaveConfig.title} • {activeWaveConfig.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          {/* Thermal Warmth Gauge */}
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] text-neutral-400 font-bold">WARMTH:</span>
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

          {/* Portal Resonance Meter */}
          <div className="flex items-center gap-1.5 bg-purple-950/40 border border-purple-500/50 px-2 py-0.5 rounded">
            <Sparkles className="w-3 h-3 text-purple-300" />
            <span className="text-[10px] text-purple-300 font-bold">PORTAL:</span>
            <span className="text-purple-200 font-bold">{portalResonance}%</span>
          </div>

          {/* Score */}
          <div className="bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded text-cyan-300 font-bold">
            SCORE: {score.toString().padStart(5, "0")}
          </div>
        </div>
      </div>

      {/* Main Canvas Viewport (640x480 native aspect) */}
      <div className="relative flex-1 flex items-center justify-center bg-black rounded border-2 border-neutral-800 overflow-hidden">
        {!assetsLoaded ? (
          <div className="flex flex-col items-center justify-center text-center p-6 font-mono text-cyan-400">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
            <span className="text-sm font-bold tracking-widest uppercase">
              LOADING CHROMATIC SYMBIOSIS LAYERS...
            </span>
          </div>
        ) : (
          <canvas ref={canvasRef} width={640} height={480} className="w-full h-full object-contain" />
        )}

        {/* Wave Cleared Celebration Modal */}
        {waveCleared && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center z-50 p-6 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border-2 border-amber-400 rounded-full mb-3">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                PORTAL VORTEX CHARGED!
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2">
              THE LIVING PORTAL TREE AWAKENS
            </h2>
            <p className="text-xs font-mono text-cyan-300 max-w-md mb-4 leading-relaxed">
              The warm autumn leaves resonated with your light frequencies. The subterranean portal surges with cosmic energy!
            </p>
            <button
              onClick={() => {
                if (currentWave < WAVES.length - 1) {
                  startWave(currentWave + 1);
                } else {
                  setGameCompleted(true);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs rounded shadow-lg animate-bounce"
            >
              <span>{currentWave < WAVES.length - 1 ? "NEXT WAVE [A]" : "EXHIBITION VICTORY [A]"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Exhibition Game Victory Modal */}
        {gameCompleted && (
          <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-6 text-center">
            <Sparkles className="w-12 h-12 text-amber-300 animate-spin mb-3" />
            <h2 className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-magenta-400 mb-2">
              ALL WAVES CONVERGED!
            </h2>
            <p className="text-xs font-mono text-neutral-300 max-w-md mb-4 leading-relaxed">
              Maxime&apos;s civilization has completed the chromocommunication ritual. The Living Portal Tree is permanently awakened, connecting Saturn&apos;s sub-ice abyss to the stars!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setGameCompleted(false);
                  startWave(0);
                }}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white font-mono text-xs rounded"
              >
                REPLAY WAVES
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

      {/* Bottom Arcade Controls & Wavelength Indicator */}
      <div className="mt-2 pt-2 border-t-2 border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[A]</span>
            <span>Emit Beam</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[B]</span>
            <span>Cycle Color (Active: <strong className="uppercase text-white">{activeWavelength}</strong>)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[X]</span>
            <span>{isMerged ? "Twins Linked (Violet)" : "Call Twin"}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[Y]</span>
            <span>Harmonic Pulse</span>
          </div>
        </div>
        <div className="text-neutral-500">
          Hold [SEL+START] 2s to Hub
        </div>
      </div>
    </div>
  );
}
