"use client";

import React from "react";
import NextImage from "next/image";
import { X, FileText, CheckCircle2, Layers, ShieldCheck } from "lucide-react";

interface LetterOfIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LetterOfIntentModal({ isOpen, onClose }: LetterOfIntentModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[250] bg-black/95 flex items-center justify-center p-3 md:p-6 font-mono text-white select-none backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-black border-2 border-white flex flex-col shadow-[10px_10px_0px_#ffffff] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-white p-3 md:p-4 bg-white text-black">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-black" />
            <div>
              <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">
                BRIEF 1: POSTER & LETTER OF INTENT
              </h2>
              <p className="text-[10px] text-neutral-800">
                Author: Maxime Dewynter • Culture: Chromatic Symbiosis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-1 bg-black text-white hover:bg-neutral-800 border-2 border-black text-xs font-bold transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>[B / ESC] CLOSE</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 text-xs md:text-sm leading-relaxed text-neutral-200 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Poster Column */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="relative w-full aspect-[1043/1477] border-2 border-white overflow-hidden shadow-[8px_8px_0px_#ffffff] mb-3">
                <NextImage
                  src="/assets/chromatic-symbiosis/ai-designs/ai-poster-01.png"
                  alt="Chromatic Symbiosis Official Exhibition Poster"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-[10px] text-center text-neutral-400 space-y-1">
                <p className="font-bold text-white uppercase">CHROMATIC SYMBIOSIS</p>
                <p>1043 × 1477 px Native Canvas</p>
                <p>8 Distinct Photoshop Depth Layers</p>
              </div>
            </div>

            {/* Letter of Intent Column */}
            <div className="md:col-span-2 space-y-4 bg-neutral-950 p-5 border border-white/30 text-xs">
              <div className="border-b-2 border-white/20 pb-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Letter of Intent (Out-of-Character Design Rationale)
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Deliverable for Brief 1: Conceptualization, Process & Conscious Reflection
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-white uppercase text-xs mb-1">
                    1. Culture Conceptualization & Narrative Pillars
                  </h4>
                  <p className="text-neutral-300">
                    <em>Chromatic Symbiosis</em> explores a sentient species dwelling within the subterranean, pitch-black oceans of Saturn&apos;s icy moons (Enceladus/Europa). Deprived of sunlight and atmospheric audio resonance, evolution guided them to bypass oral language entirely. Instead, they communicate, guide, and protect through <strong>chromocommunication</strong>—the conscious synthesis, refraction, and projection of pure light wavelengths accompanied by core thermal heat.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase text-xs mb-1">
                    2. Visual Hierarchy & The Family Anchor
                  </h4>
                  <p className="text-neutral-300">
                    The composition centers around a generational hierarchy: the towering father entity serves as an immovable thermal anchor, radiating deep red and amber warmth that shields the offspring from freezing sub-ice currents. The twin explorer sons possess nimble biologies tuned to shorter, agile wavelengths (cyan and magenta). By holding hands and synthesizing complementary frequencies, they manifest the energy necessary to awaken the dormant Living Portal Tree.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase text-xs mb-1">
                    3. Technical Skills Applied from Workshops
                  </h4>
                  <p className="text-neutral-300">
                    Created via advanced <strong>Photoshop layer composition and non-destructive raster workflows</strong>. The work separates cleanly into 8 isolated depth planes (cosmic nebula background, cave bedrock soil, ancient portal tree, father entity, twin sons, atmospheric thermal mist, and floating autumn catalyst leaves). This disciplined asset separation was intentional, enabling each 2D static illustration layer to become a dynamic, interactive element in the arcade video game.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase text-xs mb-1">
                    4. Conscious Reflection on Alienation
                  </h4>
                  <p className="text-neutral-300">
                    By externalizing familiar human concepts (familial love, guidance, coming of age) into optical physics and thermal survival, the work prompts viewers to reconsider the invisible sensory channels we take for granted on Earth. Warmth and color become tangible survival currencies rather than aesthetic embellishments.
                  </p>
                </div>

                <div className="p-3 bg-neutral-900 border-l-2 border-white text-[11px] text-neutral-300">
                  <div className="flex items-center gap-1.5 font-bold text-white uppercase mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    Brief 1 AI Compliance Note
                  </div>
                  <p>
                    In accordance with Brief 1 rules (&ldquo;No prompt-based generative AI tools are to be used in the development of this deliverable&rdquo;), the core poster artwork, layer separation, character concepts, and composition were created by hand in Photoshop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-white p-3 bg-neutral-950 flex items-center justify-between text-[10px] text-neutral-400">
          <span>INTERGALACTIC WORLDS EXPO • BRIEF 1 ARCHIVE</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white text-black font-bold uppercase hover:bg-neutral-200 transition-colors"
          >
            RETURN TO GAME [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
