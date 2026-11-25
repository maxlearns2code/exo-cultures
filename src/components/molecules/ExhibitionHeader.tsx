import React from "react";

export interface ExhibitionHeaderProps {
  theme: "gateway" | "translator" | "specimen";
  onReturnToIntro: () => void;
  onToggleDesign: () => void;
  onOpenDossier: () => void;
  onOpenAttract: () => void;
}

export function ExhibitionHeader({
  theme,
  onReturnToIntro,
  onToggleDesign,
  onOpenDossier,
  onOpenAttract,
}: ExhibitionHeaderProps) {
  if (theme === "gateway") {
    return (
      <header className="w-full border-b-4 border-black pb-2 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={onReturnToIntro}
            className="flex items-center px-2.5 py-1 bg-black text-white hover:bg-neutral-800 font-bold text-xs uppercase border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_#000000]"
          >
            <span>[B] INTRO</span>
          </button>
          <div>
            <h1 className="text-sm md:text-base font-black tracking-wider uppercase">
              EXO-CULTURES // THE COLLABORATIVE EXHIBITION
            </h1>
            <p className="text-[9px] text-neutral-600 font-bold uppercase">
              RECALBOX THEME: BRUTALIST GALLERY • ONE SHARED ALIEN GAME
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleDesign}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer bg-neutral-100 shadow-[2px_2px_0px_#000000]"
            title="Switch Recalbox Theme (or press T)"
          >
            [THEME: GALLERY ➔]
          </button>
          <button
            onClick={onOpenDossier}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <span>[Y] DOSSIER</span>
          </button>
          <button
            onClick={onOpenAttract}
            className="text-[10px] text-black border-2 border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            [X] PREVIEW
          </button>
        </div>
      </header>
    );
  }

  if (theme === "translator") {
    return (
      <header className="w-full flex items-center justify-between border-b-2 border-cyan-500/40 pb-2 mb-2 select-none z-10 bg-[#060713]/90 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onReturnToIntro}
            className="flex items-center px-2.5 py-1 bg-black hover:bg-neutral-900 text-cyan-400 font-bold text-xs border border-cyan-400/60 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.3)]"
          >
            <span>[B] INTRO</span>
          </button>
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-wider text-cyan-300 uppercase flex items-center gap-2 drop-shadow-[0_0_8px_#00f0ff]">
              <span>RECALBOX EXO-ARCADE</span>
              <span className="text-[9px] bg-cyan-950/80 text-cyan-400 border border-cyan-500/50 px-1.5 py-0.2 rounded">
                THEME: ARCADE
              </span>
            </h1>
            <p className="text-[10px] text-pink-400 tracking-widest drop-shadow-[0_0_6px_#ff007f]">
              NEON MATRIX // 1420.405 MHz FREE PLAY • ONE UNIFIED GAME
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDesign}
            className="text-[10px] text-cyan-300 border border-cyan-400 px-2 py-0.5 font-bold hover:bg-cyan-400 hover:text-black transition-all cursor-pointer bg-black/80 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
            title="Switch Recalbox Theme (or press T)"
          >
            [THEME: ARCADE ➔]
          </button>
          <button
            onClick={onOpenDossier}
            className="text-[10px] text-white border border-neutral-700 px-2 py-0.5 font-bold hover:border-white transition-colors cursor-pointer bg-black/60"
          >
            <span>[Y] DOSSIER</span>
          </button>
          <button
            onClick={onOpenAttract}
            className="text-[10px] text-white border border-neutral-700 px-2 py-0.5 font-bold hover:border-white transition-colors cursor-pointer bg-black/60"
          >
            [X] PREVIEW
          </button>
        </div>
      </header>
    );
  }

  // specimen theme
  return (
    <header className="w-full flex items-center justify-between border-b-2 border-emerald-500/70 pb-2 mb-2 select-none z-10 bg-[#030d07]/95">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onReturnToIntro}
          className="flex items-center px-2.5 py-1 bg-black hover:bg-emerald-950 text-emerald-400 font-bold text-xs border border-emerald-500 transition-all cursor-pointer shadow-[0_0_8px_rgba(16,185,129,0.4)]"
        >
          <span>[B] INTRO</span>
        </button>
        <div>
          <h1 className="text-sm md:text-base font-bold tracking-wider text-emerald-300 uppercase flex items-center gap-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
            <span>RECALBOX BIOS v4.2 // BIO-TERMINAL</span>
            <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-500 px-1.5 py-0.2">
              THEME: PHOSPHOR
            </span>
          </h1>
          <p className="text-[10px] text-emerald-500/80 tracking-widest">
            HYPER ISLAND LAB 04 • COLLABORATIVE GAME SPECIMEN ACTIVE █
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleDesign}
          className="text-[10px] text-emerald-300 border border-emerald-500 px-2 py-0.5 font-bold hover:bg-emerald-500 hover:text-black transition-all cursor-pointer bg-black/80 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
          title="Switch Recalbox Theme (or press T)"
        >
          [THEME: PHOSPHOR ➔]
        </button>
        <button
          onClick={onOpenDossier}
          className="text-[10px] text-emerald-400 border border-emerald-800 px-2 py-0.5 font-bold hover:border-emerald-500 transition-colors cursor-pointer bg-black/60"
        >
          <span>[Y] DOSSIER</span>
        </button>
        <button
          onClick={onOpenAttract}
          className="text-[10px] text-emerald-400 border border-emerald-800 px-2 py-0.5 font-bold hover:border-emerald-500 transition-colors cursor-pointer bg-black/60"
        >
          [X] PREVIEW
        </button>
      </div>
    </header>
  );
}
