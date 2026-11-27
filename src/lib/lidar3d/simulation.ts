import * as THREE from "three";
import { FLOWER_NAMES, MAX_LIDAR_POINTS, MAX_SPORE_POINTS, VENT_POSITIONS } from "./level";
import { FlowerState, LevelBox, LidarWorld } from "./types";

export interface LidarCallbacks {
  onMessage: (text: string) => void;
  onSelectCue: () => void;
  onPowerupCue: () => void;
  onSporeBurnCue: () => void;
  onPromptVisible: (visible: boolean) => void;
  onLureProgress: (progress: number) => void;
  onFinish: (win: boolean) => void;
}

const rayOrigin = [0, 0, 0];
const rayDir = [0, 0, 0];

function castRay(boxes: LevelBox[]): { t: number; box: LevelBox | null; axis: number } {
  let best = 40;
  let bb: LevelBox | null = null;
  let ba = 0;

  for (let i = 0; i < boxes.length; i++) {
    const b = boxes[i];
    let t0 = 0;
    let t1 = best;
    let ax = -1;
    let ok = true;

    for (let a = 0; a < 3; a++) {
      const inv = 1 / rayDir[a];
      let ta = (b.min[a] - rayOrigin[a]) * inv;
      let tb = (b.max[a] - rayOrigin[a]) * inv;
      if (ta > tb) {
        const s = ta;
        ta = tb;
        tb = s;
      }
      if (ta > t0) {
        t0 = ta;
        ax = a;
      }
      if (tb < t1) t1 = tb;
      if (t0 > t1) {
        ok = false;
        break;
      }
    }
    if (ok && ax >= 0 && t0 < best) {
      best = t0;
      bb = b;
      ba = ax;
    }
  }
  return { t: best, box: bb, axis: ba };
}

function addLidarPoint(world: LidarWorld, t: number, b: LevelBox, ax: number) {
  const i = world.headIdx * 3;
  world.pos[i] = rayOrigin[0] + rayDir[0] * t;
  world.pos[i + 1] = rayOrigin[1] + rayDir[1] * t;
  world.pos[i + 2] = rayOrigin[2] + rayDir[2] * t;

  let r: number;
  let g: number;
  let bl: number;
  if (b.t === 1) {
    // Beacon: Gold / Amber
    r = 1;
    g = 0.7;
    bl = 0.15;
  } else if (b.t === 2) {
    // Flower: Magenta
    r = 1;
    g = 0.35;
    bl = 0.7;
  } else {
    // Level Geometry: Cyan / Blue depth attenuation
    const f = Math.min(1, t / 24);
    const sh = ax === 1 ? 1 : 0.68;
    r = (0.75 - 0.65 * f) * sh;
    g = (1 - 0.65 * f) * sh;
    bl = (1 - 0.1 * f) * sh;
  }

  world.col[i] = r;
  world.col[i + 1] = g;
  world.col[i + 2] = bl;

  world.headIdx = (world.headIdx + 1) % MAX_LIDAR_POINTS;
  if (world.totalCount < MAX_LIDAR_POINTS) world.totalCount++;
}

/** Casts a conical LiDAR pulse or focused laser beam, illuminating walls, beacons, and spores. */
export function emitLidarScan(
  world: LidarWorld,
  camera: THREE.PerspectiveCamera,
  rays: number,
  cone: number,
  weight: number,
  callbacks: Pick<LidarCallbacks, "onMessage" | "onSelectCue">
) {
  camera.updateMatrixWorld();
  const m = camera.matrixWorld.elements;
  const tc = Math.tan(cone);
  rayOrigin[0] = m[12];
  rayOrigin[1] = m[13];
  rayOrigin[2] = m[14];

  for (let k = 0; k < rays; k++) {
    const r = Math.sqrt(Math.random()) * tc;
    const th = Math.random() * 6.2832;
    const c = Math.cos(th) * r;
    const s = Math.sin(th) * r;

    const x = -m[8] + m[0] * c + m[4] * s;
    const y = -m[9] + m[1] * c + m[5] * s;
    const z = -m[10] + m[2] * c + m[6] * s;
    const len = Math.hypot(x, y, z);

    rayDir[0] = x / len || 1e-9;
    rayDir[1] = y / len || 1e-9;
    rayDir[2] = z / len || 1e-9;

    const hit = castRay(world.boxes);

    for (let v = 0; v < world.viruses.length; v++) {
      const vi = world.viruses[v];
      const ox = rayOrigin[0] - vi.p[0];
      const oy = rayOrigin[1] - vi.p[1];
      const oz = rayOrigin[2] - vi.p[2];

      const bq = ox * rayDir[0] + oy * rayDir[1] + oz * rayDir[2];
      const disc = bq * bq - (ox * ox + oy * oy + oz * oz - 0.12);
      if (disc > 0) {
        const ts = -bq - Math.sqrt(disc);
        if (ts > 0 && ts < hit.t) {
          const j = world.vh * 3;
          world.vpos[j] = rayOrigin[0] + rayDir[0] * ts;
          world.vpos[j + 1] = rayOrigin[1] + rayDir[1] * ts;
          world.vpos[j + 2] = rayOrigin[2] + rayDir[2] * ts;
          world.vbirth[world.vh] = world.now;
          world.vh = (world.vh + 1) % MAX_SPORE_POINTS;
          vi.hp -= weight;
        }
      }
    }

    if (hit.box) {
      addLidarPoint(world, hit.t, hit.box, hit.axis);
      if (hit.box.t === 1 && hit.box.flower !== undefined) {
        const fl = world.flowers[hit.box.flower];
        if (fl.state === 0) {
          hit.box.hits += weight;
          if (hit.box.hits >= 90) {
            fl.state = 1;
            callbacks.onSelectCue();
            callbacks.onMessage(`${FLOWER_NAMES[fl.i]} is charged! Stand near it and hold [E] / [A] to bloom.`);
          }
        }
      }
    }
  }

  world.geo.attributes.position.needsUpdate = true;
  world.geo.attributes.color.needsUpdate = true;
  world.geo.setDrawRange(0, world.totalCount);
}

/** Resolves circle-vs-AABB horizontal player collision against solid level geometry. */
export function resolvePlayerCollision(boxes: LevelBox[], px: number, pz: number): [number, number] {
  const radius = 0.35;
  let nx = px;
  let nz = pz;

  for (let i = 0; i < boxes.length; i++) {
    const b = boxes[i];
    if (b.t || b.max[1] < 0.5 || b.min[1] > 1.2) continue;
    const cx = Math.max(b.min[0], Math.min(nx, b.max[0]));
    const cz = Math.max(b.min[2], Math.min(nz, b.max[2]));
    const dx = nx - cx;
    const dz = nz - cz;
    const q = dx * dx + dz * dz;
    if (q < radius * radius && q > 1e-8) {
      const l = Math.sqrt(q);
      nx = cx + (dx / l) * radius;
      nz = cz + (dz / l) * radius;
    }
  }
  return [nx, nz];
}

/** Advances flower blooming, viral spore attacks, mate summon meter, and win/loss checks. */
export function updateLidarSimulation(
  world: LidarWorld,
  px: number,
  pz: number,
  dt: number,
  isHoldingBloom: boolean,
  callbacks: LidarCallbacks
) {
  let bloom = 0;
  let near: FlowerState | null = null;

  for (const f of world.flowers) {
    if (f.state === 2 && f.hp > 0) bloom++;
    const dx = px - f.x;
    const dz = pz - f.z;
    if (f.state === 1 && dx * dx + dz * dz < 2.6) {
      near = f;
    }
  }

  if (near) {
    callbacks.onPromptVisible(true);
    if (isHoldingBloom) {
      near.bloomT += dt;
      if (near.bloomT >= 2) {
        near.state = 2;
        near.g.visible = true;
        near.bloomT = 0;
        world.spawnT = Math.min(world.spawnT, 4);
        callbacks.onPowerupCue();
        callbacks.onMessage(`${FLOWER_NAMES[near.i]} blooms! The scent calls your mate, but attracts viral spores.`);
      }
    } else {
      near.bloomT = 0;
    }
  } else {
    callbacks.onPromptVisible(false);
  }

  // Spore Spawning
  if (bloom > 0) {
    world.spawnT -= dt;
    if (world.spawnT <= 0 && world.viruses.length < 5) {
      world.spawnT = Math.max(6, 15 - 2.5 * bloom);
      const vt = VENT_POSITIONS[Math.floor(Math.random() * 4)];
      world.viruses.push({ p: [vt[0], vt[1], vt[2]], hp: 70, ph: Math.random() * 6 });
      callbacks.onMessage(
        `A viral spore drifts in from the ${vt[2] < 0 ? "north" : "south"}-${vt[0] > 0 ? "east" : "west"} vent!`
      );
    }
  }

  // Spores Movement & Infection
  for (let i = world.viruses.length - 1; i >= 0; i--) {
    const v = world.viruses[i];
    if (v.hp <= 0) {
      world.viruses.splice(i, 1);
      callbacks.onSporeBurnCue();
      callbacks.onMessage("Spore burned away!");
      continue;
    }
    let tg: FlowerState | null = null;
    let bd = 1e9;
    for (const f of world.flowers) {
      if (f.state === 2 && f.hp > 0) {
        const q = (f.x - v.p[0]) * (f.x - v.p[0]) + (f.z - v.p[2]) * (f.z - v.p[2]);
        if (q < bd) {
          bd = q;
          tg = f;
        }
      }
    }

    if (tg) {
      const dx = tg.x - v.p[0];
      const dy = 1.1 - v.p[1];
      const dz = tg.z - v.p[2];
      const len = Math.hypot(dx, dy, dz);
      if (len > 0.6) {
        const sp = (0.9 * dt) / len;
        v.p[0] += dx * sp;
        v.p[1] += dy * sp;
        v.p[2] += dz * sp;
      } else {
        tg.hp -= 9 * dt;
        if (!tg.warned) {
          tg.warned = true;
          callbacks.onMessage(`${FLOWER_NAMES[tg.i]} is being infected! Burn the spore!`);
        }
        if (tg.hp <= 0) {
          tg.state = 3;
          callbacks.onMessage(`${FLOWER_NAMES[tg.i]} has withered.`);
        }
      }
    }
  }

  // Lure Meter Progress
  world.lure = Math.min(100, world.lure + bloom * 1.2 * dt);
  callbacks.onLureProgress(Math.round(world.lure));

  const p = world.lure / 100;
  world.mate.position.set(-32 + 32 * p, 2 - 0.4 * p, -32 + 34 * p);
  world.mate.scale.setScalar(1 + 0.25 * Math.sin(world.now * 0.004));

  if (world.lure >= 100) {
    world.ended = true;
    callbacks.onFinish(true);
  } else if (world.flowers.every((f) => f.state === 3)) {
    world.ended = true;
    callbacks.onFinish(false);
  }
}

/** Updates flower swaying/withering animations and fades expired viral spore particle flashes. */
export function animateLidarWorld(world: LidarWorld) {
  const t = world.now / 1000;
  world.flowers.forEach((f) => {
    const g = f.g;
    if (f.state === 2) {
      const sick = 1 - f.hp / 100;
      g.rotation.z = 0.14 * Math.sin(t * 1.3 + f.i) + sick * 0.25;
      g.rotation.x = 0.09 * Math.cos(t * 1.1 + f.i);
      const pu = 1 + 0.2 * Math.sin(t * 3.2 + f.i * 1.3);
      f.head.scale.setScalar(pu);
      f.pm.color.setHSL(
        0.92 - 0.62 * sick,
        0.9 - 0.3 * sick,
        0.5 + 0.12 * Math.sin(t * 3.2 + f.i * 1.3) - 0.15 * sick
      );
      f.head.rotation.x = sick * 0.9;
    } else if (f.state === 3) {
      g.visible = true;
      g.rotation.z = 0.5;
      f.head.scale.setScalar(0.7);
      f.pm.color.setHex(0x3a2f33);
    }
  });

  for (let i = 0; i < MAX_SPORE_POINTS; i++) {
    const a = (world.now - world.vbirth[i]) / 1000;
    const k = a > 1.2 ? 0 : 1 - a / 1.2;
    const j = i * 3;
    world.vcol[j] = k;
    world.vcol[j + 1] = 0.12 * k;
    world.vcol[j + 2] = 0.25 * k;
  }
  world.vgeo.attributes.position.needsUpdate = true;
  world.vgeo.attributes.color.needsUpdate = true;
}
