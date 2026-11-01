import sharp from 'sharp';

async function testSuit() {
  const input = 'public/profile-cutout.png';
  const meta = await sharp(input).metadata();
  console.log('Cutout metadata:', meta);

  // Let's create the ultimate seamless suit portrait for the hero section:
  // 1. Color grade the cutout slightly: rich contrast, crisp clarity, healthy skin tones
  const graded = await sharp(input)
    .modulate({
      brightness: 1.02,
      saturation: 1.05
    })
    .png()
    .toBuffer();

  const { width, height } = meta;

  // 2. We can create a version on solid #080c0e with subtle ambient lighting,
  // or a transparent PNG where bottom 100px softly fades out to alpha 0
  const { data } = await sharp(graded).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);

  // Soft bottom fade so the suit dissolves smoothly at the waistline
  for (let y = 0; y < height; y++) {
    let alphaY = 1.0;
    if (y > height - 120) {
      alphaY = (height - y) / 120;
    }

    for (let x = 0; x < width; x++) {
      let alphaX = 1.0;
      if (x < 15) {
        alphaX = x / 15;
      } else if (x > width - 15) {
        alphaX = (width - x) / 15;
      }

      const factor = Math.min(alphaX, alphaY);
      const smooth = 0.5 - 0.5 * Math.cos(factor * Math.PI);
      const idx = (y * width + x) * 4;
      out[idx + 3] = Math.round(data[idx + 3] * smooth);
    }
  }

  // Save as public/prince-seamless.png
  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ quality: 95, compressionLevel: 8 })
    .toFile('public/prince-seamless.png');

  // Also save as public/prince-polished-suit.png and src/assets/prince-t-123.png
  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ quality: 95, compressionLevel: 8 })
    .toFile('public/prince-polished-suit.png');

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ quality: 95, compressionLevel: 8 })
    .toFile('src/assets/prince-t-123.png');

  console.log('Successfully created polished professional suit portrait for hero landing page!');
}

testSuit().catch(console.error);
