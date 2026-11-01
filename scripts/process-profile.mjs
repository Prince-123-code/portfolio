import sharp from 'sharp';
import fs from 'fs';

async function processImage() {
  const inputPath = 'public/profile.jpg';
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Image dimensions: ${width}x${height}, channels: ${channels}`);

  // Create an output buffer
  const outBuffer = Buffer.from(data);

  // Sample top-left corner color to find background color
  const r0 = data[0];
  const g0 = data[1];
  const b0 = data[2];
  console.log(`Top-left pixel: R=${r0}, G=${g0}, B=${b0}`);

  // We can do a flood fill or tolerance threshold for near-white background
  // Looking at the passport photo, the background is plain white/near white (R > 230, G > 230, B > 230)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Check distance from white
      const isNearWhite = r > 225 && g > 225 && b > 225;
      const isLightGray = r > 210 && g > 210 && b > 210 && Math.abs(r - g) < 15 && Math.abs(g - b) < 15;

      if (isNearWhite || (y < height * 0.7 && isLightGray)) {
        // Soft edge fade
        const brightness = (r + g + b) / 3;
        if (brightness > 240) {
          outBuffer[idx + 3] = 0; // fully transparent
        } else if (brightness > 215) {
          const alpha = Math.max(0, Math.min(255, Math.round((240 - brightness) / 25 * 255)));
          outBuffer[idx + 3] = alpha;
        }
      }
    }
  }

  // Save transparent PNG
  await sharp(outBuffer, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile('public/profile-transparent.png');

  console.log('Saved public/profile-transparent.png successfully');
}

processImage().catch(console.error);
