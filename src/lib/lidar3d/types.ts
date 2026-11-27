import * as THREE from "three";

export interface LevelBox {
  min: number[];
  max: number[];
  t: number; // 0: architecture, 1: beacon, 2: flower, 3: architectural trim/accent
  hits: number;
  flower?: number;
  collide?: boolean;
}

export interface FlowerState {
  x: number;
  z: number;
  i: number;
  state: number; // 0: uncharged, 1: charged, 2: blooming, 3: withered
  hp: number;
  bloomT: number;
  charge: number;
  g: THREE.Group;
  head: THREE.Group;
  pm: THREE.MeshBasicMaterial;
  light: THREE.PointLight;
  warned: boolean;
  box: LevelBox;
}

export interface Virus {
  p: number[];
  hp: number;
  ph: number;
}

export interface PaintBeamFX {
  lineGeo: THREE.BufferGeometry;
  linePos: Float32Array;
  lineCol: Float32Array;
  lineMat: THREE.LineBasicMaterial;
  maxBeams: number;
  fadeAlpha: number;
}

export interface LidarWorld {
  boxes: LevelBox[];
  flowers: FlowerState[];
  viruses: Virus[];
  mate: THREE.Mesh;
  mateLight: THREE.PointLight;
  geo: THREE.BufferGeometry;
  pos: Float32Array;
  col: Float32Array;
  vgeo: THREE.BufferGeometry;
  vpos: Float32Array;
  vcol: Float32Array;
  vbirth: Float32Array;
  beamFX: PaintBeamFX;
  headIdx: number;
  totalCount: number;
  vh: number;
  lure: number;
  spawnT: number;
  now: number;
  ended: boolean;
}
