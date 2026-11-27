import * as THREE from "three";
import { FlowerState, LevelBox, LidarWorld } from "./types";

export const MAX_LIDAR_POINTS = 220000;
export const MAX_SPORE_POINTS = 4000;
export const FLOWER_NAMES = ["Flower A", "Flower B", "Flower C", "Flower D"] as const;
export const VENT_POSITIONS = [
  [-11, 1.4, -11],
  [11, 1.4, -11],
  [-11, 1.4, 11],
  [11, 1.4, 11],
] as const;

const FLOWER_SPOTS = [
  { f: [-6.5, -10], b: [-9.4, -9.4] },
  { f: [6.5, -10.5], b: [9, -9.5] },
  { f: [-10.5, 10], b: [-8, 7] },
  { f: [10.5, 10.5], b: [9.6, 5] },
];

function createFlowerMesh(x: number, z: number): {
  g: THREE.Group;
  head: THREE.Group;
  pm: THREE.MeshBasicMaterial;
} {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.visible = false;

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.04, 1.05, 6),
    new THREE.MeshBasicMaterial({ color: 0x2e9a54 })
  );
  stem.position.y = 0.52;
  g.add(stem);

  const head = new THREE.Group();
  head.position.y = 1.08;
  g.add(head);

  const pm = new THREE.MeshBasicMaterial({ color: 0xff5fa8 });
  for (let k = 0; k < 7; k++) {
    const petal = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), pm);
    petal.scale.set(1, 0.3, 1.9);
    const angle = (k / 7) * 6.283;
    petal.position.set(Math.cos(angle) * 0.17, 0, Math.sin(angle) * 0.17);
    petal.rotation.y = -angle;
    head.add(petal);
  }
  head.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xffe27a })
    )
  );

  return { g, head, pm };
}

/** Builds the subterranean 3D LiDAR level, flowers, point cloud buffers, and mate sphere. */
export function buildLidarWorld(scene: THREE.Scene): LidarWorld {
  const boxes: LevelBox[] = [];
  const addBox = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, t = 0): LevelBox => {
    const b: LevelBox = { min: [x0, y0, z0], max: [x1, y1, z1], t: t || 0, hits: 0 };
    boxes.push(b);
    return b;
  };

  // Floor and Ceiling
  addBox(-12, -1, -12, 12, 0, 12);
  addBox(-12, 4, -12, 12, 5, 12);
  // Outer Bounds
  addBox(-13, 0, -13, 13, 4, -12);
  addBox(-13, 0, 12, 13, 4, 13);
  addBox(-13, 0, -13, -12, 4, 13);
  addBox(12, 0, -13, 13, 4, 13);
  // Interior Monoliths and Maze Dividers
  addBox(-12, 0, -3, -4, 4, -2.6);
  addBox(0, 0, -3, 12, 4, -2.6);
  addBox(3, 0, -12, 3.4, 4, -6);
  addBox(-4, 0, 3, -3.6, 4, 12);
  addBox(-1, 0, -8, 0.2, 4, -6.8);
  addBox(5, 0, 3, 6.2, 4, 4.2);
  addBox(-1, 0, 5, 0.2, 4, 6.2);
  addBox(7, 0, -1, 8.5, 1.2, 0.3);
  addBox(-9, 0, -1, -7.6, 0.9, 0.2);
  addBox(8, 0, 8, 9.4, 1.6, 9.4);
  addBox(-12, 0, -8, -10, 2, -6.4);

  const flowers: FlowerState[] = FLOWER_SPOTS.map((s, i) => {
    const box = addBox(s.f[0] - 0.25, 0, s.f[1] - 0.25, s.f[0] + 0.25, 1.1, s.f[1] + 0.25, 2);
    const beacon = addBox(s.b[0], 0, s.b[1], s.b[0] + 0.8, 0.8, s.b[1] + 0.8, 1);
    beacon.flower = i;

    const { g, head, pm } = createFlowerMesh(s.f[0], s.f[1]);
    scene.add(g);

    return {
      x: s.f[0],
      z: s.f[1],
      i,
      state: 0,
      hp: 100,
      bloomT: 0,
      charge: 0,
      g,
      head,
      pm,
      warned: false,
      box,
    };
  });

  // Permanent LiDAR Point Cloud
  const pos = new Float32Array(MAX_LIDAR_POINTS * 3);
  const col = new Float32Array(MAX_LIDAR_POINTS * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setDrawRange(0, 0);

  const pts = new THREE.Points(
    geo,
    new THREE.PointsMaterial({ size: 0.045, vertexColors: true, sizeAttenuation: true })
  );
  pts.frustumCulled = false;
  scene.add(pts);

  // Spore Points (Short-lived viral particles)
  const vpos = new Float32Array(MAX_SPORE_POINTS * 3);
  const vcol = new Float32Array(MAX_SPORE_POINTS * 3);
  const vbirth = new Float32Array(MAX_SPORE_POINTS).fill(-1e9);
  const vgeo = new THREE.BufferGeometry();
  vgeo.setAttribute("position", new THREE.BufferAttribute(vpos, 3));
  vgeo.setAttribute("color", new THREE.BufferAttribute(vcol, 3));

  const vpts = new THREE.Points(
    vgeo,
    new THREE.PointsMaterial({ size: 0.08, vertexColors: true, sizeAttenuation: true })
  );
  vpts.frustumCulled = false;
  scene.add(vpts);

  // Mate: Pale ethereal sphere floating in from the outer abyss
  const mate = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 12, 10),
    new THREE.MeshBasicMaterial({ color: 0xfff2c8 })
  );
  scene.add(mate);

  return {
    boxes,
    flowers,
    viruses: [],
    mate,
    geo,
    pos,
    col,
    vgeo,
    vpos,
    vcol,
    vbirth,
    headIdx: 0,
    totalCount: 0,
    vh: 0,
    lure: 0,
    spawnT: 0,
    now: 0,
    ended: false,
  };
}
