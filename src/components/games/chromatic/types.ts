export type WavelengthColor = "cyan" | "magenta" | "amber" | "violet";

export interface Crystal {
  id: string;
  x: number;
  y: number;
  radius: number;
  angle: number; // in degrees: 0, 45, 90, 135, etc.
  type: "mirror" | "prism" | "filter";
  filterColor?: WavelengthColor;
}

export interface Shrine {
  id: string;
  x: number;
  y: number;
  radius: number;
  requiredColor: WavelengthColor;
  charged: number; // 0 to 100
  awakened: boolean;
  name: string;
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "ice_wall" | "deep_trench";
}

export interface LevelData {
  id: number;
  name: string;
  subtitle: string;
  fatherPos: { x: number; y: number };
  playerStart: { x: number; y: number };
  twinStart: { x: number; y: number };
  crystals: Crystal[];
  shrines: Shrine[];
  obstacles: Obstacle[];
  treePos: { x: number; y: number };
  description: string;
}

export interface BeamSegment {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: WavelengthColor;
  intensity: number;
}
