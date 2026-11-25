import React from "react";

interface AlienGlyphsProps {
  glyphs?: string;
  count?: number;
  className?: string;
  vertical?: boolean;
}

const DEFAULT_GLYPHS = "⍙⟒⌰☊⍜⋔⎎⏁⊑⌇▲◈⬡☵☲";

export function AlienGlyphs({
  glyphs = DEFAULT_GLYPHS,
  count = 4,
  className = "",
  vertical = false,
}: AlienGlyphsProps) {
  const glyphArray = glyphs.split("").slice(0, count);

  return (
    <div
      className={`font-mono font-bold tracking-widest select-none ${
        vertical ? "flex flex-col gap-0.5" : "flex items-center gap-1"
      } ${className}`}
    >
      {glyphArray.map((glyph, i) => (
        <span
          key={i}
          className="animate-pulse"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          {glyph}
        </span>
      ))}
    </div>
  );
}
