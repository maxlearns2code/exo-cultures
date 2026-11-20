# Chromatic Symbiosis - Poster Layers Manifest

This directory contains the 8 visual layer components exported from Photoshop for the **Chromatic Symbiosis** interactive experience.

All primary layers are aligned to the native **1043 × 1477 px** poster canvas, guaranteeing 1:1 pixel alignment across all depth planes.

---

## Layer Hierarchy & Stacking Order

| Stacking Order | Filename | Dimensions | Blend Mode | Parallax Depth | Role & Description |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **1 (Back)** | `background.png` | 1043 × 1477 | `normal` | `0.015x` | Deep space cosmos, nebula gases, and distant stars. |
| **2** | `soil.png` | 1043 × 1477 | `normal` | `0.02x` | Cave bedrock and luminous subterranean stream base. |
| **3** | `tree.png` | 1043 × 1477 | `normal` | `0.03x` | Mystical portal tree standing **on top of the soil**, hosting the living portal button. |
| **4** | `father.png` | 1043 × 1477 | `normal` | `0.04x` | Cosmic father figure with central ocular chest core and rainbow tendrils. |
| **5** | `right kid.png` | 1043 × 1477 | `normal` | `0.06x` | Left twin son holding hands, with glowing head and chest core. |
| **6** | `left kid.png` | 1043 × 1477 | `normal` | `0.06x` | Right twin son holding hands, projecting light energy. |
| **7** | `smoke.png` | 2085 × 2953 (2×) | `screen` | `0 (static)` | Atmospheric thermal mist resting statically across the kids' hands. |
| **8 (Front)** | `leaf.png` | 1043 × 1477 | `normal` | `0.08x` | Crimson floating leaves hovering on top of the smoke with floating animation. |

---

## Interactive Elements

- **Tree Portal Gateway (`tree.png`):**
  - **Coordinates:** Positioned over the violet vortex eye (`~71% X`, `19% Y`).
  - **Interaction:** Hover triggers accelerated vortex rotation and neon flare; clicking initiates a cosmic warp transition to the `/story` page.
- **Floating Autumn Leaves (`leaf.png`):**
  - Floats on top of the smoke with a smooth vertical sine-wave and gentle rotational flutter.
