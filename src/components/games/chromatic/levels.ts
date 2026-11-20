import { LevelData } from "./types";

export const LEVELS: LevelData[] = [
  {
    id: 1,
    name: "The Wavelength Awakening",
    subtitle: "Chamber I: Learning the Chromo-Frequencies",
    description: "Align your Cyan & Magenta beams with the optical crystals to awaken the first two leaf shrines.",
    fatherPos: { x: 320, y: 240 },
    playerStart: { x: 260, y: 320 },
    twinStart: { x: 380, y: 320 },
    treePos: { x: 320, y: 90 },
    crystals: [
      { id: "c1", x: 160, y: 180, radius: 18, angle: 45, type: "mirror" },
      { id: "c2", x: 480, y: 180, radius: 18, angle: 135, type: "mirror" },
    ],
    shrines: [
      { id: "s1", x: 160, y: 80, radius: 22, requiredColor: "cyan", charged: 0, awakened: false, name: "Cyan Leaf Shrine" },
      { id: "s2", x: 480, y: 80, radius: 22, requiredColor: "magenta", charged: 0, awakened: false, name: "Magenta Leaf Shrine" },
    ],
    obstacles: [
      { x: 100, y: 360, width: 440, height: 16, type: "ice_wall" },
      { x: 240, y: 140, width: 160, height: 14, type: "ice_wall" },
    ],
  },
  {
    id: 2,
    name: "Prismatic Symbiosis",
    subtitle: "Chamber II: Harmonizing the Twin Frequencies",
    description: "Hold hands with your twin brother ([X] Whistle) to combine beams into resonant Violet energy.",
    fatherPos: { x: 320, y: 240 },
    playerStart: { x: 220, y: 340 },
    twinStart: { x: 420, y: 340 },
    treePos: { x: 320, y: 70 },
    crystals: [
      { id: "c1", x: 140, y: 200, radius: 18, angle: 45, type: "mirror" },
      { id: "c2", x: 500, y: 200, radius: 18, angle: 135, type: "mirror" },
      { id: "c3", x: 320, y: 160, radius: 20, angle: 90, type: "prism" },
    ],
    shrines: [
      { id: "s1", x: 140, y: 80, radius: 22, requiredColor: "cyan", charged: 0, awakened: false, name: "Shrine of Cyan Tide" },
      { id: "s2", x: 500, y: 80, radius: 22, requiredColor: "magenta", charged: 0, awakened: false, name: "Shrine of Magenta Depth" },
      { id: "s3", x: 320, y: 80, radius: 24, requiredColor: "violet", charged: 0, awakened: false, name: "Shrine of Violet Resonance" },
    ],
    obstacles: [
      { x: 60, y: 280, width: 160, height: 16, type: "ice_wall" },
      { x: 420, y: 280, width: 160, height: 16, type: "ice_wall" },
      { x: 280, y: 210, width: 80, height: 14, type: "ice_wall" },
    ],
  },
  {
    id: 3,
    name: "The Abyssal Nexus",
    subtitle: "Chamber III: The Living Portal Awakening",
    description: "Route light through the father's core amplifier and crystal matrix to illuminate all three dimensional nodes.",
    fatherPos: { x: 320, y: 240 },
    playerStart: { x: 200, y: 380 },
    twinStart: { x: 440, y: 380 },
    treePos: { x: 320, y: 60 },
    crystals: [
      { id: "c1", x: 120, y: 150, radius: 18, angle: 45, type: "mirror" },
      { id: "c2", x: 520, y: 150, radius: 18, angle: 135, type: "mirror" },
      { id: "c3", x: 200, y: 120, radius: 18, angle: 90, type: "prism" },
      { id: "c4", x: 440, y: 120, radius: 18, angle: 90, type: "prism" },
    ],
    shrines: [
      { id: "s1", x: 120, y: 60, radius: 22, requiredColor: "amber", charged: 0, awakened: false, name: "Solar Amber Node" },
      { id: "s2", x: 520, y: 60, radius: 22, requiredColor: "violet", charged: 0, awakened: false, name: "Harmonic Violet Node" },
      { id: "s3", x: 320, y: 120, radius: 24, requiredColor: "cyan", charged: 0, awakened: false, name: "Abyssal Cyan Node" },
    ],
    obstacles: [
      { x: 80, y: 220, width: 120, height: 16, type: "ice_wall" },
      { x: 440, y: 220, width: 120, height: 16, type: "ice_wall" },
      { x: 200, y: 300, width: 240, height: 14, type: "ice_wall" },
    ],
  },
];
