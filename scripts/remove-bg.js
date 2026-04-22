import sharp from 'sharp';
import fs from 'fs';

async function removeBg(input, output) {
  const image = sharp(input);
  const { width, height } = await image.metadata();
  
  const buffer = await image
    .ensureAlpha()
    .raw()
    .toBuffer();

  const isCheckerboard = (r, g, b) => {
    // White squares: (255, 255, 255)
    if (r > 250 && g > 250 && b > 250) return true;
    // Gray squares: usually consistent grayscale between 180-220
    if (Math.abs(r - g) < 2 && Math.abs(g - b) < 2 && r > 180 && r < 235) return true;
    return false;
  };

  for (let i = 0; i < buffer.length; i += 4) {
    if (isCheckerboard(buffer[i], buffer[i+1], buffer[i+2])) {
      // Check if it's near the edge or likely background
      // For simplicity, let's remove ALL matching colors first
      buffer[i+3] = 0;
    }
  }

  await sharp(buffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(output);
  
  console.log('Done');
}

removeBg(process.argv[2], process.argv[3]).catch(console.error);
