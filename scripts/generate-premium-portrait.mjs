import sharp from 'sharp';

async function createAwwwardsPortrait() {
  const inputPath = 'public/profile-cutout.png';
  const { width, height } = await sharp(inputPath).metadata();

  // Color grade the cutout: slightly increase contrast, saturation, and warm highlights
  const gradedCutout = await sharp(inputPath)
    .modulate({
      brightness: 1.02,
      saturation: 1.08,
    })
    .linear(1.08, -6) // Increase contrast slightly
    .toBuffer();

  // Create a stunning dark obsidian/midnight studio background with dual-tone lighting (warm amber on left, cool cyan on right)
  const bgSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#11131a" />
        <stop offset="60%" stop-color="#0a0c10" />
        <stop offset="100%" stop-color="#060709" />
      </linearGradient>
      <!-- Warm rim light -->
      <radialGradient id="warmLight" cx="25%" cy="30%" r="55%">
        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25" />
        <stop offset="70%" stop-color="#f59e0b" stop-opacity="0" />
      </radialGradient>
      <!-- Cool rim light -->
      <radialGradient id="coolLight" cx="75%" cy="25%" r="55%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.22" />
        <stop offset="70%" stop-color="#38bdf8" stop-opacity="0" />
      </radialGradient>
      <!-- Center spotlight behind head -->
      <radialGradient id="spotlight" cx="50%" cy="30%" r="45%">
        <stop offset="0%" stop-color="#818cf8" stop-opacity="0.2" />
        <stop offset="100%" stop-color="#818cf8" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <rect width="${width}" height="${height}" fill="url(#spotlight)" />
    <rect width="${width}" height="${height}" fill="url(#warmLight)" />
    <rect width="${width}" height="${height}" fill="url(#coolLight)" />
  </svg>
  `;

  // Composite graded cutout on studio bg
  const composited = await sharp(Buffer.from(bgSvg))
    .composite([
      { input: gradedCutout, top: 0, left: 0 }
    ])
    .png()
    .toBuffer();

  // Apply a smooth bottom vignette fade (so suit gently fades into dark obsidian)
  const fadeMaskSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
        <stop offset="72%" stop-color="#ffffff" stop-opacity="1" />
        <stop offset="95%" stop-color="#ffffff" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#fade)" />
  </svg>
  `;

  const maskBuffer = await sharp(Buffer.from(fadeMaskSvg)).toBuffer();

  await sharp(composited)
    .png()
    .toFile('public/profile-premium.png');

  console.log('Successfully created public/profile-premium.png');
}

createAwwwardsPortrait().catch(console.error);
