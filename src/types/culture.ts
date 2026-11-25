export interface CultureInfo {
  id: string;
  name: string;
  author: string;
  title: string;
  subtitle: string;
  route: string;
  themeColor: "cyan" | "emerald" | "violet" | "amber";
  status: "READY TO PLAY" | "SHOWCASE PORTAL" | "COMING SOON";
  description: string;
  mechanics: string[];
  imageSrc?: string;
}

export interface CultureAlienData {
  alienGlyphs: string;
  alienName: string;
  fragmentCode: string;
  fragmentTitle: string;
  alienAudience: string;
  sectorId: string;
  planetCoords: string;
  environmentalTelemetry: string;
  beamLock: string;
  specimenCode: string;
  hazardClass: string;
  sampleType: string;
  containmentProtocol: string;
}

export const COLLABORATIVE_GAME: CultureInfo = {
  id: "martin",
  name: "Echoes in the Dark",
  author: "Maxime • Martin • Aisah • Mana",
  title: "Echoes in the Dark",
  subtitle: "3D Photonic LiDAR & Floral Resonance",
  route: "/games/martin",
  themeColor: "violet",
  status: "READY TO PLAY",
  description:
    "A unified collaborative game combining the sub-ice abyssal bioluminescence, photonic LiDAR echolocation, floral acoustic resonance, and atmospheric exosphere drift of four creators. Navigate the pitch-black subterranean void, charge floral beacons to bloom resonant flowers, defend against viral spores, and summon your distant counterpart.",
  mechanics: ["3D LiDAR Echolocation", "Bloom Defense", "Photonic Scan", "Floral Resonance"],
};

export const COLLABORATIVE_ALIEN_DATA: CultureAlienData = {
  alienGlyphs: "☲0x45⋔⎎▲",
  alienName: "EXO-SYM // 0x4D",
  fragmentCode: "UNIFIED FRAGMENT",
  fragmentTitle: "COLLABORATIVE 3D LIDAR ABYSS",
  alienAudience: "Collective exploration combining sensory light, echolocation, acoustic chambers, and atmospheric vapors",
  sectorId: "SECTOR 01: UNIFIED SUB-ABYSS",
  planetCoords: "05h 14m • RIGEL-VII EXPEDITION",
  environmentalTelemetry: "GRAV: 0.12G • 0 LUX • PITCH BLACK CAVERN",
  beamLock: "LIDAR SCANNER ONLINE • 15kHz",
  specimenCode: "SPECIMEN EX-01",
  hazardClass: "CLASS 1 [RESONANT SPORES]",
  sampleType: "BIOLUMINESCENT FLORAL BEACONS",
  containmentProtocol: "ISOLATION CELL: FIELD GENERATOR ENGAGED",
};

export const ALIEN_CULTURE_METADATA: Record<string, CultureAlienData> = {
  martin: COLLABORATIVE_ALIEN_DATA,
  "exo-cultures": COLLABORATIVE_ALIEN_DATA,
};
