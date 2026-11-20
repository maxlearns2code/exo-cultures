"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CRTOverlay } from "@/components/arcade/CRTOverlay";
import { ArcadeHUD, ArcadeControlsFooter } from "@/components/arcade/ArcadeHUD";
import { useArcadeInput, ArcadeInputs } from "@/hooks/useArcadeInput";
import { ArcadeAudio } from "@/utils/audio";
import { Wind, Code2 } from "lucide-react";

interface StreamParticle {
  x: number;
  y: number;
  speed: number;
  length: number;
  color: string;
}

export default function ManaCulturePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTab, setActiveTab] = useState<"demo" | "spec">("demo");
  const [altitude, setAltitude] = useState<number>(14200);
  const [airspeed, setAirspeed] = useState<number>(340);

  const gliderPosRef = useRef({ x: 140, y: 240, vy: 0 });
  const streamsRef = useRef<StreamParticle[]>([]);

  const handleReturnToHub = useCallback(() => {
    ArcadeAudio.playCancel();
    router.push("/");
  }, [router]);

  const handleInputs = useCallback(
    (inputs: ArcadeInputs) => {
      // Joystick steers glider
      let vy = 0;
      if (inputs.up) vy -= 3.5;
      if (inputs.down) vy += 3.5;
      gliderPosRef.current.vy = vy;

      // Button A: Boost thermal lift
      if (inputs.action1) {
        setAirspeed((prev) => Math.min(680, prev + 15));
        setAltitude((prev) => prev + 50);
        ArcadeAudio.playBeamShoot("amber");
      }

      // Button B: Mode switch
      if (inputs.action2) {
        ArcadeAudio.playNavMove();
        setActiveTab((prev) => (prev === "demo" ? "spec" : "demo"));
      }

      // Button X: Sonic wave
      if (inputs.action3) {
        ArcadeAudio.playHarmonizePulse();
      }
    },
    []
  );

  const { exitHoldProgress, hasGamepad } = useArcadeInput(handleInputs, handleReturnToHub);

  // Atmospheric Jetstream Canvas Simulator (60 FPS on Pi 400)
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize jetstream lines
    for (let i = 0; i < 45; i++) {
      streamsRef.current.push({
        x: Math.random() * 640,
        y: Math.random() * 480,
        speed: Math.random() * 8 + 6,
        length: Math.random() * 60 + 30,
        color: Math.random() > 0.5 ? "#f59e0b" : "#38bdf8",
      });
    }

    const loop = () => {
      const glider = gliderPosRef.current;
      glider.y = Math.max(40, Math.min(440, glider.y + glider.vy));

      ctx.clearRect(0, 0, 640, 480);

      // Sky gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 480);
      grad.addColorStop(0, "#081226");
      grad.addColorStop(0.5, "#1b1406");
      grad.addColorStop(1, "#0a0a0f");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // Render jetstreams flowing right-to-left
      streamsRef.current.forEach((st) => {
        st.x -= st.speed;
        if (st.x < -st.length) {
          st.x = 640 + Math.random() * 40;
          st.y = Math.random() * 480;
        }

        ctx.strokeStyle = st.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(st.x + st.length, st.y);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      // Render Nomadic Glider
      ctx.save();
      ctx.translate(glider.x, glider.y);

      // Thermal aura
      const aura = ctx.createRadialGradient(0, 0, 2, 0, 0, 32);
      aura.addColorStop(0, "rgba(245, 158, 11, 0.7)");
      aura.addColorStop(1, "transparent");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, 0, 32, 0, Math.PI * 2);
      ctx.fill();

      // Wing shape
      ctx.fillStyle = "#ffb703";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(22, 0);
      ctx.lineTo(-14, -14);
      ctx.lineTo(-6, 0);
      ctx.lineTo(-14, 14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.font = "bold 8px monospace";
      ctx.fillStyle = "#fef08a";
      ctx.textAlign = "center";
      ctx.fillText("NOMAD GLIDER", 0, -20);
      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <CRTOverlay exitHoldProgress={exitHoldProgress} hasGamepad={hasGamepad}>
      <ArcadeHUD
        title="AERO-DRIFT (MANA)"
        subtitle="GASEOUS ATMOSPHERIC NOMADS"
        showBackButton
        score={altitude}
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3 text-xs font-mono font-bold text-amber-400">
          <span>ALT: {altitude}M</span>
          <span>SPEED: {airspeed} KM/H</span>
        </div>
        <div className="flex gap-2 text-[10px] font-mono">
          <button
            onClick={() => setActiveTab(activeTab === "demo" ? "spec" : "demo")}
            className="px-2 py-0.5 rounded border border-amber-500/40 text-amber-300 font-bold"
          >
            {activeTab === "demo" ? "VIEW SPEC" : "VIEW SIMULATION"}
          </button>
        </div>
      </div>

      {activeTab === "demo" ? (
        <div className="relative flex-1 bg-black rounded border-2 border-amber-950 overflow-hidden">
          <canvas ref={canvasRef} width={640} height={480} className="w-full h-full object-contain" />
        </div>
      ) : (
        <div className="flex-1 bg-neutral-950/90 rounded border-2 border-amber-900/60 p-4 font-mono text-xs overflow-y-auto space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Code2 className="w-4 h-4" />
            <span>MANA GAME INTEGRATION GUIDE</span>
          </div>
          <p className="text-neutral-300 text-[11px] leading-relaxed">
            Welcome Mana! Drop your fluid simulation, Phaser runner, or Canvas project here.
          </p>
          <div className="bg-black/60 p-3 rounded border border-neutral-800 space-y-1 text-[10px]">
            <div className="text-amber-300 font-bold">• 4:3 Aspect Ratio (640 × 480 Native CRT)</div>
            <div className="text-neutral-400">• Controller: 8BitDo Arcade Stick + Keyboard</div>
            <div className="text-neutral-400">• Drop-in location: `src/app/games/mana/page.tsx`</div>
          </div>
        </div>
      )}

      <ArcadeControlsFooter />
    </CRTOverlay>
  );
}
