import sharp from 'sharp';

async function generateCinematicBanner() {
  const width = 1920;
  const height = 1080;

  // Input portrait from subagent (with black crewneck developer outfit)
  const portraitPath = 'public/profile-stylish.png';
  
  // Resize portrait to fit right half of banner (e.g. height 1080, maintaining aspect ratio)
  const portraitResized = await sharp(portraitPath)
    .resize({ height: 1080, fit: 'contain' })
    .toBuffer({ resolveWithObject: true });

  const pWidth = portraitResized.info.width;
  const pHeight = portraitResized.info.height;
  console.log(`Resized portrait dimensions: ${pWidth}x${pHeight}`);

  // Position portrait on the right side
  const leftPos = Math.round(width - pWidth);

  // Background SVG with cinematic dark atmosphere, warm subtle rim light on subject
  const bgSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#05070a" />
        <stop offset="45%" stop-color="#07090d" />
        <stop offset="75%" stop-color="#090c12" />
        <stop offset="100%" stop-color="#0c0f16" />
      </linearGradient>
      <!-- Warm rim light on developer -->
      <radialGradient id="warmSpot" cx="78%" cy="38%" r="45%">
        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.18" />
        <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.04" />
        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
      </radialGradient>
      <!-- Cool blue edge light -->
      <radialGradient id="coolSpot" cx="95%" cy="30%" r="35%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.16" />
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
      </radialGradient>
      <!-- Left soft ambient glow -->
      <radialGradient id="leftGlow" cx="20%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#d8b46a" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#d8b46a" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" fill="url(#leftGlow)" />
    <rect width="${width}" height="${height}" fill="url(#warmSpot)" />
    <rect width="${width}" height="${height}" fill="url(#coolSpot)" />
  </svg>
  `;

  // Create smooth feather gradient overlay to make portrait blend into the left black side
  const blendOverlaySvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#05070a" stop-opacity="1" />
        <stop offset="35%" stop-color="#05070a" stop-opacity="0.96" />
        <stop offset="55%" stop-color="#07090d" stop-opacity="0.65" />
        <stop offset="70%" stop-color="#07090d" stop-opacity="0.2" />
        <stop offset="100%" stop-color="#07090d" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="fadeBottom" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#05070a" stop-opacity="0" />
        <stop offset="80%" stop-color="#05070a" stop-opacity="0" />
        <stop offset="100%" stop-color="#05070a" stop-opacity="0.9" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#fadeLeft)" />
    <rect width="${width}" height="${height}" fill="url(#fadeBottom)" />
  </svg>
  `;

  // Composite background + portrait + blend overlay
  const bannerBuffer = await sharp(Buffer.from(bgSvg))
    .composite([
      { input: portraitResized.data, top: 0, left: leftPos },
      { input: Buffer.from(blendOverlaySvg), top: 0, left: 0 },
    ])
    .webp({ quality: 90 })
    .toFile('public/prince-hero-banner.webp');

  // Also output png
  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: portraitResized.data, top: 0, left: leftPos },
      { input: Buffer.from(blendOverlaySvg), top: 0, left: 0 },
    ])
    .png({ quality: 90 })
    .toFile('public/prince-hero-banner.png');

  console.log('Successfully generated public/prince-hero-banner.webp and .png!');
}

generateCinematicBanner().catch(console.error);
