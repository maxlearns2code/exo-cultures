import {
  BUILDING_DRAW_HEIGHT,
  GROUND_Y,
  RAMP_END_X,
  RAMP_START_X,
  SHIP_DRAW_HEIGHT,
  SHIP_X,
  WORLD_WIDTH,
} from "./constants";
import { DustMote, Intro2DAssets, Intro2DInput, Intro2DState, Intro2DTelemetry } from "./types";

function createDustMotes(): DustMote[] {
  return Array.from({ length: 58 }, (_, i) => ({
    x: Math.random() * WORLD_WIDTH,
    y: 80 + Math.random() * (GROUND_Y - 90),
    vx: -12 - Math.random() * 18,
    vy: -4 + Math.random() * 8,
    size: i % 5 === 0 ? 3 : 2,
    alpha: 0.2 + Math.random() * 0.45,
    color: i % 9 === 0 ? "#86efac" : "#94a3b8",
  }));
}

/** Creates initial world state for Part 1 with the explorer at the lander's ramp. */
export function createInitialIntro2DState(): Intro2DState {
  return {
    px: RAMP_START_X,
    py: GROUND_Y - 26,
    vx: 0,
    vy: 0,
    grounded: false,
    introStepTimer: 0.75,
    facing: 1,
    runDist: 0,
    lastStepFrame: -1,
    cameraX: 0,
    time: 0,
    flowers: [{ x: 760, phaseOffset: 0.0, chimed: false }],
    motes: createDustMotes(),
  };
}

/** Computes scaled world dimensions and doorway anchor from loaded landmark sprites. */
export function getLandmarkMetrics(assets: Intro2DAssets) {
  const shipW = assets.ship.naturalWidth
    ? Math.round((assets.ship.naturalWidth / assets.ship.naturalHeight) * SHIP_DRAW_HEIGHT)
    : 351;
  const bldgW = assets.building.naturalWidth
    ? Math.round((assets.building.naturalWidth / assets.building.naturalHeight) * BUILDING_DRAW_HEIGHT)
    : 453;
  const buildingX = WORLD_WIDTH - bldgW;
  const doorCenterX = buildingX + bldgW * 0.62;
  const doorCenterY = GROUND_Y - 46;
  return { shipW, shipH: SHIP_DRAW_HEIGHT, bldgW, bldgH: BUILDING_DRAW_HEIGHT, buildingX, doorCenterX, doorCenterY };
}

function spawnBurst(motes: DustMote[], x: number, y: number, color: string, count: number) {
  for (let i = 0; i < count; i++) {
    motes.push({
      x: x + (Math.random() - 0.5) * 18,
      y: y - Math.random() * 10,
      vx: (Math.random() - 0.5) * 42,
      vy: -16 - Math.random() * 32,
      size: 2,
      alpha: 0.75,
      color,
    });
  }
  if (motes.length > 95) {
    motes.splice(0, motes.length - 95);
  }
}

export interface StepCallbacks {
  onFootstep: () => void;
  onFlowerChime: (index: number) => void;
  onEnterDoor: () => void;
}

/** Advances Part 1 physics, camera, flowers, and dust motes by `dt` seconds. */
export function stepIntro2D(
  state: Intro2DState,
  assets: Intro2DAssets,
  input: Intro2DInput,
  dt: number,
  viewW: number,
  entered: boolean,
  callbacks: StepCallbacks
): Intro2DTelemetry {
  state.time += dt;
  const { buildingX, doorCenterX } = getLandmarkMetrics(assets);

  if (state.introStepTimer > 0 && !entered) {
    state.introStepTimer = Math.max(0, state.introStepTimer - dt);
    const progress = 1 - state.introStepTimer / 0.75;
    state.px = RAMP_START_X + (RAMP_END_X - RAMP_START_X) * progress;
    state.py = GROUND_Y - 26 * (1 - progress);
    state.facing = 1;
    state.runDist += 140 * dt;
    if (state.introStepTimer === 0) {
      state.grounded = true;
      state.py = GROUND_Y;
    }
  } else if (!entered) {
    const dir = (input.moveRight ? 1 : 0) - (input.moveLeft ? 1 : 0);
    const maxSpeed = input.sprint ? 310 : 225;
    const accel = state.grounded ? 1600 : 950;

    if (dir !== 0) {
      state.facing = dir > 0 ? 1 : -1;
      state.vx += dir * accel * dt;
      if (Math.abs(state.vx) > maxSpeed) state.vx = dir * maxSpeed;
    } else {
      const friction = state.grounded ? 1500 : 250;
      if (Math.abs(state.vx) <= friction * dt) state.vx = 0;
      else state.vx -= Math.sign(state.vx) * friction * dt;
    }

    if (input.jump && state.grounded) {
      state.vy = -420;
      state.grounded = false;
      spawnBurst(state.motes, state.px, GROUND_Y, "#64748b", 5);
    }

    state.vy += 1180 * dt;
    state.px += state.vx * dt;
    state.py += state.vy * dt;

    const onRamp = state.px >= RAMP_START_X - 10 && state.px <= RAMP_END_X;
    const rampFloorY = onRamp
      ? GROUND_Y - 24 * (1 - Math.max(0, Math.min(1, (state.px - RAMP_START_X) / (RAMP_END_X - RAMP_START_X))))
      : GROUND_Y;

    if (state.py >= rampFloorY) {
      if (!state.grounded && state.vy > 180) {
        spawnBurst(state.motes, state.px, rampFloorY, "#64748b", 4);
        callbacks.onFootstep();
      }
      state.py = rampFloorY;
      state.vy = 0;
      state.grounded = true;
    } else {
      state.grounded = false;
    }

    state.px = Math.max(SHIP_X + 50, Math.min(doorCenterX + 8, state.px));

    if (state.grounded && Math.abs(state.vx) > 20) {
      state.runDist += Math.abs(state.vx) * dt;
      const stepIdx = Math.floor(state.runDist / 56);
      if (stepIdx !== state.lastStepFrame) {
        state.lastStepFrame = stepIdx;
        callbacks.onFootstep();
        if (Math.random() < 0.65) {
          spawnBurst(state.motes, state.px - state.facing * 8, state.py, "#475569", 2);
        }
      }
    }
  } else {
    state.px += (doorCenterX - state.px) * Math.min(1, dt * 6);
    state.py = GROUND_Y;
  }

  const targetCamX = Math.max(0, Math.min(WORLD_WIDTH - viewW, state.px - viewW * 0.34));
  state.cameraX += (targetCamX - state.cameraX) * Math.min(1, dt * 7.5);

  for (let i = 0; i < state.flowers.length; i++) {
    const fl = state.flowers[i];
    if (Math.abs(state.px - fl.x) < 75 && !fl.chimed) {
      fl.chimed = true;
      callbacks.onFlowerChime(i);
      spawnBurst(state.motes, fl.x, GROUND_Y - 38, "#f472b6", 6);
    }
  }

  const distToDoor = Math.max(0, doorCenterX - state.px);
  const nearDoorway = distToDoor < 78;
  if (nearDoorway && !entered) {
    if (distToDoor < 24 || (input.interact && Math.abs(state.vx) < 250 && distToDoor < 64 && state.px > buildingX + 60)) {
      callbacks.onEnterDoor();
    }
  }

  for (let i = 0; i < state.motes.length; i++) {
    const m = state.motes[i];
    m.x += m.vx * dt;
    m.y += m.vy * dt;
    if (m.x < 0) m.x = WORLD_WIDTH;
    if (m.x > WORLD_WIDTH) m.x = 0;
    if (m.y < 30 || m.y > GROUND_Y + 4) {
      m.y = 80 + Math.random() * (GROUND_Y - 100);
    }
  }

  let statusBanner: string | undefined;
  if (!entered) {
    if (state.px > 1050) {
      statusBanner = "MONOLITH THRESHOLD AHEAD // ENTER PHOSPHOR PORTAL";
    } else if (state.px > 680) {
      statusBanner = "RESONANT FLORA DETECTED // BUILDING AHEAD";
    } else if (state.px > 480) {
      statusBanner = "ANOMALOUS SILHOUETTE IN VALLEY // KEEP MOVING EAST";
    }
  }

  return {
    distanceMeters: Math.max(0, Math.round(distToDoor / 9.5)),
    signalStrength: Math.min(100, Math.max(6, Math.round(100 - (distToDoor / (doorCenterX - RAMP_START_X)) * 94))),
    nearDoorway,
    statusBanner,
  };
}
