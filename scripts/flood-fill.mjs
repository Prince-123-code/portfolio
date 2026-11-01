import sharp from 'sharp';

async function floodFillRemoveBackground() {
  const inputPath = 'public/profile.jpg';
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Dimensions: ${width}x${height}`);

  const visited = new Uint8Array(width * height);
  const isBg = new Uint8Array(width * height);
  const queue = [];

  const isWhitePixel = (x, y) => {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Threshold for white background
    return r > 215 && g > 215 && b > 215;
  };

  // Seed with all border pixels that are near white
  for (let x = 0; x < width; x++) {
    if (isWhitePixel(x, 0)) {
      queue.push(x, 0);
      visited[x] = 1;
    }
  }
  for (let y = 0; y < height; y++) {
    if (isWhitePixel(0, y)) {
      queue.push(0, y);
      visited[y * width] = 1;
    }
    if (isWhitePixel(width - 1, y)) {
      queue.push(width - 1, y);
      visited[y * width + (width - 1)] = 1;
    }
  }

  // BFS
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
      [cx, cy - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos]) {
          visited[nPos] = 1;
          if (isWhitePixel(nx, ny)) {
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Now apply alpha to outBuffer
  const outBuffer = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      const idx = pos * channels;
      if (isBg[pos]) {
        outBuffer[idx + 3] = 0; // Fully transparent background
      }
    }
  }

  // Also create a studio dark composite with a gradient background
  // and export transparent PNG
  await sharp(outBuffer, {
    raw: { width, height, channels: 4 }
  })
    .png()
    .toFile('public/profile-cutout.png');

  console.log('Successfully saved public/profile-cutout.png with flood fill!');
}

floodFillRemoveBackground().catch(console.error);
