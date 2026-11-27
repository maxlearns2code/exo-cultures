import { GROUND_Y, INTRO_2D_ASSET_PATHS, SHIP_X, VIRTUAL_HEIGHT } from "./constants";
import { getLandmarkMetrics } from "./simulation";
import { Intro2DAssets, Intro2DState } from "./types";

function loadImg(src: string): HTMLImageElement {
  const img = new Image();
  img.src = src;
  return img;
}

/** Preloads all 2D pixel-art images required for Part 1. */
export function loadIntro2DAssets(): Intro2DAssets {
  return {
    sky: loadImg(INTRO_2D_ASSET_PATHS.sky),
    ridges: loadImg(INTRO_2D_ASSET_PATHS.ridges),
    ground: loadImg(INTRO_2D_ASSET_PATHS.ground),
    ship: loadImg(INTRO_2D_ASSET_PATHS.ship),
    building: loadImg(INTRO_2D_ASSET_PATHS.building),
    flower: loadImg(INTRO_2D_ASSET_PATHS.flower),
    explorer: loadImg(INTRO_2D_ASSET_PATHS.explorer),
  };
}

/** Renders the parallax volcanic world, landmarks, flower, explorer, and particles. */
export function renderIntro2D(
  ctx: CanvasRenderingContext2D,
  state: Intro2DState,
  assets: Intro2DAssets,
  viewW: number,
  entered: boolean
) {
  const { shipW, shipH, bldgW, bldgH, buildingX, doorCenterX, doorCenterY } = getLandmarkMetrics(assets);
  const pulseBeacon = 0.55 + 0.45 * Math.sin(state.time * 3.1);

  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#0a0d11";
  ctx.fillRect(0, 0, viewW, VIRTUAL_HEIGHT);

  // 1. Parallax Sky (0.08x scroll)
  if (assets.sky.complete && assets.sky.naturalWidth > 0) {
    const skyH = VIRTUAL_HEIGHT;
    const skyW = Math.round((assets.sky.naturalWidth / assets.sky.naturalHeight) * skyH);
    const scroll = ((state.cameraX * 0.08) % skyW + skyW) % skyW;
    for (let x = -scroll; x < viewW; x += skyW) {
      ctx.drawImage(assets.sky, Math.round(x), 0, skyW, skyH);
    }
  }

  // 2. Parallax Volcanic Ridges + Integrated Ørgäæ Alien (0.30x scroll)
  if (assets.ridges.complete && assets.ridges.naturalWidth > 0) {
    const rScale = 0.72;
    const rW = Math.round(assets.ridges.naturalWidth * rScale);
    const rH = Math.round(assets.ridges.naturalHeight * rScale);
    const rY = GROUND_Y - Math.round(rH * 0.72);
    const scroll = ((state.cameraX * 0.30) % rW + rW) % rW;
    for (let x = -scroll; x < viewW; x += rW) {
      ctx.drawImage(assets.ridges, Math.round(x), rY, rW, rH);
    }
  }

  // 3. World Space Landmarks (1.0x scroll)
  ctx.save();
  ctx.translate(-Math.round(state.cameraX), 0);

  // 3a. Landed Spaceship
  if (assets.ship.complete && assets.ship.naturalWidth > 0) {
    const sy = GROUND_Y - shipH + 6;
    ctx.drawImage(assets.ship, SHIP_X, sy, shipW, shipH);

    const hatchX = SHIP_X + shipW * 0.60;
    const hatchY = GROUND_Y - 38;
    const hatchPulse = 0.24 + 0.08 * Math.sin(state.time * 4.5);
    const hGrad = ctx.createRadialGradient(hatchX, hatchY, 4, hatchX + 20, GROUND_Y, 84);
    hGrad.addColorStop(0, `rgba(251, 191, 36, ${hatchPulse})`);
    hGrad.addColorStop(1, "rgba(217, 119, 6, 0)");
    ctx.fillStyle = hGrad;
    ctx.fillRect(hatchX - 60, hatchY - 40, 170, 120);

    if (Math.sin(state.time * 4.2) > 0.25) {
      ctx.fillStyle = "rgba(239, 68, 68, 0.85)";
      ctx.beginPath();
      ctx.arc(SHIP_X + shipW * 0.56, sy + 4, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 3b. Jagged Spire Monolith Building + Radiant Phosphor Doorway
  if (assets.building.complete && assets.building.naturalWidth > 0) {
    const by = GROUND_Y - bldgH + 5;
    ctx.drawImage(assets.building, buildingX, by, bldgW, bldgH);

    const portalGlow = ctx.createRadialGradient(
      doorCenterX,
      doorCenterY,
      8,
      doorCenterX,
      doorCenterY,
      175 + 25 * pulseBeacon
    );
    portalGlow.addColorStop(0, `rgba(187, 247, 208, ${0.42 + 0.18 * pulseBeacon})`);
    portalGlow.addColorStop(0.35, `rgba(74, 222, 128, ${0.24 + 0.1 * pulseBeacon})`);
    portalGlow.addColorStop(1, "rgba(34, 197, 94, 0)");
    ctx.fillStyle = portalGlow;
    ctx.fillRect(doorCenterX - 200, doorCenterY - 190, 400, 260);
  }

  // 3c. Foreground Walkable Ground Strip
  if (assets.ground.complete && assets.ground.naturalWidth > 0) {
    const gScale = 0.48;
    const gW = Math.round(assets.ground.naturalWidth * gScale);
    const gH = Math.round(assets.ground.naturalHeight * gScale);
    const gY = GROUND_Y - Math.round(32 * gScale);
    const startTile = Math.floor(state.cameraX / gW) * gW;
    for (let gx = startTile; gx < state.cameraX + viewW + gW; gx += gW) {
      ctx.drawImage(assets.ground, gx, gY, gW, gH);
    }
  }

  // 3d. Pulsing Resonant Alien Flower
  if (assets.flower.complete && assets.flower.naturalWidth > 0) {
    const fw = assets.flower.naturalWidth / 4;
    const fh = assets.flower.naturalHeight;
    const drawFH = 66;
    const drawFW = Math.round((fw / fh) * drawFH);
    const seq = [0, 1, 2, 3, 2, 1];

    for (let i = 0; i < state.flowers.length; i++) {
      const fl = state.flowers[i];
      const nearBoost = Math.abs(state.px - fl.x) < 110 ? 1.8 : 1.0;
      const idx = seq[Math.floor((state.time * 4.5 * nearBoost + fl.phaseOffset) % seq.length)];
      const fx = Math.round(fl.x - drawFW / 2);
      const fy = GROUND_Y - drawFH + 5;

      const glow = ctx.createRadialGradient(fl.x, fy + 22, 2, fl.x, fy + 22, 36);
      glow.addColorStop(0, "rgba(244, 114, 182, 0.22)");
      glow.addColorStop(1, "rgba(244, 114, 182, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(fl.x - 36, fy - 14, 72, 72);

      ctx.drawImage(assets.flower, idx * fw, 0, fw, fh, fx, fy, drawFW, drawFH);
    }
  }

  // 3e. Human Explorer Sprite
  if (assets.explorer.complete && assets.explorer.naturalWidth > 0) {
    const ew = assets.explorer.naturalWidth / 5;
    const eh = assets.explorer.naturalHeight;
    const drawEH = 92;
    const drawEW = Math.round((ew / eh) * drawEH);

    let frameIdx = 0;
    const isMoving = state.introStepTimer > 0 || (state.grounded && Math.abs(state.vx) > 25);
    if (!state.grounded && state.introStepTimer <= 0) {
      frameIdx = 1;
    } else if (isMoving) {
      frameIdx = 1 + (Math.floor(state.runDist / 28) % 4);
    }

    ctx.save();
    if (entered) {
      ctx.globalAlpha = Math.max(0.15, 1 - (state.px - (doorCenterX - 35)) / 40);
    }
    ctx.translate(Math.round(state.px), Math.round(state.py));
    ctx.scale(state.facing, 1);

    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.beginPath();
    ctx.ellipse(0, 1, 16, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.drawImage(
      assets.explorer,
      frameIdx * ew,
      0,
      ew,
      eh,
      -Math.round(drawEW / 2),
      -drawEH + 4,
      drawEW,
      drawEH
    );
    ctx.restore();
  }

  // 3f. Atmospheric volcanic ash / spore motes
  for (let i = 0; i < state.motes.length; i++) {
    const m = state.motes[i];
    if (m.x < state.cameraX - 20 || m.x > state.cameraX + viewW + 20) continue;
    ctx.globalAlpha = m.alpha;
    ctx.fillStyle = m.color;
    ctx.fillRect(Math.round(m.x), Math.round(m.y), m.size, m.size);
  }
  ctx.globalAlpha = 1;

  ctx.restore();
}
