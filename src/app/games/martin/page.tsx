"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CRTOverlay } from "@/components/arcade/CRTOverlay";
import { ArcadeHUD, ArcadeControlsFooter } from "@/components/arcade/ArcadeHUD";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";
import { Cpu, Code2 } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function MartinCulturePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTab, setActiveTab] = useState<"demo" | "spec">("demo");
  const [chronalPhase, setChronalPhase] = useState<number>(1);
  const [resonanceScore, setResonanceScore] = useState<number>(0);

  const rotRef = useRef({ x: 0, y: 0, rx: 0.008, ry: 0.012 });
  const pulseRef = useRef<number>(0);

  const handleReturnToHub = useCallback(() => {
    ArcadeAudio.playCancel();
    router.push("/");
  }, [router]);

  const handleInputs = useCallback(
    (inputs: ArcadeInputs) => {
      // Joystick rotates the 3D crystal matrix
      if (inputs.left) rotRef.current.y -= 0.04;
      if (inputs.right) rotRef.current.y += 0.04;
      if (inputs.up) rotRef.current.x -= 0.04;
      if (inputs.down) rotRef.current.x += 0.04;

      // Button A: Fire harmonic pulse
      if (inputs.action1) {
        pulseRef.current = 1.0;
        ArcadeAudio.playBeamShoot("violet");
        setResonanceScore((prev) => prev + 50);
      }

      // Button B: Toggle view or chronal phase
      if (inputs.action2) {
        setChronalPhase((prev) => (prev % 3) + 1);
        ArcadeAudio.playNavMove();
      }

      // Button X: Harmonize
      if (inputs.action3) {
        ArcadeAudio.playHarmonizePulse();
      }
    },
    []
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs, handleReturnToHub);

  // 3D Polyhedron Wireframe Renderer on Canvas 2D (60 FPS on Pi 400)
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 3D Octahedron / Icosahedron vertices
    const vertices: Point3D[] = [
      { x: 0, y: -120, z: 0 },
      { x: 0, y: 120, z: 0 },
      { x: -100, y: 0, z: -100 },
      { x: 100, y: 0, z: -100 },
      { x: 100, y: 0, z: 100 },
      { x: -100, y: 0, z: 100 },
    ];

    const edges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 3], [3, 4], [4, 5], [5, 2],
    ];

    const loop = () => {
      const rot = rotRef.current;
      rot.x += rot.rx;
      rot.y += rot.ry;

      if (pulseRef.current > 0) {
        pulseRef.current = Math.max(0, pulseRef.current - 0.03);
      }

      ctx.clearRect(0, 0, 640, 480);

      // Deep violet background
      const grad = ctx.createRadialGradient(320, 240, 40, 320, 240, 360);
      grad.addColorStop(0, "#19082b");
      grad.addColorStop(1, "#08020f");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // 3D Rotation Math
      const cosX = Math.cos(rot.x);
      const sinX = Math.sin(rot.x);
      const cosY = Math.cos(rot.y);
      const sinY = Math.sin(rot.y);

      const projected = vertices.map((v) => {
        // Rotate Y
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;
        // Rotate X
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        // Perspective Projection
        const fov = 340;
        const scale = fov / (fov + z2 + 180);
        return {
          x: 320 + x1 * scale,
          y: 240 + y2 * scale,
          scale,
        };
      });

      // Draw Edges
      ctx.strokeStyle = pulseRef.current > 0 ? "#ffffff" : "#c084fc";
      ctx.lineWidth = 2 + pulseRef.current * 4;
      ctx.shadowColor = "#a855f7";
      ctx.shadowBlur = 10 + pulseRef.current * 15;

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Vertices
      projected.forEach((p, idx) => {
        ctx.save();
        ctx.fillStyle = "#e879f9";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * p.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <CRTOverlay exitHoldProgress={exitHoldProgress} hasGamepad={hasGamepad}>
      <ArcadeHUD
        title="CHRONO-GEOMETRIC (MARTIN)"
        subtitle="CRYSTALLINE LATTICE FREQUENCY ARCHITECTURE"
        showBackButton
        score={resonanceScore}
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-violet-400">
            CHRONAL PHASE: 0{chronalPhase} / 03
          </span>
        </div>
        <div className="flex gap-2 text-[10px] font-mono">
          <button
            onClick={() => setActiveTab(activeTab === "demo" ? "spec" : "demo")}
            className="px-2 py-0.5 rounded border border-violet-500/40 text-violet-300 font-bold"
          >
            {activeTab === "demo" ? "VIEW SPEC" : "VIEW SIMULATION"}
          </button>
        </div>
      </div>

      {activeTab === "demo" ? (
        <div className="relative flex-1 bg-black rounded border-2 border-violet-950 overflow-hidden">
          <canvas ref={canvasRef} width={640} height={480} className="w-full h-full object-contain" />
        </div>
      ) : (
        <div className="flex-1 bg-neutral-950/90 rounded border-2 border-violet-900/60 p-4 font-mono text-xs overflow-y-auto space-y-3">
          <div className="flex items-center gap-2 text-violet-400 font-bold text-sm">
            <Code2 className="w-4 h-4" />
            <span>MARTIN GAME INTEGRATION GUIDE</span>
          </div>
          <p className="text-neutral-300 text-[11px] leading-relaxed">
            Welcome Martin! Drop your Godot 4 Web, Three.js, Phaser, or Canvas project here.
          </p>
          <div className="bg-black/60 p-3 rounded border border-neutral-800 space-y-1 text-[10px]">
            <div className="text-violet-300 font-bold">• 4:3 Aspect Ratio (640 × 480 Native CRT)</div>
            <div className="text-neutral-400">• Arcade Stick: `useArcadeInput` with zero mouse dependencies</div>
            <div className="text-neutral-400">• Drop-in location: `src/app/games/martin/page.tsx`</div>
          </div>
        </div>
      )}

      <ArcadeControlsFooter />
    </CRTOverlay>
  );
}
