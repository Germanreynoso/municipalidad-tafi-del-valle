const sharp = require('sharp');

async function removeBg(input, output) {
  const image = sharp(input);
  const { width, height } = await image.metadata();
  
  const buffer = await image
    .ensureAlpha()
    .raw()
    .toBuffer();

  for (let i = 0; i < buffer.length; i += 4) {
    const r = buffer[i];
    const g = buffer[i+1];
    const b = buffer[i+2];

    // Target common chessboard colors in fake PNGs
    const isPureWhite = r === 255 && g === 255 && b === 255;
    // Typical light gray in chessboard: 190-230 range
    const isGray = (r === g && g === b && r > 180 && r < 240);
    
    // Additional check: maybe it's not EXACTLY equal
    const isSubtleGray = Math.abs(r-g) < 2 && Math.abs(g-b) < 2 && r > 180 && r < 240;

    if (isPureWhite || isSubtleGray) {
      // Only remove if it's not in the middle area? 
      // Actually, many fake PNGs have these colors inside too if the mascot has white.
      // But let's try this first.
      buffer[i+3] = 0;
    }
  }

  await sharp(buffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(output);
  
  console.log('Background processed with Sharp');
}

removeBg(process.argv[2], process.argv[3]).catch(console.error);
