export interface DustMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export interface FlowerSpot {
  x: number;
  phaseOffset: number;
  chimed: boolean;
}

export interface Intro2DAssets {
  sky: HTMLImageElement;
  ridges: HTMLImageElement;
  ground: HTMLImageElement;
  ship: HTMLImageElement;
  building: HTMLImageElement;
  flower: HTMLImageElement;
  explorer: HTMLImageElement;
}

export interface Intro2DInput {
  moveLeft: boolean;
  moveRight: boolean;
  jump: boolean;
  sprint: boolean;
  interact: boolean;
}

export interface Intro2DState {
  px: number;
  py: number;
  vx: number;
  vy: number;
  grounded: boolean;
  introStepTimer: number;
  facing: 1 | -1;
  runDist: number;
  lastStepFrame: number;
  cameraX: number;
  time: number;
  flowers: FlowerSpot[];
  motes: DustMote[];
}

export interface Intro2DTelemetry {
  distanceMeters: number;
  signalStrength: number;
  nearDoorway: boolean;
  statusBanner?: string;
}
