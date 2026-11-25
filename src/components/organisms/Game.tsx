"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { ArcadeAudio } from "../../utils/audio";
import { useArcadeInput, ArcadeInputs } from "../../hooks/useArcadeInput";
import { GameHUD, GameModal, AlienHubDesign } from "@/components/molecules";

interface GameProps {
  onReturnToHub: () => void;
  theme?: AlienHubDesign;
}

interface FlowerState {
  x: number;
  z: number;
  i: number;
  state: number; // 0: uncharged, 1: charged, 2: blooming, 3: withered
  hp: number;
  bloomT: number;
  charge: number;
  g: THREE.Group;
  head: THREE.Group;
  pm: THREE.MeshBasicMaterial;
  warned: boolean;
  box: { min: number[]; max: number[]; t: number; hits: number };
}

interface Virus {
  p: number[];
  hp: number;
  ph: number;
}

export function Game({ onReturnToHub, theme = "translator" }: GameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game UI State
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<"win" | "lose" | null>(null);
  const [mappedPoints, setMappedPoints] = useState<number>(0);
  const [lureProgress, setLureProgress] = useState<number>(0);
  const [systemMessage, setSystemMessage] = useState<string>("Click anywhere on screen to look around & scan");
  const [promptVisible, setPromptVisible] = useState<boolean>(false);
  const [activeSporesCount, setActiveSporesCount] = useState<number>(0);
  const [flowerStatus, setFlowerStatus] = useState<
    { name: string; state: number; hp: number }[]
  >([
    { name: "Flower A", state: 0, hp: 100 },
    { name: "Flower B", state: 0, hp: 100 },
    { name: "Flower C", state: 0, hp: 100 },
    { name: "Flower D", state: 0, hp: 100 },
  ]);

  // Gamepad / Arcade Stick State
  const arcadeInputsRef = useRef<ArcadeInputs | null>(null);

  const safeReturnToHub = useCallback(() => {
    if (typeof document !== "undefined" && document.exitPointerLock) {
      document.exitPointerLock();
    }
    ArcadeAudio.playCancel();
    onReturnToHub();
  }, [onReturnToHub]);

  const handleArcadeInput = useCallback(
    (inputs: ArcadeInputs) => {
      arcadeInputsRef.current = inputs;
      // Single tap of Action 2 [B Button] or Select on 8BitDo stick immediately returns to menu
      if (inputs.action2 || inputs.select) {
        safeReturnToHub();
      }
    },
    [safeReturnToHub]
  );

  useArcadeInput(handleArcadeInput, safeReturnToHub);

  // Main Three.js Game Engine Lifecycle
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current || undefined,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.05, 120);
    camera.rotation.order = "YXZ";

    // Level Boxes (Invisible AABBs)
    interface LevelBox {
      min: number[];
      max: number[];
      t: number;
      hits: number;
      flower?: number;
    }

    const boxes: LevelBox[] = [];
    function B(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, t: number = 0): LevelBox {
      const b: LevelBox = { min: [x0, y0, z0], max: [x1, y1, z1], t: t || 0, hits: 0 };
      boxes.push(b);
      return b;
    }

    // Floor and Ceiling
    B(-12, -1, -12, 12, 0, 12);
    B(-12, 4, -12, 12, 5, 12);
    // Outer Bounds
    B(-13, 0, -13, 13, 4, -12);
    B(-13, 0, 12, 13, 4, 13);
    B(-13, 0, -13, -12, 4, 13);
    B(12, 0, -13, 13, 4, 13);
    // Interior Monoliths and Maze Dividers
    B(-12, 0, -3, -4, 4, -2.6);
    B(0, 0, -3, 12, 4, -2.6);
    B(3, 0, -12, 3.4, 4, -6);
    B(-4, 0, 3, -3.6, 4, 12);
    B(-1, 0, -8, 0.2, 4, -6.8);
    B(5, 0, 3, 6.2, 4, 4.2);
    B(-1, 0, 5, 0.2, 4, 6.2);
    B(7, 0, -1, 8.5, 1.2, 0.3);
    B(-9, 0, -1, -7.6, 0.9, 0.2);
    B(8, 0, 8, 9.4, 1.6, 9.4);
    B(-12, 0, -8, -10, 2, -6.4);

    // Flowers and Beacons
    const spots = [
      { f: [-6.5, -10], b: [-9.4, -9.4] },
      { f: [6.5, -10.5], b: [9, -9.5] },
      { f: [-10.5, 10], b: [-8, 7] },
      { f: [10.5, 10.5], b: [9.6, 5] },
    ];
    const names = ["Flower A", "Flower B", "Flower C", "Flower D"];

    const flowers: FlowerState[] = spots.map((s, i) => {
      const box = B(s.f[0] - 0.25, 0, s.f[1] - 0.25, s.f[0] + 0.25, 1.1, s.f[1] + 0.25, 2);
      const beacon = B(s.b[0], 0, s.b[1], s.b[0] + 0.8, 0.8, s.b[1] + 0.8, 1);
      beacon.flower = i;

      const g = new THREE.Group();
      g.position.set(s.f[0], 0, s.f[1]);
      g.visible = false;

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.04, 1.05, 6),
        new THREE.MeshBasicMaterial({ color: 0x2e9a54 })
      );
      stem.position.y = 0.52;
      g.add(stem);

      const head = new THREE.Group();
      head.position.y = 1.08;
      g.add(head);

      const pm = new THREE.MeshBasicMaterial({ color: 0xff5fa8 });
      for (let k = 0; k < 7; k++) {
        const p = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), pm);
        p.scale.set(1, 0.3, 1.9);
        const a = (k / 7) * 6.283;
        p.position.set(Math.cos(a) * 0.17, 0, Math.sin(a) * 0.17);
        p.rotation.y = -a;
        head.add(p);
      }
      head.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 8, 6),
          new THREE.MeshBasicMaterial({ color: 0xffe27a })
        )
      );

      scene.add(g);
      return {
        x: s.f[0],
        z: s.f[1],
        i,
        state: 0,
        hp: 100,
        bloomT: 0,
        charge: 0,
        g,
        head,
        pm,
        warned: false,
        box,
      };
    });

    // Permanent LiDAR Point Cloud
    const MAX = 220000;
    let headIdx = 0;
    let totalCount = 0;
    const pos = new Float32Array(MAX * 3);
    const col = new Float32Array(MAX * 3);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setDrawRange(0, 0);

    const pts = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ size: 0.045, vertexColors: true, sizeAttenuation: true })
    );
    pts.frustumCulled = false;
    scene.add(pts);

    // Spore Points (Short-lived viral particles)
    const VMAX = 4000;
    let vh = 0;
    const vpos = new Float32Array(VMAX * 3);
    const vcol = new Float32Array(VMAX * 3);
    const vbirth = new Float32Array(VMAX).fill(-1e9);

    const vgeo = new THREE.BufferGeometry();
    vgeo.setAttribute("position", new THREE.BufferAttribute(vpos, 3));
    vgeo.setAttribute("color", new THREE.BufferAttribute(vcol, 3));

    const vpts = new THREE.Points(
      vgeo,
      new THREE.PointsMaterial({ size: 0.08, vertexColors: true, sizeAttenuation: true })
    );
    vpts.frustumCulled = false;
    scene.add(vpts);

    // Mate: Pale ethereal sphere floating in from the outer abyss
    const mate = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xfff2c8 })
    );
    scene.add(mate);

    // Raycasting Ray Data
    const o = [0, 0, 0];
    const d = [0, 0, 0];
    let hitAx = 0;
    let hitBox: LevelBox | null = null;

    function castRay(): number {
      let best = 40;
      let bb: LevelBox | null = null;
      let ba = 0;

      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        let t0 = 0;
        let t1 = best;
        let ax = -1;
        let ok = true;

        for (let a = 0; a < 3; a++) {
          const inv = 1 / d[a];
          let ta = (b.min[a] - o[a]) * inv;
          let tb = (b.max[a] - o[a]) * inv;
          if (ta > tb) {
            const s = ta;
            ta = tb;
            tb = s;
          }
          if (ta > t0) {
            t0 = ta;
            ax = a;
          }
          if (tb < t1) t1 = tb;
          if (t0 > t1) {
            ok = false;
            break;
          }
        }
        if (ok && ax >= 0 && t0 < best) {
          best = t0;
          bb = b;
          ba = ax;
        }
      }
      hitBox = bb;
      hitAx = ba;
      return best;
    }

    function addPoint(t: number, b: LevelBox, ax: number) {
      const i = headIdx * 3;
      pos[i] = o[0] + d[0] * t;
      pos[i + 1] = o[1] + d[1] * t;
      pos[i + 2] = o[2] + d[2] * t;

      let r: number, g: number, bl: number;
      if (b.t === 1) {
        // Beacon: Gold / Amber
        r = 1;
        g = 0.7;
        bl = 0.15;
      } else if (b.t === 2) {
        // Flower: Magenta
        r = 1;
        g = 0.35;
        bl = 0.7;
      } else {
        // Level Geometry: Cyan / Blue depth attenuation
        const f = Math.min(1, t / 24);
        const sh = ax === 1 ? 1 : 0.68;
        r = (0.75 - 0.65 * f) * sh;
        g = (1 - 0.65 * f) * sh;
        bl = (1 - 0.1 * f) * sh;
      }

      col[i] = r;
      col[i + 1] = g;
      col[i + 2] = bl;

      headIdx = (headIdx + 1) % MAX;
      if (totalCount < MAX) totalCount++;
    }

    let sayTimeout: ReturnType<typeof setTimeout> | null = null;
    function say(text: string) {
      setSystemMessage(text);
      if (sayTimeout) clearTimeout(sayTimeout);
      sayTimeout = setTimeout(() => {
        setSystemMessage("");
      }, 3500);
    }

    const viruses: Virus[] = [];
    let now = 0;
    let ended = false;

    function scan(n: number, cone: number, w: number) {
      camera.updateMatrixWorld();
      const m = camera.matrixWorld.elements;
      const tc = Math.tan(cone);
      o[0] = m[12];
      o[1] = m[13];
      o[2] = m[14];

      for (let k = 0; k < n; k++) {
        const r = Math.sqrt(Math.random()) * tc;
        const th = Math.random() * 6.2832;
        const c = Math.cos(th) * r;
        const s = Math.sin(th) * r;

        const x = -m[8] + m[0] * c + m[4] * s;
        const y = -m[9] + m[1] * c + m[5] * s;
        const z = -m[10] + m[2] * c + m[6] * s;
        const L = Math.hypot(x, y, z);

        d[0] = x / L || 1e-9;
        d[1] = y / L || 1e-9;
        d[2] = z / L || 1e-9;

        const t = castRay();

        for (let v = 0; v < viruses.length; v++) {
          const vi = viruses[v];
          const ox = o[0] - vi.p[0];
          const oy = o[1] - vi.p[1];
          const oz = o[2] - vi.p[2];

          const bq = ox * d[0] + oy * d[1] + oz * d[2];
          const disc = bq * bq - (ox * ox + oy * oy + oz * oz - 0.12);
          if (disc > 0) {
            const ts = -bq - Math.sqrt(disc);
            if (ts > 0 && ts < t) {
              const j = vh * 3;
              vpos[j] = o[0] + d[0] * ts;
              vpos[j + 1] = o[1] + d[1] * ts;
              vpos[j + 2] = o[2] + d[2] * ts;
              vbirth[vh] = now;
              vh = (vh + 1) % VMAX;
              vi.hp -= w;
            }
          }
        }

        if (hitBox) {
          addPoint(t, hitBox, hitAx);
          if (hitBox.t === 1 && hitBox.flower !== undefined) {
            const fl = flowers[hitBox.flower];
            if (fl.state === 0) {
              hitBox.hits += w;
              if (hitBox.hits >= 90) {
                fl.state = 1;
                ArcadeAudio.playSelect();
                say(`${names[fl.i]} is charged! Stand near it and hold [E] / [A] to bloom.`);
              }
            }
          }
        }
      }

      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      geo.setDrawRange(0, totalCount);
    }

    // Player State
    let px = 0;
    let pz = 9;
    let yaw = Math.PI;
    let pitch = 0;
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
      if (isPointerLocked) {
        mouse[e.button] = true;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      mouse[e.button] = false;
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.code] = true;

      // Direct keyboard exit shortcut: single tap of [Escape], [B], or [Backspace] immediately returns to menu
      if (
        e.key === "Escape" ||
        e.code === "Escape" ||
        e.key === "b" ||
        e.key === "B" ||
        e.code === "KeyB" ||
        e.key === "Backspace" ||
        e.code === "Backspace"
      ) {
        safeReturnToHub();
        return;
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
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("resize", handleResize);

    function collide() {
      const R = 0.35;
      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (b.t || b.max[1] < 0.5 || b.min[1] > 1.2) continue;
        const cx = Math.max(b.min[0], Math.min(px, b.max[0]));
        const cz = Math.max(b.min[2], Math.min(pz, b.max[2]));
        const dx = px - cx;
        const dz = pz - cz;
        const q = dx * dx + dz * dz;
        if (q < R * R && q > 1e-8) {
          const l = Math.sqrt(q);
          px = cx + (dx / l) * R;
          pz = cz + (dz / l) * R;
        }
      }
    }

    // Game Logic
    let lure = 0;
    let spawnT = 0;
    const vents = [
      [-11, 1.4, -11],
      [11, 1.4, -11],
      [-11, 1.4, 11],
      [11, 1.4, 11],
    ];

    function finish(win: boolean) {
      ended = true;
      setGameOver(win ? "win" : "lose");
      if (document.exitPointerLock) {
        document.exitPointerLock();
      }
    }

    function update(dt: number) {
      let bloom = 0;
      let near: FlowerState | null = null;

      for (const f of flowers) {
        if (f.state === 2 && f.hp > 0) bloom++;
        const dx = px - f.x;
        const dz = pz - f.z;
        if (f.state === 1 && dx * dx + dz * dz < 2.6) {
          near = f;
        }
      }

      // Arcade interaction or KeyE
      const arc = arcadeInputsRef.current;
      const isHoldingBloom = keys.KeyE || (arc && (arc.action1 || arc.action3));

      if (near) {
        setPromptVisible(true);
        if (isHoldingBloom) {
          near.bloomT += dt;
          if (near.bloomT >= 2) {
            near.state = 2;
            near.g.visible = true;
            near.bloomT = 0;
            spawnT = Math.min(spawnT, 4);
            ArcadeAudio.playPowerup();
            say(`${names[near.i]} blooms! The scent calls your mate, but attracts viral spores.`);
          }
        } else {
          near.bloomT = 0;
        }
      } else {
        setPromptVisible(false);
      }

      // Spore Spawning
      if (bloom > 0) {
        spawnT -= dt;
        if (spawnT <= 0 && viruses.length < 5) {
          spawnT = Math.max(6, 15 - 2.5 * bloom);
          const vt = vents[Math.floor(Math.random() * 4)];
          viruses.push({ p: vt.slice(), hp: 70, ph: Math.random() * 6 });
          say(`A viral spore drifts in from the ${vt[2] < 0 ? "north" : "south"}-${vt[0] > 0 ? "east" : "west"} vent!`);
        }
      }

      // Spores Movement & Infection
      for (let i = viruses.length - 1; i >= 0; i--) {
        const v = viruses[i];
        if (v.hp <= 0) {
          viruses.splice(i, 1);
          ArcadeAudio.playEnemyDefeat();
          say("Spore burned away!");
          continue;
        }
        let tg: FlowerState | null = null;
        let bd = 1e9;
        for (const f of flowers) {
          if (f.state === 2 && f.hp > 0) {
            const q = (f.x - v.p[0]) * (f.x - v.p[0]) + (f.z - v.p[2]) * (f.z - v.p[2]);
            if (q < bd) {
              bd = q;
              tg = f;
            }
          }
        }

        if (tg) {
          const dx = tg.x - v.p[0];
          const dy = 1.1 - v.p[1];
          const dz = tg.z - v.p[2];
          const L = Math.hypot(dx, dy, dz);
          if (L > 0.6) {
            const sp = (0.9 * dt) / L;
            v.p[0] += dx * sp;
            v.p[1] += dy * sp;
            v.p[2] += dz * sp;
          } else {
            tg.hp -= 9 * dt;
            if (!tg.warned) {
              tg.warned = true;
              say(`${names[tg.i]} is being infected! Burn the spore!`);
            }
            if (tg.hp <= 0) {
              tg.state = 3;
              say(`${names[tg.i]} has withered.`);
            }
          }
        }
      }

      // Lure Meter Progress
      lure = Math.min(100, lure + bloom * 1.2 * dt);
      setLureProgress(Math.round(lure));

      const p = lure / 100;
      mate.position.set(-32 + 32 * p, 2 - 0.4 * p, -32 + 34 * p);
      mate.scale.setScalar(1 + 0.25 * Math.sin(now * 0.004));

      if (lure >= 100) {
        finish(true);
      } else if (flowers.every((f) => f.state === 3)) {
        finish(false);
      }
    }

    function animate() {
      const t = now / 1000;
      flowers.forEach((f) => {
        const g = f.g;
        if (f.state === 2) {
          const sick = 1 - f.hp / 100;
          g.rotation.z = 0.14 * Math.sin(t * 1.3 + f.i) + sick * 0.25;
          g.rotation.x = 0.09 * Math.cos(t * 1.1 + f.i);
          const pu = 1 + 0.2 * Math.sin(t * 3.2 + f.i * 1.3);
          f.head.scale.setScalar(pu);
          f.pm.color.setHSL(0.92 - 0.62 * sick, 0.9 - 0.3 * sick, 0.5 + 0.12 * Math.sin(t * 3.2 + f.i * 1.3) - 0.15 * sick);
          f.head.rotation.x = sick * 0.9;
        } else if (f.state === 3) {
          g.visible = true;
          g.rotation.z = 0.5;
          f.head.scale.setScalar(0.7);
          f.pm.color.setHex(0x3a2f33);
        }
      });

      for (let i = 0; i < VMAX; i++) {
        const a = (now - vbirth[i]) / 1000;
        const k = a > 1.2 ? 0 : 1 - a / 1.2;
        const j = i * 3;
        vcol[j] = k;
        vcol[j + 1] = 0.12 * k;
        vcol[j + 2] = 0.25 * k;
      }
      vgeo.attributes.position.needsUpdate = true;
      vgeo.attributes.color.needsUpdate = true;
    }

    // Animation Loop
    let animId: number;
    let lastTime = performance.now();

    function frame(ts: number) {
      animId = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (ts - lastTime) / 1000);
      lastTime = ts;
      now = ts;

      // Handle Arcade inputs when Gamepad connected
      const arc = arcadeInputsRef.current;
      if (arc) {
        // Move with Joystick / D-pad
        let f = 0;
        let s = 0;
        if (arc.up) f += 1;
        if (arc.down) f -= 1;
        if (arc.left) s -= 1;
        if (arc.right) s += 1;

        if (f !== 0 || s !== 0) {
          const sp = 3.2 * dt;
          px += (-Math.sin(yaw) * f + Math.cos(yaw) * s) * sp;
          pz += (-Math.cos(yaw) * f - Math.sin(yaw) * s) * sp;
          collide();
        }

        // Action 2 or Action 4: Focus beam
        if (arc.action2 || arc.action4) {
          scan(Math.ceil(4500 * dt), 0.05, 1);
        } else if (arc.action1 || arc.action3) {
          // Action 1 or 3: Wide scan
          scan(Math.ceil(11000 * dt), 0.24, 0.12);
        }
      }

      // Handle Keyboard / Mouse inputs when Pointer Locked
      if (isPointerLocked && !ended) {
        const f = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
        const s = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
        const sp = 3.2 * dt;

        px += (-Math.sin(yaw) * f + Math.cos(yaw) * s) * sp;
        pz += (-Math.cos(yaw) * f - Math.sin(yaw) * s) * sp;
        collide();

        camera.position.set(px, 1.6, pz);
        camera.rotation.set(pitch, yaw, 0);

        if (mouse[2]) {
          scan(Math.ceil(4500 * dt), 0.05, 1);
        } else if (mouse[0]) {
          scan(Math.ceil(11000 * dt), 0.24, 0.12);
        }

        update(dt);
      }

      // Update HUD state every frame
      setMappedPoints(totalCount);
      setActiveSporesCount(viruses.length);
      setFlowerStatus(
        flowers.map((f) => ({
          name: names[f.i],
          state: f.state,
          hp: Math.max(0, Math.round(f.hp)),
        }))
      );

      animate();
      renderer.render(scene, camera);
    }

    camera.position.set(px, 1.6, pz);
    camera.rotation.set(pitch, yaw, 0);
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);

      geo.dispose();
      vgeo.dispose();
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
      className="relative w-full h-full bg-black select-none overflow-hidden font-mono text-white flex flex-col justify-between"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full cursor-crosshair z-0"
      />

      <GameHUD
        onReturnToHub={safeReturnToHub}
        lureProgress={lureProgress}
        isLocked={isLocked}
        gameOver={gameOver}
        systemMessage={systemMessage}
        promptVisible={promptVisible}
        flowerStatus={flowerStatus}
        activeSporesCount={activeSporesCount}
        mappedPoints={mappedPoints}
        theme={theme}
      />

      <GameModal
        gameOver={gameOver}
        onReturnToHub={safeReturnToHub}
        onRestart={() => window.location.reload()}
      />
    </div>
  );
}
