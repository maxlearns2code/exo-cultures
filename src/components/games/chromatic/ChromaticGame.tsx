"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";
import { Sparkles, Trophy, ArrowRight, Heart, Star, Flame } from "lucide-react";

export type WavelengthColor = "cyan" | "magenta" | "amber" | "violet";

interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  type: "ground" | "ice" | "brick" | "block";
  hasItem?: "leaf" | "star";
  isHit?: boolean;
  bumpOffset?: number;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  alive: boolean;
  squishTimer: number;
}

interface Fireball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  bounces: number;
  color: WavelengthColor;
}

interface WorldLeaf {
  id: number;
  x: number;
  y: number;
  vy: number;
  collected: boolean;
  color: WavelengthColor;
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

const LEVEL_LENGTH = 1920; // 3 screens wide Mario stage (640 * 3)

export function ChromaticGame({ onReturnToHub }: ChromaticGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mario Game State
  const [world, setWorld] = useState("1-1");
  const [score, setScore] = useState(0);
  const [leavesCount, setLeavesCount] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(300);
  const [activeWavelength, setActiveWavelength] = useState<WavelengthColor>("cyan");
  const [stageCleared, setStageCleared] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Layer Images
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

  // Player Physics (Mario Style)
  const playerRef = useRef({
    x: 80,
    y: 350,
    vx: 0,
    vy: 0,
    w: 28,
    h: 52,
    grounded: false,
    facing: "right" as "left" | "right",
    isSpinning: false,
    invincibleTimer: 0,
  });

  // Twin Brother Physics (Follows smoothly like Luigi/Tails!)
  const twinRef = useRef({
    x: 40,
    y: 350,
    vx: 0,
    vy: 0,
    grounded: false,
    facing: "right" as "left" | "right",
  });

  const cameraXRef = useRef(0);
  const platformsRef = useRef<Platform[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const fireballsRef = useRef<Fireball[]>([]);
  const worldLeavesRef = useRef<WorldLeaf[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const activeWavelengthRef = useRef<WavelengthColor>("cyan");
  const prevInputsRef = useRef<ArcadeInputs | null>(null);
  const lastFireTimeRef = useRef(0);

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

    let loaded = 0;
    layers.forEach(({ key, src }) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        // @ts-expect-error dynamic assign
        imagesRef.current[key] = img;
        loaded++;
        if (loaded >= layers.length) setAssetsLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= layers.length) setAssetsLoaded(true);
      };
    });
  }, []);

  // Build the Mario-style Stage Layout
  const initLevel = useCallback((stageNum: string) => {
    setWorld(stageNum);
    setStageCleared(false);
    setGameOver(false);
    setTimeLeft(300);

    // Reset player position
    playerRef.current = {
      x: 100,
      y: 350,
      vx: 0,
      vy: 0,
      w: 28,
      h: 52,
      grounded: false,
      facing: "right",
      isSpinning: false,
      invincibleTimer: 0,
    };
    twinRef.current = {
      x: 60,
      y: 350,
      vx: 0,
      vy: 0,
      grounded: false,
      facing: "right",
    };
    cameraXRef.current = 0;
    fireballsRef.current = [];
    particlesRef.current = [];

    // 1. Platforms & Mystery Blocks
    const platforms: Platform[] = [
      // Ground floor segments (with pitfalls!)
      { x: 0, y: 410, w: 680, h: 70, type: "ground" },
      { x: 740, y: 410, w: 560, h: 70, type: "ground" },
      { x: 1360, y: 410, w: 600, h: 70, type: "ground" },

      // Floating Ice Platforms & Mystery "?" Blocks
      // Section 1: Introduction to blocks
      { x: 260, y: 300, w: 36, h: 36, type: "block", hasItem: "coin" as unknown as undefined },
      { x: 310, y: 300, w: 36, h: 36, type: "block", hasItem: "leaf" },
      { x: 360, y: 300, w: 36, h: 36, type: "brick" },
      { x: 410, y: 300, w: 36, h: 36, type: "block", hasItem: "star" },

      // Section 2: Higher stair steps & elevated bridges
      { x: 480, y: 350, w: 70, h: 60, type: "ice" },
      { x: 550, y: 290, w: 70, h: 120, type: "ice" },
      { x: 760, y: 260, w: 120, h: 24, type: "ice" },
      { x: 920, y: 220, w: 140, h: 24, type: "ice" },
      { x: 960, y: 130, w: 36, h: 36, type: "block", hasItem: "leaf" },
      { x: 1100, y: 270, w: 100, h: 24, type: "ice" },

      // Section 3: Final Staircase towards the Living Portal Tree!
      { x: 1440, y: 360, w: 40, h: 50, type: "ice" },
      { x: 1480, y: 310, w: 40, h: 100, type: "ice" },
      { x: 1520, y: 260, w: 40, h: 150, type: "ice" },
      { x: 1560, y: 210, w: 40, h: 200, type: "ice" },
      { x: 1600, y: 160, w: 40, h: 250, type: "ice" },
    ];
    platformsRef.current = platforms;

    // 2. Enemies (Sub-ice Shadow Walkers / Goombas)
    const enemies: Enemy[] = [
      { id: 1, x: 400, y: 380, vx: -1.0, vy: 0, w: 28, h: 26, alive: true, squishTimer: 0 },
      { id: 2, x: 600, y: 380, vx: -1.0, vy: 0, w: 28, h: 26, alive: true, squishTimer: 0 },
      { id: 3, x: 820, y: 380, vx: -1.2, vy: 0, w: 28, h: 26, alive: true, squishTimer: 0 },
      { id: 4, x: 1020, y: 380, vx: -1.2, vy: 0, w: 28, h: 26, alive: true, squishTimer: 0 },
      { id: 5, x: 1200, y: 380, vx: -1.4, vy: 0, w: 28, h: 26, alive: true, squishTimer: 0 },
      { id: 6, x: 1400, y: 380, vx: -1.4, vy: 0, w: 28, h: 26, alive: true, squishTimer: 0 },
    ];
    enemiesRef.current = enemies;

    // 3. Floating Autumn Leaves
    worldLeavesRef.current = [];
  }, []);

  useEffect(() => {
    initLevel("1-1");
  }, [initLevel]);

  // Stage timer countdown
  useEffect(() => {
    if (stageCleared || gameOver) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stageCleared, gameOver]);

  // Unified Arcade Stick & Keyboard Input Handling (Mario Physics!)
  const handleInputs = useCallback(
    (inputs: ArcadeInputs) => {
      const prev = prevInputsRef.current;
      prevInputsRef.current = inputs;

      if (stageCleared) {
        if (inputs.action1 && (!prev || !prev.action1)) {
          initLevel("1-2");
        }
        return;
      }

      if (gameOver) {
        if (inputs.action1 && (!prev || !prev.action1)) {
          setLives(3);
          setScore(0);
          setLeavesCount(0);
          initLevel("1-1");
        }
        return;
      }

      const p = playerRef.current;

      // 1. Horizontal Movement & Dash Run
      const runSpeed = inputs.action2 ? 4.8 : 3.2; // Hold [B] to dash like Mario!
      if (inputs.left) {
        p.vx = -runSpeed;
        p.facing = "left";
      } else if (inputs.right) {
        p.vx = runSpeed;
        p.facing = "right";
      } else {
        p.vx *= 0.75; // Friction
        if (Math.abs(p.vx) < 0.1) p.vx = 0;
      }

      // 2. Button A: Jump (Hold for high floaty jump, tap for hop)
      if (inputs.action1 && (!prev || !prev.action1) && p.grounded) {
        p.vy = -12.5;
        p.grounded = false;
        ArcadeAudio.playNavMove();
      }

      // Variable jump height: release early to cut jump short
      if (!inputs.action1 && p.vy < -5) {
        p.vy *= 0.65;
      }

      // 3. Button B (Tap): Shoot Chromo-Fireball!
      if (inputs.action2 && (!prev || !prev.action2)) {
        const now = performance.now();
        if (now - lastFireTimeRef.current > 240) {
          lastFireTimeRef.current = now;
          const dir = p.facing === "right" ? 1 : -1;
          fireballsRef.current.push({
            x: p.x + (dir === 1 ? p.w + 4 : -4),
            y: p.y + p.h * 0.4,
            vx: dir * 7.5,
            vy: 2.0,
            bounces: 0,
            color: activeWavelengthRef.current,
          });
          ArcadeAudio.playBeamShoot(activeWavelengthRef.current);
        }
      }

      // 4. Button X: Twin High Spin Jump!
      if (inputs.action3 && (!prev || !prev.action3) && p.grounded) {
        p.vy = -14.5;
        p.grounded = false;
        p.isSpinning = true;
        ArcadeAudio.playHarmonizePulse();
      }

      // 5. Button Y: Cycle Fireball Wavelength
      if (inputs.action4 && (!prev || !prev.action4)) {
        ArcadeAudio.playNavMove();
        const colors: WavelengthColor[] = ["cyan", "magenta", "amber"];
        const curIdx = colors.indexOf(activeWavelengthRef.current);
        const nextCol = colors[(curIdx + 1) % colors.length];
        activeWavelengthRef.current = nextCol;
        setActiveWavelength(nextCol);
      }
    },
    [gameOver, initLevel, stageCleared]
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs, onReturnToHub);

  // 60 FPS Platformer Physics & Renderer
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sprite Bounding Box Constants from layers
    const LEFT_KID_BOUNDS = { sx: 595, sy: 853, sw: 384, sh: 623 };
    const RIGHT_KID_BOUNDS = { sx: 371, sy: 852, sw: 384, sh: 623 };
    const LEAF_BOUNDS = { sx: 580, sy: 659, sw: 219, sh: 316 };
    const TREE_BOUNDS = { sx: 272, sy: 129, sw: 770, sh: 888 };
    const FATHER_BOUNDS = { sx: 0, sy: 324, sw: 685, sh: 1152 };

    const gravity = 0.58;

    const loop = (timestamp: number) => {
      const p = playerRef.current;
      const twin = twinRef.current;
      const imgs = imagesRef.current;
      const platforms = platformsRef.current;
      const enemies = enemiesRef.current;

      // =====================================================================
      // 1. UPDATE PLAYER PHYSICS
      // =====================================================================
      p.vy += gravity;
      if (p.vy > 14) p.vy = 14; // Terminal velocity

      p.x += p.vx;
      p.y += p.vy;

      if (p.invincibleTimer > 0) p.invincibleTimer -= 0.016;

      // Platform Collision Detection
      p.grounded = false;
      for (const plat of platforms) {
        if (plat.bumpOffset && plat.bumpOffset > 0) {
          plat.bumpOffset = Math.max(0, plat.bumpOffset - 1.2);
        }

        // Horizontal Overlap
        if (p.x + p.w > plat.x && p.x < plat.x + plat.w) {
          // Landing on top of platform
          if (p.vy >= 0 && p.y + p.h >= plat.y && p.y + p.h - p.vy <= plat.y + 12) {
            p.y = plat.y - p.h;
            p.vy = 0;
            p.grounded = true;
            p.isSpinning = false;
          }
          // Hitting platform from below (Mario Head Bump!)
          else if (p.vy < 0 && p.y <= plat.y + plat.h && p.y - p.vy >= plat.y + plat.h - 12) {
            p.y = plat.y + plat.h;
            p.vy = 2; // Bounce down

            if ((plat.type === "block" || plat.type === "brick") && !plat.isHit) {
              plat.isHit = true;
              plat.bumpOffset = 8;
              ArcadeAudio.playCrystalHit();

              if (plat.hasItem === "leaf" || plat.hasItem === "star") {
                // Spawn floating leaf item!
                worldLeavesRef.current.push({
                  id: Math.random(),
                  x: plat.x + plat.w / 2 - 12,
                  y: plat.y - 30,
                  vy: -4,
                  collected: false,
                  color: plat.hasItem === "star" ? "amber" : "cyan",
                });
              } else {
                setScore((prev) => prev + 100);
              }
            }
          }
        }
      }

      // Check Pitfall Fall
      if (p.y > 480) {
        // Player fell in abyss
        ArcadeAudio.playCancel();
        setLives((prev) => {
          const next = prev - 1;
          if (next <= 0) setGameOver(true);
          return next;
        });
        p.x = Math.max(80, cameraXRef.current + 60);
        p.y = 200;
        p.vy = 0;
      }

      // =====================================================================
      // 2. UPDATE TWIN BROTHER (AI Companion following Mario!)
      // =====================================================================
      twin.vy += gravity;
      twin.x += twin.vx;
      twin.y += twin.vy;

      const targetX = p.facing === "right" ? p.x - 36 : p.x + 36;
      const dx = targetX - twin.x;
      if (Math.abs(dx) > 10) {
        twin.vx = Math.sign(dx) * Math.min(3.6, Math.abs(dx) * 0.15);
        twin.facing = Math.sign(dx) > 0 ? "right" : "left";
      } else {
        twin.vx *= 0.6;
      }

      // If player jumped, twin jumps with a slight delay
      if (!p.grounded && twin.grounded && Math.random() < 0.25) {
        twin.vy = -11.5;
        twin.grounded = false;
      }

      twin.grounded = false;
      for (const plat of platforms) {
        if (twin.x + p.w > plat.x && twin.x < plat.x + plat.w) {
          if (twin.vy >= 0 && twin.y + p.h >= plat.y && twin.y + p.h - twin.vy <= plat.y + 12) {
            twin.y = plat.y - p.h;
            twin.vy = 0;
            twin.grounded = true;
          }
        }
      }

      // =====================================================================
      // 3. UPDATE FIREBALLS
      // =====================================================================
      for (let i = fireballsRef.current.length - 1; i >= 0; i--) {
        const fb = fireballsRef.current[i];
        fb.vy += gravity * 0.8;
        fb.x += fb.vx;
        fb.y += fb.vy;

        // Bounce off platforms
        for (const plat of platforms) {
          if (fb.x > plat.x && fb.x < plat.x + plat.w) {
            if (fb.y >= plat.y && fb.y - fb.vy <= plat.y + 10) {
              fb.y = plat.y;
              fb.vy = -5.5; // Bounce up!
              fb.bounces++;
            }
          }
        }

        // Check enemy collision
        for (const en of enemies) {
          if (en.alive && Math.hypot(fb.x - (en.x + en.w / 2), fb.y - (en.y + en.h / 2)) < 24) {
            en.alive = false;
            en.squishTimer = 0.5;
            setScore((prev) => prev + 200);
            ArcadeAudio.playShrineAwaken();
            fb.bounces = 99; // Destroy fireball
          }
        }

        if (fb.bounces > 4 || fb.y > 480) {
          fireballsRef.current.splice(i, 1);
        }
      }

      // =====================================================================
      // 4. UPDATE ENEMIES
      // =====================================================================
      for (const en of enemies) {
        if (!en.alive) continue;
        en.vy += gravity;
        en.x += en.vx;
        en.y += en.vy;

        // Platform ground check
        for (const plat of platforms) {
          if (en.x + en.w > plat.x && en.x < plat.x + plat.w) {
            if (en.vy >= 0 && en.y + en.h >= plat.y && en.y + en.h - en.vy <= plat.y + 12) {
              en.y = plat.y - en.h;
              en.vy = 0;
            }
          }
        }

        // Reverse at edges
        if (en.x < 300 || en.x > LEVEL_LENGTH - 100) en.vx *= -1;

        // Player vs Enemy Collision
        if (p.x + p.w > en.x && p.x < en.x + en.w && p.y + p.h > en.y && p.y < en.y + en.h) {
          // Mario Stomp on enemy from above!
          if (p.vy > 0 && p.y + p.h - p.vy <= en.y + 16) {
            en.alive = false;
            en.squishTimer = 0.4;
            p.vy = -9.0; // Stomp bounce!
            setScore((prev) => prev + 250);
            ArcadeAudio.playNavMove();
          } else if (p.invincibleTimer <= 0) {
            // Player got hurt
            ArcadeAudio.playCancel();
            p.invincibleTimer = 2.0; // Invincibility flash
            setLives((prev) => {
              const next = prev - 1;
              if (next <= 0) setGameOver(true);
              return next;
            });
          }
        }
      }

      // =====================================================================
      // 5. UPDATE FLOATING LEAVES & POWER-UPS
      // =====================================================================
      for (let i = worldLeavesRef.current.length - 1; i >= 0; i--) {
        const leaf = worldLeavesRef.current[i];
        leaf.vy = Math.sin(timestamp * 0.003 + leaf.id) * 0.8;
        leaf.y += leaf.vy;

        // Collect Leaf
        if (Math.hypot(p.x + p.w / 2 - leaf.x, p.y + p.h / 2 - leaf.y) < 32) {
          worldLeavesRef.current.splice(i, 1);
          setLeavesCount((prev) => prev + 1);
          setScore((prev) => prev + 500);
          ArcadeAudio.playShrineAwaken();

          // Particle burst
          for (let k = 0; k < 12; k++) {
            particlesRef.current.push({
              x: leaf.x,
              y: leaf.y,
              vx: (Math.random() - 0.5) * 80,
              vy: (Math.random() - 0.5) * 80,
              life: 0.4,
              maxLife: 0.4,
              color: "#ffb703",
              size: Math.random() * 3 + 2,
            });
          }
        }
      }

      // =====================================================================
      // 6. FINISH LINE: REACH THE LIVING PORTAL TREE!
      // =====================================================================
      const treeFinishX = 1660;
      if (p.x >= treeFinishX && !stageCleared) {
        setStageCleared(true);
        ArcadeAudio.playVictory();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.4 },
        });
      }

      // =====================================================================
      // 7. CAMERA SCROLLING (Follows Mario across the level!)
      // =====================================================================
      const targetCamX = p.x - 220;
      cameraXRef.current = Math.max(0, Math.min(LEVEL_LENGTH - 640, targetCamX));
      const camX = cameraXRef.current;

      // Update Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx * 0.016;
        pt.y += pt.vy * 0.016;
        pt.life -= 0.016;
        if (pt.life <= 0) particlesRef.current.splice(i, 1);
      }

      // =====================================================================
      // 8. RENDER SCREEN (Native 640x480 CRT Display)
      // =====================================================================
      ctx.clearRect(0, 0, 640, 480);

      // A. Parallax Background (`background.png`)
      if (imgs.bg && imgs.bg.complete && imgs.bg.naturalWidth > 0) {
        // Parallax horizontal drift (0.3x camera speed)
        const bgOffset = -(camX * 0.3) % 640;
        ctx.drawImage(imgs.bg, bgOffset, 0, 640, 480);
        ctx.drawImage(imgs.bg, bgOffset + 640, 0, 640, 480);
      } else {
        ctx.fillStyle = "#060a18";
        ctx.fillRect(0, 0, 640, 480);
      }

      // Save context for camera translation
      ctx.save();
      ctx.translate(-camX, 0);

      // B. The Guiding Father standing at the stage start (`father.png`)
      if (imgs.father && imgs.father.complete && imgs.father.naturalWidth > 0) {
        const fatherW = FATHER_BOUNDS.sw * 0.38;
        const fatherH = FATHER_BOUNDS.sh * 0.38;
        ctx.drawImage(
          imgs.father,
          FATHER_BOUNDS.sx,
          FATHER_BOUNDS.sy,
          FATHER_BOUNDS.sw,
          FATHER_BOUNDS.sh,
          10,
          410 - fatherH,
          fatherW,
          fatherH
        );
      }

      // Father Warmth Core Aura
      ctx.save();
      const fGlow = ctx.createRadialGradient(80, 280, 10, 80, 280, 70);
      fGlow.addColorStop(0, "rgba(255, 183, 3, 0.45)");
      fGlow.addColorStop(1, "transparent");
      ctx.fillStyle = fGlow;
      ctx.beginPath();
      ctx.arc(80, 280, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // C. The Living Portal Tree at the finish line (`tree.png`)
      if (imgs.tree && imgs.tree.complete && imgs.tree.naturalWidth > 0) {
        const treeW = TREE_BOUNDS.sw * 0.42;
        const treeH = TREE_BOUNDS.sh * 0.42;
        ctx.drawImage(
          imgs.tree,
          TREE_BOUNDS.sx,
          TREE_BOUNDS.sy,
          TREE_BOUNDS.sw,
          TREE_BOUNDS.sh,
          1660,
          410 - treeH,
          treeW,
          treeH
        );
      }

      // Swirling Vortex Finish Gateway
      ctx.save();
      ctx.translate(1780, 220);
      const vPulse = Math.sin(timestamp * 0.006) * 6;
      const vGlow = ctx.createRadialGradient(0, 0, 4, 0, 0, 40 + vPulse);
      vGlow.addColorStop(0, "rgba(168, 85, 247, 0.9)");
      vGlow.addColorStop(0.5, "rgba(0, 240, 255, 0.5)");
      vGlow.addColorStop(1, "transparent");
      ctx.fillStyle = vGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 40 + vPulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("FINISH PORTAL", 0, -45);
      ctx.restore();

      // D. Render Platforms, Soil, and Mystery Blocks
      for (const plat of platforms) {
        const bump = plat.bumpOffset || 0;

        if (plat.type === "ground") {
          // Bedrock Soil layer (`soil.png`)
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(plat.x, plat.y + 14, plat.w, plat.h - 14);

          // Luminous blue crystal vein along surface
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(plat.x, plat.y);
          ctx.lineTo(plat.x + plat.w, plat.y);
          ctx.stroke();
        } else if (plat.type === "ice") {
          // Crystalline Ice Platform
          ctx.fillStyle = "rgba(14, 165, 233, 0.45)";
          ctx.strokeStyle = "#7dd3fc";
          ctx.lineWidth = 2;
          ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
          ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);
        } else if (plat.type === "block" || plat.type === "brick") {
          // Mario Style Mystery "?" Block / Brick
          const by = plat.y - bump;
          ctx.save();
          if (plat.isHit) {
            ctx.fillStyle = "#475569";
            ctx.strokeStyle = "#334155";
          } else {
            ctx.fillStyle = "#f59e0b";
            ctx.strokeStyle = "#fbbf24";
          }
          ctx.lineWidth = 2;
          ctx.fillRect(plat.x, by, plat.w, plat.h);
          ctx.strokeRect(plat.x, by, plat.w, plat.h);

          // Block icon
          ctx.font = "bold 18px monospace";
          ctx.fillStyle = plat.isHit ? "#94a3b8" : "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText(plat.isHit ? "•" : "?", plat.x + plat.w / 2, by + plat.h * 0.72);
          ctx.restore();
        }
      }

      // E. Render Floating Warm Leaves (`leaf.png`)
      for (const leaf of worldLeavesRef.current) {
        ctx.save();
        ctx.translate(leaf.x, leaf.y);

        if (imgs.leaf && imgs.leaf.complete && imgs.leaf.naturalWidth > 0) {
          const lw = LEAF_BOUNDS.sw * 0.16;
          const lh = LEAF_BOUNDS.sh * 0.16;
          ctx.drawImage(
            imgs.leaf,
            LEAF_BOUNDS.sx,
            LEAF_BOUNDS.sy,
            LEAF_BOUNDS.sw,
            LEAF_BOUNDS.sh,
            -lw / 2,
            -lh / 2,
            lw,
            lh
          );
        } else {
          ctx.fillStyle = "#ffb703";
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.strokeStyle = "#ffb703";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // F. Render Enemies (Cryo Stalkers / Goombas)
      for (const en of enemies) {
        if (!en.alive && en.squishTimer <= 0) continue;
        ctx.save();
        ctx.translate(en.x, en.y);

        if (!en.alive) {
          // Squished flat like a classic Goomba!
          ctx.fillStyle = "#475569";
          ctx.fillRect(0, en.h * 0.6, en.w, en.h * 0.4);
        } else {
          // Shadow creature body
          ctx.fillStyle = "#64748b";
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(en.w / 2, en.h / 2, en.w / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Glowing red alien eyes
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.arc(en.w * 0.35, en.h * 0.45, 3, 0, Math.PI * 2);
          ctx.arc(en.w * 0.65, en.h * 0.45, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // G. Render Fireballs
      for (const fb of fireballsRef.current) {
        ctx.save();
        const hex = fb.color === "cyan" ? "#00f0ff" : fb.color === "magenta" ? "#ff007f" : "#ffb703";
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = hex;
        ctx.lineWidth = 3;
        ctx.shadowColor = hex;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(fb.x, fb.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // H. Render Twin Brother (Magenta Companion: `right-kid.png`)
      ctx.save();
      ctx.translate(twin.x, twin.y);
      if (twin.facing === "left") {
        ctx.scale(-1, 1);
        ctx.translate(-p.w, 0);
      }

      if (imgs.rightKid && imgs.rightKid.complete && imgs.rightKid.naturalWidth > 0) {
        const kw = RIGHT_KID_BOUNDS.sw * 0.12;
        const kh = RIGHT_KID_BOUNDS.sh * 0.12;
        ctx.drawImage(
          imgs.rightKid,
          RIGHT_KID_BOUNDS.sx,
          RIGHT_KID_BOUNDS.sy,
          RIGHT_KID_BOUNDS.sw,
          RIGHT_KID_BOUNDS.sh,
          -kw / 4,
          -kh + p.h,
          kw,
          kh
        );
      } else {
        ctx.fillStyle = "#ff007f";
        ctx.fillRect(0, 0, p.w, p.h);
      }
      ctx.restore();

      // I. Render Player (Mario: Brother 1 `left-kid.png`)
      ctx.save();
      ctx.translate(p.x, p.y);

      // Invincibility flashing
      if (p.invincibleTimer > 0 && Math.floor(timestamp / 80) % 2 === 0) {
        ctx.globalAlpha = 0.3;
      }

      if (p.facing === "left") {
        ctx.scale(-1, 1);
        ctx.translate(-p.w, 0);
      }

      if (p.isSpinning) {
        ctx.rotate(timestamp * 0.02);
      }

      if (imgs.leftKid && imgs.leftKid.complete && imgs.leftKid.naturalWidth > 0) {
        const kw = LEFT_KID_BOUNDS.sw * 0.12;
        const kh = LEFT_KID_BOUNDS.sh * 0.12;
        ctx.drawImage(
          imgs.leftKid,
          LEFT_KID_BOUNDS.sx,
          LEFT_KID_BOUNDS.sy,
          LEFT_KID_BOUNDS.sw,
          LEFT_KID_BOUNDS.sh,
          -kw / 4,
          -kh + p.h,
          kw,
          kh
        );
      } else {
        ctx.fillStyle = "#00f0ff";
        ctx.fillRect(0, 0, p.w, p.h);
      }
      ctx.restore();

      // Particles
      for (const pt of particlesRef.current) {
        ctx.save();
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.life / pt.maxLife;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Restore camera translation
      ctx.restore();

      // Foreground Atmospheric Thermal Mist (`smoke.png` static/gentle drift)
      if (imgs.smoke && imgs.smoke.complete && imgs.smoke.naturalWidth > 0) {
        ctx.save();
        ctx.globalAlpha = 0.45;
        ctx.globalCompositeOperation = "screen";
        ctx.drawImage(imgs.smoke, 0, 0, 640, 480);
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between select-none relative font-mono">
      {/* Classic Mario-Style Arcade Top Status Bar */}
      <div className="flex items-center justify-between border-b-2 border-neutral-800 pb-2 mb-2 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToHub}
            className="px-2 py-0.5 bg-neutral-900 border-2 border-cyan-500/60 hover:border-cyan-400 text-cyan-300 font-bold rounded"
          >
            [ESC] HUB
          </button>
          <div>
            <span className="text-cyan-400 font-bold tracking-widest uppercase">BROTHERS</span>
            <div className="text-white font-bold tracking-wider">{score.toString().padStart(6, "0")}</div>
          </div>
        </div>

        {/* Leaves / Coins Counter */}
        <div className="flex items-center gap-1.5 text-amber-300 font-bold">
          <Star className="w-4 h-4 fill-current text-amber-400" />
          <span>× {leavesCount.toString().padStart(2, "0")}</span>
        </div>

        {/* World */}
        <div className="flex flex-col items-center">
          <span className="text-neutral-400 text-[10px] uppercase font-bold">WORLD</span>
          <span className="text-white font-bold">{world}</span>
        </div>

        {/* Time Left */}
        <div className="flex flex-col items-center">
          <span className="text-neutral-400 text-[10px] uppercase font-bold">TIME</span>
          <span className={`font-bold ${timeLeft < 60 ? "text-red-400 animate-pulse" : "text-white"}`}>
            {timeLeft.toString().padStart(3, "0")}
          </span>
        </div>

        {/* Lives (Hearts) */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-3.5 h-3.5 ${i < lives ? "fill-red-500 text-red-500" : "text-neutral-700"}`}
            />
          ))}
        </div>
      </div>

      {/* Main Mario Canvas Viewport */}
      <div className="relative flex-1 flex items-center justify-center bg-black rounded border-2 border-neutral-800 overflow-hidden">
        <canvas ref={canvasRef} width={640} height={480} className="w-full h-full object-contain" />

        {/* Loading Overlay */}
        {!assetsLoaded && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-6 text-cyan-400 z-30">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
            <span className="text-sm font-bold tracking-widest uppercase">
              LOADING SUB-ICE PLATFORMER ASSETS...
            </span>
          </div>
        )}

        {/* Stage Cleared Modal */}
        {stageCleared && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-6 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border-2 border-amber-400 rounded-full mb-3">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold text-amber-300 uppercase">COURSE CLEAR!</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              LIVING PORTAL TREE REACHED!
            </h2>
            <p className="text-xs text-cyan-300 max-w-md mb-4 leading-relaxed">
              The twin brothers navigated the sub-ice cavern and unlocked the ancient dimensional vortex!
            </p>
            <button
              onClick={() => initLevel("1-2")}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs rounded shadow-lg animate-bounce"
            >
              <span>NEXT WORLD [A]</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Game Over Modal */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-6 text-center">
            <h2 className="text-3xl font-bold text-red-500 mb-3 tracking-widest">GAME OVER</h2>
            <p className="text-xs text-neutral-400 mb-5">
              The sub-ice currents claimed the brothers. Press [A] to continue your quest!
            </p>
            <button
              onClick={() => {
                setLives(3);
                setScore(0);
                setLeavesCount(0);
                initLevel("1-1");
              }}
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs rounded shadow-md"
            >
              CONTINUE [A]
            </button>
          </div>
        )}
      </div>

      {/* Classic Mario-Style Arcade Controls Bar */}
      <div className="mt-2 pt-2 border-t-2 border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">JOYSTICK:</span>
            <span>Run Left/Right</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[A]</span>
            <span>Jump</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[B]</span>
            <span>Dash / Shoot Fireball</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[X]</span>
            <span>Spin Jump</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">[Y]</span>
            <span>Color (<strong className="uppercase text-white">{activeWavelength}</strong>)</span>
          </div>
        </div>
        <div className="text-neutral-500">
          Hold [SEL+START] 2s to Hub
        </div>
      </div>
    </div>
  );
}
