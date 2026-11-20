#!/usr/bin/env bash
# ==============================================================================
# EXO-CULTURES: Raspberry Pi 400 Arcade Kiosk Launcher
# Target: 14" CRT TV (15kHz RGB SCART via Recalbox RGB Dual) + 8BitDo Stick
# ==============================================================================

set -e

echo "👾 Starting EXO-CULTURES Exhibition Kiosk..."

# 1. Disable screen blanking, screensaver, and DPMS sleep
xset s noblank
xset s off
xset -dpms

# 2. Hide mouse cursor when idle
if command -v unclutter &> /dev/null; then
  unclutter -idle 0.5 -root &
fi

# 3. Check if local web server is running; if not, start it
if ! curl -s --head http://localhost:3000 > /dev/null; then
  echo "🚀 Launching local Next.js production server on http://localhost:3000..."
  cd "$(dirname "$0")/.."
  pnpm start -p 3000 &
  sleep 3
fi

# 4. Launch Chromium in Full Kiosk Mode
# Resolution: 640x480 (4:3 CRT standard)
chromium-browser \
  --kiosk \
  --window-size=640,480 \
  --window-position=0,0 \
  --noerrdialogs \
  --disable-infobars \
  --disable-translate \
  --disable-features=Translate \
  --disable-notifications \
  --check-for-update-interval=31536000 \
  --autoplay-policy=no-user-gesture-required \
  http://localhost:3000
