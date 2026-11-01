import sharp from 'sharp';

async function createCutoutFromStylish() {
  const inputPath = 'public/profile-stylish.png';
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Stylish input: ${width}x${height}`);

  // In profile-stylish.png, the background is dark charcoal/obsidian
  // Let's sample top-left pixel
  const r0 = data[0];
  const g0 = data[1];
  const b0 = data[2];
  console.log(`Top-left background pixel: R=${r0}, G=${g0}, B=${b0}`);

  // Since profile-cutout.png is ALREADY an exact transparency mask of Prince from the original high-res photo,
  // let's check profile-cutout.png!
  const maskMeta = await sharp('public/profile-cutout.png').metadata();
  console.log(`profile-cutout mask dimensions: ${maskMeta.width}x${maskMeta.height}`);
}

createCutoutFromStylish().catch(console.error);
