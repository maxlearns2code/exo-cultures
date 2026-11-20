import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        abyss: {
          950: "#030712",
          900: "#060d1f",
          850: "#09142e",
          800: "#0d1b3e",
        },
        biolum: {
          cyan: "#00f0ff",
          magenta: "#ff007f",
          amber: "#ffb703",
          emerald: "#10b981",
          violet: "#a855f7",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        arcade: ["'Press Start 2P'", "monospace", "system-ui"],
        display: ["'Chakra Petch'", "'Segoe UI'", "sans-serif"],
      },
      aspectRatio: {
        "4/3": "4 / 3",
        poster: "1043 / 1477",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.5)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.96" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        flicker: "flicker 0.15s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
