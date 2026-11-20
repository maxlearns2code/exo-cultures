"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CRTOverlay } from "@/components/arcade/CRTOverlay";
import { ArcadeHUD, ArcadeControlsFooter } from "@/components/arcade/ArcadeHUD";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";
import { Compass, Sparkles, Code2, Layers } from "lucide-react";

interface Node {
  x: number;
  y: number;
  radius: number;
  active: boolean;
  pulsePhase: number;
}

export default function AisahCulturePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [nodesAwakened, setNodesAwakened] = useState(0);
  const [activeTab, setActiveTab] = useState<"demo" | "spec">("demo");

  const probePosRef = useRef({ x: 320, y: 240, vx: 0, vy: 0 });
  const nodesRef = useRef<Node[]>([
    { x: 160, y: 140, radius: 18, active: false, pulsePhase: 0 },
    { x: 480, y: 140, radius: 18, active: false, pulsePhase: 1 },
    { x: 320, y: 340, radius: 22, active: false, pulsePhase: 2 },
    { x: 180, y: 320, radius: 16, active: false, pulsePhase: 3 },
    { x: 460, y: 320, radius: 16, active: false, pulsePhase: 4 },
  ]);
  const sporesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number }[]>([]);

  const handleReturnToHub = useCallback(() => {
    ArcadeAudio.playCancel();
    router.push("/");
  }, [router]);

  const handleInputs = useCallback(
    (inputs: ArcadeInputs) => {
      const speed = 3.2;
      let vx = 0;
      let vy = 0;
      if (inputs.left) vx -= speed;
      if (inputs.right) vx += speed;
      if (inputs.up) vy -= speed;
      if (inputs.down) vy += speed;

      probePosRef.current.vx = vx;
      probePosRef.current.vy = vy;

      // Button A: Release Spore Burst
      if (inputs.action1) {
        for (let i = 0; i < 4; i++) {
          const angle = Math.random() * Math.PI * 2;
          const sp = Math.random() * 50 + 20;
          sporesRef.current.push({
            x: probePosRef.current.x,
            y: probePosRef.current.y,
            vx: Math.cos(angle) * sp,
            vy: Math.sin(angle) * sp,
            life: 1.0,
          });
        }
        ArcadeAudio.playBeamShoot("cyan");
      }

      // Button B: Switch view between demo & teammate integration spec
      if (inputs.action2) {
        setActiveTab((prev) => (prev === "demo" ? "spec" : "demo"));
        ArcadeAudio.playNavMove();
      }

      // Button X: Resonance pulse
      if (inputs.action3) {
        ArcadeAudio.playHarmonizePulse();
        // Awaken nearby nodes
        nodesRef.current.forEach((node) => {
          const d = Math.hypot(node.x - probePosRef.current.x, node.y - probePosRef.current.y);
          if (d < 120) {
            node.active = true;
          }
        });
        setNodesAwakened(nodesRef.current.filter((n) => n.active).length);
      }
    },
    []
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs, handleReturnToHub);

  // 60 FPS Canvas Simulation
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      const probe = probePosRef.current;
      probe.x = Math.max(30, Math.min(610, probe.x + probe.vx));
      probe.y = Math.max(30, Math.min(450, probe.y + probe.vy));

      // Spores update
      for (let i = sporesRef.current.length - 1; i >= 0; i--) {
        const s = sporesRef.current[i];
        s.x += s.vx * 0.016;
        s.y += s.vy * 0.016;
        s.life -= 0.016;

        // Check node collision
        nodesRef.current.forEach((n) => {
          if (Math.hypot(n.x - s.x, n.y - s.y) < n.radius) {
            n.active = true;
          }
        });

        if (s.life <= 0) sporesRef.current.splice(i, 1);
      }
      setNodesAwakened(nodesRef.current.filter((n) => n.active).length);

      // Render
      ctx.clearRect(0, 0, 640, 480);

      // Deep green abyss
      const grad = ctx.createRadialGradient(320, 240, 30, 320, 240, 360);
      grad.addColorStop(0, "#021a12");
      grad.addColorStop(1, "#010805");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // Draw Mycelial Root Filaments between nodes
      ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
      ctx.lineWidth = 2;
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const n1 = nodesRef.current[i];
          const n2 = nodesRef.current[j];
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      // Draw Nodes
      nodesRef.current.forEach((n) => {
        ctx.save();
        ctx.translate(n.x, n.y);
        const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, n.radius * 2);
        glow.addColorStop(0, n.active ? "rgba(16, 185, 129, 0.9)" : "rgba(16, 185, 129, 0.2)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, n.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = n.active ? "#10b981" : "#064e3b";
        ctx.strokeStyle = "#a7f3d0";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, n.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Draw Spores
      sporesRef.current.forEach((s) => {
        ctx.fillStyle = "#6ee7b7";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Probe
      ctx.save();
      ctx.translate(probe.x, probe.y);
      const pGlow = ctx.createRadialGradient(0, 0, 3, 0, 0, 30);
      pGlow.addColorStop(0, "rgba(52, 211, 153, 0.8)");
      pGlow.addColorStop(1, "transparent");
      ctx.fillStyle = pGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#34d399";
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "bold 8px monospace";
      ctx.fillStyle = "#a7f3d0";
      ctx.textAlign = "center";
      ctx.fillText("SPORE PROBE", 0, -16);
      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <CRTOverlay exitHoldProgress={exitHoldProgress} hasGamepad={hasGamepad}>
      <ArcadeHUD
        title="MYCO-COLLECTIVE (AISAH)"
        subtitle="SUBTERRANEAN BIOLUMINESCENT SPORE NETWORK"
        showBackButton
        score={nodesAwakened * 100}
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-400">
            ACTIVE NODES: {nodesAwakened} / {nodesRef.current.length}
          </span>
        </div>
        <div className="flex gap-2 text-[10px] font-mono">
          <button
            onClick={() => setActiveTab("demo")}
            className={`px-2 py-0.5 rounded border ${
              activeTab === "demo" ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold" : "border-neutral-700 text-neutral-400"
            }`}
          >
            [B] SIMULATION
          </button>
          <button
            onClick={() => setActiveTab("spec")}
            className={`px-2 py-0.5 rounded border ${
              activeTab === "spec" ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold" : "border-neutral-700 text-neutral-400"
            }`}
          >
            INTEGRATION SPEC
          </button>
        </div>
      </div>

      {activeTab === "demo" ? (
        <div className="relative flex-1 bg-black rounded border-2 border-emerald-950 overflow-hidden">
          <canvas ref={canvasRef} width={640} height={480} className="w-full h-full object-contain" />
        </div>
      ) : (
        <div className="flex-1 bg-neutral-950/90 rounded border-2 border-emerald-900/60 p-4 font-mono text-xs overflow-y-auto space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Code2 className="w-4 h-4" />
            <span>AISAH GAME INTEGRATION GUIDE</span>
          </div>
          <p className="text-neutral-300 text-[11px] leading-relaxed">
            Welcome Aisah! You can replace this showcase with your full game export (Canvas, PixiJS, Phaser, or Godot 4 HTML5 export).
          </p>
          <div className="bg-black/60 p-3 rounded border border-neutral-800 space-y-1 text-[10px]">
            <div className="text-emerald-300 font-bold">• Target Resolution: 640 × 480 (4:3 CRT Aspect Ratio)</div>
            <div className="text-neutral-400">• Controller: Integrated with `useArcadeInput` (8BitDo stick + keyboard)</div>
            <div className="text-neutral-400">• Drop-in location: `src/app/games/aisah/page.tsx` or mount as component</div>
            <div className="text-neutral-400">• Performance target: 60 FPS on Raspberry Pi 400</div>
          </div>
        </div>
      )}

      <ArcadeControlsFooter />
    </CRTOverlay>
  );
}
