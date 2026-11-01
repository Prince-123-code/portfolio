import sharp from 'sharp';

async function extractCutout() {
  const inputPath = 'public/profile-stylish.png';
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  const visited = new Uint8Array(width * height);
  const isBg = new Uint8Array(width * height);
  const queue = [];

  const isDarkBg = (x, y) => {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Background is dark charcoal/black (r < 32, g < 32, b < 36)
    return r < 36 && g < 36 && b < 40;
  };

  // Seed borders
  for (let x = 0; x < width; x++) {
    if (isDarkBg(x, 0)) { queue.push(x, 0); visited[x] = 1; }
    if (isDarkBg(x, height - 1)) { queue.push(x, height - 1); visited[(height - 1) * width + x] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isDarkBg(0, y)) { queue.push(0, y); visited[y * width] = 1; }
    if (isDarkBg(width - 1, y)) { queue.push(width - 1, y); visited[y * width + (width - 1)] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const cPos = cy * width + cx;
    isBg[cPos] = 1;

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos]) {
          visited[nPos] = 1;
          if (isDarkBg(nx, ny)) {
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Create alpha channel
  const outBuffer = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      const idx = pos * channels;
      if (isBg[pos]) {
        outBuffer[idx + 3] = 0; // transparent background
      }
    }
  }

  await sharp(outBuffer, {
    raw: { width, height, channels: 4 }
  })
    .png()
    .toFile('public/prince-cutout-transparent.png');

  console.log('Saved public/prince-cutout-transparent.png');
}

extractCutout().catch(console.error);
