import sharp from 'sharp';

async function featherAndStudio() {
  const inputPath = 'public/profile-cutout.png';
  const { width, height } = await sharp(inputPath).metadata();

  // Create a stunning dark studio composite (dark charcoal/slate background with soft subtle radial gradient)
  const bgSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="grad" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#1e2230" />
        <stop offset="60%" stop-color="#0c0e14" />
        <stop offset="100%" stop-color="#050608" />
      </radialGradient>
      <radialGradient id="glow" cx="50%" cy="30%" r="40%">
        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#grad)" />
    <circle cx="${width/2}" cy="${height*0.35}" r="${width*0.4}" fill="url(#glow)" />
  </svg>
  `;

  // Composite the cutout onto the dark studio background
  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: inputPath, top: 0, left: 0 }
    ])
    .png()
    .toFile('public/profile-studio.png');

  console.log('Saved public/profile-studio.png with dark studio background!');
}

featherAndStudio().catch(console.error);
