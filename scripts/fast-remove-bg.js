const sharp = require('sharp');
const fs = require('fs');

async function removeWhite(input, output) {
  const image = sharp(input);
  const { width, height } = await image.metadata();
  
  const raw = await image
    .ensureAlpha()
    .raw()
    .toBuffer();

  for (let i = 0; i < raw.length; i += 4) {
    // If pixel is very white, make it transparent
    if (raw[i] > 240 && raw[i+1] > 240 && raw[i+2] > 240) {
      raw[i+3] = 0;
    }
  }

  await sharp(raw, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(output);
}

removeWhite(process.argv[2], process.argv[3])
  .then(() => console.log('Done'))
  .catch(console.error);
