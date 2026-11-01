import sharp from 'sharp';

async function makeSeamlessPortrait() {
  const inputPath = 'public/profile-stylish.png';
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Input: ${width}x${height}`);

  // Target background color of the webpage: #080b0f -> R: 8, G: 11, B: 15
  const bgR = 8;
  const bgG = 11;
  const bgB = 15;

  const outBuffer = Buffer.from(data);

  // Center of face is around (width * 0.5, height * 0.42)
  const cx = width * 0.5;
  const cy = height * 0.42;

  // Radii for elliptical mask preserving Prince fully in the middle
  const rxInner = width * 0.32;
  const ryInner = height * 0.32;
  const rxOuter = width * 0.48;
  const ryOuter = height * 0.48;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      
      // Normalized distance from center ellipse
      const dx = (x - cx) / rxInner;
      const dy = (y - cy) / ryInner;
      const distInner = Math.sqrt(dx * dx + dy * dy);

      // Distance for outer edge
      const dxOuter = (x - cx) / rxOuter;
      const dyOuter = (y - cy) / ryOuter;
      const distOuter = Math.sqrt(dxOuter * dxOuter + dyOuter * dyOuter);

      // Fade factor: 0 = untouched original, 1 = 100% background color #080b0f
      let fade = 0;
      if (distInner > 1.0) {
        fade = Math.min(1.0, (distOuter - 0.75) / 0.25);
      }
      
      // Also fade the bottom torso into background color
      if (y > height * 0.75) {
        const bottomFade = (y - height * 0.75) / (height * 0.25);
        fade = Math.max(fade, bottomFade);
      }

      // Also fade the top 10% slightly
      if (y < height * 0.08) {
        const topFade = (height * 0.08 - y) / (height * 0.08);
        fade = Math.max(fade, topFade);
      }

      // Blend pixel towards #080b0f
      if (fade > 0) {
        outBuffer[idx] = Math.round(data[idx] * (1 - fade) + bgR * fade);
        outBuffer[idx + 1] = Math.round(data[idx + 1] * (1 - fade) + bgG * fade);
        outBuffer[idx + 2] = Math.round(data[idx + 2] * (1 - fade) + bgB * fade);
      }
    }
  }

  await sharp(outBuffer, {
    raw: { width, height, channels: 4 }
  })
    .png({ quality: 95 })
    .toFile('public/prince-seamless.png');

  console.log('Saved public/prince-seamless.png with seamless #080b0f border blend!');
}

makeSeamlessPortrait().catch(console.error);
